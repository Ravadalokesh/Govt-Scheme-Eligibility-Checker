# API Configuration Guide

This website fetches **ALL available government schemes dynamically from an online API - NO LIMIT**. The system will load every scheme returned by your API, regardless of how many there are.

## Current Configuration

The API endpoint is configured in `script.js`:

```javascript
const API_ENDPOINT = './schemes.json';  // Currently using local file
const FALLBACK_ENDPOINT = null;          // Fallback endpoint
```

## How It Works

1. **Primary API**: Fetches **ALL schemes** from `API_ENDPOINT` (your online API) - accepts any number
2. **Fallback API**: If primary fails, tries `FALLBACK_ENDPOINT` (if configured) - loads all available
3. **No Hardcoded Fallback**: The system relies entirely on the API - no static schemes in code

**Important**: 
- The system has **NO LIMIT** on the number of schemes. It will load and process every scheme your API returns.
- **No static schemes**: All schemes must come from your API. If the API fails, the system will show an error message.

## API Options

### Option 1: Local JSON File (Current)
- **URL**: `./schemes.json`
- **Pros**: Works offline, no external dependencies
- **Cons**: Not truly "online", requires file hosting

### Option 2: GitHub Gist
1. Create a Gist on GitHub with your `schemes.json` content
2. Get the raw URL: `https://gist.githubusercontent.com/USERNAME/GIST_ID/raw/schemes.json`
3. Update `API_ENDPOINT` in `script.js`

### Option 3: JSONBin.io (Free API Hosting)
1. Sign up at https://jsonbin.io
2. Create a bin with your schemes data
3. Get your bin ID and API key
4. Update `API_ENDPOINT` to: `https://api.jsonbin.io/v3/b/YOUR_BIN_ID`
5. Add headers in `fetchSchemes()` function:
   ```javascript
   headers: {
     'Content-Type': 'application/json',
     'X-Master-Key': 'YOUR_API_KEY'
   }
   ```

### Option 4: Your Own API Server
1. Host your own API endpoint
2. Update `API_ENDPOINT` to your API URL
3. Ensure it returns JSON in the same format as `schemes.json`

## JSON Format

The API should return a JSON array with **any number** of scheme objects (no limit):

```json
[
  {
    "id": 1,
    "name": "Scheme Name",
    "description": "Scheme description",
    "criteria": {
      "age": { "min": 18, "max": 60 },
      "income": { "max": 100000 },
      "gender": "female",
      "category": ["sc", "st"],
      "location": ["rural", "urban"],
      "farmer": true,
      "disabled": true,
      "widow": true,
      "unemployed": false
    },
    "benefits": [
      "Benefit 1",
      "Benefit 2"
    ]
  }
]
```

## Fallback Mechanism

If the primary API fails to load, the system will:
1. Try the `FALLBACK_ENDPOINT` if configured
2. If all APIs fail, show an error message - **no hardcoded schemes are used**

**Note**: The system requires a working API endpoint. Make sure your API is accessible and returns valid JSON data.

## Testing

1. Open browser console (F12)
2. Check for success message: `✅ Successfully loaded X schemes from API`
3. Or error message: `❌ Error fetching schemes from API`

## CORS Note

If hosting on a different domain, ensure CORS headers are properly configured:
```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: GET
```

