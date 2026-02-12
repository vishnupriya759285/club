/**
 * Axios API Service
 * Centralized API configuration and request handling
 */

import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // 60 seconds timeout (Render free tier can take 50s to wake up)
});

// Request interceptor - Add token to requests
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired or invalid - logout user
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API calls
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Activity API calls
export const activityAPI = {
  getAll: (params) => api.get('/activities', { params }),
  getOne: (id) => api.get(`/activities/${id}`),
  create: (data) => api.post('/activities', data),
  update: (id, data) => api.put(`/activities/${id}`, data),
  delete: (id) => api.delete(`/activities/${id}`),
  openAttendance: (id) => api.put(`/activities/${id}/attendance/open`),
  closeAttendance: (id) => api.put(`/activities/${id}/attendance/close`),
};

// Attendance API calls
export const attendanceAPI = {
  mark: (data) => api.post('/attendance/mark', data),
  getMyAttendance: () => api.get('/attendance/my-attendance'),
  getActivityAttendance: (activityId) => api.get(`/attendance/activity/${activityId}`),
  getStudentAttendance: (studentId) => api.get(`/attendance/student/${studentId}`),
  getReport: () => api.get('/attendance/report'),
};

// Announcement API calls
export const announcementAPI = {
  getAll: (params) => api.get('/announcements', { params }),
  getOne: (id) => api.get(`/announcements/${id}`),
  create: (data) => api.post('/announcements', data),
  update: (id, data) => api.put(`/announcements/${id}`, data),
  delete: (id) => api.delete(`/announcements/${id}`),
};

export default api;
