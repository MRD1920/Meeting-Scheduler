# Time Scheduler with OpenAI and Google Calendar Integration

This TypeScript project is a web application built using Express.js that allows users to schedule meetings based on weather conditions. It first fetches the weather of a certain location based on latitude and longitude and uses the OpenAI API to determine the best time for a meeting based on temperature and other factors and integrates with the Google Calendar API to schedule events with suitable event name based on weather.

## Features

- **Weather-Based Meeting Scheduling**: Input latitude and longitude to find the best time for your meeting based on temperature and weather conditions.

- **Google Calendar Integration**: Automatically schedule meetings on your Google Calendar with the provided title and time.

- **Google OAuth 2.0 Login**: Authenticate with your Google account to grant access to schedule events on your calendar.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/your-project.git

   ```

2. Install dependencies:
   cd your-project
   npm install

3. Set up Google OAuth 2.0:

Create a project on the Google Developers Console.
Enable the Google Calendar API for your project.
Create OAuth 2.0 credentials and download the client secret JSON file.
Configure the config.json file with your Google OAuth 2.0 credentials.

4. Configure environment variables:
   Create a .env file and add the following variables:

   PORT=your_port_number

   OPEN_API_KEY=your_openai_api_key (for openAI)

   CLIENT_ID=google_OAuth_Client_Id

   CLIENT_SECRET=google_OAuth_Client_secret

   REDIRECT_URL=http://localhost:5000/login/redirect (for E.g)

   API_KEY=google_api_key

   WEATHER_URL=https://api.open-meteo.com/v1/forecast

5. Run the application:

   npm run dev

Usage
Open your web browser and go to http://localhost:5000/login/OAuthLogin.
Log in with your Google account to grant access.
Make a GET request to the /schedule route with your latitude and longitude to schedule a meeting.

Example API request:
GET http://localhost:5000/location/weather?longitude=92.778908&latitude=24.833271
