import React, { useState, useEffect } from 'react';
import { X, Save, User as UserIcon, Mail, Phone, Lock, Building2, ShieldCheck, Loader2, Eye } from 'lucide-react';
import { useUserManagementStore } from '../../store/useUserManagementStore';

const AccountFormModal = ({ isOpen, onClose, initialData = null, isViewOnly = false }) => {
  const { 
    createUserAccount, 
    departments, 
    isLoading, 
    error, 
    clearErrorSuccess 
  } = useUserManagementStore();
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'DEPARTMENT_MANAGER', 
    collegeRole: 'STAFF', 
    departmentId: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({ ...initialData, password: '',
          firstName: initialData?.user?.firstName,
          lastName:  initialData?.user?.lastName,
          email:  initialData?.user?.email,
        phone:  initialData?.user?.phone }); // Don't populate password on edit
      } else {
        setFormData({
          firstName: '', lastName: '', email: '', phone: '', password: '',
          role: 'DEPARTMENT_MANAGER', collegeRole: 'STAFF', departmentId: ''
        });
      }
      clearErrorSuccess();
    }
    console.log(initialData)
  }, [initialData, isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewOnly) return;

    try {
      await createUserAccount(formData);
      onClose();
    } catch (err) {
      // Handled by store
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-2xl rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col max-h-[95vh]">
        
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
          <div className="flex items-center gap-3">
            {isViewOnly && <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg"><Eye size={18}/></div>}
            <div>
              <h2 className="text-xl font-black text-gray-900 tracking-tight uppercase">
                {isViewOnly ? 'Account Details' : initialData ? 'Edit Account' : 'Create Staff Account'}
              </h2>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">Access Control & Identity</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-6">
          {error && !isViewOnly && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold uppercase tracking-tight">
              {error}
            </div>
          )}

          <fieldset disabled={isViewOnly} className="space-y-6 contents">
            {/* 1. System Role & Department */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">System Role</label>
                <select 
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="DEPARTMENT_MANAGER">Department Manager</option>
                  <option value="SECURITY_MANAGER">Security Manager</option>
                  <option value="SECURITY">Security Staff</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Choose Department</label>
                <select 
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                  value={formData.departmentId}
                  onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                >
                  <option value="">Select Unit...</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* 2. Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">First Name</label>
                <input 
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Last Name</label>
                <input 
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                />
              </div>
            </div>

            {/* 3. Contact & College Role */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Email Address</label>
                <input 
                  type="email" required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-sm"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">College Role</label>
                <select 
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                  value={formData.collegeRole}
                  onChange={(e) => setFormData({...formData, collegeRole: e.target.value})}
                >
                  <option value="STAFF">Staff</option>
                  <option value="SECURITY">Security Manager</option>
                  <option value="STUDENT">Student</option>
                  <option value="VISITOR">Visitor</option>
                </select>
              </div>
            </div>

            {/* 4. Phone & Password */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Phone Number</label>
                <input 
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-sm"
                  value={formData.phone}
                  onChange={(e) => setFormData({...formData, phone: e.target.value})}
                />
              </div>
              {!initialData && (
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Password</label>
                  <input 
                    type="password" required
                    className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>
              )}
            </div>
          </fieldset>
        </form>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/80 flex gap-4">
          <button type="button" onClick={onClose} className="flex-1 py-4 px-6 border border-gray-200 text-gray-500 rounded-2xl font-black text-xs uppercase hover:bg-white transition-all">
            {isViewOnly ? 'Close' : 'Cancel'}
          </button>
          {!isViewOnly && (
            <button 
              type="submit" 
              onClick={handleSubmit} 
              disabled={isLoading}
              className="flex-1 py-4 px-6 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase flex items-center justify-center gap-2 shadow-lg hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
              {initialData ? 'Update Account' : 'Create Account'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default AccountFormModal;