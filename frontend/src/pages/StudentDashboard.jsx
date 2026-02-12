/**
 * Student Dashboard
 * Main dashboard view for students
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { activityAPI, attendanceAPI, announcementAPI } from '../services/api';
import Navbar from '../components/Navbar';

const StudentDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalActivities: 0,
    attendedActivities: 0,
    attendancePercentage: 0,
  });
  const [recentActivities, setRecentActivities] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch attendance stats
      const attendanceRes = await attendanceAPI.getMyAttendance();
      setStats(attendanceRes.data.data.stats);

      // Fetch recent activities
      const activitiesRes = await activityAPI.getAll({ status: 'upcoming' });
      setRecentActivities(activitiesRes.data.data.activities.slice(0, 5));

      // Fetch announcements
      const announcementsRes = await announcementAPI.getAll();
      setAnnouncements(announcementsRes.data.data.announcements.slice(0, 3));

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, {user?.name}! 👋
            </h1>
            <p className="mt-2 text-gray-600">
              Here's your attendance overview and upcoming activities
            </p>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Activities</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {stats.totalActivities}
                  </p>
                </div>
                <div className="text-4xl">📅</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Activities Attended</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.attendedActivities}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
                  <p className="text-3xl font-bold text-primary-600 mt-2">
                    {stats.attendancePercentage}%
                  </p>
                </div>
                <div className="text-4xl">📊</div>
              </div>
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Upcoming Activities */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📌 Upcoming Activities
              </h2>
              
              {recentActivities.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No upcoming activities
                </p>
              ) : (
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{activity.clubName}</p>
                          <p className="text-sm text-gray-500 mt-2">
                            📅 {new Date(activity.date).toLocaleDateString()} | 
                            🕒 {activity.startTime} - {activity.endTime}
                          </p>
                          <p className="text-sm text-gray-500">
                            📍 {activity.location}
                          </p>
                        </div>
                        {activity.attendanceOpen && (
                          <span className="badge badge-success">Attendance Open</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Recent Announcements */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📢 Recent Announcements
              </h2>
              
              {announcements.length === 0 ? (
                <p className="text-gray-500 text-center py-8">
                  No announcements
                </p>
              ) : (
                <div className="space-y-4">
                  {announcements.map((announcement) => (
                    <div key={announcement._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between">
                        <h3 className="font-semibold text-gray-900">{announcement.title}</h3>
                        <span className={`badge ${
                          announcement.priority === 'high' ? 'badge-danger' :
                          announcement.priority === 'medium' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {announcement.priority}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                        {announcement.content}
                      </p>
                      <p className="text-xs text-gray-400 mt-2">
                        {new Date(announcement.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentDashboard;
