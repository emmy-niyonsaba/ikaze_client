import React, { useState } from 'react';
import {
  Search, Filter, Calendar, Clock, User, CheckCircle,
  XCircle, Eye, Edit, MoreVertical, Download, Plus,
  ArrowUpRight, ArrowDownRight, MapPin, Phone, Mail,
  Building2, AlertCircle, RefreshCw
} from 'lucide-react';

const DepartmentManagerAppointments = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedDate, setSelectedDate] = useState('today');

  const appointments = [
    {
      id: 1,
      visitor: 'John Smith',
      email: 'john.smith@example.com',
      phone: '+250 788 111 222',
      purpose: 'Admission Consultation',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '60 mins',
      department: 'Computer Science',
      location: 'Room 301, Science Building',
      status: 'confirmed',
      priority: 'high',
      notes: 'First-time visitor, needs guidance on course selection',
      created: '2024-01-10',
      confirmedBy: 'Dr. Michael Chen'
    },
    {
      id: 2,
      visitor: 'Sarah Johnson',
      email: 'sarah.j@example.com',
      phone: '+250 788 222 333',
      purpose: 'Project Meeting',
      date: '2024-01-15',
      time: '11:30 AM',
      duration: '45 mins',
      department: 'Computer Science',
      location: 'Lab 2, Science Building',
      status: 'confirmed',
      priority: 'medium',
      notes: 'Discuss final year project requirements',
      created: '2024-01-11',
      confirmedBy: 'Prof. James Wilson'
    },
    {
      id: 3,
      visitor: 'David Wilson',
      email: 'david.w@example.com',
      phone: '+250 788 333 444',
      purpose: 'Faculty Interview',
      date: '2024-01-15',
      time: '2:00 PM',
      duration: '90 mins',
      department: 'Computer Science',
      location: 'Conference Room A',
      status: 'pending',
      priority: 'high',
      notes: 'Candidate for lecturer position',
      created: '2024-01-12',
      confirmedBy: null
    },
    {
      id: 4,
      visitor: 'Lisa Brown',
      email: 'lisa.b@example.com',
      phone: '+250 788 444 555',
      purpose: 'Student Guidance',
      date: '2024-01-15',
      time: '3:30 PM',
      duration: '30 mins',
      department: 'Computer Science',
      location: 'Office 205',
      status: 'confirmed',
      priority: 'low',
      notes: 'Academic advising session',
      created: '2024-01-13',
      confirmedBy: 'Dr. Sarah Chen'
    },
    {
      id: 5,
      visitor: 'Robert Taylor',
      email: 'robert.t@example.com',
      phone: '+250 788 555 666',
      purpose: 'Research Collaboration',
      date: '2024-01-16',
      time: '9:00 AM',
      duration: '120 mins',
      department: 'Computer Science',
      location: 'Research Lab',
      status: 'cancelled',
      priority: 'medium',
      notes: 'Postponed to next week',
      created: '2024-01-10',
      confirmedBy: null
    },
  ];

  const filteredAppointments = appointments.filter(apt => {
    const matchesSearch = apt.visitor.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.purpose.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || apt.status === selectedStatus;
    
    const today = new Date().toISOString().split('T')[0];
    const matchesDate = selectedDate === 'all' || 
                       (selectedDate === 'today' && apt.date === today) ||
                       (selectedDate === 'upcoming' && apt.date >= today) ||
                       (selectedDate === 'past' && apt.date < today);
    
    return matchesSearch && matchesStatus && matchesDate;
  });

  const stats = [
    { label: 'Total Appointments', value: '156', change: '+12%', trend: 'up' },
    { label: 'Confirmed Today', value: '8', change: '+2', trend: 'up' },
    { label: 'Pending Approval', value: '5', change: '-3', trend: 'down' },
    { label: 'Cancelled', value: '3', change: '+1', trend: 'down' },
  ];

  const handleStatusChange = (appointmentId, newStatus) => {
    console.log(`Changing appointment ${appointmentId} to ${newStatus}`);
    // Implement status change logic
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointments Management</h1>
          <p className="text-gray-600">Manage and track department appointments</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            New Appointment
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search appointments by visitor, purpose, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="today">Today</option>
              <option value="upcoming">Upcoming</option>
              <option value="past">Past</option>
              <option value="all">All Dates</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.label}</p>
                <p className="text-2xl font-bold mt-1">{stat.value}</p>
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
              <Calendar className="w-8 h-8 text-blue-500" />
            </div>
          </div>
        ))}
      </div>

      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900">Appointments List</h3>
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <RefreshCw className="w-4 h-4" />
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                <AlertCircle className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visitor</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment Details</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status & Priority</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredAppointments.map((apt) => (
                <tr key={apt.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                        <User className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{apt.visitor}</div>
                        <div className="text-sm text-gray-500">ID: #{apt.id}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="font-medium text-gray-900">{apt.purpose}</div>
                      <div className="text-sm text-gray-600 space-y-1">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-3 h-3" />
                          {apt.date} at {apt.time}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-3 h-3" />
                          {apt.duration}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3" />
                          {apt.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1 text-sm">
                        <Mail className="w-3 h-3 text-gray-400" />
                        {apt.email}
                      </div>
                      <div className="flex items-center gap-1 text-sm">
                        <Phone className="w-3 h-3 text-gray-400" />
                        {apt.phone}
                      </div>
                      <div className="text-xs text-gray-500 mt-2">
                        Created: {apt.created}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2">
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          apt.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                          apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {apt.status}
                        </span>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          apt.priority === 'high' ? 'bg-red-100 text-red-800' :
                          apt.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {apt.priority} priority
                        </span>
                      </div>
                      {apt.confirmedBy && (
                        <div className="text-xs text-gray-500">
                          Confirmed by: {apt.confirmedBy}
                        </div>
                      )}
                      {apt.notes && (
                        <div className="text-xs text-gray-600 mt-1 truncate max-w-[200px]">
                          {apt.notes}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                        <Eye className="w-4 h-4" />
                      </button>
                      {apt.status === 'pending' && (
                        <>
                          <button
                            onClick={() => handleStatusChange(apt.id, 'confirmed')}
                            className="p-2 text-green-600 hover:bg-green-50 rounded-lg"
                          >
                            <CheckCircle className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleStatusChange(apt.id, 'cancelled')}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                          >
                            <XCircle className="w-4 h-4" />
                          </button>
                        </>
                      )}
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg">
                        <MoreVertical className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {searchQuery ? 'Try adjusting your search terms' : 'No appointments match the selected filters'}
            </p>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Appointment Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 bg-blue-50 hover:bg-blue-100 rounded-lg text-center">
            <Calendar className="w-6 h-6 text-blue-600 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Schedule New</span>
            <p className="text-sm text-gray-600 mt-1">Create a new appointment</p>
          </button>
          <button className="p-4 bg-green-50 hover:bg-green-100 rounded-lg text-center">
            <CheckCircle className="w-6 h-6 text-green-600 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Bulk Approve</span>
            <p className="text-sm text-gray-600 mt-1">Approve multiple pending appointments</p>
          </button>
          <button className="p-4 bg-purple-50 hover:bg-purple-100 rounded-lg text-center">
            <Download className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <span className="font-medium text-gray-900">Export Calendar</span>
            <p className="text-sm text-gray-600 mt-1">Download appointment schedule</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DepartmentManagerAppointments;