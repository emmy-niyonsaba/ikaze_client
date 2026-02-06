import React, { useState, useEffect } from 'react';
import { 
  Search, Plus, Edit, Trash2, Building2,
  Eye, Shield, CheckCircle, Mail, X, 
  Lock, Unlock, Phone, ChevronLeft, ChevronRight, Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import useSuperAdminStore from '../../store/useSuperAdminStore';

const Admins = () => {
  const { 
    managers, 
    fetchManagers, 
    loading, 
    deleteManager 
  } = useSuperAdminStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  useEffect(() => {
    fetchManagers();
  }, [fetchManagers]);

  const roles = [
    { value: 'SUPER_ADMIN', label: 'Super Admin', color: 'bg-purple-100 text-purple-700', permissions: ['Full system access', 'Create/delete colleges', 'Manage all admins'] },
    { value: 'COLLEGE_MANAGER', label: 'College Manager', color: 'bg-blue-100 text-blue-700', permissions: ['Manage assigned colleges', 'Create dept managers', 'View college reports'] },
    { value: 'DEPARTMENT_MANAGER', label: 'Dept Manager', color: 'bg-green-100 text-green-700', permissions: ['Manage appointments', 'Approve/reject requests', 'View schedules'] },
    { value: 'SECURITY_MANAGER', label: 'Security Manager', color: 'bg-yellow-100 text-yellow-700', permissions: ['Manage personnel', 'Check-in visitors', 'Post security notices'] },
  ];

  const filteredAdmins = managers.filter(admin => {
    const fullName = `${admin.firstName} ${admin.lastName}`.toLowerCase();
    const collegeName = admin.managedCollege?.name?.toLowerCase() || '';
    const matchesSearch = fullName.includes(searchQuery.toLowerCase()) || 
                          admin.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          collegeName.includes(searchQuery.toLowerCase());
    const matchesRole = selectedRole === 'all' || admin.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' ? admin.isActive : !admin.isActive);
    return matchesSearch && matchesRole && matchesStatus;
  });

  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Management</h1>
          <p className="text-gray-500 text-sm">Manage system administrators and permissions</p>
        </div>
        <div className="flex gap-3">
          <Link to="new" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2 text-sm font-medium transition-colors shadow-sm">
            <Plus className="w-4 h-4" /> Add Admin
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col lg:flex-row lg:items-center gap-4">
        <div className="flex-1 relative">
          <input
            type="text"
            placeholder="Search name, email, or college..."
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white cursor-pointer" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
            <option value="all">All Roles</option>
            {roles.map(r => <option key={r.value} value={r.value}>{r.label}</option>)}
          </select>
          <select className="px-3 py-2 border border-gray-200 rounded-lg text-sm outline-none bg-white cursor-pointer" value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
      </div>

      {/* Admins Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden relative min-h-[400px]">
        {loading && (
          <div className="absolute inset-0 bg-white/50 backdrop-blur-[1px] z-10 flex items-center justify-center">
            <Loader2 className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}
        
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-gray-500 font-semibold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4 text-xs font-bold uppercase">Admin</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Assigned College</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Role</th>
              <th className="px-6 py-4 text-xs font-bold uppercase">Status</th>
              <th className="px-6 py-4 text-right text-xs font-bold uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredAdmins.length > 0 ? (
              filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-blue-50/20 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-semibold text-gray-900">{admin.firstName} {admin.lastName}</div>
                    <div className="text-[11px] text-gray-400 font-medium">{admin.email}</div>
                  </td>
                  <td className="px-6 py-4">
                    {admin.managedCollege ? (
                      <div className="flex items-center gap-2">
                        <Building2 className="w-3.5 h-3.5 text-gray-400" />
                        <span className="font-medium text-gray-700">{admin.managedCollege.name}</span>
                        <span className="text-[10px] bg-gray-100 px-1.5 py-0.5 rounded text-gray-500">{admin.managedCollege.code}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">No college assigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${roles.find(r => r.value === admin.role)?.color || 'bg-gray-100 text-gray-700'}`}>
                      {roles.find(r => r.value === admin.role)?.label || admin.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tight ${admin.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {admin.isActive ? 'active' : 'inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => setSelectedAdmin(admin)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors border border-transparent hover:border-blue-100">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors border border-transparent hover:border-green-100">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => deleteManager(admin.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-transparent hover:border-red-100"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  {loading ? 'Fetching records...' : 'No administrators found matching your filters.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        
        {/* Pagination */}
        <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/50 flex items-center justify-between">
          <span className="text-xs text-gray-500 font-medium">Showing {filteredAdmins.length} results</span>
          <div className="flex items-center gap-1">
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 disabled:opacity-50" disabled><ChevronLeft className="w-4 h-4" /></button>
            <button className="px-3 py-1 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm">1</button>
            <button className="p-2 border border-gray-200 rounded-lg hover:bg-white text-gray-400 disabled:opacity-50" disabled><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedAdmin && (
        <div className="fixed inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full overflow-hidden shadow-2xl animate-in zoom-in duration-200">
            <div className="px-6 py-4 border-b flex justify-between items-center bg-gray-50/50">
              <div>
                <h3 className="font-bold text-gray-900 text-lg leading-tight">{selectedAdmin.firstName} {selectedAdmin.lastName}</h3>
                <p className="text-[10px] text-gray-400 uppercase font-black tracking-widest">Profile Info</p>
              </div>
              <button onClick={() => setSelectedAdmin(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <DetailItem label="Role" value={roles.find(r => r.value === selectedAdmin.role)?.label || selectedAdmin.role} icon={<Shield className="w-3 h-3" />} />
                <DetailItem label="Status" value={selectedAdmin.isActive ? 'Active' : 'Inactive'} icon={<CheckCircle className="w-3 h-3" />} />
              </div>
              
              {selectedAdmin.managedCollege && (
                <div className="p-3 bg-blue-50 border border-blue-100 rounded-lg">
                  <p className="text-[10px] text-blue-500 font-bold uppercase mb-1 flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Managed Institution
                  </p>
                  <p className="font-bold text-blue-900">{selectedAdmin.managedCollege.name}</p>
                  <p className="text-xs text-blue-700">{selectedAdmin.managedCollege.location} • {selectedAdmin.managedCollege.code}</p>
                </div>
              )}

              <div className="p-3 bg-gray-50 rounded-lg space-y-2 border border-gray-100">
                <div className="flex items-center gap-2 text-gray-600 text-xs"><Mail className="w-4 h-4 text-gray-400" /> {selectedAdmin.email}</div>
                <div className="flex items-center gap-2 text-gray-600 text-xs"><Phone className="w-4 h-4 text-gray-400" /> {selectedAdmin.phone}</div>
              </div>

              <div className="flex justify-between items-center pt-2 border-t border-gray-100">
                <div>
                  <p className="text-[10px] text-gray-400 font-bold uppercase">Joined Date</p>
                  <p className="text-gray-900 font-bold">{new Date(selectedAdmin.createdAt).toLocaleDateString()}</p>
                </div>
                <button className="text-xs font-bold text-blue-600 flex items-center gap-1.5 p-1.5 hover:bg-blue-50 rounded-lg transition-colors">
                  {selectedAdmin.isActive ? <><Lock className="w-3.5 h-3.5" /> Deactivate</> : <><Unlock className="w-3.5 h-3.5" /> Activate</>}
                </button>
              </div>
            </div>
            <div className="px-6 py-4 bg-gray-50 flex justify-end">
              <button onClick={() => setSelectedAdmin(null)} className="px-6 py-2 bg-gray-900 text-white rounded-xl text-xs font-bold hover:bg-gray-800 shadow-sm">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const DetailItem = ({ label, value, icon }) => (
  <div className="space-y-1">
    <label className="text-[10px] text-gray-400 uppercase font-black flex items-center gap-1 leading-none">{icon} {label}</label>
    <p className="text-gray-900 font-bold capitalize">{value}</p>
  </div>
);

export default Admins;