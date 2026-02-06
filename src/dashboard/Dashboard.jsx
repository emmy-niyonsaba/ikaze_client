// src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../store/authStore';
import { Link } from 'react-router-dom';
import { 
  FiCalendar, 
  FiClock, 
  FiCheckCircle, 
  FiPlus, 
  FiTrendingUp,
  FiUsers,
  FiBarChart2,
  FiArrowRight,
  FiRefreshCw
} from 'react-icons/fi';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    upcoming: 0,
    pending: 0,
    completed: 0,
    today: 0
  });
  const [recentAppointments, setRecentAppointments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Mock data - replace with actual API calls
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock stats
      setStats({
        totalAppointments: 12,
        upcoming: 3,
        pending: 2,
        completed: 7,
        today: 1
      });
      
      // Mock recent appointments
      setRecentAppointments([
        { id: 1, type: 'Meeting', date: '2024-01-15T09:00:00', status: 'CONFIRMED', description: 'Team meeting' },
        { id: 2, type: 'Consultation', date: '2024-01-16T14:00:00', status: 'PENDING', description: 'Student consultation' },
        { id: 3, type: 'Training', date: '2024-01-14T10:00:00', status: 'COMPLETED', description: 'Software training' }
      ]);
      
      setIsLoading(false);
    };
    
    if (user) {
      loadDashboardData();
    }
  }, [user]);

  const statCards = [
    {
      label: "Total Appointments",
      value: stats.totalAppointments,
      icon: FiCalendar,
      color: "bg-blue-500",
      description: "All appointments",
      change: "+12%"
    },
    {
      label: "Upcoming",
      value: stats.upcoming,
      icon: FiClock,
      color: "bg-purple-500",
      description: "Scheduled ahead",
      change: "+3"
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: FiClock,
      color: "bg-yellow-500",
      description: "Awaiting approval",
      change: "Needs attention"
    },
    {
      label: "Completed",
      value: stats.completed,
      icon: FiCheckCircle,
      color: "bg-green-500",
      description: "Successful visits",
      change: "+25%"
    }
  ];

  const quickActions = [
    {
      label: "Book Appointment",
      description: "Schedule a new visit",
      icon: FiPlus,
      color: "bg-blue-100 text-blue-600",
      path: "/book-appointment"
    },
    {
      label: "My Appointments",
      description: "View all appointments",
      icon: FiCalendar,
      color: "bg-purple-100 text-purple-600",
      path: "/appointments"
    },
    {
      label: "Profile Settings",
      description: "Update your information",
      icon: FiUsers,
      color: "bg-green-100 text-green-600",
      path: "/profile"
    },
    {
      label: "View Reports",
      description: "See your activity",
      icon: FiBarChart2,
      color: "bg-orange-100 text-orange-600",
      path: "/reports"
    }
  ];

  const getStatusColor = (status) => {
    switch(status) {
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-6 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome back, <span className="text-blue-600">{user?.firstName}</span>!
            </h1>
            <p className="text-gray-600 mt-2">
              Here's what's happening with your appointments today.
            </p>
          </div>
          <button className="mt-4 md:mt-0 flex items-center text-gray-600 hover:text-gray-900 transition-colors">
            <FiRefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
        
        {/* Date */}
        <div className="mt-4 inline-block px-4 py-2 bg-white rounded-lg shadow-sm border border-gray-200">
          <p className="text-sm text-gray-600">
            {new Date().toLocaleDateString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </p>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-sm font-medium text-gray-500">{stat.change}</span>
            </div>
            <h3 className="text-2xl font-bold text-gray-900">{stat.value}</h3>
            <p className="text-gray-600 mt-1">{stat.label}</p>
            <p className="text-sm text-gray-500 mt-2">{stat.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Quick Actions & Recent Appointments */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
              <Link 
                to="/appointments" 
                className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
              >
                View All <FiArrowRight className="ml-1" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {quickActions.map((action) => (
                <Link
                  key={action.label}
                  to={action.path}
                  className="group p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-center">
                    <div className={`${action.color} p-3 rounded-lg mr-4 group-hover:scale-110 transition-transform`}>
                      <action.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors">
                        {action.label}
                      </h3>
                      <p className="text-sm text-gray-500 mt-1">{action.description}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Recent Appointments */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Recent Appointments</h2>
            
            {recentAppointments.length === 0 ? (
              <div className="text-center py-8">
                <FiCalendar className="w-12 h-12 text-gray-300 mx-auto" />
                <p className="text-gray-500 mt-4">No appointments yet</p>
                <Link 
                  to="/book-appointment" 
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Book your first appointment →
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {recentAppointments.map((appointment) => (
                  <div 
                    key={appointment.id}
                    className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-50 rounded-lg mr-4">
                        <FiCalendar className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{appointment.type}</h3>
                        <p className="text-sm text-gray-500 mt-1">{appointment.description}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(appointment.date).toLocaleDateString()} • 
                          {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        </div>

        {/* Right Column - Insights & Profile */}
        <div className="space-y-8">
          {/* Insights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg p-6 text-white"
          >
            <h2 className="text-xl font-bold mb-4">Quick Insights</h2>
            <div className="space-y-4">
              <div className="flex items-center">
                <FiTrendingUp className="w-5 h-5 mr-3 opacity-80" />
                <div>
                  <p className="font-medium">Appointment Growth</p>
                  <p className="text-sm opacity-80">+12% this month</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiCheckCircle className="w-5 h-5 mr-3 opacity-80" />
                <div>
                  <p className="font-medium">Success Rate</p>
                  <p className="text-sm opacity-80">85% of appointments completed</p>
                </div>
              </div>
              <div className="flex items-center">
                <FiUsers className="w-5 h-5 mr-3 opacity-80" />
                <div>
                  <p className="font-medium">Active Today</p>
                  <p className="text-sm opacity-80">{stats.today} appointment(s) today</p>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-white text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors">
              View Detailed Analytics
            </button>
          </motion.div>

          {/* Profile Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
          >
            <h2 className="text-xl font-bold text-gray-900 mb-6">Your Profile</h2>
            <div className="flex items-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {user?.firstName?.[0]}{user?.lastName?.[0]}
              </div>
              <div className="ml-4">
                <h3 className="font-bold text-gray-900">{user?.firstName} {user?.lastName}</h3>
                <p className="text-gray-600 text-sm">{user?.email}</p>
                <p className="text-gray-500 text-xs mt-1">{user?.phone}</p>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Member Since</span>
                <span className="font-medium">
                  {new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">College</span>
                <span className="font-medium">{user?.rpCollege || 'Not specified'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Status</span>
                <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                  Active
                </span>
              </div>
            </div>
            
            <Link
              to="/profile"
              className="block w-full mt-6 text-center bg-blue-50 text-blue-600 font-medium py-2 px-4 rounded-lg hover:bg-blue-100 transition-colors"
            >
              Edit Profile
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;