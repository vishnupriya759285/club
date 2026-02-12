/**
 * Main App Component
 * Handles routing and application structure
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import Activities from './pages/Activities';
import MyAttendance from './pages/MyAttendance';
import Announcements from './pages/Announcements';
import Reports from './pages/Reports';

// Dashboard Router Component
const DashboardRouter = () => {
  const { user } = useAuth();
  
  if (!user) return <Navigate to="/login" replace />;
  
  return user.role === 'student' ? <StudentDashboard /> : <TeacherDashboard />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes - Both Roles */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <DashboardRouter />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/activities"
            element={
              <ProtectedRoute>
                <Activities />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/announcements"
            element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            }
          />

          {/* Student Only Routes */}
          <Route
            path="/my-attendance"
            element={
              <ProtectedRoute requiredRole="student">
                <MyAttendance />
              </ProtectedRoute>
            }
          />

          {/* Teacher Only Routes */}
          <Route
            path="/reports"
            element={
              <ProtectedRoute requiredRole="teacher">
                <Reports />
              </ProtectedRoute>
            }
          />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
