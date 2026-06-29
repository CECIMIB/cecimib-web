import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ORCIDS = {
    'ivan': '0000-0002-1960-7334',
    'david': '0000-0002-6742-3185',
    'andy': '0000-0002-6860-1043'
};

const ALLOWED_TYPES = [
    'journal-article',
    'conference-poster',
    'conference-paper',
    'lecture-speech'
];

async function getAccessToken(clientId, clientSecret) {
    if (!clientId || !clientSecret) {
        console.log("No ORCID_CLIENT_ID or ORCID_CLIENT_SECRET provided. Proceeding without authentication (public API rate limits apply).");
        return null;
    }

    const params = new URLSearchParams();
    params.append('client_id', clientId);
    params.append('client_secret', clientSecret);
    params.append('grant_type', 'client_credentials');
    params.append('scope', '/read-public');

    try {
        const response = await fetch('https://orcid.org/oauth/token', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: params
        });

        if (!response.ok) {
            throw new Error(`Failed to get access token: ${response.statusText}`);
        }

        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Error fetching ORCID access token:', error);
        throw error;
    }
}

async function fetchResearcherWorks(orcid, token) {
    const url = `https://pub.orcid.org/v3.0/${orcid}/works`;
    
    try {
        const headers = { 'Accept': 'application/json' };
        if (token) headers['Authorization'] = `Bearer ${token}`;

        const response = await fetch(url, { headers });

        if (!response.ok) {
            console.warn(`Failed to fetch works for ${orcid}: ${response.statusText}`);
            return [];
        }

        const data = await response.json();
        return data.group || [];
    } catch (error) {
        console.error(`Error fetching data for ${orcid}:`, error);
        return [];
    }
}

function parseWorks(group) {
    const parsed = [];
    const counts = {
        'journal-article': 0,
        'conference-poster': 0,
        'conference-paper': 0,
        'lecture-speech': 0
    };

    group.forEach(workGroup => {
        // workGroup['work-summary'] is an array. We usually take the first one (most preferred).
        if (!workGroup['work-summary'] || workGroup['work-summary'].length === 0) return;
        
        const summary = workGroup['work-summary'][0];
        const type = summary.type;

        if (ALLOWED_TYPES.includes(type)) {
            counts[type]++;

            const title = summary.title?.title?.value || 'Untitled';
            
            const year = summary['publication-date']?.year?.value || '';
            const month = summary['publication-date']?.month?.value || '';
            const date = month ? `${year}/${month}` : year;

            const journal = summary['journal-title']?.value || '';

            parsed.push({
                title,
                date,
                journal,
                type,
                putCode: summary['put-code']
            });
        }
    });

    // Sort by date descending (newest first)
    parsed.sort((a, b) => {
        const dateA = a.date || '';
        const dateB = b.date || '';
        return dateB.localeCompare(dateA);
    });

    return { works: parsed, counts };
}

async function main() {
    const clientId = process.env.ORCID_CLIENT_ID;
    const clientSecret = process.env.ORCID_CLIENT_SECRET;

    try {
        console.log("Starting ORCID fetch process...");
        const token = await getAccessToken(clientId, clientSecret);

        const results = {};

        for (const [key, orcid] of Object.entries(ORCIDS)) {
            console.log(`Fetching works for ${key} (${orcid})...`);
            const group = await fetchResearcherWorks(orcid, token);
            const { works, counts } = parseWorks(group);
            
            results[key] = {
                counts,
                works
            };
            console.log(`- Found ${works.length} relevant works.`);
        }

        const dataPath = path.join(__dirname, '..', 'src', 'data', 'orcid_publications.json');
        fs.writeFileSync(dataPath, JSON.stringify(results, null, 2));
        console.log(`Successfully saved ORCID data to ${dataPath}`);

    } catch (error) {
        console.error("Script execution failed:", error);
        process.exit(1);
    }
}

main();
