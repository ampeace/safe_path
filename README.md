# Safe Path - Smart Navigation System

A web-based application that helps drivers find the safest route by avoiding dangerous areas, accidents, and bad weather.

## Features
- **Smart Route Planning**: Automatically calculates the safest path to your destination.
- **Real-time Updates**: Monitors traffic, accidents, and weather conditions.
- **User Authentication**: Secure sign-up and login system using JWT and bcrypt.
- **Modern UI**: Clean, intuitive interface with a premium dark mode, glassmorphism design, and sleek animations.

## Technologies Used
- **Frontend**: React.js, Vite, Vanilla CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Mongoose)

## Installation & Setup Guide

### Prerequisites
- [Node.js](https://nodejs.org/) (v16 or higher recommended)
- npm (comes with Node.js)
- A [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster (or local MongoDB)

### 1. Database & Environment Configuration
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Create a `.env` file in the `server` directory and configure your variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```
   > **Note**: If you are using MongoDB Atlas, ensure your current IP address is whitelisted in your Network Access settings!

### 2. Backend Setup
1. Inside the `server` directory, install the required dependencies:
   ```bash
   npm install
   ```
2. Start the backend server:
   ```bash
   node server.js
   ```
   *You should see a message saying `MongoDB Connected` and `Server running on port 5000`.*

### 3. Frontend Setup
1. Open a new terminal and navigate to the client directory from the project root:
   ```bash
   cd client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open your browser and go to `http://localhost:5173`
2. You will be greeted by the Splash Screen, followed by the Authentication page.
3. Toggle to the **Sign Up** tab to create a new account.
4. Once registered, switch back to **Log In** and enter your credentials to access your secure navigation dashboard!
