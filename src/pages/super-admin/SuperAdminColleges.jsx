import React, { useEffect, useState } from 'react';
import { 
  Search, Filter, Plus, Edit, Trash2, 
  Eye, Building2, CheckCircle, Download,
  Calendar, Users, X, Globe, Phone, Mail, MapPin,
  Loader2, Settings, Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useSuperAdminStore from '../../store/useSuperAdminStore';

const SuperAdminColleges = () => {
  const {
    colleges,
    stats,
    loading,
    error,
    fetchColleges,
    clearError
  } = useSuperAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedCollege, setSelectedCollege] = useState(null);

  useEffect(() => {
    fetchColleges();
  }, [fetchColleges]);

  // Filter logic based on your specific JSON fields
  const filteredColleges = colleges.filter(college => {
    const matchesSearch = 
      college.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.code?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      college.location?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && college.isActive === true) ||
      (selectedStatus === 'inactive' && college.isActive === false);
    
    return matchesSearch && matchesStatus;
  });

  const handleDeleteCollege = async (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log('Delete logic for:', id);
    }
  };

  const handleToggleStatus = async (id, currentStatus, name) => {
    if (window.confirm(`Change status for ${name}?`)) {
      console.log('Toggle logic for:', id);
    }
  };

  // Safe JSON Parsing for operatingHours/settings
  const parseJsonData = (data) => {
    try {
      return typeof data === 'string' ? JSON.parse(data) : data;
    } catch (e) {
      return {};
    }
  };

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {loading && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="flex flex-col items-center gap-3">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
            <p className="text-sm text-gray-600 font-medium">Fetching institution data...</p>
          </div>
        </div>
      )}

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 text-red-800 rounded-lg p-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <X className="w-5 h-5" />
            <span className="text-sm font-medium">{error}</span>
          </div>
          <button onClick={clearError} className="p-1 hover:bg-red-100 rounded-full"><X className="w-4 h-4" /></button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Management</h1>
          <p className="text-sm text-gray-500">Manage colleges and assigned managers</p>
        </div>
        <div className="flex gap-3">
          <Link to="/super-admin/colleges/new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium">
            <Plus className="w-4 h-4" /> Add College
          </Link>
          
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard title="Total Institutions" value={colleges.length} icon={<Building2 className="w-5 h-5 text-blue-600" />} />
        <StatCard title="Active Status" value={colleges.filter(c => c.isActive).length} icon={<CheckCircle className="w-5 h-5 text-green-600" />} />
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search by name, code or location..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
       <div>
         <select 
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white"
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active Only</option>
          <option value="inactive">Inactive Only</option>
        </select>
       </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-500 font-semibold uppercase">
            <tr>
              <th className="px-6 py-4">Institution</th>
              <th className="px-6 py-4">Location</th>
              <th className="px-6 py-4">Manager</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredColleges.map((college) => (
              <tr key={college.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-bold text-gray-900">{college.name}</div>
                  <div className="text-[11px] text-blue-600 font-mono font-bold uppercase">{college.code}</div>
                </td>
                <td className="px-6 py-4 text-gray-600 font-medium">
                  {college.location}
                </td>
                <td className="px-6 py-4">
                  {college.manager ? (
                    <div>
                      <div className="font-medium text-gray-900">{`${college.manager.firstName} ${college.manager.lastName}`}</div>
                      <div className="text-xs text-gray-500">{college.manager.email}</div>
                    </div>
                  ) : <span className="text-gray-400 italic">Unassigned</span>}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${
                    college.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {college.isActive ? 'active' : 'inactive'}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-end gap-2">
                    <button onClick={() => setSelectedCollege(college)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100"><Eye className="w-4 h-4" /></button>
                    <Link to={`/super-admin/colleges/${college.id}/edit`} className="p-2 bg-green-50 text-green-600 rounded-lg hover:bg-green-100"><Edit className="w-4 h-4" /></Link>
                    <button onClick={() => handleDeleteCollege(college.id, college.name)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"><Trash2 className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Detail Modal */}
      {selectedCollege && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedCollege.name}</h3>
                <p className="text-sm text-blue-600 font-bold">{selectedCollege.code} | {selectedCollege.timezone}</p>
              </div>
              <button onClick={() => setSelectedCollege(null)} className="p-2 hover:bg-gray-100 rounded-full"><X className="w-6 h-6" /></button>
            </div>
            
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <DetailBox label="Contact Info" icon={<Phone className="w-4 h-4" />}>
                <p className="text-gray-700">{selectedCollege.phone || 'No phone'}</p>
                <p className="text-gray-700">{selectedCollege.email || 'No email'}</p>
                <p className="text-gray-700">{selectedCollege.website || 'No website'}</p>
              </DetailBox>

              <DetailBox label="Assigned Manager" icon={<Users className="w-4 h-4" />}>
                <p className="font-bold text-gray-900">
                  {selectedCollege.manager ? `${selectedCollege.manager.firstName} ${selectedCollege.manager.lastName}` : 'N/A'}
                </p>
                <p className="text-sm text-gray-500">{selectedCollege.manager?.phone}</p>
              </DetailBox>

              <div className="md:col-span-2 bg-gray-50 p-4 rounded-xl">
                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-3">
                  <Settings className="w-3.5 h-3.5" /> Appointment Settings
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(parseJsonData(selectedCollege.settings)).map(([key, val]) => (
                    <div key={key}>
                      <p className="text-[10px] text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                      <p className="text-sm font-bold">{String(val)}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="md:col-span-2">
                <h4 className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase mb-3">
                  <Clock className="w-3.5 h-3.5" /> Weekly Schedule
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2">
                  {Object.entries(parseJsonData(selectedCollege.operatingHours)).map(([day, hours]) => (
                    <div key={day} className="bg-white border rounded-lg p-2 text-center">
                      <p className="text-[10px] font-bold uppercase text-gray-400">{day.substring(0,3)}</p>
                      <p className="text-[11px] font-semibold">
                        {hours.open ? `${hours.open}-${hours.close}` : 'Closed'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="p-6 border-t bg-gray-50 flex justify-between items-center">
              <span className="text-xs text-gray-400">
                Created by {selectedCollege.creator?.firstName} on {new Date(selectedCollege.createdAt).toLocaleDateString()}
              </span>
              <button 
                onClick={() => setSelectedCollege(null)} 
                className="px-6 py-2 bg-gray-900 text-white rounded-lg font-bold text-sm"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* Reusable Helper Components */
const StatCard = ({ title, value, icon }) => (
  <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
    <div>
      <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{title}</p>
      <p className="text-2xl font-black text-gray-900 mt-1">{value}</p>
    </div>
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
  </div>
);

const DetailBox = ({ label, icon, children }) => (
  <div className="space-y-2">
    <label className="text-[10px] text-gray-400 uppercase font-black flex items-center gap-1.5">
      {icon} {label}
    </label>
    <div className="text-sm">{children}</div>
  </div>
);

export default SuperAdminColleges;