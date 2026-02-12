/**
 * Activities Page
 * View and mark attendance for activities (Student view)
 */

import { useState, useEffect } from 'react';
import { activityAPI, attendanceAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Activities = () => {
  const { user } = useAuth();
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchActivities();
  }, [filter]);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const params = filter !== 'all' ? { status: filter } : {};
      const response = await activityAPI.getAll(params);
      setActivities(response.data.data.activities);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching activities:', error);
      setLoading(false);
    }
  };

  const handleMarkAttendance = async (activityId) => {
    try {
      await attendanceAPI.mark({ activityId });
      alert('Attendance marked successfully!');
      fetchActivities();
    } catch (error) {
      console.error('Error marking attendance:', error);
      alert(error.response?.data?.message || 'Failed to mark attendance');
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Club Activities</h1>
            <p className="mt-2 text-gray-600">
              Browse all club activities and mark your attendance
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mb-6 flex gap-3">
            <button
              onClick={() => setFilter('all')}
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-secondary'}`}
            >
              All Activities
            </button>
            <button
              onClick={() => setFilter('upcoming')}
              className={`btn ${filter === 'upcoming' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`btn ${filter === 'completed' ? 'btn-primary' : 'btn-secondary'}`}
            >
              Completed
            </button>
          </div>

          {/* Activities Grid */}
          {activities.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No activities found</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activities.map((activity) => (
                <div key={activity._id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <span className={`badge ${
                      activity.status === 'upcoming' ? 'badge-info' :
                      activity.status === 'completed' ? 'badge-success' :
                      'badge-warning'
                    }`}>
                      {activity.status}
                    </span>
                    {activity.attendanceOpen && (
                      <span className="badge badge-success animate-pulse">
                        Attendance Open
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {activity.title}
                  </h3>
                  
                  <p className="text-sm text-primary-600 font-medium mb-3">
                    {activity.clubName}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {activity.description}
                  </p>

                  <div className="space-y-2 text-sm text-gray-600 mb-4">
                    <div className="flex items-center">
                      <span className="w-6">📅</span>
                      <span>{new Date(activity.date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6">🕒</span>
                      <span>{activity.startTime} - {activity.endTime}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="w-6">📍</span>
                      <span>{activity.location}</span>
                    </div>
                  </div>

                  {user?.role === 'student' && activity.attendanceOpen && (
                    <button
                      onClick={() => handleMarkAttendance(activity._id)}
                      className="btn btn-primary w-full"
                    >
                      Mark Attendance
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Activities;
