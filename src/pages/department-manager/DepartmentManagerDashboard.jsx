// components/DepartmentManagerDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Calendar, Users, Clock, CheckCircle, AlertCircle, BarChart3,
  FileText, Plus, Download, Filter, ArrowUpRight, ArrowDownRight,
  Building2, Bell, TrendingUp, RefreshCw, Eye, ChevronRight
} from 'lucide-react';
import { useDepartmentStore } from '../../store/useDepartmentStore';

const DepartmentManagerDashboard = () => {
  const [timeRange, setTimeRange] = useState('week');
  
  // Store Integration
  const {
    departmentInfo,
    appointments,
    pendingApprovals,
    dashboardStats,
    isLoading,
    fetchDepartmentInfo,
    fetchAppointments,
    fetchPendingApprovals,
    fetchDashboardStats,
    approveAppointment,
    rejectAppointment,
    approveStudentRequest,
    rejectStudentRequest,
    getComputedStats
  } = useDepartmentStore();

  useEffect(() => {
    fetchDepartmentInfo();
    fetchAppointments();
    fetchPendingApprovals();
    fetchDashboardStats();
  }, []);

  // Filter appointments based on time range
  const getFilteredAppointments = () => {
    if (!appointments.length) return [];
    
    const now = new Date();
    let startDate = new Date();
    
    switch(timeRange) {
      case 'day':
        startDate.setDate(now.getDate());
        break;
      case 'week':
        startDate.setDate(now.getDate() - 7);
        break;
      case 'month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      default:
        startDate = new Date(0); // All time
    }
    
    return appointments.filter(appt => {
      const apptDate = new Date(appt.date);
      return apptDate >= startDate && appt.status === 'confirmed';
    });
  };

  // Get computed stats
  const computedStats = getComputedStats();
  
  const dashboardStatsData = [
    { 
      label: 'Today\'s Appointments', 
      value: computedStats.todayAppointments, 
      change: '+8%', 
      trend: 'up', 
      icon: Calendar, 
      color: 'bg-blue-500' 
    },
    { 
      label: 'Pending Approvals', 
      value: computedStats.pendingApprovalsCount, 
      change: pendingApprovals.length > 0 ? `+${pendingApprovals.length}` : '0', 
      trend: pendingApprovals.length > 0 ? 'up' : 'down', 
      icon: CheckCircle, 
      color: 'bg-yellow-500' 
    },
    { 
      label: 'Upcoming', 
      value: computedStats.upcomingAppointments, 
      change: '+12%', 
      trend: 'up', 
      icon: Clock, 
      color: 'bg-green-500' 
    },
    { 
      label: 'Completed', 
      value: computedStats.completedAppointments, 
      change: '+5%', 
      trend: 'up', 
      icon: CheckCircle, 
      color: 'bg-purple-500' 
    },
  ];

  console.log(pendingApprovals)
  const handleApprove = async (id) => {
    await approveStudentRequest(id);
  };

  const handleReject = async (id) => {
    const reason = prompt('Enter rejection reason:');
    if (reason) {
      await rejectStudentRequest(id, reason);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Department Info */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl p-6">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{departmentInfo?.name }</h1>
                <p className="text-blue-100">Department Code: {departmentInfo?.code}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{departmentInfo?.totalStudents || 0} Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span className="text-sm">{departmentInfo?.totalStaff || 0} Staff</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4" />
                <span className="text-sm">{departmentInfo?.location || 'Location not set'}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <p className="text-sm opacity-90">Department Head</p>
            <p className="font-bold text-lg">{departmentInfo?.head || 'Not assigned'}</p>
            <p className="text-sm opacity-90 mt-2">Active Courses: {departmentInfo?.activeCourses || 0}</p>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Department Dashboard</h2>
          <p className="text-gray-600">Manage appointments, approvals, and department activities</p>
        </div>
        <div className="flex gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dashboardStatsData.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                  {stat.change}
                </div>
              </div>
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Appointments</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              {getFilteredAppointments().map((apt) => (
                <div key={apt.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                      <Calendar className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{apt.visitorName}</h4>
                      <div className="text-sm text-gray-600">{apt.purpose}</div>
                      <div className="text-xs text-gray-500 mt-1 flex items-center gap-2">
                        <Clock className="w-3 h-3" /> {apt.date} {apt.time}
                        <span className={`px-2 py-0.5 text-xs rounded-full ${
                          apt.priority === 'high' ? 'bg-red-100 text-red-800' : 
                          apt.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {apt.priority} priority
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800">confirmed</span>
                    <button className="p-2 text-gray-400 hover:text-gray-600">
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {getFilteredAppointments().length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No upcoming appointments for this time period
                </div>
              )}
            </div>
          </div>

          {/* Pending Approvals */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Pending Approvals</h3>
              <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                View All <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <div className="space-y-4">
              { Array.isArray(pendingApprovals) && pendingApprovals.map((approval) => (
                <div key={approval.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{approval.studentName}</h4>
                      <div className="text-sm text-gray-600">{approval.purpose}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        Submitted: {new Date(approval.submittedDate).toLocaleDateString()}
                      </div>
                      <div className={`px-2 py-0.5 text-xs rounded-full inline-block mt-1 ${
                        approval.urgency === 'critical' ? 'bg-red-100 text-red-800' :
                        approval.urgency === 'urgent' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {approval.urgency}
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => handleApprove(approval.id)}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Approve
                    </button>
                    <button 
                      onClick={() => handleReject(approval.id)}
                      className="px-3 py-1 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))}
              {pendingApprovals.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  No pending approvals
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagerDashboard;