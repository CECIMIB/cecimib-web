import json
import requests
import os
import sys

# Target researchers and their Google Scholar IDs
RESEARCHERS = {
    'ivan': 'fA3e4-8AAAAJ',
    'david': 'KviJPbAAAAAJ',
    'andy': 'jccSioEAAAAJ'
}

SERPAPI_KEY = os.environ.get('SERPAPI_KEY')
OUTPUT_PATH = os.path.join(os.path.dirname(__file__), '..', 'public', 'data', 'metrics.json')

def fetch_metrics():
    if not SERPAPI_KEY:
        print("Error: SERPAPI_KEY environment variable is not set.", file=sys.stderr)
        sys.exit(1)

    metrics = {}

    for researcher_id, scholar_id in RESEARCHERS.items():
        print(f"Fetching metrics for {researcher_id} ({scholar_id})...")
        try:
            # 1. Fetch the first page to get citations and h-index
            params = {
                'engine': 'google_scholar_author',
                'author_id': scholar_id,
                'api_key': SERPAPI_KEY,
                'num': 100,
                'start': 0
            }
            
            response = requests.get('https://serpapi.com/search.json', params=params)
            response.raise_for_status()
            data = response.json()
            
            # Parse cited_by table
            cited_by_table = data.get('cited_by', {}).get('table', [])
            citations = 0
            h_index = 0
            
            for row in cited_by_table:
                if 'citations' in row:
                    citations = row['citations'].get('all', 0)
                elif 'h_index' in row:
                    h_index = row['h_index'].get('all', 0)
            
            # Parse works count (paginate until no more articles)
            works_count = len(data.get('articles', []))
            
            while 'serpapi_pagination' in data and 'next' in data['serpapi_pagination']:
                # The 'next' string is usually a full URL, but let's just increment start
                params['start'] += 100
                print(f"Fetching next page for {researcher_id} (start={params['start']})...")
                res_page = requests.get('https://serpapi.com/search.json', params=params)
                res_page.raise_for_status()
                data = res_page.json()
                
                articles = data.get('articles', [])
                works_count += len(articles)
                
                # If we get less than 100 articles, it's the last page
                if len(articles) < 100:
                    break

            metrics[researcher_id] = {
                'works_count': works_count,
                'cited_by_count': citations,
                'h_index': h_index
            }
            print(f"Success -> Works: {works_count}, Citations: {citations}, H-Index: {h_index}")

        except Exception as e:
            print(f"Error fetching data for {researcher_id}: {e}", file=sys.stderr)
            # Default to 0 so we don't break the UI
            metrics[researcher_id] = {
                'works_count': 0,
                'cited_by_count': 0,
                'h_index': 0
            }

    # Ensure output directory exists
    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)

    with open(OUTPUT_PATH, 'w', encoding='utf-8') as f:
        json.dump(metrics, f, indent=2, ensure_ascii=False)
    print(f"Successfully saved metrics to {OUTPUT_PATH}")

if __name__ == "__main__":
    fetch_metrics()
