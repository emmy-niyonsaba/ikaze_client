import React, { useState, useEffect } from 'react';
import { X, Save, Clock, Calendar, Shield, Loader2, Mail, Phone, AlignLeft, Eye } from 'lucide-react';
import { useUserManagementStore } from '../../store/useUserManagementStore';

const DepartmentFormModal = ({ isOpen, onClose, initialData = null, isViewOnly = false }) => {
  const { 
    createDepartment, 
    updateDepartment, 
    isLoading, 
    error, 
    clearErrorSuccess 
  } = useUserManagementStore();
  
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    contactEmail: '',
    contactPhone: '',
    isActive: true,
    settings: {
      appointmentDuration: 60,
      maxDailyAppointments: 20,
      advanceBookingDays: 30,
      isAcceptingAppointments: true
    }
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          ...initialData,
          settings: initialData.settings || formData.settings
        });
      } else {
        setFormData({
          name: '', code: '', description: '', contactEmail: '', contactPhone: '', isActive: true,
          settings: { appointmentDuration: 60, maxDailyAppointments: 20, advanceBookingDays: 30, isAcceptingAppointments: true }
        });
      }
      clearErrorSuccess();
    }
  }, [initialData, isOpen]);

  const handleSettingChange = (key, value) => {
    if (isViewOnly) return;
    setFormData(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isViewOnly) return;

    const submissionData = {
      ...formData,
      code: formData.code.toUpperCase()
    };

    try {
      if (initialData?.id) {
        await updateDepartment(initialData.id, submissionData);
      } else {
        await createDepartment(submissionData);
      }
      onClose();
    } catch (err) {}
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
                {isViewOnly ? 'Department Details' : initialData ? 'Edit Department' : 'New Department'}
              </h2>
              <p className="text-[10px] text-indigo-600 font-black uppercase tracking-widest mt-1">
                {isViewOnly ? 'Read-Only Access' : 'Unit Configuration'}
              </p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-7">
          {error && !isViewOnly && (
            <div className="p-4 bg-rose-50 border border-rose-100 rounded-2xl text-rose-600 text-xs font-bold uppercase tracking-tight">
              {error}
            </div>
          )}

          <fieldset disabled={isViewOnly} className="space-y-7 contents">
            {/* Identity */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Department Name</label>
                <input 
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-bold text-sm disabled:opacity-70"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1">Unit Code</label>
                <input 
                  required
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-black text-sm uppercase disabled:opacity-70"
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value})}
                />
              </div>
            </div>

            {/* Description */}
            <div className="space-y-1">
              <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                <AlignLeft size={10}/> Description
              </label>
              <textarea 
                rows="3"
                className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-medium text-sm disabled:opacity-70"
                value={formData.description || ''}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
              />
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <Mail size={10}/> Public Email
                </label>
                <input 
                  required
                  type="email"
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-sm disabled:opacity-70"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({...formData, contactEmail: e.target.value})}
                />
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-400 uppercase ml-1 flex items-center gap-1">
                  <Phone size={10}/> Public Phone
                </label>
                <input 
                  className="w-full px-5 py-3.5 bg-gray-50 border border-gray-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 outline-none font-semibold text-sm disabled:opacity-70"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({...formData, contactPhone: e.target.value})}
                />
              </div>
            </div>

            {/* Operations */}
            <section className="p-6 bg-indigo-50/40 rounded-[2rem] border border-indigo-100 grid grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-indigo-50">
                <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Duration (Min)</label>
                <div className="flex items-center gap-2">
                  <Clock size={14} className="text-indigo-400"/>
                  <input 
                    type="number"
                    className="w-full font-bold text-gray-900 outline-none text-sm bg-transparent"
                    value={formData.settings.appointmentDuration}
                    onChange={(e) => handleSettingChange('appointmentDuration', parseInt(e.target.value))}
                  />
                </div>
              </div>
              <div className="bg-white p-4 rounded-2xl border border-indigo-50">
                <label className="block text-[9px] font-black text-gray-400 uppercase mb-1">Daily Limit</label>
                <div className="flex items-center gap-2">
                  <Calendar size={14} className="text-indigo-400"/>
                  <input 
                    type="number"
                    className="w-full font-bold text-gray-900 outline-none text-sm bg-transparent"
                    value={formData.settings.maxDailyAppointments}
                    onChange={(e) => handleSettingChange('maxDailyAppointments', parseInt(e.target.value))}
                  />
                </div>
              </div>
            </section>
          </fieldset>
        </form>

        {/* Footer */}
        <div className="p-8 border-t border-gray-100 bg-gray-50/80 flex gap-4">
          <button 
            type="button"
            onClick={onClose}
            className="flex-1 py-4 px-6 border border-gray-200 text-gray-500 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all"
          >
            {isViewOnly ? 'Close' : 'Cancel'}
          </button>
          
          {!isViewOnly && (
            <button 
              type="submit"
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex-1 py-4 px-6 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all disabled:opacity-50"
            >
              {isLoading ? <Loader2 className="animate-spin" size={16}/> : <Save size={16}/>}
              {initialData ? 'Save Changes' : 'Create Unit'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default DepartmentFormModal;