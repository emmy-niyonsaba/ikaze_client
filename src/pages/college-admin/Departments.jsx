import React, { useState, useEffect } from 'react';
import { Search, Plus, Edit, Trash2, Loader2, RefreshCw, Eye } from 'lucide-react';
import { useUserManagementStore } from '../../store/useUserManagementStore';
import DepartmentFormModal from '../../components/modals/DepartmentFormModal';

const Departments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDept, setSelectedDept] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false); // To handle "More Details" mode

  const { 
    departments, 
    fetchDepartments, 
    deleteDepartment, 
    isLoading 
  } = useUserManagementStore();

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const handleOpenCreate = () => {
    setSelectedDept(null);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (dept) => {
    setSelectedDept(dept);
    setIsViewOnly(false);
    setIsModalOpen(true);
  };

  const handleOpenView = (dept) => {
    setSelectedDept(dept);
    setIsViewOnly(true);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      await deleteDepartment(id);
    }
  };

  const filtered = departments.filter(d => 
    d.name?.toLowerCase().includes(searchQuery.toLowerCase()) || 
    d.code?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-black text-gray-900 tracking-tight uppercase">Departments</h1>
          <p className="text-sm text-gray-500 font-medium">College Administration Panel</p>
        </div>
        <div className="flex gap-2">
          <button 
            onClick={fetchDepartments}
            className="p-2.5 text-gray-500 hover:bg-gray-100 rounded-xl transition-all"
          >
            <RefreshCw size={20} className={isLoading ? "animate-spin" : ""} />
          </button>
          <button 
            onClick={handleOpenCreate}
            className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all"
          >
            <Plus size={18} /> Add New Unit
          </button>
        </div>
      </div>

      {/* Search bar */}
      <div className="relative">
        <input 
          className="w-full pl-12 pr-4 py-3.5 bg-white border border-gray-100 rounded-2xl outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          placeholder="Search units by name or code..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Table Section */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
        {isLoading && departments.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="animate-spin text-blue-600 mb-2" size={32} />
            <p className="text-xs font-black text-gray-400 uppercase tracking-widest">Fetching Records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-50/50 border-b border-gray-100">
                <tr>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Unit</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-center">Config</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest">Status</th>
                  <th className="px-6 py-4 text-[11px] font-black text-gray-400 uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.length > 0 ? filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-gray-50/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center font-bold uppercase">
                          {d.code?.substring(0, 2)}
                        </div>
                        <div>
                          <div className="font-bold text-gray-900">{d.name}</div>
                          <div className="text-[10px] font-black text-gray-400 uppercase tracking-tight">
                            {d.contactEmail || 'No Email Set'}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex flex-col items-center justify-center gap-1">
                        <span className="text-xs font-black text-gray-700">{d.settings?.appointmentDuration || 0}m</span>
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-tighter">Duration</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className={`inline-flex items-center gap-1 px-2 py-1 rounded-lg font-black text-[9px] uppercase ${d.isActive ? 'bg-green-50 text-green-600' : 'bg-rose-50 text-rose-500'}`}>
                        {d.isActive ? 'Active' : 'Disabled'}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1">
                        {/* VIEW ICON */}
                        <button 
                          onClick={() => handleOpenView(d)}
                          className="p-2.5 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="View Details"
                        >
                          <Eye size={16} />
                        </button>
                        
                        <button 
                          onClick={() => handleOpenEdit(d)}
                          className="p-2.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                          title="Edit"
                        >
                          <Edit size={16} />
                        </button>
                        
                        <button 
                          onClick={() => handleDelete(d.id)}
                          className="p-2.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-10 text-center text-gray-400 text-xs font-bold uppercase tracking-widest">
                      No Departments Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <DepartmentFormModal 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setIsViewOnly(false);
        }} 
        initialData={selectedDept}
        isViewOnly={isViewOnly} // Pass this to the modal to disable inputs if needed
      />
    </div>
  );
};

export default Departments;