/**
 * My Attendance Page
 * Student's personal attendance records and statistics
 */

import { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MyAttendance = () => {
  const [attendance, setAttendance] = useState([]);
  const [stats, setStats] = useState({
    totalActivities: 0,
    attendedActivities: 0,
    attendancePercentage: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getMyAttendance();
      setAttendance(response.data.data.attendance);
      setStats(response.data.data.stats);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching attendance:', error);
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
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">My Attendance</h1>
            <p className="mt-2 text-gray-600">
              Track your attendance records and performance
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                {stats.totalActivities}
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-medium text-gray-600">Activities Attended</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {stats.attendedActivities}
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-medium text-gray-600">Attendance Rate</p>
              <p className="text-4xl font-bold text-primary-600 mt-2">
                {stats.attendancePercentage}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-4">
                <div
                  className="bg-primary-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${stats.attendancePercentage}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Attendance Records */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Attendance History
            </h2>

            {attendance.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No attendance records yet
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Activity
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Club
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Time
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Marked At
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendance.map((record) => (
                      <tr key={record._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {record.activityId?.title || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {record.activityId?.clubName || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {record.activityId?.date 
                              ? new Date(record.activityId.date).toLocaleDateString()
                              : 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {record.activityId?.startTime || 'N/A'} - {record.activityId?.endTime || 'N/A'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`badge ${
                            record.status === 'present' ? 'badge-success' : 'badge-danger'
                          }`}>
                            {record.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.markedAt).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MyAttendance;
