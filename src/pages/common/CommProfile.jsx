import React, { useState, Fragment, useEffect } from 'react';
import { Tab } from '@headlessui/react';
import { 
  User, Mail, Phone, Shield, Calendar, MapPin, 
  Edit, Save, X, Camera, Lock, Globe,
  Briefcase, Building2, CheckCircle, Clock, Key,
  Shield as ShieldIcon, Loader2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore'; 

const CommProfile = () => {
  const { user, isLoading, updateProfile, changePassword, error, success, clearMessages } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  
  console.log(user)
  // Local state for forms
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Sync local form with store user when editing starts or user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || 'Kigali, Rwanda'
      });
    }
  }, [user, isEditing]);

  // Auto-clear messages after 5 seconds
  useEffect(() => {
    if (error || success) {
      const timer = setTimeout(() => clearMessages(), 5000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  const handleSaveProfile = async () => {
    try {
      await updateProfile(formData);
      setIsEditing(false);
    } catch (err) {
      // Error handled by store
    }
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return alert("New passwords do not match");
    }
    try {
      await changePassword(passwordData.currentPassword, passwordData.newPassword);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (err) {
      // Error handled by store
    }
  };

  if (!user) return <div className="p-10 text-center">Loading Profile...</div>;

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Notifications */}
      {success && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <CheckCircle className="w-5 h-5" /> {success}
        </div>
      )}
      {error && (
        <div className="fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-in fade-in slide-in-from-top-4">
          <X className="w-5 h-5" /> {error}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Profile</h1>
          <p className="text-sm text-gray-500">Manage your personal information and security</p>
        </div>
        
        <div className="flex gap-3">
          {isEditing ? (
            <>
              <button onClick={() => setIsEditing(false)} className="px-4 py-2 border border-gray-300 bg-white rounded-lg hover:bg-gray-50 flex items-center gap-2 text-sm font-medium transition-colors">
                <X className="w-4 h-4" /> Cancel
              </button>
              <button onClick={handleSaveProfile} disabled={isLoading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2 text-sm font-medium transition-colors shadow-sm disabled:opacity-50">
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />} Save Changes
              </button>
            </>
          ) : (
            <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
              <Edit className="w-4 h-4" /> Edit Profile
            </button>
          )}
        </div>
      </div>

      <Tab.Group>
        <Tab.List className="flex space-x-8 border-b border-gray-200">
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm outline-none transition-colors ${selected ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <User className="w-4 h-4" /> Personal Information
              </button>
            )}
          </Tab>
          <Tab as={Fragment}>
            {({ selected }) => (
              <button className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm outline-none transition-colors ${selected ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
                <Lock className="w-4 h-4" /> Security
              </button>
            )}
          </Tab>
        </Tab.List>

        <Tab.Panels className="mt-6">
          <Tab.Panel className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-2">
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start gap-8">
                <div className="relative group">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                    {user.firstName?.charAt(0)}{user.lastName?.charAt(0)}
                  </div>
                  {isEditing && (
                    <button className="absolute -bottom-2 -right-2 bg-white p-2.5 rounded-xl shadow-xl hover:bg-gray-50 border border-gray-100">
                      <Camera className="w-4 h-4 text-blue-600" />
                    </button>
                  )}
                </div>

                <div className="flex-1 space-y-6 w-full">
                  <div className="flex flex-wrap items-center gap-3">
                    {isEditing ? (
                      <div className="flex gap-3 w-full md:w-auto">
                        <input type="text" value={formData.firstName} onChange={(e) => setFormData({...formData, firstName: e.target.value})} className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold w-full" placeholder="First Name" />
                        <input type="text" value={formData.lastName} onChange={(e) => setFormData({...formData, lastName: e.target.value})} className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none font-semibold w-full" placeholder="Last Name" />
                      </div>
                    ) : (
                      <h2 className="text-3xl font-bold text-gray-900">{user.firstName} {user.lastName}</h2>
                    )}
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-[11px] font-black uppercase tracking-wider rounded-lg">
                      {user.role?.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <EditableField isEditing={isEditing} icon={<Mail />} label="Email Address" value={isEditing ? formData.email : user.email} onChange={(val) => setFormData({...formData, email: val})} />
                    <EditableField isEditing={isEditing} icon={<Phone />} label="Phone Number" value={isEditing ? formData.phone : user.phone} onChange={(val) => setFormData({...formData, phone: val})} />
                    <EditableField isEditing={isEditing} icon={<MapPin />} label="Location" value={isEditing ? formData.location : formData.location} onChange={(val) => setFormData({...formData, location: val})} />
                    
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl">
                      <Calendar className="w-5 h-5 text-gray-400" />
                      <div>
                        <p className="text-[10px] uppercase font-bold text-gray-400">Account Status</p>
                        <p className="text-gray-700 font-medium">{user.isActive ? 'Active' : 'Inactive'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
                <InfoBox icon={<Briefcase className="text-blue-600" />} title="Primary Role" value={user.role} color="bg-blue-50 border-blue-100" />
                <InfoBox icon={<Building2 className="text-green-600" />} title="Member Since" value={new Date(user.createdAt).toLocaleDateString()} color="bg-green-50 border-green-100" />
              </div>
            </div>
          </Tab.Panel>

          <Tab.Panel className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 animate-in fade-in slide-in-from-bottom-2">
            <form onSubmit={handlePasswordChange} className="max-w-2xl space-y-8">
              <div className="flex items-start gap-4 p-4 bg-amber-50 rounded-xl border border-amber-100">
                <ShieldIcon className="w-6 h-6 text-amber-600 shrink-0" />
                <div>
                  <h4 className="font-bold text-amber-900">Security Recommendation</h4>
                  <p className="text-sm text-amber-800 opacity-80">Use a unique password to protect your administrative access.</p>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center gap-2 text-gray-900 border-b border-gray-100 pb-2">
                  <Key className="w-5 h-5 text-gray-400" />
                  <h3 className="font-bold">Change Password</h3>
                </div>
                
                <div className="space-y-4">
                  <PasswordField 
                    label="Current Password" 
                    value={passwordData.currentPassword} 
                    onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})} 
                  />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <PasswordField 
                      label="New Password" 
                      value={passwordData.newPassword} 
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})} 
                    />
                    <PasswordField 
                      label="Confirm New Password" 
                      value={passwordData.confirmPassword} 
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})} 
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="px-6 py-2.5 bg-gray-900 text-white rounded-xl text-sm font-bold hover:bg-gray-800 transition-all shadow-md disabled:opacity-50"
                  >
                    {isLoading ? "Processing..." : "Update Password"}
                  </button>
                </div>
              </div>
            </form>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatSummary icon={<Calendar className="text-blue-500" />} label="Last Login" value={user.lastLogin ? new Date(user.lastLogin).toLocaleDateString() : 'Never'} />
        <StatSummary icon={<Globe className="text-green-500" />} label="Status" value="Online" />
        <StatSummary icon={<Shield className="text-purple-500" />} label="Security Level" value={user.role === 'SUPER_ADMIN' ? 'Full Access' : 'Restricted'} />
      </div>
    </div>
  );
};

/* Internal Helpers */
const EditableField = ({ isEditing, icon, label, value, onChange }) => (
  <div className={`flex items-center gap-3 p-3 rounded-xl transition-all ${isEditing ? 'bg-white border border-blue-100 shadow-sm' : 'bg-gray-50'}`}>
    <div className="text-gray-400">{React.cloneElement(icon, { className: 'w-5 h-5' })}</div>
    <div className="flex-1">
      <p className="text-[10px] uppercase font-bold text-gray-400 leading-none mb-1">{label}</p>
      {isEditing ? (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-transparent font-medium text-gray-900 outline-none" />
      ) : (
        <p className="text-gray-900 font-medium truncate">{value}</p>
      )}
    </div>
  </div>
);

const InfoBox = ({ icon, title, value, color }) => (
  <div className={`p-5 rounded-2xl border ${color} transition-all hover:shadow-md`}>
    <div className="flex items-center gap-3 mb-2">
      {icon}
      <h4 className="font-bold text-gray-900 text-sm tracking-tight">{title}</h4>
    </div>
    <p className="text-gray-700 font-medium">{value}</p>
  </div>
);

const PasswordField = ({ label, value, onChange }) => (
  <div className="space-y-1.5">
    <label className="text-xs font-bold text-gray-500 uppercase ml-1">{label}</label>
    <input
      type="password"
      required
      value={value}
      onChange={onChange}
      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-sm transition-all"
    />
  </div>
);

const StatSummary = ({ icon, label, value }) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-blue-200 transition-all">
    <div className="space-y-1">
      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none">{label}</p>
      <p className="text-xl font-black text-gray-900">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-xl group-hover:bg-blue-50 transition-colors">{icon}</div>
  </div>
);

export default CommProfile;