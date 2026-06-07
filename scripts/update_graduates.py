import requests
import json
import os

def update_graduates():
    # URL to the Zenodo API for the Concept DOI
    url = "https://zenodo.org/api/records/20575109"
    
    try:
        print(f"Fetching data from {url}...")
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()
        
        # Check if 'files' is in the data
        if 'files' in data:
            total_graduates = len(data['files'])
        else:
            print("No 'files' array found in the Zenodo response.")
            total_graduates = 0
            
        print(f"Total graduates calculated: {total_graduates}")
        
        # Ensure target directory exists
        target_dir = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "data")
        os.makedirs(target_dir, exist_ok=True)
        
        # Save to JSON
        target_file = os.path.join(target_dir, "course_stats.json")
        with open(target_file, "w", encoding="utf-8") as f:
            json.dump({"total_graduates": total_graduates}, f, indent=2)
            
        print(f"Successfully saved stats to {target_file}")
        
    except Exception as e:
        print(f"Error fetching or parsing Zenodo API: {e}")
        # Do not overwrite the file with 0 if there's a network error
        # to ensure the site retains the last known good value.
        exit(1)

if __name__ == "__main__":
    update_graduates()
