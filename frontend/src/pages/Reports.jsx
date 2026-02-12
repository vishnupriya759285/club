/**
 * Reports Page (Teacher Only)
 * View attendance reports and statistics
 */

import { useState, useEffect } from 'react';
import { attendanceAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Reports = () => {
  const [report, setReport] = useState([]);
  const [summary, setSummary] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReport();
  }, []);

  const fetchReport = async () => {
    try {
      setLoading(true);
      const response = await attendanceAPI.getReport();
      setReport(response.data.data.report);
      setSummary(response.data.data.summary);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching report:', error);
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
            <h1 className="text-3xl font-bold text-gray-900">📊 Attendance Reports</h1>
            <p className="mt-2 text-gray-600">
              Comprehensive attendance analytics and student performance
            </p>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="card">
              <p className="text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-4xl font-bold text-gray-900 mt-2">
                {summary.totalStudents || 0}
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-medium text-gray-600">Total Activities</p>
              <p className="text-4xl font-bold text-primary-600 mt-2">
                {summary.totalActivities || 0}
              </p>
            </div>

            <div className="card">
              <p className="text-sm font-medium text-gray-600">Total Attendance Records</p>
              <p className="text-4xl font-bold text-green-600 mt-2">
                {summary.totalAttendanceRecords || 0}
              </p>
            </div>
          </div>

          {/* Detailed Report Table */}
          <div className="card">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              Student-wise Attendance Report
            </h2>

            {report.length === 0 ? (
              <p className="text-gray-500 text-center py-8">
                No attendance data available
              </p>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Roll Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Total Activities
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Attended
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Percentage
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {report.map((record, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {record.student.name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {record.student.rollNumber}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-600">
                            {record.student.email}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {record.totalActivities}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-green-600 font-medium">
                            {record.attended}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <span className={`badge ${
                              record.percentage >= 75 ? 'badge-success' :
                              record.percentage >= 50 ? 'badge-warning' :
                              'badge-danger'
                            }`}>
                              {record.percentage}%
                            </span>
                          </div>
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

export default Reports;
