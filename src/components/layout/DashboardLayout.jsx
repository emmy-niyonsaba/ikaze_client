// components/DashboardLayout.jsx
import React, { Fragment, useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate, useLocation } from "react-router-dom";
import { 
  Home, Calendar, Users, Building2, Shield, BarChart3, 
  Settings, Bell, Search, LogOut, ChevronDown, User, 
  FileText, CheckCircle, Clock, Plus, HelpCircle, 
  TrendingUp, Briefcase, ShieldAlert, FolderOpen,
  Building, School, Mail, Phone, AlertCircle
} from "lucide-react";
import { Menu, Transition } from "@headlessui/react";

import { useAuthStore } from '../../store/authStore';
import {useAppointmentStore} from '../../store/appointmentStore'
import {useCollegeStore} from "../../store/useCollegeStore"
import {useUserManagementStore} from "../../store/useUserManagementStore"

const DashboardLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { appointments, fetchAppointments } = useAppointmentStore();
  const { colleges, fetchColleges } = useCollegeStore();
  const { departmentManagers, fetchDepartmentManagers } = useUserManagementStore();
  
  const [notifications, setNotifications] = useState(2);
  const [quickStats, setQuickStats] = useState({
    pendingApprovals: 0,
    todayAppointments: 0,
    totalUsers: 0,
    activeColleges: 0
  });
  const [searchQuery, setSearchQuery] = useState("");

  // Role-based navigation configuration
  const getNavigationItems = () => {
    const baseItems = [
      { path: "dashboard", icon: Home, label: "Dashboard", end: true },
      { path: "profile", icon: User, label: "Profile" },
      { path: "reports", icon: BarChart3, label: "Reports" },
    ];

    const roleSpecificItems = {
      SUPER_ADMIN: [
        { path: "dashboard", icon: Home, label: "Dashboard", end: true },
        { path: "profile", icon: User, label: "Profile" },
        { path: "colleges", icon: Building2, label: "Colleges", badge: quickStats.activeColleges },
        { path: "admins", icon: Shield, label: "Admins" },
      ],
      COLLEGE_MANAGER: [
        ...baseItems,
        { path: "departments", icon: Building, label: "Departments" },
        { path: "department-managers", icon: Users, label: "Managers" },
        // { path: "security-manager", icon: ShieldAlert, label: "Security Manager" },
        { path: "college-settings", icon: Settings, label: "Settings" },
      ],
      DEPARTMENT_MANAGER: [
        ...baseItems,
      { path: "appointments", icon: Calendar, label: "Appointments", badge: quickStats.todayAppointments },
        { path: "approvals", icon: CheckCircle, label: "Approvals", badge: quickStats.pendingApprovals },
      ],
      SECURITY_MANAGER: [
        ...baseItems,
        { path: "appointments", icon: Calendar, label: "Appointments", badge: quickStats.todayAppointments },
        { path: "security-personnel", icon: Users, label: "Personnel" },
        { path: "shifts", icon: Clock, label: "Shifts" },
        { path: "notices", icon: AlertCircle, label: "Notices" },
        { path: "security-settings", icon: Settings, label: "Settings" },
      ],
      USER: [
        ...baseItems,
        { path: "book-appointment", icon: Plus, label: "Book Appointment" },
        { path: "history", icon: FolderOpen, label: "History" },
        { path: "my-schedule", icon: Calendar, label: "My Schedule" },
      ],
    };

    return roleSpecificItems[user?.role] || roleSpecificItems.USER;
  };

  // Role-based quick actions
  const getQuickActions = () => {
    const actions = {
      SUPER_ADMIN: [
        { label: "Create College", icon: Plus, color: "bg-blue-600", path: "/super-admin/colleges/new" },
        { label: "Add Admin", icon: Users, color: "bg-green-600", path: "/super-admin/admins/new" },
        { label: "System Report", icon: FileText, color: "bg-purple-600", path: "/super-admin/reports" },
        { label: "View Colleges", icon: Building2, color: "bg-indigo-600", path: "/super-admin/colleges" },
      ],
      COLLEGE_MANAGER: [
        { label: "Add Manager", icon: Users, color: "bg-blue-600", path: "/college-admin/managers/new" },
        { label: "Create Department", icon: Building, color: "bg-green-600", path: "/college-admin/departments/new" },
        { label: "College Report", icon: FileText, color: "bg-purple-600", path: "/college-admin/reports" },
        { label: "Security Setup", icon: Shield, color: "bg-red-600", path: "/college-admin/security" },
      ],
      DEPARTMENT_MANAGER: [
        { label: "Review Appointments", icon: CheckCircle, color: "bg-blue-600", path: "/department-manager/approvals" },
        { label: "Schedule View", icon: Calendar, color: "bg-green-600", path: "/department-manager/schedule" },
        { label: "Department Report", icon: FileText, color: "bg-purple-600", path: "/department-manager/reports" },
        { label: "Settings", icon: Settings, color: "bg-gray-600", path: "/department-manager/settings" },
      ],
      SECURITY_MANAGER: [
        { label: "Add Security", icon: Users, color: "bg-blue-600", path: "/security-manager/personnel/new" },
        { label: "Manage Shifts", icon: Clock, color: "bg-green-600", path: "/security-manager/shifts" },
        { label: "Post Notice", icon: AlertCircle, color: "bg-yellow-600", path: "/security-manager/notices/new" },
        { label: "Security Report", icon: FileText, color: "bg-red-600", path: "/security-manager/reports" },
      ],
      USER: [
        { label: "Book Appointment", icon: Plus, color: "bg-blue-600", path: "/book-appointment" },
        { label: "View Appointments", icon: Calendar, color: "bg-green-600", path: "/appointments" },
        { label: "My Schedule", icon: Clock, color: "bg-purple-600", path: "/my-schedule" },
        { label: "Help Center", icon: HelpCircle, color: "bg-gray-600", path: "/help" },
      ],
    };

    return actions[user?.role] || actions.USER;
  };

  // Role-based header title
  const getHeaderTitle = () => {
    const titles = {
      SUPER_ADMIN: "Super Admin Portal",
      COLLEGE_MANAGER: `${user?.managedCollege?.name || "College"} Admin Portal`,
      DEPARTMENT_MANAGER: "Department Manager Portal",
      SECURITY_MANAGER: "Security Manager Portal",
      USER: "Appointment Portal",
    };
    return titles[user?.role] || "Dashboard";
  };

  // Fetch data on component mount
  useEffect(() => {
    loadInitialData();
  }, [user]);



  const loadInitialData = async () => {
    try {
      if (user) {
        // await fetchAppointments();
        if (user.role === 'SUPER_ADMIN') {
          // await fetchColleges();
        }
        if (user.role === 'COLLEGE_MANAGER') {
          // await fetchDepartmentManagers();
        }
        // calculateStats();
      }
    } catch (error) {
      console.error("Failed to load dashboard data:", error);
    }
  };

  const calculateStats = () => {
    const today = new Date().toDateString();
    const todayAppointments = appointments.filter(apt => 
      new Date(apt.startTime).toDateString() === today
    );
    
    const stats = {
      pendingApprovals: appointments.filter(apt => apt.status === 'PENDING').length,
      todayAppointments: todayAppointments.length,
      totalUsers: 0, // Would come from API
      activeColleges: colleges?.filter(c => c.isActive).length || 0
    };
    
    setQuickStats(stats);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Implement search functionality
      console.log("Searching for:", searchQuery);
    }
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const navItems = getNavigationItems();
  const headerTitle = getHeaderTitle();


  useEffect(()=>{
    scrollTo({
      top:0,
      left:0,
      behavior:'instant'
    })
  },[location.pathname])
  return (
    <div className="min-h-screen bg-gray-50 flex">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden lg:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        {/* Logo & User Info */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              {user?.role === 'SUPER_ADMIN' && <Shield className="w-6 h-6 text-white" />}
              {user?.role === 'COLLEGE_MANAGER' && <Building2 className="w-6 h-6 text-white" />}
              {user?.role === 'DEPARTMENT_MANAGER' && <Briefcase className="w-6 h-6 text-white" />}
              {user?.role === 'SECURITY_MANAGER' && <ShieldAlert className="w-6 h-6 text-white" />}
              {user?.role === 'USER' && <User className="w-6 h-6 text-white" />}
            </div>
            <div>
              <h1 className="font-bold text-gray-900">{headerTitle}</h1>
              <p className="text-xs text-gray-500">{getGreeting()}</p>
            </div>
          </div>
          
          {/* User Info Card */}
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="font-bold text-gray-900 truncate">{user?.firstName} {user?.lastName}</p>
            <p className="text-xs text-gray-500 mt-1">{user?.role?.replace('_', ' ')}</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => 
                `flex items-center justify-between gap-3 px-4 py-3 rounded-lg font-medium transition-all ${
                  isActive 
                    ? "bg-blue-50 text-blue-700 border-l-4 border-blue-600" 
                    : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                }`
              }
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
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

      

        {/* Help & Logout */}
        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/help')}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-gray-600 hover:bg-gray-50 rounded-lg mb-2"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm">Help & Support</span>
          </button>
          <button 
            onClick={logout}
            className="flex items-center gap-2 w-full px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-4 h-4" />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT AREA --- */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Header */}
        <header className="hidden lg:flex bg-white h-16 border-b border-gray-200 px-6 sticky top-0 z-40 justify-between items-center">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm">
            <span className="text-gray-500">{headerTitle}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-700 font-medium">
              {location.pathname.split('/').pop()?.replace('-', ' ') || 'Dashboard'}
            </span>
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-4">
          

            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Profile Dropdown */}
            <Menu as="div" className="relative">
              <Menu.Button className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-lg transition-all">
                <div className="text-right hidden xl:block">
                  <p className="text-sm font-bold text-gray-900">{user?.firstName} {user?.lastName}</p>
                  <p className="text-xs text-gray-500">{user?.role?.replace('_', ' ')}</p>
                </div>
                <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-lg flex items-center justify-center font-bold">
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
                <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-50">
                  <div className="px-4 py-3 border-b border-gray-100">
                    <p className="font-bold text-gray-900">{user?.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Phone className="w-3 h-3 text-gray-400" />
                      <span className="text-xs text-gray-500">{user?.phone}</span>
                    </div>
                  </div>
                  
                  <Menu.Item>
                    {({ active }) => (
                      <button 
                        onClick={() => navigate('profile')}
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
                        onClick={() => navigate('settings')}
                        className={`${active ? 'bg-gray-50' : ''} flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-700`}
                      >
                        <Settings className="w-4 h-4" />
                        Account Settings
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
        <header className="lg:hidden bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-lg">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/dashboard')}
              className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"
            >
              {user?.role === 'SUPER_ADMIN' && <Shield className="w-5 h-5" />}
              {user?.role === 'COLLEGE_MANAGER' && <Building2 className="w-5 h-5" />}
              {user?.role === 'DEPARTMENT_MANAGER' && <Briefcase className="w-5 h-5" />}
              {user?.role === 'SECURITY_MANAGER' && <ShieldAlert className="w-5 h-5" />}
              {user?.role === 'USER' && <User className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="font-bold">{headerTitle}</h1>
              <p className="text-xs opacity-90">{getGreeting()}, {user?.firstName}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="relative p-2">
              <Bell className="w-5 h-5" />
              {notifications > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full"></span>
              )}
            </button>
          </div>
        </header>

        {/* Mobile Quick Stats */}
        <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-center">
              <p className="text-xs text-gray-500">Today</p>
              <p className="text-lg font-bold text-blue-600">{quickStats.todayAppointments}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Pending</p>
              <p className="text-lg font-bold text-yellow-600">{quickStats.pendingApprovals}</p>
            </div>
            {user?.role === 'SUPER_ADMIN' && (
              <div className="text-center">
                <p className="text-xs text-gray-500">Colleges</p>
                <p className="text-lg font-bold text-green-600">{quickStats.activeColleges}</p>
              </div>
            )}
            <div className="text-center">
              <p className="text-xs text-gray-500">Role</p>
              <p className="text-lg font-bold text-purple-600">{user?.role?.charAt(0)}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6 xl:p-8">
          <div className="max-w-7xl mx-auto">
           
            {/* Content Area */}
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-300 px-3 py-3 z-50 shadow-lg">
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
                  <item.icon className="w-5 h-5" />
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

export default DashboardLayout;