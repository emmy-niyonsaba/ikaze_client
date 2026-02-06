import React from 'react';
import { Bell } from 'lucide-react';
import ProfileDropdown from './ProfileDropdown';
import Logo from "../../assets/images/RP_Logo.jpeg"
const Topbar = () => {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={Logo} alt='logo' className='w-30'/>
          </div>

          {/* Right Side Items */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <ProfileDropdown />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;