// components/SecurityLayout.jsx - Enhanced version
import React, { Fragment, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { 
  Home, CheckCircle, Calendar, BarChart3, User, LogOut, 
  Shield, ChevronDown, Settings, Bell, Search, Clock, 
  Users, AlertCircle, FileText, Scan, RefreshCw, ShieldAlert
} from "lucide-react";
import { Menu, Transition } from "@headlessui/react";
import { useAuthStore } from "../store/authStore";
import { useSecurityStore } from "../store/securityStore";
import { useAppointmentStore } from "../store/appointmentStore";

const SecurityLayout = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();
  const { todaysAppointments, fetchTodaysAppointments } = useSecurityStore();
  const { appointments } = useAppointmentStore();
  
  const [stats, setStats] = useState({
    todaysTotal: 0,
    checkedIn: 0,
    pending: 0,
    noShows: 0
  });
  
  const [notifications, setNotifications] = useState(3);
  const [shift, setShift] = useState({ type: "DAY", time: "08:00 - 17:00", location: "Main Gate" });

  // Navigation items based on user's actual security role
  const navItems = [
    { path: "/security-dashboard", icon: Home, label: "Dashboard", end: true },
    { path: "verify-entry", icon: Scan, label: "Verify", badge: stats.pending },
    { path: "appointments", icon: Calendar, label: "Schedule", badge: stats.todaysTotal },
    { path: "check", icon: CheckCircle, label: "Check In/Out" },
    { path: "reports", icon: BarChart3, label: "Reports" },
    { path: "activity", icon: Clock, label: "My Activity" },
  ];

  // Fetch data on component mount
  useEffect(() => {
    loadDashboardData();
    
    // Refresh data every 5 minutes
    const interval = setInterval(loadDashboardData, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      await fetchTodaysAppointments();
      calculateStats();
    } catch (error) {
      console.error("Failed to load security data:", error);
    }
  };

  const calculateStats = () => {
    const today = new Date().toDateString();
    const todaysAppts = appointments.filter(apt => 
      new Date(apt.startTime).toDateString() === today
    );
    
    setStats({
      todaysTotal: todaysAppts.length,
      checkedIn: todaysAppts.filter(apt => apt.checkedInAt).length,
      pending: todaysAppts.filter(apt => 
        apt.status === 'CONFIRMED' && !apt.checkedInAt && new Date(apt.startTime) >= new Date()
      ).length,
      noShows: todaysAppts.filter(apt => 
        apt.status === 'CONFIRMED' && !apt.checkedInAt && new Date(apt.startTime) < new Date()
      ).length
    });
  };

  // Quick action buttons
  const quickActions = [
    { 
      label: "Quick Verify", 
      icon: Scan, 
      color: "bg-blue-600 hover:bg-blue-700",
      action: () => navigate("verify-entry"),
      description: "Scan appointment code"
    },
    { 
      label: "Check In", 
      icon: CheckCircle, 
      color: "bg-green-600 hover:bg-green-700",
      action: () => navigate("check"),
      description: "Manual check-in"
    },
    { 
      label: "Today's List", 
      icon: FileText, 
      color: "bg-purple-600 hover:bg-purple-700",
      action: () => navigate("appointments"),
      description: "View all appointments"
    },
    { 
      label: "Incident Report", 
      icon: AlertCircle, 
      color: "bg-red-600 hover:bg-red-700",
      action: () => navigate("reports"),
      description: "Log incident"
    },
  ];

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col md:flex-row">
      
      {/* --- SIDEBAR (Desktop) --- */}
      <aside className="hidden md:flex flex-col w-72 bg-white border-r border-gray-200 sticky top-0 h-screen">
        {/* Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">Security Portal</h1>
              <p className="text-xs text-gray-500">RP College System</p>
            </div>
          </div>
          
          {/* Shift Info */}
          <div className="mt-4 p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500">Current Shift</p>
                <p className="text-sm font-bold text-gray-900">{shift.type} SHIFT</p>
              </div>
              <Clock className="w-4 h-4 text-gray-400" />
            </div>
            <p className="text-xs text-gray-600 mt-1">{shift.time} • {shift.location}</p>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => 
                `flex items-center justify-between gap-3 px-4 py-3 rounded-xl font-medium transition-all group ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className={`w-5 h-5 ${item.badge ? "relative" : ""}`} />
                <span className="text-sm">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full min-w-[20px] text-center">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Quick Actions */}
        <div className="p-4 border-t border-gray-100">
          <h3 className="text-xs font-bold text-gray-500 uppercase mb-3 px-2">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-2">
            {quickActions.slice(0, 2).map((action, idx) => (
              <button
                key={idx}
                onClick={action.action}
                className="flex flex-col items-center p-3 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <action.icon className="w-5 h-5 text-blue-600 mb-1" />
                <span className="text-xs font-medium text-gray-900">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={logout}
            className="flex items-center justify-center gap-2 w-full px-4 py-3 text-red-600 font-medium hover:bg-red-50 rounded-xl transition-all"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Header */}
        <header className="hidden md:flex bg-white/80 backdrop-blur-sm h-16 border-b border-gray-200 px-6 sticky top-0 z-40 justify-between items-center">
          {/* Search Bar */}
          <div className="flex-1 max-w-lg">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="search"
                placeholder="Search appointments, visitors, or verify code..."
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Refresh */}
            <button 
              onClick={loadDashboardData}
              className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              title="Refresh data"
            >
              <RefreshCw className="w-5 h-5" />
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-xl transition-all">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900 leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-xs text-gray-500">Security Officer</p>
                </div>
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center font-bold shadow-sm">
                  {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </Menu.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="text-sm font-bold text-gray-900">{user?.email}</p>
                    <p className="text-xs text-gray-500">{user?.phone}</p>
                  </div>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button 
                        onClick={() => navigate("profile")}
                        className={`${active ? 'bg-gray-50' : ''} flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700`}
                      >
                        <User className="w-4 h-4" />
                        My Profile
                      </button>
                    )}
                  </Menu.Item>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button 
                        onClick={() => navigate("settings")}
                        className={`${active ? 'bg-gray-50' : ''} flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700`}
                      >
                        <Settings className="w-4 h-4" />
                        Shift Settings
                      </button>
                    )}
                  </Menu.Item>
                  
                  <div className="border-t border-gray-100 my-1"></div>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button 
                        onClick={logout}
                        className={`${active ? 'bg-red-50' : ''} flex items-center gap-3 w-full px-4 py-2.5 text-sm text-red-600`}
                      >
                        <LogOut className="w-4 h-4" />
                        Logout
                      </button>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>

        {/* Mobile Header */}
        <header className="md:hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-bold text-lg">Security Portal</h1>
              <p className="text-xs opacity-90">{getGreeting()}, {user?.firstName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative p-2">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-400 rounded-full"></span>
              )}
            </button>
            <button 
              onClick={logout}
              className="p-2 hover:bg-white/10 rounded-full"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Mobile Stats Bar */}
        <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-xs text-gray-500">Today's</p>
              <p className="text-lg font-bold text-gray-900">{stats.todaysTotal}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Checked In</p>
              <p className="text-lg font-bold text-green-600">{stats.checkedIn}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-bold text-yellow-600">{stats.pending}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">No Shows</p>
              <p className="text-lg font-bold text-red-600">{stats.noShows}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 md:p-6 lg:p-8 pb-24 md:pb-6">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Banner */}
            <div className="mb-6 md:mb-8">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
                    {getGreeting()}, Officer {user?.lastName}!
                  </h1>
                  <p className="text-gray-600 mt-1">
                    Shift: <span className="font-medium">{shift.type}</span> • 
                    Location: <span className="font-medium">{shift.location}</span> • 
                    Time: <span className="font-medium">{shift.time}</span>
                  </p>
                </div>
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span>Last updated: {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions (Desktop) */}
            <div className="hidden md:grid grid-cols-4 gap-4 mb-8">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={action.action}
                  className={`${action.color} text-white p-4 rounded-xl flex flex-col items-center justify-center transition-all hover:scale-[1.02]`}
                >
                  <action.icon className="w-6 h-6 mb-2" />
                  <span className="font-medium text-sm">{action.label}</span>
                  <span className="text-xs opacity-90 mt-1">{action.description}</span>
                </button>
              ))}
            </div>

            {/* Content Area */}
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-3 py-3 z-50 shadow-lg">
          <div className="flex justify-around items-center">
            {navItems.slice(0, 4).map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex flex-col items-center gap-1 transition-all relative ${
                    isActive 
                      ? "text-blue-600 scale-110" 
                      : "text-gray-500 hover:text-gray-700"
                  }`
                }
              >
                <div className="relative">
                  <item.icon className="w-6 h-6" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-xs font-medium">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SecurityLayout;