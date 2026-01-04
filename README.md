# Government Scheme Eligibility Checker

A web application to check eligibility for various government schemes based on user information like age, income, category, location, etc.

## About

This project helps users find out which government schemes they are eligible for by entering their personal details. The application checks eligibility criteria for multiple government schemes and displays the results.

## Features

- Check eligibility for multiple government schemes
- Simple and easy to use form
- Displays eligible and not eligible schemes
- Shows reasons for ineligibility
- Responsive design

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6+)
- Bootstrap 5
- Bootstrap Icons
- JSON for data storage

## Project Structure

```
pro1/
├── index.html          # Home page
├── public/
│   ├── schemes.html    # Eligibility checker page
│   └── schemes.json    # Government schemes data
├── src/
│   ├── script.js       # Main JavaScript logic
│   └── styles.css      # Custom styles
└── README.md
```

## Setup Instructions

1. Clone or download this repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Open `index.html` in a web browser

   Or use a local server:
   ```bash
   # Using Python
   python -m http.server 8000
   
   # Using Node.js (if you have http-server installed)
   npx http-server
   ```

4. Navigate to `http://localhost:8000` in your browser

## How to Use

1. Open the application in your browser
2. Click on "Check Eligibility Now" button
3. Fill in the form with your details:
   - Age
   - Gender
   - Annual Income
   - Category (General/OBC/SC/ST)
   - Location (Rural/Urban)
   - Education Level
   - Special Conditions (if any)
4. Click "Check Eligibility" button
5. View the results showing eligible and not eligible schemes

## Government Schemes Included

The application includes various government schemes like:
- Pradhan Mantri Awas Yojana (PMAY)
- Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)
- Pradhan Mantri Ujjwala Yojana
- Ayushman Bharat
- And many more...

## Future Improvements

- Add more government schemes
- Improve UI/UX
- Add search functionality
- Add scheme details page
- Connect to real-time API

## Author

Developed as a college project for portfolio/resume.

## License

This project is open source and available for educational purposes.

