import React, { useState } from 'react';
import {
  Shield, Users, Clock, AlertCircle, Eye, CheckCircle,
  XCircle, Filter, Search, Download, Plus, BarChart3,
  MapPin, Phone, Mail, Settings, RefreshCw, Calendar,
  ArrowUpRight, ArrowDownRight, ShieldAlert, Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const SecurityManager = () => {
  const [activeTab, setActiveTab] = useState('personnel');
  const [searchQuery, setSearchQuery] = useState('');

  const securityStats = [
    { label: 'Active Personnel', value: '18', change: '+2', trend: 'up', icon: Users },
    { label: 'On Duty Now', value: '6', change: '+1', trend: 'up', icon: Shield },
    { label: 'Today\'s Check-ins', value: '156', change: '+12%', trend: 'up', icon: CheckCircle },
    { label: 'Pending Issues', value: '4', change: '-2', trend: 'down', icon: AlertCircle },
  ];

  const securityPersonnel = [
    {
      id: 1,
      name: 'Officer James Wilson',
      badge: 'SEC-001',
      email: 'james.w@security.edu',
      phone: '+250 788 111 222',
      shift: 'Morning (06:00 - 14:00)',
      status: 'on_duty',
      location: 'Main Gate',
      checkinsToday: 42,
      lastActive: '10 minutes ago'
    },
    {
      id: 2,
      name: 'Officer Sarah Chen',
      badge: 'SEC-002',
      email: 'sarah.c@security.edu',
      phone: '+250 788 222 333',
      shift: 'Evening (14:00 - 22:00)',
      status: 'on_duty',
      location: 'North Gate',
      checkinsToday: 38,
      lastActive: '15 minutes ago'
    },
    {
      id: 3,
      name: 'Officer David Brown',
      badge: 'SEC-003',
      email: 'david.b@security.edu',
      phone: '+250 788 333 444',
      shift: 'Night (22:00 - 06:00)',
      status: 'off_duty',
      location: 'Dormitories',
      checkinsToday: 0,
      lastActive: '2 hours ago'
    },
    {
      id: 4,
      name: 'Officer Maria Garcia',
      badge: 'SEC-004',
      email: 'maria.g@security.edu',
      phone: '+250 788 444 555',
      shift: 'Morning (06:00 - 14:00)',
      status: 'break',
      location: 'Cafeteria',
      checkinsToday: 28,
      lastActive: '25 minutes ago'
    },
  ];

  const securityIssues = [
    { id: 1, title: 'Unauthorized access attempt', location: 'Science Building', time: 'Today, 09:30', status: 'resolved', priority: 'high' },
    { id: 2, title: 'Camera offline', location: 'Parking Lot B', time: 'Yesterday, 16:45', status: 'pending', priority: 'medium' },
    { id: 3, title: 'Visitor without appointment', location: 'Main Gate', time: 'Yesterday, 11:20', status: 'resolved', priority: 'low' },
    { id: 4, title: 'Fire alarm test required', location: 'Library', time: '2 days ago', status: 'pending', priority: 'medium' },
  ];

  const todaysCheckins = [
    { id: 1, visitor: 'John Smith', purpose: 'Meeting with Prof. Chen', time: '09:15', status: 'checked_in', department: 'Computer Science' },
    { id: 2, visitor: 'Sarah Johnson', purpose: 'Interview', time: '10:30', status: 'checked_in', department: 'Engineering' },
    { id: 3, visitor: 'David Wilson', purpose: 'Consultation', time: '11:45', status: 'checked_out', department: 'Business' },
    { id: 4, visitor: 'Lisa Brown', purpose: 'Campus tour', time: '14:20', status: 'checked_in', department: 'Admissions' },
  ];

  const renderPersonnelTab = () => (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityStats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                <div className={`flex items-center gap-1 mt-1 text-sm ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  {stat.change}
                </div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Personnel Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search security personnel..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex gap-3">
              <Link
                to="/college-admin/security-manager/add"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Personnel
              </Link>
              <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Personnel</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Shift & Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Activity</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {securityPersonnel.map((person) => (
                <tr key={person.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <Shield className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{person.name}</div>
                        <div className="text-sm text-gray-500">Badge: {person.badge}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <div className="font-medium text-gray-900">{person.shift}</div>
                      <div className="text-sm text-gray-600 flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {person.location}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm flex items-center gap-1">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {person.email}
                      </div>
                      <div className="text-sm flex items-center gap-1">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {person.phone}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="text-sm">
                        <span className="text-gray-600">Check-ins Today:</span>{' '}
                        <span className="font-medium">{person.checkinsToday}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Last active: {person.lastActive}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col gap-2">
                      <span className={`px-2 py-1 text-xs rounded-full w-fit ${
                        person.status === 'on_duty' ? 'bg-green-100 text-green-800' :
                        person.status === 'off_duty' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {person.status.replace('_', ' ')}
                      </span>
                      <button className="text-xs text-blue-600 hover:text-blue-800">
                        {person.status === 'on_duty' ? 'End Shift' : 'Start Shift'}
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-green-600 hover:bg-green-50 rounded-lg">
                        <Settings className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                        <XCircle className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderIssuesTab = () => (
    <div className="space-y-6">
      {/* Issues Summary */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Security Issues & Incidents</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Report Issue
          </button>
        </div>

        <div className="space-y-4">
          {securityIssues.map((issue) => (
            <div key={issue.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-medium text-gray-900">{issue.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      issue.priority === 'high' ? 'bg-red-100 text-red-800' :
                      issue.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {issue.priority} priority
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3 h-3" />
                      {issue.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3 h-3" />
                      {issue.time}
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    issue.status === 'resolved' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {issue.status}
                  </span>
                  <div className="flex gap-2">
                    {issue.status === 'pending' && (
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700">
                        Mark Resolved
                      </button>
                    )}
                    <button className="px-3 py-1 border border-gray-300 text-sm rounded-lg hover:bg-gray-50">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Monthly Incidents</h4>
            <BarChart3 className="w-5 h-5 text-blue-500" />
          </div>
          <p className="text-3xl font-bold">12</p>
          <p className="text-sm text-green-600 mt-1">↓ 20% from last month</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Avg Response Time</h4>
            <Clock className="w-5 h-5 text-green-500" />
          </div>
          <p className="text-3xl font-bold">4.2min</p>
          <p className="text-sm text-green-600 mt-1">↓ 0.8min improvement</p>
        </div>
        
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h4 className="font-medium text-gray-900">Resolution Rate</h4>
            <CheckCircle className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-3xl font-bold">94%</p>
          <p className="text-sm text-green-600 mt-1">↑ 3% from last month</p>
        </div>
      </div>
    </div>
  );

  const renderCheckinsTab = () => (
    <div className="space-y-6">
      {/* Today's Check-ins */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Today's Check-ins</h3>
            <p className="text-gray-600">Real-time visitor tracking</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {todaysCheckins.map((checkin) => (
            <div key={checkin.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${
                  checkin.status === 'checked_in' ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                }`}>
                  {checkin.status === 'checked_in' ? (
                    <CheckCircle className="w-5 h-5" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5" />
                  )}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{checkin.visitor}</h4>
                  <div className="text-sm text-gray-600">{checkin.purpose}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Department: {checkin.department} • Time: {checkin.time}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2 py-1 text-xs rounded-full ${
                  checkin.status === 'checked_in' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  {checkin.status.replace('_', ' ')}
                </span>
                <button className="p-2 text-gray-400 hover:text-gray-600">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Check-in Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-4">Daily Check-in Trends</h4>
          <div className="space-y-3">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map((day, idx) => (
              <div key={day} className="flex items-center justify-between">
                <span className="text-sm text-gray-600">{day}</span>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{150 + idx * 20}</span>
                  <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-500"
                      style={{ width: `${60 + idx * 8}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <h4 className="font-medium text-gray-900 mb-4">Check-in by Department</h4>
          <div className="space-y-3">
            {[
              { department: 'Computer Science', count: 156, percentage: 35 },
              { department: 'Engineering', count: 142, percentage: 32 },
              { department: 'Business', count: 98, percentage: 22 },
              { department: 'Medicine', count: 45, percentage: 10 },
            ].map((dept, idx) => (
              <div key={dept.department} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-700">{dept.department}</span>
                  <span className="font-medium">{dept.count} ({dept.percentage}%)</span>
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500"
                    style={{ width: `${dept.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Management</h1>
          <p className="text-gray-600">Manage security personnel, issues, and visitor check-ins</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export Reports
          </button>
          <Link
            to="/college-admin/security-settings"
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Settings className="w-4 h-4" />
            Security Settings
          </Link>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="flex space-x-8">
          {[
            { id: 'personnel', label: 'Security Personnel', icon: Shield },
            { id: 'issues', label: 'Issues & Incidents', icon: AlertCircle },
            { id: 'checkins', label: 'Visitor Check-ins', icon: CheckCircle },
            { id: 'settings', label: 'Security Settings', icon: Settings },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {activeTab === 'personnel' && renderPersonnelTab()}
        {activeTab === 'issues' && renderIssuesTab()}
        {activeTab === 'checkins' && renderCheckinsTab()}
        {activeTab === 'settings' && (
          <div className="text-center py-12 text-gray-500">
            <Lock className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Security settings will be configured here.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityManager;