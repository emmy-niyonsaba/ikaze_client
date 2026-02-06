import React, { useEffect } from 'react';
import {
  Building2, Users, Calendar, Shield, CheckCircle, 
  Clock, BarChart3, Plus, ArrowUpRight, ArrowDownRight, 
  MapPin, Phone, Mail, Globe, ChevronRight, Search
} from 'lucide-react';

import { useUserManagementStore } from '../../store/useUserManagementStore';
import { useCollegeStore } from '../../store/useCollegeStore';

const CollegeAdminDashboard = () => {
  const { 
    fetchDashboardStats, 
    fetchRecentAppointments,
    stats, 
    appointments,
    isLoading: statsLoading 
  } = useUserManagementStore();
  
  const { 
    fetchCurrentCollege, 
    college, 
    loading: collegeLoading 
  } = useCollegeStore();

  useEffect(() => {
    fetchCurrentCollege();
    fetchDashboardStats();
    fetchRecentAppointments();
  }, [fetchCurrentCollege, fetchDashboardStats, fetchRecentAppointments]);

  if (collegeLoading || !college) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const dashboardStats = [
    { label: "Total Users", value: stats.totalUsers, color: 'bg-blue-600', icon: Users },
    { label: 'Security Staff', value: stats.activeSecurity, color: 'bg-green-600', icon: Shield },
    { label: 'Dept Managers', value: stats.activeManagers, color: 'bg-purple-600', icon: Building2 },
    { label: 'Pending Approvals', value: stats.pendingApprovals, color: 'bg-orange-500', icon: CheckCircle },
  ];

  console.log(stats)
  return (
    <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
      
      {/* Header */}
      <div className="bg-blue-700 text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/30">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-black tracking-tight uppercase">{college.name}</h1>
                <div className="flex items-center gap-2 text-blue-100 font-medium text-sm">
                  <span className="bg-white/20 px-2 py-0.5 rounded text-xs font-bold uppercase">CODE: {college.code}</span>
                  <span>•</span>
                  <span>{college.location}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-2">
              <div className="flex items-center gap-2 text-sm text-blue-50"><Phone size={16}/> {college.phone || 'N/A'}</div>
              <div className="flex items-center gap-2 text-sm text-blue-50"><Mail size={16}/> {college.email || 'N/A'}</div>
              <div className="flex items-center gap-2 text-sm text-blue-50"><Globe size={16}/> {college.website || 'N/A'}</div>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 min-w-[280px]">
            <p className="text-xs uppercase tracking-widest text-blue-200 font-bold mb-1">Primary Manager</p>
            <p className="text-xl font-bold">
                {college.manager ? `${college.manager.firstName} ${college.manager.lastName}` : 'Unassigned'}
            </p>
            <div className="mt-4 pt-4 border-t border-white/10 flex justify-between items-center">
                <span className="text-xs text-blue-100 font-bold uppercase">Timezone</span>
                <span className="text-xs font-mono font-bold bg-blue-600 px-2 py-1 rounded-lg tracking-tighter">{college.timezone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
            <div className={`${stat.color} w-12 h-12 rounded-xl shadow-lg flex items-center justify-center mb-4`}>
                <stat.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-gray-500 text-xs font-black uppercase tracking-widest">{stat.label}</h3>
            <p className="text-3xl font-black text-gray-900 mt-1">
                {statsLoading ? <span className="animate-pulse">...</span> : stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* RE-ADDED: Upcoming Appointments Section */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-gray-50 flex justify-between items-center">
            <h3 className="font-bold text-gray-900 text-lg">Upcoming Appointments</h3>
            <button className="text-blue-600 text-sm font-bold hover:underline">View All</button>
          </div>
          <div className="divide-y divide-gray-50">
            {appointments.length > 0 ? (
              appointments.map((apt) => (
                <div key={apt.id} className="p-5 flex items-center justify-between hover:bg-gray-50 transition-colors group">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Calendar size={20} />
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">{apt.visitorName || 'Visitor'}</h4>
                      <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                          <span className="flex items-center gap-1"><Clock size={12}/> {apt.time}</span>
                          <span>•</span>
                          <span className="uppercase tracking-tighter">{apt.department?.name || 'General'}</span>
                      </div>
                    </div>
                  </div>
                  <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-white shadow-sm border border-gray-100 rounded-lg">
                    <ChevronRight size={18} className="text-gray-400" />
                  </button>
                </div>
              ))
            ) : (
              <div className="p-10 text-center text-gray-400">
                <Calendar className="mx-auto mb-2 opacity-20" size={48} />
                <p>No upcoming appointments found</p>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-4">Quick Management</h3>
            <div className="grid grid-cols-1 gap-3">
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-all">
                <Users size={18}/> Staff Directory
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-all">
                <Shield size={18}/> Security Logs
              </button>
              <button className="w-full flex items-center gap-3 p-4 rounded-2xl bg-white/10 hover:bg-white/20 font-bold text-sm transition-all">
                <BarChart3 size={18}/> Export Reports
              </button>
            </div>
          </div>

          <div className="bg-blue-50 rounded-3xl p-6 border border-blue-100">
             <h3 className="font-bold text-blue-900 mb-2">Institution Settings</h3>
             <div className="space-y-3">
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700 font-bold uppercase">Duration</span>
                  <span className="text-blue-900 font-bold">{college.settings?.appointmentDuration} min</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-blue-700 font-bold uppercase">Auto-Approval</span>
                  <span className="text-blue-900 font-bold">{college.settings?.autoConfirm ? 'YES' : 'NO'}</span>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeAdminDashboard;