import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { Menu as HeadlessMenu, Transition } from '@headlessui/react';
import {
  LayoutDashboard,
  CalendarPlus,
  Calendar,
  Settings,
  Bell,
  ChevronDown,
  Menu as MenuIcon,
  X,
  User,
  LogOut,
  HelpCircle,
  CheckCircle2,
  Clock
} from 'lucide-react';
import { useAuthStore } from '../store/authStore';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAuthStore();
  const navigate = useNavigate();

  // Mock notifications
  const notifications = [
    {
      id: 1,
      title: 'Appointment Approved',
      description: 'Your visit request for Lab 4 has been approved.',
      time: '2 mins ago',
      type: 'success',
      icon: <CheckCircle2 className="text-green-500" size={16} />
    },
    {
      id: 2,
      title: 'Reminder',
      description: 'You have an upcoming appointment tomorrow at 10:00 AM.',
      time: '1 hour ago',
      type: 'info',
      icon: <Clock className="text-blue-500" size={16} />
    }
  ];

  const sidebarLinks = [
    { to: '/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/dashboard/book-appointment', icon: <CalendarPlus size={20} />, label: 'Book Appointment' },
    { to: '/dashboard/appointments', icon: <Calendar size={20} />, label: 'My Appointments' },
    { to: '/dashboard/profile', icon: <User size={20} />, label: 'My Profile' },
    { to: '/dashboard/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  const profileDropdownItems = [
    { label: 'My Profile', icon: <User size={16} />, onClick: () => navigate('/dashboard/profile') },
    { label: 'Settings', icon: <Settings size={16} />, onClick: () => navigate('/dashboard/settings') },
    { label: 'Help & Support', icon: <HelpCircle size={16} />, onClick: () => navigate('/dashboard/help') },
    { label: 'Logout', icon: <LogOut size={16} />, onClick: () => logout(), variant: 'danger' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden" 
          onClick={() => setIsSidebarOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-rptumba text-white transform transition-transform duration-200 ease-in-out
          lg:relative lg:translate-x-0
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="h-16 flex items-center px-6 border-b border-white/10">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-rptumba font-bold mr-3">RP</div>
            <span className="font-black text-xl uppercase tracking-tight text-white">Ikaze System</span>
          </div>

          <nav className="flex-1 overflow-y-auto p-4 space-y-1">
            {sidebarLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsSidebarOpen(false)}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive ? 'bg-white/20 text-white' : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`
                }
              >
                <span className="mr-3">{link.icon}</span>
                {link.label}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t border-white/10">
            <button 
              onClick={() => logout()}
              className="flex items-center w-full px-4 py-3 text-sm font-medium text-white/70 hover:bg-red-500/20 hover:text-red-200 rounded-lg transition-colors"
            >
              <LogOut size={20} className="mr-3" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Wrapper */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-gray-300 flex items-center justify-between px-4 sm:px-8 z-30">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 rounded-md text-gray-500 lg:hidden hover:bg-gray-100"
          >
            <MenuIcon size={24} />
          </button>

          <div className="flex items-center ml-auto space-x-2 sm:space-x-4">
            
            {/* Notification Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="relative p-2 text-gray-400 hover:text-rptumba hover:bg-gray-50 rounded-full transition-colors focus:outline-none">
                <Bell size={20} />
                <span className="absolute top-2 right-2 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                </span>
              </HeadlessMenu.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-80 origin-top-right rounded-xl bg-white shadow-xl ring-1 ring-rptumba ring-opacity-5 focus:outline-none overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                    <h3 className="text-sm font-bold text-gray-900">Notifications</h3>
                    <span className="text-[10px] font-bold bg-rptumba/10 text-rptumba px-2 py-0.5 rounded-full">2 New</span>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((n) => (
                      <HeadlessMenu.Item key={n.id}>
                        {({ active }) => (
                          <div className={`px-4 py-3 border-b border-gray-50 cursor-pointer transition-colors ${active ? 'bg-gray-50' : ''}`}>
                            <div className="flex gap-3">
                              <div className="mt-1">{n.icon}</div>
                              <div className="flex-1">
                                <p className="text-sm font-semibold text-gray-900 leading-none mb-1">{n.title}</p>
                                <p className="text-xs text-gray-600 line-clamp-2">{n.description}</p>
                                <p className="text-[10px] text-gray-400 mt-2 font-medium">{n.time}</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </HeadlessMenu.Item>
                    ))}
                  </div>
                  <button 
                    onClick={() => navigate('/dashboard/appointments')}
                    className="w-full py-2.5 text-xs font-bold text-rptumba hover:bg-gray-50 transition-colors border-t border-gray-100"
                  >
                    View All Appointments
                  </button>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>

            <div className="h-8 w-px bg-gray-200" />
            
            {/* Profile Dropdown */}
            <HeadlessMenu as="div" className="relative">
              <HeadlessMenu.Button className="flex items-center space-x-3 p-1.5 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none">
                <div className="w-8 h-8 bg-rptumba text-white rounded-full flex items-center justify-center text-xs font-bold ring-2 ring-white">
                  {user?.firstName?.[0] || 'U'}
                </div>
                <div className="hidden md:block text-left">
                  <p className="text-xs font-semibold text-gray-700 leading-none">
                    {user?.firstName} {user?.lastName}
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-wider">User Account</p>
                </div>
                <ChevronDown size={14} className="text-gray-400" />
              </HeadlessMenu.Button>

              <Transition
                as={React.Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <HeadlessMenu.Items className="absolute right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-xl bg-white shadow-lg ring-1 ring-rptumba ring-opacity-5 focus:outline-none">
                  <div className="px-4 py-3">
                    <p className="text-xs text-gray-500">Signed in as</p>
                    <p className="text-sm font-medium text-gray-900 truncate">{user?.email}</p>
                  </div>
                  <div className="py-1">
                    {profileDropdownItems.map((item, index) => (
                      <HeadlessMenu.Item key={index}>
                        {({ active }) => (
                          <button
                            onClick={item.onClick}
                            className={`${
                              active ? 'bg-gray-50 text-gray-900' : 'text-gray-700'
                            } group flex w-full items-center px-4 py-2.5 text-sm transition-colors ${
                              item.variant === 'danger' ? 'text-red-600' : ''
                            }`}
                          >
                            <span className={`mr-3 ${active ? 'text-rptumba' : 'text-gray-400'} ${item.variant === 'danger' ? 'text-red-400' : ''}`}>
                              {item.icon}
                            </span>
                            {item.label}
                          </button>
                        )}
                      </HeadlessMenu.Item>
                    ))}
                  </div>
                </HeadlessMenu.Items>
              </Transition>
            </HeadlessMenu>
          </div>
        </header>

        {/* Scrollable Body */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 sm:p-6 lg:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;