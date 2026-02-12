# API Quick Reference

## Base URL
```
Development: http://localhost:5000/api
Production: https://your-backend-url.com/api
```

## Authentication Required
All endpoints except `/auth/register` and `/auth/login` require JWT token in header:
```
Authorization: Bearer <your_jwt_token>
```

## Quick Start Examples

### 1. Register & Login

**Register Student:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "rollNumber": "CS2021001",
    "password": "password123",
    "role": "student",
    "department": "Computer Science",
    "year": 2
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 2. Activity Management (Teacher)

**Create Activity:**
```bash
curl -X POST http://localhost:5000/api/activities \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Python Workshop",
    "description": "Introduction to Python programming",
    "clubName": "Coding Club",
    "date": "2026-03-15",
    "startTime": "14:00",
    "endTime": "16:00",
    "location": "Lab 101"
  }'
```

**Open Attendance:**
```bash
curl -X PUT http://localhost:5000/api/activities/ACTIVITY_ID/attendance/open \
  -H "Authorization: Bearer YOUR_TOKEN"
```

### 3. Mark Attendance (Student)

```bash
curl -X POST http://localhost:5000/api/attendance/mark \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "activityId": "ACTIVITY_ID"
  }'
```

### 4. Get Reports (Teacher)

```bash
curl -X GET http://localhost:5000/api/attendance/report \
  -H "Authorization: Bearer YOUR_TOKEN"
```

## Error Responses

All errors follow this format:
```json
{
  "success": false,
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Server Error

## Rate Limiting

No rate limiting currently implemented. Consider adding for production.

## Pagination

Not currently implemented. All queries return full results.

## Data Models

### User
```javascript
{
  _id: ObjectId,
  name: String (required),
  email: String (required, unique),
  rollNumber: String (required for students, unique),
  password: String (hashed),
  role: "student" | "teacher",
  department: String,
  year: Number (1-4),
  isActive: Boolean,
  createdAt: Date,
  updatedAt: Date
}
```

### Activity
```javascript
{
  _id: ObjectId,
  title: String (required),
  description: String (required),
  clubName: String (required),
  date: Date (required),
  startTime: String (required),
  endTime: String (required),
  location: String (required),
  maxCapacity: Number,
  attendanceOpen: Boolean,
  attendanceOpenTime: Date,
  attendanceCloseTime: Date,
  createdBy: ObjectId (User),
  status: "upcoming" | "ongoing" | "completed" | "cancelled",
  createdAt: Date,
  updatedAt: Date
}
```

### Attendance
```javascript
{
  _id: ObjectId,
  studentId: ObjectId (User),
  activityId: ObjectId (Activity),
  status: "present" | "absent",
  markedAt: Date,
  remarks: String,
  createdAt: Date,
  updatedAt: Date
}
```

### Announcement
```javascript
{
  _id: ObjectId,
  title: String (required),
  content: String (required),
  priority: "low" | "medium" | "high",
  targetAudience: "all" | "students" | "specific",
  clubName: String,
  createdBy: ObjectId (User),
  isActive: Boolean,
  expiryDate: Date,
  createdAt: Date,
  updatedAt: Date
}
```
