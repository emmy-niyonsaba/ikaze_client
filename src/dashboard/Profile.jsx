import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { FiUser, FiMail, FiPhone, FiEdit2, FiSave, FiX, FiShield, FiBriefcase } from 'react-icons/fi';

const Profile = () => {
  const { user, updateProfile, isLoading } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error('Update failed:', error);
    }
  };

  if (!user) return (
    <div className="flex items-center justify-center h-96 text-gray-500">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rptumba mr-3"></div>
      Loading profile...
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-gray-500 text-sm">Update your personal account details</p>
        </div>
        <button
          onClick={() => isEditing ? setIsEditing(false) : setIsEditing(true)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isEditing ? 'bg-gray-100 text-gray-600' : 'bg-rptumba text-white'
          }`}
        >
          {isEditing ? <><FiX className="mr-2" /> Cancel</> : <><FiEdit2 className="mr-2" /> Edit Profile</>}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Card: Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 text-center">
            <div className="w-24 h-24 bg-rptumba text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold mb-4">
              {user.firstName?.[0]}{user.lastName?.[0]}
            </div>
            <h2 className="text-xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
            <p className="text-gray-500 text-sm mb-4">{user.email}</p>
            <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full uppercase">
              {user.role}
            </span>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-sm font-bold text-gray-900 mb-4 flex items-center">
              <FiShield className="mr-2 text-rptumba" /> Account Details
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Status</span>
                <span className="font-medium text-green-600">{user.isActive ? 'Active' : 'Inactive'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Joined</span>
                <span className="font-medium">{new Date(user.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { label: 'First Name', key: 'firstName', icon: <FiUser />, type: 'text' },
                { label: 'Last Name', key: 'lastName', icon: <FiUser />, type: 'text' },
                { label: 'Email Address', key: 'email', icon: <FiMail />, type: 'email' },
                { label: 'Phone Number', key: 'phone', icon: <FiPhone />, type: 'tel' }
              ].map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-2 flex items-center">
                    <span className="mr-2">{field.icon}</span> {field.label}
                  </label>
                  {isEditing ? (
                    <input
                      type={field.type}
                      value={formData[field.key]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rptumba/20 focus:border-rptumba outline-none transition-all"
                      required
                    />
                  ) : (
                    <div className="px-4 py-2 bg-gray-50 border border-transparent rounded-lg text-gray-900">
                      {user[field.key] || 'Not provided'}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {isEditing && (
              <div className="mt-8 pt-6 border-t border-gray-100">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full md:w-auto px-8 py-3 bg-rptumba text-white font-bold rounded-lg shadow-lg shadow-rptumba/20 hover:bg-opacity-90 disabled:opacity-50 transition-all flex items-center justify-center"
                >
                  {isLoading ? 'Saving...' : <><FiSave className="mr-2" /> Save Changes</>}
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;