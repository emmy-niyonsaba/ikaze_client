import React, { Fragment } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FiHome, FiCheckCircle, FiCalendar, FiBarChart2, FiUser, FiLogOut, FiShield, FiChevronDown, FiSettings } from "react-icons/fi";
import { Menu, Transition } from "@headlessui/react";

const SecurityLayout = () => {
  const navigate = useNavigate();

  const navItems = [
    { path: "/security-dashboard", icon: <FiHome />, label: "Home", end: true },
    { path: "verify-entry", icon: <FiCheckCircle />, label: "Verify" },
    { path: "appointments", icon: <FiCalendar />, label: "Schedule" },
    { path: "reports", icon: <FiBarChart2 />, label: "Reports" },
    { path: "profile", icon: <FiUser />, label: "Profile" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">
      
      {/* --- SIDEBAR (Desktop Only) --- */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-gray-200 sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3 bg-rp text-white">
          <FiShield size={24} />
          <span className="font-bold tracking-tight text-lg">Security Portal</span>
        </div>
        
        <nav className="flex-1 mt-6 px-4 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) => 
                `flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${
                  isActive ? "bg-blue-50 text-rp" : "text-gray-500 hover:bg-gray-50"
                }`
              }
            >
              <span className="text-xl">{item.icon}</span>
              <span className="text-sm">{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button 
            onClick={() => navigate('/login')}
            className="flex items-center gap-3 w-full px-4 py-3 text-red-500 font-bold hover:bg-red-50 rounded-xl transition-all"
          >
            <FiLogOut />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Desktop Header with Profile Dropdown */}
        <header className="hidden md:flex bg-white h-16 border-b border-gray-200 px-8 sticky top-0 z-40 justify-end items-center">
          <Menu as="div" className="relative">
            <Menu.Button className="flex items-center gap-3 hover:bg-gray-50 p-2 rounded-xl transition-all">
              <div className="text-right hidden lg:block">
                <p className="text-xs font-black text-gray-800 leading-none">Officer Jean</p>
                <p className="text-[10px] text-gray-400 font-bold uppercase">Main Gate</p>
              </div>
              <div className="w-10 h-10 bg-rp text-white rounded-lg flex items-center justify-center font-bold shadow-sm">
                OJ
              </div>
              <FiChevronDown className="text-gray-400" />
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
              <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-white rounded-2xl shadow-xl border border-gray-100 focus:outline-none p-2">
                <div className="px-3 py-2 border-b border-gray-50 mb-1">
                  <p className="text-xs text-gray-400 font-bold uppercase">Account</p>
                </div>
                <Menu.Item>
                  {({ active }) => (
                    <button onClick={() => navigate('profile')} className={`${active ? 'bg-blue-50 text-rp' : 'text-gray-700'} group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-all`}>
                      <FiUser /> My Profile
                    </button>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <button className={`${active ? 'bg-blue-50 text-rp' : 'text-gray-700'} group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-all`}>
                      <FiSettings /> Shift Settings
                    </button>
                  )}
                </Menu.Item>
                <div className="mt-1 pt-1 border-t border-gray-50">
                  <Menu.Item>
                    {({ active }) => (
                      <button onClick={() => navigate('/login')} className={`${active ? 'bg-red-50 text-red-600' : 'text-red-500'} group flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-bold transition-all`}>
                        <FiLogOut /> Logout
                      </button>
                    )}
                  </Menu.Item>
                </div>
              </Menu.Items>
            </Transition>
          </Menu>
        </header>

        {/* Mobile Header (Remains unchanged) */}
        <header className="bg-rp text-white p-4 sticky top-0 z-50 flex justify-between items-center shadow-md md:hidden">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center font-bold">RP</div>
            <span className="font-bold tracking-tight">Security Portal</span>
          </div>
          <button onClick={() => navigate('/login')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <FiLogOut />
          </button>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-4 md:p-8 lg:p-12 pb-24 md:pb-8">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* --- BOTTOM BAR (Mobile Only) --- */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-2 py-3 z-50">
          <div className="flex justify-around items-center">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.end}
                className={({ isActive }) => 
                  `flex flex-col items-center gap-1 transition-all ${
                    isActive ? "text-rp scale-110" : "text-gray-400"
                  }`
                }
              >
                <span className="text-xl">{item.icon}</span>
                <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default SecurityLayout;