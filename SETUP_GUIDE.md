# 🚀 Quick Setup Guide

## Step-by-Step Instructions for Beginners

### 1️⃣ Install Prerequisites

**Node.js:**
- Download from [nodejs.org](https://nodejs.org/) (LTS version)
- Verify installation:
  ```bash
  node --version
  npm --version
  ```

**Git:**
- Download from [git-scm.com](https://git-scm.com/)
- Verify: `git --version`

**VS Code (Recommended):**
- Download from [code.visualstudio.com](https://code.visualstudio.com/)

### 2️⃣ MongoDB Atlas Setup (5 minutes)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Click "Try Free" and sign up
3. Create a FREE cluster (M0)
4. Create Database User:
   - Username: `clubadmin`
   - Password: (save this!) e.g., `SecurePass123`
5. Network Access: Click "Allow Access from Anywhere"
6. Get connection string:
   - Click "Connect" → "Connect your application"
   - Copy the string
   - It looks like: `mongodb+srv://clubadmin:<password>@cluster0.xxxxx.mongodb.net/`

### 3️⃣ Backend Setup

Open terminal/command prompt:

```bash
# Navigate to desktop
cd Desktop/cod/backend

# Install dependencies (this will take 2-3 minutes)
npm install

# Create .env file
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Edit `.env` file** (use Notepad or VS Code):
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://clubadmin:SecurePass123@cluster0.xxxxx.mongodb.net/clubattendance?retryWrites=true&w=majority
JWT_SECRET=my_super_secret_key_12345_change_this
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

**Start backend:**
```bash
npm run dev
```

You should see:
```
✅ MongoDB Atlas Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000 in development mode
```

**Keep this terminal open!**

### 4️⃣ Frontend Setup

Open a NEW terminal/command prompt:

```bash
# Navigate to frontend
cd Desktop/cod/frontend

# Install dependencies (2-3 minutes)
npm install

# Create .env file
# Windows:
copy .env.example .env

# Mac/Linux:
cp .env.example .env
```

**Edit `.env` file:**
```env
VITE_API_URL=http://localhost:5000/api
```

**Start frontend:**
```bash
npm run dev
```

You should see:
```
VITE v5.0.8  ready in 1234 ms

➜  Local:   http://localhost:5173/
```

**Open browser:** Go to `http://localhost:5173`

### 5️⃣ Test the Application

**Register Teacher:**
1. Click "Register here"
2. Fill form:
   - Role: Teacher
   - Name: Dr. Smith
   - Email: smith@college.edu
   - Password: teacher123
3. Click "Create Account"

**Create Activity:**
1. You'll be logged in automatically
2. Click "+ Create Activity"
3. Fill in activity details
4. Click "Create Activity"
5. Click "Open Attendance" button

**Register Student (in new incognito/private window):**
1. Go to `http://localhost:5173`
2. Click "Register here"
3. Fill form:
   - Role: Student
   - Name: Alice Johnson
   - Email: alice@student.edu
   - Roll Number: CS2021001
   - Password: student123
4. Click "Create Account"

**Mark Attendance:**
1. Go to "Activities" page
2. You'll see the activity with "Attendance Open" badge
3. Click "Mark Attendance"
4. Check "My Attendance" to see your record

**View Reports (Teacher):**
1. Switch back to teacher window
2. Go to "Reports" page
3. See student attendance statistics

### 6️⃣ Common Issues

**Backend won't start:**
- Error: "MONGODB_URI not defined"
  - Solution: Make sure `.env` file exists in backend folder
  
- Error: "Port 5000 already in use"
  - Solution: Close other applications using port 5000
  - Windows: `netstat -ano | findstr :5000`
  - Mac/Linux: `lsof -i :5000`

**Frontend can't connect:**
- Check backend is running (terminal should show "Server running")
- Verify `.env` file in frontend has correct API URL
- Open browser console (F12) to see errors

**MongoDB connection failed:**
- Check internet connection
- Verify MongoDB Atlas password (no spaces)
- Make sure IP whitelist includes 0.0.0.0/0

### 7️⃣ File Structure Quick Reference

```
cod/
├── backend/          ← Node.js API
│   ├── server.js     ← Start here to understand backend
│   ├── .env          ← Your secrets (don't share!)
│   └── package.json
│
├── frontend/         ← React UI
│   ├── src/
│   │   ├── App.jsx   ← Start here to understand frontend
│   │   └── pages/    ← All page components
│   ├── .env          ← API URL configuration
│   └── package.json
│
└── README.md         ← Full documentation
```

### 8️⃣ VS Code Extensions (Recommended)

1. ES7+ React/Redux/React-Native snippets
2. Tailwind CSS IntelliSense
3. ESLint
4. MongoDB for VS Code

Install: Click Extensions icon (Ctrl+Shift+X) and search

### 9️⃣ Useful Commands

**Stop servers:**
- Press `Ctrl + C` in terminal

**Restart servers:**
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

**Clear node_modules (if issues):**
```bash
# Delete node_modules folder
rm -rf node_modules  # Mac/Linux
rmdir /s node_modules  # Windows

# Reinstall
npm install
```

### 🔟 Next Steps

1. **Customize:**
   - Change colors in `tailwind.config.js`
   - Modify models in `backend/models/`
   - Add new features!

2. **Deploy:**
   - Follow `DEPLOYMENT.md` guide
   - Deploy backend to Render
   - Deploy frontend to Vercel

3. **Learn More:**
   - [React Documentation](https://react.dev)
   - [Express.js Guide](https://expressjs.com)
   - [MongoDB Docs](https://docs.mongodb.com)

### 📞 Getting Help

**Check logs:**
- Backend: Look at terminal running `npm run dev`
- Frontend: Press F12 in browser → Console tab
- MongoDB: Check MongoDB Atlas "Metrics" tab

**Common Error Messages:**

| Error | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check connection string in `.env` |
| "Port already in use" | Change PORT in backend `.env` |
| "Module not found" | Run `npm install` again |
| "Unauthorized" | Check JWT token, try logging in again |

### ✅ Success Checklist

- [ ] Backend running on port 5000
- [ ] Frontend running on port 5173
- [ ] MongoDB Atlas connection successful
- [ ] Can register teacher account
- [ ] Can register student account
- [ ] Teacher can create activities
- [ ] Teacher can open/close attendance
- [ ] Student can mark attendance
- [ ] Can view reports

---

**Congratulations! 🎉**

Your Club Attendance System is ready to use!

For detailed documentation, see [README.md](README.md)
