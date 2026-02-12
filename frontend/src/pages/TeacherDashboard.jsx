/**
 * Teacher Dashboard
 * Main dashboard view for teachers with activity management
 */

import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { activityAPI, attendanceAPI } from '../services/api';
import Navbar from '../components/Navbar';

const TeacherDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalActivities: 0,
    upcomingActivities: 0,
    completedActivities: 0,
  });
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    clubName: '',
    date: '',
    startTime: '',
    endTime: '',
    location: '',
    maxCapacity: '',
  });

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      const activitiesRes = await activityAPI.getAll();
      const allActivities = activitiesRes.data.data.activities;
      
      setActivities(allActivities);
      setStats({
        totalActivities: allActivities.length,
        upcomingActivities: allActivities.filter(a => a.status === 'upcoming').length,
        completedActivities: allActivities.filter(a => a.status === 'completed').length,
      });

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      await activityAPI.create(formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        description: '',
        clubName: '',
        date: '',
        startTime: '',
        endTime: '',
        location: '',
        maxCapacity: '',
      });
      fetchDashboardData();
      alert('Activity created successfully!');
    } catch (error) {
      console.error('Error creating activity:', error);
      alert(error.response?.data?.message || 'Failed to create activity');
    }
  };

  const handleToggleAttendance = async (activityId, isOpen) => {
    try {
      if (isOpen) {
        await activityAPI.closeAttendance(activityId);
      } else {
        await activityAPI.openAttendance(activityId);
      }
      fetchDashboardData();
      alert(`Attendance ${isOpen ? 'closed' : 'opened'} successfully!`);
    } catch (error) {
      console.error('Error toggling attendance:', error);
      alert('Failed to toggle attendance');
    }
  };

  const handleDeleteActivity = async (activityId) => {
    if (!window.confirm('Are you sure you want to delete this activity?')) return;
    
    try {
      await activityAPI.delete(activityId);
      fetchDashboardData();
      alert('Activity deleted successfully!');
    } catch (error) {
      console.error('Error deleting activity:', error);
      alert('Failed to delete activity');
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Teacher Dashboard 👨‍🏫
              </h1>
              <p className="mt-2 text-gray-600">
                Manage your club activities and track attendance
              </p>
            </div>
            <button
              onClick={() => setShowCreateModal(true)}
              className="btn btn-primary"
            >
              + Create Activity
            </button>
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
                <div className="text-4xl">📚</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Upcoming</p>
                  <p className="text-3xl font-bold text-blue-600 mt-2">
                    {stats.upcomingActivities}
                  </p>
                </div>
                <div className="text-4xl">🔔</div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600 mt-2">
                    {stats.completedActivities}
                  </p>
                </div>
                <div className="text-4xl">✅</div>
              </div>
            </div>
          </div>

          {/* Activities List */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              📋 All Activities
            </h2>
            
            {activities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No activities created yet. Click "Create Activity" to get started!
              </p>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold text-gray-900 text-lg">{activity.title}</h3>
                          <span className={`badge ${
                            activity.status === 'upcoming' ? 'badge-info' :
                            activity.status === 'completed' ? 'badge-success' :
                            'badge-warning'
                          }`}>
                            {activity.status}
                          </span>
                          {activity.attendanceOpen && (
                            <span className="badge badge-success">Attendance Open</span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{activity.clubName}</p>
                        <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-gray-500">
                          <span>📅 {new Date(activity.date).toLocaleDateString()}</span>
                          <span>🕒 {activity.startTime} - {activity.endTime}</span>
                          <span>📍 {activity.location}</span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2 ml-4">
                        <button
                          onClick={() => handleToggleAttendance(activity._id, activity.attendanceOpen)}
                          className={`btn ${activity.attendanceOpen ? 'btn-danger' : 'btn-primary'} text-sm`}
                        >
                          {activity.attendanceOpen ? 'Close' : 'Open'} Attendance
                        </button>
                        <button
                          onClick={() => handleDeleteActivity(activity._id)}
                          className="btn btn-danger text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Create Activity Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Create New Activity</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleCreateActivity} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Activity Title</label>
                  <input
                    type="text"
                    required
                    className="input mt-1"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    required
                    rows="3"
                    className="input mt-1"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Club Name</label>
                  <input
                    type="text"
                    required
                    className="input mt-1"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Date</label>
                    <input
                      type="date"
                      required
                      className="input mt-1"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Location</label>
                    <input
                      type="text"
                      required
                      className="input mt-1"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Start Time</label>
                    <input
                      type="time"
                      required
                      className="input mt-1"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">End Time</label>
                    <input
                      type="time"
                      required
                      className="input mt-1"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Max Capacity (Optional)</label>
                  <input
                    type="number"
                    className="input mt-1"
                    value={formData.maxCapacity}
                    onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Create Activity
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TeacherDashboard;
