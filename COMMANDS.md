# ⚡ Quick Commands Reference

## 📦 Installation Commands

### Initial Setup (Run Once)

**Backend:**
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\backend
npm install
copy .env.example .env
# Edit .env with your MongoDB URI
```

**Frontend:**
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
npm install
copy .env.example .env
# Verify VITE_API_URL points to http://localhost:5000/api
```

---

## 🚀 Development Commands

### Start Backend Server
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\backend
npm run dev
```
Expected output:
```
✅ MongoDB Atlas Connected: cluster0.xxxxx.mongodb.net
🚀 Server running on port 5000 in development mode
```

### Start Frontend Server (New Terminal)
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
npm run dev
```
Expected output:
```
VITE v5.0.8  ready in 1234 ms
➜  Local:   http://localhost:5173/
```

---

## 🔧 Testing Commands

### Test Backend Health
```bash
curl http://localhost:5000/api/health
```

### Test Registration
```bash
curl -X POST http://localhost:5000/api/auth/register ^
  -H "Content-Type: application/json" ^
  -d "{\"name\":\"Test User\",\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"student\",\"rollNumber\":\"TEST001\"}"
```

### Test Login
```bash
curl -X POST http://localhost:5000/api/auth/login ^
  -H "Content-Type: application/json" ^
  -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
```

---

## 🏗️ Build Commands

### Build Frontend for Production
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
npm run build
```
Output folder: `frontend/dist/`

### Preview Production Build
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
npm run preview
```

---

## 🧹 Maintenance Commands

### Clean Install (If Issues)

**Backend:**
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\backend
rmdir /s /q node_modules
del package-lock.json
npm install
```

**Frontend:**
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
rmdir /s /q node_modules
del package-lock.json
npm install
```

### Update Dependencies
```bash
# Check outdated packages
npm outdated

# Update all packages
npm update

# Update specific package
npm update <package-name>
```

---

## 📊 MongoDB Commands

### View Database (VS Code MongoDB Extension)
1. Install "MongoDB for VS Code" extension
2. Click MongoDB icon in sidebar
3. Add connection: Paste your MongoDB URI
4. Browse collections

### MongoDB Shell Commands
```bash
# Connect to MongoDB Atlas
mongosh "mongodb+srv://cluster0.xxxxx.mongodb.net/clubattendance" --username <username>

# Show collections
show collections

# Find all users
db.users.find().pretty()

# Find all activities
db.activities.find().pretty()

# Count attendance records
db.attendances.countDocuments()

# Drop database (careful!)
db.dropDatabase()
```

---

## 🔍 Debugging Commands

### View Backend Logs
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\backend
npm run dev
# Logs appear in this terminal
```

### Check What's Using Port 5000
```bash
# Windows
netstat -ano | findstr :5000

# Mac/Linux
lsof -i :5000
```

### Kill Process on Port 5000
```bash
# Windows (replace PID with actual process ID)
taskkill /PID <PID> /F

# Mac/Linux
kill -9 <PID>
```

---

## 🌐 Network Commands

### Find Your Local IP
```bash
# Windows
ipconfig

# Mac/Linux
ifconfig
```

### Test API from Another Device
```
# Access from phone/tablet on same network
http://<your-local-ip>:5173
```

---

## 📝 Git Commands (Version Control)

### Initialize Git Repository
```bash
cd c:\Users\HP\OneDrive\Desktop\cod
git init
git add .
git commit -m "Initial commit: Complete club attendance system"
```

### Create GitHub Repository
```bash
# After creating repo on GitHub
git remote add origin https://github.com/yourusername/club-attendance.git
git branch -M main
git push -u origin main
```

### Common Git Commands
```bash
# Check status
git status

# Add changes
git add .

# Commit changes
git commit -m "Your message here"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main
```

---

## 🚀 Deployment Commands

### Deploy Backend to Render
```bash
# Push code to GitHub first
git add .
git commit -m "Prepare for deployment"
git push

# Then follow Render dashboard:
# 1. Connect GitHub repo
# 2. Select backend folder
# 3. Add environment variables
# 4. Deploy
```

### Deploy Frontend to Vercel
```bash
# Install Vercel CLI (optional)
npm install -g vercel

# Deploy from command line
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
vercel

# Or use Vercel dashboard:
# 1. Import GitHub repo
# 2. Select frontend folder
# 3. Add environment variables
# 4. Deploy
```

---

## 📦 Package Management

### View Installed Packages
```bash
npm list --depth=0
```

### Install Specific Version
```bash
npm install <package-name>@<version>
```

### Uninstall Package
```bash
npm uninstall <package-name>
```

### Update Package.json
```bash
npm install <package-name> --save
npm install <package-name> --save-dev
```

---

## 🔐 Environment Variables

### Backend .env Template
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb+srv://<user>:<pass>@cluster.mongodb.net/clubattendance?retryWrites=true&w=majority
JWT_SECRET=your-super-secret-key-min-32-chars
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### Frontend .env Template
```env
VITE_API_URL=http://localhost:5000/api
```

### Production Environment Variables
```env
# Backend
NODE_ENV=production
MONGODB_URI=<your-atlas-uri>
JWT_SECRET=<strong-production-secret>
CORS_ORIGIN=https://your-app.vercel.app

# Frontend
VITE_API_URL=https://your-api.onrender.com/api
```

---

## 🎯 Quick Testing Script

Create `test-api.bat` (Windows) or `test-api.sh` (Mac/Linux):

```bash
@echo off
echo Testing API endpoints...
echo.

echo 1. Health Check
curl http://localhost:5000/api/health
echo.
echo.

echo 2. Register User
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d "{\"name\":\"Test\",\"email\":\"test@test.com\",\"password\":\"test123\",\"role\":\"student\",\"rollNumber\":\"TEST001\"}"
echo.
echo.

echo 3. Login
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d "{\"email\":\"test@test.com\",\"password\":\"test123\"}"
echo.
echo.

pause
```

Run: `test-api.bat`

---

## 📊 Monitoring Commands

### Check Backend Status
```bash
curl http://localhost:5000/api/health
```

### Monitor Logs in Real-time
```bash
# Backend
cd backend
npm run dev

# Frontend (in new terminal)
cd frontend
npm run dev
```

### Check MongoDB Connection
```javascript
// In backend, add to server.js temporarily
mongoose.connection.on('connected', () => {
  console.log('✅ Mongoose connected to DB');
});

mongoose.connection.on('error', (err) => {
  console.log('❌ Mongoose connection error:', err);
});
```

---

## 🆘 Emergency Commands

### Force Stop All Node Processes
```bash
# Windows
taskkill /F /IM node.exe

# Mac/Linux
killall node
```

### Clear npm Cache
```bash
npm cache clean --force
```

### Reset Everything
```bash
# Delete node_modules and reinstall
cd backend
rmdir /s /q node_modules
npm install

cd ../frontend
rmdir /s /q node_modules
npm install
```

---

## 📚 Documentation Commands

### Generate API Documentation (Optional)
```bash
# Install Swagger/OpenAPI tools
npm install swagger-ui-express swagger-jsdoc

# Add to server.js
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
```

### View This Documentation
```bash
# Open in browser
start README.md
start SETUP_GUIDE.md
start API_REFERENCE.md
```

---

## ⚙️ VS Code Commands

### Open Project in VS Code
```bash
cd c:\Users\HP\OneDrive\Desktop\cod
code .
```

### Open Backend Folder
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\backend
code .
```

### Open Frontend Folder
```bash
cd c:\Users\HP\OneDrive\Desktop\cod\frontend
code .
```

---

## 🎓 Learning Commands

### Explore Code Structure
```bash
# View file tree
tree /F

# Count lines of code
# PowerShell:
(Get-ChildItem -Recurse -Include *.js,*.jsx | Select-String .).Count
```

### Read Documentation
```bash
# View package documentation
npm docs <package-name>

# View package repository
npm repo <package-name>
```

---

## 💡 Pro Tips

### Run Both Servers with One Command
Create `start-all.bat`:
```batch
@echo off
start cmd /k "cd backend && npm run dev"
start cmd /k "cd frontend && npm run dev"
start http://localhost:5173
```

### Auto-Open Browser
Add to `frontend/package.json`:
```json
"scripts": {
  "dev": "vite --open"
}
```

### Environment-specific Runs
```bash
# Development
npm run dev

# Production
NODE_ENV=production npm start
```

---

## 📞 Support Commands

### Check Node/npm Versions
```bash
node --version
npm --version
```

### System Information
```bash
# Windows
systeminfo

# Mac/Linux
uname -a
```

### Network Diagnostics
```bash
# Test internet connection
ping google.com

# Test local server
ping localhost

# Check DNS
nslookup mongodb.com
```

---

**🎯 Most Used Commands:**

```bash
# Backend
cd backend && npm run dev

# Frontend (new terminal)
cd frontend && npm run dev

# Open browser
http://localhost:5173

# Stop servers
Ctrl + C (in each terminal)
```

---

Save this file for quick reference! 🚀
