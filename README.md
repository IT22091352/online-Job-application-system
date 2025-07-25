# Online Application Processing System (MERN)

This project is a MERN stack application for processing online job applications with secure email OTP verification and dynamic forms per vacancy type.

## Prerequisites
- Node.js (v16+ recommended)
- npm
- MongoDB (local or Atlas)

## 1. Clone the Repository
```
git clone <repo-url>
cd online-application-system
```

## 2. Backend Setup
```
cd backend
```

### Install dependencies
```
npm install
```

### Configure Environment Variables
Create a `.env` file in the `backend` directory (this file is ignored by git):
```
MONGO_URI=mongodb://localhost:27017/online-application-system
GMAIL_USER=your_gmail_address@gmail.com
GMAIL_PASS=your_gmail_app_password
```
- For Gmail, use an App Password (not your main Gmail password). See https://support.google.com/accounts/answer/185833 for details.
- You can also refer to `backend/.env.example` for the required variables.

### Start MongoDB
- If running locally, ensure MongoDB is running:
```
# On Windows (default install)
"C:\Program Files\MongoDB\Server\<version>\bin\mongod.exe"
```
- Or use MongoDB Atlas and update `MONGO_URI` accordingly.

### Start the Backend Server
```
node index.js
```
- The backend will run on `http://localhost:5000`

## 3. Frontend Setup
```
cd ../frontend
```

### Install dependencies
```
npm install
```

### Start the Frontend
```
npm start
```
- The frontend will run on `http://localhost:3000`

## 4. Using the Application
1. Enter your email address and request an OTP.
2. Check your email inbox for the OTP (sent via Gmail SMTP).
3. Enter the OTP to verify.
4. Select the advertisement, application type, and vacancy.
5. Fill out the dynamic form and submit your application.

## 5. Project Structure
- `backend/` — Node.js, Express, MongoDB API
- `frontend/` — React.js, Material-UI client

## 6. Environment Variables
- See `backend/.env.example` for required variables.
- The `.env` file is ignored by git (see `backend/.gitignore`).