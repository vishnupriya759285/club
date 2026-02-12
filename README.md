# 📚 Club Activity Monitoring & Attendance System

A comprehensive full-stack web application for managing club activities and tracking student attendance with role-based access control.

## 🏗️ Architecture Overview

```
┌─────────────────┐         ┌─────────────────┐         ┌──────────────────┐
│                 │  HTTP   │                 │  TCP    │                  │
│  React Frontend │◄───────►│  Express API    │◄───────►│  MongoDB Atlas   │
│  (Vite + TW)    │  REST   │  (Node.js)      │         │  (Cloud DB)      │
│                 │         │                 │         │                  │
└─────────────────┘         └─────────────────┘         └──────────────────┘
     Port 5173                   Port 5000                   Cloud Hosted
```

### Technology Stack

**Frontend:**
- ⚛️ React.js 18 with Vite
- 🎨 Tailwind CSS for styling
- 🔄 React Router DOM for navigation
- 🌐 Axios for API communication
- 🔐 Context API for state management

**Backend:**
- 🟢 Node.js with Express.js
- 🔒 JWT authentication
- 🛡️ bcrypt for password hashing
- ✅ express-validator for input validation

**Database:**
- 🍃 MongoDB Atlas (Cloud Database)
- 📦 Mongoose ODM

## 📁 Project Structure

```
cod/
├── backend/
│   ├── config/
│   │   └── db.js                 # MongoDB connection
│   ├── controllers/
│   │   ├── authController.js      # Authentication logic
│   │   ├── activityController.js  # Activity CRUD operations
│   │   ├── attendanceController.js # Attendance management
│   │   └── announcementController.js # Announcement CRUD
│   ├── middleware/
│   │   └── auth.js                # JWT verification & authorization
│   ├── models/
│   │   ├── User.js                # User schema (Student/Teacher)
│   │   ├── Activity.js            # Activity schema
│   │   ├── Attendance.js          # Attendance records
│   │   └── Announcement.js        # Announcement schema
│   ├── routes/
│   │   ├── authRoutes.js          # /api/auth routes
│   │   ├── activityRoutes.js      # /api/activities routes
│   │   ├── attendanceRoutes.js    # /api/attendance routes
│   │   └── announcementRoutes.js  # /api/announcements routes
│   ├── utils/
│   │   └── jwtUtils.js            # JWT helper functions
│   ├── .env.example               # Environment variables template
│   ├── .gitignore
│   ├── package.json
│   └── server.js                  # Express server entry point
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── Navbar.jsx         # Navigation header
    │   │   └── ProtectedRoute.jsx # Route protection wrapper
    │   ├── context/
    │   │   └── AuthContext.jsx    # Authentication context
    │   ├── pages/
    │   │   ├── Login.jsx          # Login page
    │   │   ├── Register.jsx       # Registration page
    │   │   ├── StudentDashboard.jsx # Student home
    │   │   ├── TeacherDashboard.jsx # Teacher home
    │   │   ├── Activities.jsx     # Activities listing
    │   │   ├── MyAttendance.jsx   # Student attendance view
    │   │   ├── Announcements.jsx  # Announcements page
    │   │   └── Reports.jsx        # Teacher reports
    │   ├── services/
    │   │   └── api.js             # Axios API service
    │   ├── App.jsx                # Main app component
    │   ├── main.jsx               # React entry point
    │   └── index.css              # Global styles
    ├── .env.example
    ├── .gitignore
    ├── index.html
    ├── package.json
    ├── postcss.config.js
    ├── tailwind.config.js
    └── vite.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Atlas account (free tier available)
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

4. **Edit `.env` file with your MongoDB Atlas credentials:**
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/clubattendance?retryWrites=true&w=majority
   JWT_SECRET=your_super_secret_jwt_key_change_this
   JWT_EXPIRE=7d
   CORS_ORIGIN=http://localhost:5173
   ```

5. **Start the backend server:**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

   Server will run at `http://localhost:5000`

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   # Copy the example env file
   cp .env.example .env
   ```

4. **Edit `.env` file:**
   ```env
   VITE_API_URL=http://localhost:5000/api
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

   Application will run at `http://localhost:5173`

## 🔑 MongoDB Atlas Setup

### Step-by-Step Guide:

1. **Create Account:**
   - Visit [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
   - Sign up for a free account

2. **Create a Cluster:**
   - Choose FREE tier (M0)
   - Select your preferred cloud provider and region
   - Click "Create Cluster"

3. **Database Access:**
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Choose "Password" authentication
   - Create username and password (save these!)
   - Set privileges to "Read and write to any database"

4. **Network Access:**
   - Go to "Network Access"
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (for development)
   - Or add your specific IP address (more secure)

5. **Get Connection String:**
   - Go to "Database" → Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<cluster>` with your cluster name
   - Add database name: `/clubattendance`

   Example:
   ```
   mongodb+srv://myuser:mypassword@cluster0.abc123.mongodb.net/clubattendance?retryWrites=true&w=majority
   ```

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### 1. Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "rollNumber": "CS2021001",  // Required for students only
  "password": "password123",
  "role": "student",           // "student" or "teacher"
  "department": "Computer Science",  // Optional
  "year": 2                    // Optional, 1-4
}

Response (201):
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "...",
      "name": "John Doe",
      "email": "john@example.com",
      "rollNumber": "CS2021001",
      "role": "student"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

#### 2. Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",  // or rollNumber
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": { ... },
    "token": "..."
  }
}
```

#### 3. Get Current User
```http
GET /api/auth/me
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "user": { ... }
  }
}
```

### Activity Endpoints

#### 1. Create Activity (Teacher Only)
```http
POST /api/activities
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Python Workshop",
  "description": "Learn Python basics",
  "clubName": "Coding Club",
  "date": "2026-03-15",
  "startTime": "14:00",
  "endTime": "16:00",
  "location": "Lab 101",
  "maxCapacity": 50  // Optional
}

Response (201):
{
  "success": true,
  "message": "Activity created successfully",
  "data": { "activity": { ... } }
}
```

#### 2. Get All Activities
```http
GET /api/activities
Authorization: Bearer <token>

Query Parameters (optional):
?status=upcoming
?clubName=Coding Club
?date=2026-03-15

Response (200):
{
  "success": true,
  "count": 5,
  "data": {
    "activities": [ ... ]
  }
}
```

#### 3. Get Single Activity
```http
GET /api/activities/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { "activity": { ... } }
}
```

#### 4. Update Activity (Teacher Only)
```http
PUT /api/activities/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "status": "completed"
}

Response (200):
{
  "success": true,
  "message": "Activity updated successfully",
  "data": { "activity": { ... } }
}
```

#### 5. Delete Activity (Teacher Only)
```http
DELETE /api/activities/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Activity deleted successfully"
}
```

#### 6. Open Attendance (Teacher Only)
```http
PUT /api/activities/:id/attendance/open
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Attendance opened successfully",
  "data": { "activity": { ... } }
}
```

#### 7. Close Attendance (Teacher Only)
```http
PUT /api/activities/:id/attendance/close
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Attendance closed successfully",
  "data": { "activity": { ... } }
}
```

### Attendance Endpoints

#### 1. Mark Attendance (Student Only)
```http
POST /api/attendance/mark
Authorization: Bearer <token>
Content-Type: application/json

{
  "activityId": "65a1b2c3d4e5f6g7h8i9j0k1"
}

Response (201):
{
  "success": true,
  "message": "Attendance marked successfully",
  "data": { "attendance": { ... } }
}
```

#### 2. Get My Attendance (Student Only)
```http
GET /api/attendance/my-attendance
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "attendance": [ ... ],
    "stats": {
      "totalActivities": 10,
      "attendedActivities": 8,
      "attendancePercentage": "80.00"
    }
  }
}
```

#### 3. Get Activity Attendance (Teacher Only)
```http
GET /api/attendance/activity/:activityId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "activity": { ... },
    "attendance": [ ... ],
    "stats": {
      "total": 25,
      "present": 23,
      "absent": 2
    }
  }
}
```

#### 4. Get Student Attendance (Teacher Only)
```http
GET /api/attendance/student/:studentId
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "student": { ... },
    "attendance": [ ... ],
    "stats": { ... }
  }
}
```

#### 5. Get Attendance Report (Teacher Only)
```http
GET /api/attendance/report
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": {
    "report": [
      {
        "student": { "id": "...", "name": "...", "rollNumber": "..." },
        "totalActivities": 10,
        "attended": 8,
        "percentage": "80.00"
      },
      ...
    ],
    "summary": {
      "totalStudents": 50,
      "totalActivities": 10,
      "totalAttendanceRecords": 400
    }
  }
}
```

### Announcement Endpoints

#### 1. Create Announcement (Teacher Only)
```http
POST /api/announcements
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Club Meeting",
  "content": "Monthly meeting on Friday",
  "priority": "high",           // "low", "medium", "high"
  "targetAudience": "all",      // "all", "students", "specific"
  "clubName": "Coding Club",    // Optional
  "expiryDate": "2026-03-20"    // Optional
}

Response (201):
{
  "success": true,
  "message": "Announcement created successfully",
  "data": { "announcement": { ... } }
}
```

#### 2. Get All Announcements
```http
GET /api/announcements
Authorization: Bearer <token>

Query Parameters (optional):
?priority=high
?clubName=Coding Club

Response (200):
{
  "success": true,
  "count": 3,
  "data": {
    "announcements": [ ... ]
  }
}
```

#### 3. Get Single Announcement
```http
GET /api/announcements/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "data": { "announcement": { ... } }
}
```

#### 4. Update Announcement (Teacher Only)
```http
PUT /api/announcements/:id
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "Updated Title",
  "priority": "medium"
}

Response (200):
{
  "success": true,
  "message": "Announcement updated successfully",
  "data": { "announcement": { ... } }
}
```

#### 5. Delete Announcement (Teacher Only)
```http
DELETE /api/announcements/:id
Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Announcement deleted successfully"
}
```

## 👥 User Roles & Features

### Student Features ✅
- ✔️ Register and login
- ✔️ View all club activities
- ✔️ Mark attendance for open activities
- ✔️ View personal attendance history
- ✔️ Track attendance percentage
- ✔️ View announcements from teachers

### Teacher Features 🎓
- ✔️ Register and login
- ✔️ Create, update, and delete activities
- ✔️ Open/close attendance for activities
- ✔️ View attendance for specific activities
- ✔️ View student-wise attendance reports
- ✔️ Generate comprehensive attendance reports
- ✔️ Post and manage announcements

## 🔒 Security Features

1. **Password Hashing:** bcrypt with salt rounds
2. **JWT Authentication:** Secure token-based auth
3. **Role-Based Access Control:** Middleware-level authorization
4. **Protected Routes:** Frontend and backend route protection
5. **Input Validation:** express-validator for data sanitization
6. **Environment Variables:** Sensitive data in .env files
7. **CORS Configuration:** Controlled cross-origin requests

## 🌐 Cloud Deployment Guide

### Backend Deployment (Render)

1. **Create Render Account:**
   - Visit [Render.com](https://render.com)
   - Sign up with GitHub

2. **Create Web Service:**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Select the backend folder

3. **Configure:**
   ```
   Name: club-attendance-backend
   Environment: Node
   Build Command: npm install
   Start Command: npm start
   ```

4. **Add Environment Variables:**
   - Go to "Environment" tab
   - Add all variables from `.env`:
     - `MONGODB_URI`
     - `JWT_SECRET`
     - `JWT_EXPIRE`
     - `NODE_ENV=production`
     - `CORS_ORIGIN=<your-frontend-url>`

5. **Deploy:**
   - Click "Create Web Service"
   - Wait for deployment (5-10 minutes)
   - Copy the service URL

### Frontend Deployment (Vercel)

1. **Create Vercel Account:**
   - Visit [Vercel.com](https://vercel.com)
   - Sign up with GitHub

2. **Import Project:**
   - Click "Add New" → "Project"
   - Import your GitHub repository
   - Select root directory or frontend folder

3. **Configure:**
   ```
   Framework Preset: Vite
   Build Command: npm run build
   Output Directory: dist
   Install Command: npm install
   ```

4. **Add Environment Variables:**
   - Go to "Settings" → "Environment Variables"
   - Add: `VITE_API_URL=<your-backend-url>/api`

5. **Deploy:**
   - Click "Deploy"
   - Wait for build (2-5 minutes)
   - Your site is live!

6. **Update Backend CORS:**
   - Go to Render backend settings
   - Update `CORS_ORIGIN` with Vercel URL
   - Redeploy backend

### Alternative: Deploy Both on Render

1. Deploy backend as Web Service (as above)
2. Deploy frontend as Static Site:
   - Choose "Static Site"
   - Build Command: `npm run build`
   - Publish Directory: `dist`

## 🧪 Testing the Application

### Sample Test Flow:

1. **Register as Teacher:**
   ```
   Name: Dr. Smith
   Email: smith@college.edu
   Role: Teacher
   Password: teacher123
   ```

2. **Register as Student:**
   ```
   Name: Alice Johnson
   Email: alice@college.edu
   Roll Number: CS2021001
   Role: Student
   Password: student123
   ```

3. **Teacher Actions:**
   - Login as teacher
   - Create a new activity
   - Open attendance for that activity

4. **Student Actions:**
   - Login as student
   - View the activity
   - Mark attendance
   - Check "My Attendance" page

5. **Teacher Reports:**
   - Login as teacher
   - Go to "Reports"
   - View attendance statistics

## 🐛 Troubleshooting

### Common Issues:

**Backend won't start:**
- Check MongoDB connection string
- Verify all environment variables are set
- Ensure port 5000 is not in use

**Frontend can't connect to backend:**
- Verify `VITE_API_URL` in frontend `.env`
- Check CORS configuration in backend
- Ensure backend is running

**MongoDB Connection Error:**
- Verify MongoDB Atlas credentials
- Check IP whitelist in MongoDB Atlas
- Ensure network connection

**JWT Token Errors:**
- Check `JWT_SECRET` is set in backend
- Verify token format in requests
- Check token expiration

## 📈 Future Enhancements

- 📧 Email notifications for announcements
- 📊 Advanced analytics and charts
- 📱 Mobile responsive design improvements
- 🔔 Real-time notifications with WebSockets
- 📄 PDF report generation
- 🖼️ Profile picture uploads
- 🌓 Dark mode support
- 🔍 Advanced search and filters
- 📅 Calendar view for activities
- 💬 Comment system for activities

## 📄 License

This project is open-source and available for educational purposes.

## 👨‍💻 Author

Created for college-level cloud computing project demonstration.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

**Happy Coding! 🚀**
