/**
 * Announcements Page
 * View all announcements
 */

import { useState, useEffect } from 'react';
import { announcementAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';

const Announcements = () => {
  const { user } = useAuth();
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    priority: 'medium',
    targetAudience: 'all',
    clubName: '',
    expiryDate: '',
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await announcementAPI.getAll();
      setAnnouncements(response.data.data.announcements);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching announcements:', error);
      setLoading(false);
    }
  };

  const handleCreateAnnouncement = async (e) => {
    e.preventDefault();
    try {
      await announcementAPI.create(formData);
      setShowCreateModal(false);
      setFormData({
        title: '',
        content: '',
        priority: 'medium',
        targetAudience: 'all',
        clubName: '',
        expiryDate: '',
      });
      fetchAnnouncements();
      alert('Announcement created successfully!');
    } catch (error) {
      console.error('Error creating announcement:', error);
      alert('Failed to create announcement');
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (!window.confirm('Are you sure you want to delete this announcement?')) return;
    
    try {
      await announcementAPI.delete(id);
      fetchAnnouncements();
      alert('Announcement deleted successfully!');
    } catch (error) {
      console.error('Error deleting announcement:', error);
      alert('Failed to delete announcement');
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
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📢 Announcements</h1>
              <p className="mt-2 text-gray-600">
                Stay updated with club announcements
              </p>
            </div>
            {user?.role === 'teacher' && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="btn btn-primary"
              >
                + Create Announcement
              </button>
            )}
          </div>

          {/* Announcements List */}
          {announcements.length === 0 ? (
            <div className="card text-center py-12">
              <p className="text-gray-500 text-lg">No announcements yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {announcements.map((announcement) => (
                <div key={announcement._id} className="card hover:shadow-lg transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-bold text-gray-900">
                          {announcement.title}
                        </h3>
                        <span className={`badge ${
                          announcement.priority === 'high' ? 'badge-danger' :
                          announcement.priority === 'medium' ? 'badge-warning' :
                          'badge-info'
                        }`}>
                          {announcement.priority} priority
                        </span>
                      </div>
                      
                      {announcement.clubName && (
                        <p className="text-sm text-primary-600 font-medium mb-2">
                          {announcement.clubName}
                        </p>
                      )}
                      
                      <p className="text-gray-700 whitespace-pre-line">
                        {announcement.content}
                      </p>
                      
                      <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                        <span>👤 {announcement.createdBy?.name || 'Unknown'}</span>
                        <span>📅 {new Date(announcement.createdAt).toLocaleDateString()}</span>
                        {announcement.expiryDate && (
                          <span>⏰ Expires: {new Date(announcement.expiryDate).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                    
                    {user?.role === 'teacher' && announcement.createdBy?._id === user.id && (
                      <button
                        onClick={() => handleDeleteAnnouncement(announcement._id)}
                        className="btn btn-danger ml-4"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Announcement Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Create Announcement</h2>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              
              <form onSubmit={handleCreateAnnouncement} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Title</label>
                  <input
                    type="text"
                    required
                    className="input mt-1"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Content</label>
                  <textarea
                    required
                    rows="5"
                    className="input mt-1"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Priority</label>
                    <select
                      className="input mt-1"
                      value={formData.priority}
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Target Audience</label>
                    <select
                      className="input mt-1"
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({ ...formData, targetAudience: e.target.value })}
                    >
                      <option value="all">All</option>
                      <option value="students">Students</option>
                      <option value="specific">Specific</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Club Name (Optional)</label>
                  <input
                    type="text"
                    className="input mt-1"
                    value={formData.clubName}
                    onChange={(e) => setFormData({ ...formData, clubName: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Expiry Date (Optional)</label>
                  <input
                    type="date"
                    className="input mt-1"
                    value={formData.expiryDate}
                    onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <button type="submit" className="btn btn-primary flex-1">
                    Post Announcement
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

export default Announcements;
