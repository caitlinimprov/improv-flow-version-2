import json
import urllib.request
import os

SHEET_ID = os.environ.get("GOOGLE_SHEETS_ID")
SERVICE_ACCOUNT = os.environ.get("GOOGLE_SERVICE_ACCOUNT")

def fetch_sheet_data():
    try:
        import google.oauth2.service_account as sa
        import googleapiclient.discovery as discovery
        
        creds_dict = json.loads(SERVICE_ACCOUNT)
        creds = sa.Credentials.from_service_account_info(
            creds_dict,
            scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"]
        )
        
        service = discovery.build("sheets", "v4", credentials=creds)
        result = service.spreadsheets().values().get(
            spreadsheetId=SHEET_ID,
            range="Sheet1!A:V"
        ).execute()
        
        rows = result.get("values", [])
        if len(rows) < 2:
            print("No data found")
            return None
            
        headers = rows[0]
        
        live_row = None
        for row in rows[1:]:
            row_dict = dict(zip(headers, row))
            if row_dict.get("status", "").lower() == "live":
                live_row = row_dict
                break
        
        if not live_row:
            print("No live row found")
            return None
            
        data = {
            "week_number": int(live_row.get("week_number", 1)),
            "theme": live_row.get("theme", ""),
            "learn": live_row.get("learn", ""),
            "fact_stat": live_row.get("fact_stat", ""),
            "fact_context": live_row.get("fact_context", ""),
            "reward_quote": live_row.get("reward_quote", ""),
            "reward_author": live_row.get("reward_author", ""),
            "activities": []
        }
        
        for i in range(1, 8):
            title = live_row.get(f"activity_{i}_title", "")
            desc = live_row.get(f"activity_{i}_description", "")
            if title:
                data["activities"].append({
                    "id": f"activity_{i}",
                    "emoji": "🎭",
                    "title": title,
                    "description": desc
                })
        
        return data
        
    except Exception as e:
        print(f"Error fetching sheet: {e}")
        return None

data = fetch_sheet_data()
if data:
    with open("src/data/thisweek.json", "w") as f:
        json.dump(data, f, indent=2)
    print("Successfully updated thisweek.json")
else:
    print("Using existing thisweek.json")
