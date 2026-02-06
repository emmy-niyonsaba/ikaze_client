// components/layout/ProfileDropdown.jsx
import React from 'react';
import { Menu, Transition } from '@headlessui/react';
import { 
  User, 
  Settings, 
  LogOut, 
  ChevronDown,
  Shield,
  Building2
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const ProfileDropdown = () => {
  const { user, logout } = useAuthStore();

  console.log(user)
  const getRoleIcon = (role) => {
    switch(role) {
      case 'SUPER_ADMIN': return <Shield className="w-4 h-4" />;
      case 'COLLEGE_ADMIN': return <Building2 className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  return (
    <Menu as="div" className="relative">
      <Menu.Button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <span className="text-blue-600 font-semibold">
            {user?.firstName?.charAt(0)}{user?.lastName?.charAt(0)}
          </span>
        </div>
        <div className="text-left hidden md:block">
          <p className="text-sm font-medium text-gray-900">
            {user?.firstName} {user?.lastName}
          </p>
          <div className="flex items-center text-xs text-gray-500">
            {getRoleIcon(user?.role)}
            <span className="ml-1">{user?.role?.replace('_', ' ')}</span>
          </div>
        </div>
        <ChevronDown className="w-5 h-5 text-gray-400" />
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
        <Menu.Items className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50 focus:outline-none">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">{user?.email}</p>
            <p className="text-xs text-gray-500">{user?.phone}</p>
          </div>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/profile"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-3 text-sm text-gray-700 block`}
              >
                <User className="w-4 h-4 mr-3" />
                My Profile
              </Link>
            )}
          </Menu.Item>
          
          <Menu.Item>
            {({ active }) => (
              <Link
                to="/settings"
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center px-4 py-3 text-sm text-gray-700 block`}
              >
                <Settings className="w-4 h-4 mr-3" />
                Settings
              </Link>
            )}
          </Menu.Item>
          
          <div className="border-t border-gray-100 my-1"></div>
          
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={logout}
                className={`${
                  active ? 'bg-gray-100' : ''
                } flex items-center w-full px-4 py-3 text-sm text-red-600 text-left`}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </button>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;