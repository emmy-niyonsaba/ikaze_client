// components/layout/Sidebar.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  Shield, 
  Building2,
  FileText,
  BarChart3,
  Settings,
  Bell,
  HelpCircle,
  CalendarPlus,
  History
} from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

const Sidebar = () => {
  const { user } = useAuthStore();
  
  // Role-based navigation items
  const navigationItems = {
    SUPER_ADMIN: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/super-admin/dashboard' },
      { name: 'Colleges', icon: Building2, path: '/super-admin/colleges' },
      { name: 'Admins', icon: Users, path: '/super-admin/admins' },
      { name: 'Reports', icon: BarChart3, path: '/super-admin/reports' },
      { name: 'Settings', icon: Settings, path: '/super-admin/settings' },
    ],
    COLLEGE_ADMIN: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/college-admin/dashboard' },
      { name: 'Appointments', icon: Calendar, path: '/college-admin/appointments' },
      { name: 'Department Managers', icon: Users, path: '/college-admin/managers' },
      { name: 'Security Manager', icon: Shield, path: '/college-admin/security-manager' },
      { name: 'Departments', icon: Building2, path: '/college-admin/departments' },
      { name: 'Reports', icon: BarChart3, path: '/college-admin/reports' },
    ],
    DEPARTMENT_MANAGER: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/department-manager/dashboard' },
      { name: 'Appointments', icon: Calendar, path: '/department-manager/appointments' },
      { name: 'Approvals', icon: FileText, path: '/department-manager/approvals' },
      { name: 'Reports', icon: BarChart3, path: '/department-manager/reports' },
    ],
    SECURITY_MANAGER: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/security-manager/dashboard' },
      { name: 'Security Personnel', icon: Users, path: '/security-manager/personnel' },
      { name: 'Shifts', icon: Calendar, path: '/security-manager/shifts' },
      { name: 'Reports', icon: BarChart3, path: '/security-manager/reports' },
      { name: 'Notices', icon: Bell, path: '/security-manager/notices' },
    ],
    SECURITY: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/security/dashboard' },
      { name: 'Check In/Out', icon: Calendar, path: '/security/check' },
      { name: 'Today\'s Appointments', icon: FileText, path: '/security/today' },
      { name: 'My Activity', icon: BarChart3, path: '/security/activity' },
    ],
    USER: [
      { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
      { name: 'My Appointments', icon: Calendar, path: '/appointments' },
      { name: 'Book Appointment', icon: CalendarPlus, path: '/book-appointment' },
      { name: 'History', icon: History, path: '/history' },
    ],
  };

  const items = navigationItems[user?.role] || navigationItems.USER;

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-800">Ikaze System</h2>
        <p className="text-sm text-gray-500 mt-1">{user?.role?.replace('_', ' ')}</p>
      </div>
      
      <nav className="mt-6 px-4">
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) =>
                  `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-700'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`
                }
              >
                <item.icon className="w-5 h-5 mr-3" />
                {item.name}
              </NavLink>
            </li>
          ))}
          
          {/* Help & Support Section */}
          <li className="pt-6 mt-6 border-t border-gray-200">
            <NavLink
              to="/help"
              className={({ isActive }) =>
                `flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-700 hover:bg-gray-100'
                }`
              }
            >
              <HelpCircle className="w-5 h-5 mr-3" />
              Help & Support
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;