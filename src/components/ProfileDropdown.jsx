// components/ProfileDropdown.jsx
import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiUser, FiCalendar, FiLogOut, FiChevronDown } from 'react-icons/fi';
import { FaRegCalendarAlt } from 'react-icons/fa';

const ProfileDropdown = ({ user, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    setIsOpen(false);
    if (onLogout) onLogout();
  };

  const handleMyAppointments = () => {
    setIsOpen(false);
    navigate('/appointments');
  };

  const handleBooking = () => {
    setIsOpen(false);
    navigate('/booking');
  };

  const menuItems = [
    {
      label: 'My Appointments',
      icon: <FiCalendar size={16} />,
      onClick: handleMyAppointments,
    },
    {
      label: 'Booking',
      icon: <FaRegCalendarAlt size={16} />,
      onClick: handleBooking,
    },
    {
      label: 'Logout',
      icon: <FiLogOut size={16} />,
      onClick: handleLogout,
      className: 'text-red-600 hover:bg-red-50',
    },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white">
          <FiUser size={18} />
        </div>
        <div className="hidden md:block text-left">
          <p className="text-sm font-medium text-gray-700">{user?.firstName || 'User'}</p>
          <p className="text-xs text-gray-500">{user?.email || 'user@example.com'}</p>
        </div>
        <FiChevronDown className={`text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
          {/* User Info in Dropdown */}
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="font-medium text-gray-800">{user?.firstName  || 'User'}</p>
            <p className="text-sm text-gray-500 truncate">{user?.email || 'user@example.com'}</p>
          </div>

          {/* Menu Items */}
          <div className="py-1">
            {menuItems.map((item, index) => (
              <button
                key={index}
                onClick={item.onClick}
                className={`w-full cursor-pointer flex items-center px-4 py-3 text-left text-sm text-gray-700 hover:bg-gray-50 transition-colors ${item.className || ''}`}
              >
                <span className="mr-3 text-gray-400">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;