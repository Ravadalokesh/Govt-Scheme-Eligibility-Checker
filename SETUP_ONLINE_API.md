# Quick Setup Guide: Host Schemes Online

This guide will help you set up an online API to fetch all government schemes dynamically.

## Method 1: GitHub Gist (Easiest & Free) ⭐ Recommended

### Step 1: Create a GitHub Account
- Go to https://github.com
- Sign up for a free account (if you don't have one)

### Step 2: Create a Gist
1. Go to https://gist.github.com
2. Click "Sign in" and login
3. In the "Filename including extension" field, type: `schemes.json`
4. Copy the entire content from `schemes.json` file in this project
5. Paste it into the large text area
6. Make sure "Create public gist" is selected (not secret)
7. Click "Create public gist"

### Step 3: Get the Raw URL
1. After creating the gist, you'll see your gist page
2. Click the "Raw" button (top right of the file content)
3. Copy the URL from your browser's address bar
   - It will look like: `https://gist.githubusercontent.com/YOUR_USERNAME/GIST_ID/raw/schemes.json`

### Step 4: Update script.js
1. Open `script.js` in your project
2. Find this line:
   ```javascript
   const API_ENDPOINT = './schemes.json';
   ```
3. Replace it with your Gist URL:
   ```javascript
   const API_ENDPOINT = 'https://gist.githubusercontent.com/YOUR_USERNAME/GIST_ID/raw/schemes.json';
   ```
4. Save the file

### Step 5: Test
1. Open `schemes.html` in your browser
2. Open browser console (F12)
3. You should see: `✅ Successfully loaded 15 schemes from online API`

## Method 2: JSONBin.io (Alternative Free Option)

### Step 1: Sign Up
1. Go to https://jsonbin.io
2. Sign up for a free account

### Step 2: Create a Bin
1. Click "Create Bin"
2. Paste your `schemes.json` content
3. Click "Create"
4. Copy your Bin ID

### Step 3: Update script.js
```javascript
const API_ENDPOINT = 'https://api.jsonbin.io/v3/b/YOUR_BIN_ID';
```

### Step 4: Add API Key (Optional but recommended)
If you want to keep your bin private, add headers in the `fetchSchemes()` function:
```javascript
headers: {
  'Content-Type': 'application/json',
  'X-Master-Key': 'YOUR_API_KEY'
}
```

## Method 3: Your Own Server

If you have your own server:
1. Upload `schemes.json` to your server
2. Ensure CORS headers are set:
   ```
   Access-Control-Allow-Origin: *
   Access-Control-Allow-Methods: GET
   ```
3. Update `API_ENDPOINT` with your server URL

## Features

✅ **Automatic Fallback**: If online API fails, tries local file
✅ **Complete Fallback**: If all APIs fail, uses all 15 hardcoded schemes
✅ **Refresh Button**: Click "Refresh Schemes" button to reload from API
✅ **Loading Indicators**: Shows when schemes are being loaded
✅ **Error Handling**: Graceful error messages if API fails

## Verification

After setting up, check the browser console:
- ✅ Success: `Successfully loaded 15 schemes from online API`
- ⚠️ Warning: `Loaded X schemes from fallback endpoint`
- ❌ Error: `Failed to load from online API. Using 15 cached schemes.`

## Updating Schemes

To update schemes:
1. Edit your Gist/API with new scheme data
2. Click "Refresh Schemes" button on the website
3. Or reload the page

---

**Note**: The website will always work even if the API is down, thanks to the complete fallback system with all 15 schemes.

