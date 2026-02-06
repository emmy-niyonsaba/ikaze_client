import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Eye, RefreshCw, UserCheck, UserX } from 'lucide-react';
import { useUserManagementStore } from '../../store/useUserManagementStore';
import AccountFormModal from '../../components/modals/AccountFormModal';

const DepartmentManagers = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  // 1. Fetch the general 'users' array which contains everyone
  const { 
    users = [], 
    fetchUsers, 
    updateUserStatus, 
    isLoading 
  } = useUserManagementStore();

  useEffect(() => {
    fetchUsers(); // Fetches the general list of all college-related users
  }, []);

  const handleOpenCreate = () => {
    setSelectedAccount(null);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user) => {
    setSelectedAccount(user);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const handleOpenView = (user) => {
    setSelectedAccount(user);
    setIsViewOnly(true);
    setIsModalOpen(true);
  };

  
  // 2. Comprehensive Filtering
  const userList = Array.isArray(users) ? users : [];
  const filteredUsers = userList.filter(u => {
    if (!u) return false;
    
    const matchesStatus = statusFilter === 'all' || 
      (statusFilter === 'active' ? u.isActive : !u.isActive);
    
    const matchesRole = roleFilter === 'all' || u.role === roleFilter;
    
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      (u.firstName || '').toLowerCase().includes(searchLower) || 
      (u.lastName || '').toLowerCase().includes(searchLower) || 
      (u.email || '').toLowerCase().includes(searchLower) ||
      (u.department?.name || '').toLowerCase().includes(searchLower);

    return matchesStatus && matchesRole && matchesSearch;
  });
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">User Management</h1>
          <p className="text-sm text-gray-500 font-medium">Full directory of college students, staff, and management.</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={() => fetchUsers()}
            className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={handleOpenCreate}
            className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
          >
            <Plus size={18} /> New User
          </button>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="relative md:col-span-2">
          <input 
            className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm font-medium"
            placeholder="Search name, email, department..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <select 
          className="px-4 py-3.5 border border-gray-100 rounded-2xl bg-white font-bold text-gray-600 outline-none shadow-sm text-sm"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="all">All Roles</option>
          <option value="STUDENT">Students</option>
          <option value="DEPARTMENT_MANAGER">Dept Managers</option>
          <option value="SECURITY">Security</option>
        </select>

        <select 
          className="px-4 py-3.5 border border-gray-100 rounded-2xl bg-white font-bold text-gray-600 outline-none shadow-sm text-sm"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-100 rounded-[2rem] shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50/50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">User Identity</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Role / Dept</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-black text-sm uppercase">
                        {u.user.firstName?.charAt(0)}{u.lastName?.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-sm">{u.user.firstName} {u.user.lastName}</div>
                        <div className="text-[10px] text-gray-400 font-black uppercase tracking-tight">{u.user.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-bold text-gray-600">{u.role?.replace('_', ' ')}</div>
                    <div className="text-[10px] text-gray-400 font-medium uppercase">{u.department?.name || 'College Wide'}</div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest ${
                      u.isActive ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                    }`}>
                      {u.isActive ? <UserCheck size={12} /> : <UserX size={12} />}
                      {u.isActive ? 'Active' : 'Inactive'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end items-center gap-1">
                      <button onClick={() => handleOpenView(u)} className="p-2 text-gray-400 hover:text-indigo-600"><Eye size={16} /></button>
                      <button onClick={() => handleOpenEdit(u)} className="p-2 text-gray-400 hover:text-blue-600"><Edit size={16} /></button>
                      <button onClick={() => updateUserStatus(u.id, !u.isActive)} className="p-2 text-gray-400 hover:text-rose-600"><Trash2 size={16} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AccountFormModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialData={selectedAccount}
        isViewOnly={isViewOnly}
      />
    </div>
  );
};

export default DepartmentManagers;