import React, { useState } from 'react';
import {
  Search, Filter, CheckCircle, XCircle, Eye, Clock,
  User, Calendar, Download, AlertCircle, Mail, Phone,
  ArrowUpRight, ArrowDownRight, Building2, MapPin,
  FileText, Users, Shield, RefreshCw
} from 'lucide-react';

const DepartmentManagerApprovals = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedPriority, setSelectedPriority] = useState('all');

  const pendingAppointments = [
    {
      id: 1,
      referenceNumber: 'APT-20240001',
      title: 'Business Partnership Meeting',
      type: 'MEETING',
      description: 'Discussion about potential collaboration between company and department',
      startTime: '2024-01-16 14:00',
      endTime: '2024-01-16 15:00',
      createdBy: 'John Smith',
      visitorEmail: 'john.smith@techcorp.com',
      visitorPhone: '+250 788 111 222',
      visitorCompany: 'TechCorp Solutions',
      guests: 3,
      priority: 'HIGH',
      location: 'Conference Room A',
      notes: 'Bring project proposals and partnership documents',
      attachments: ['proposal.pdf'],
      submitted: '2024-01-15 10:30'
    },
    {
      id: 2,
      referenceNumber: 'APT-20240002',
      title: 'Job Interview - Senior Developer',
      type: 'INTERVIEW',
      description: 'Final round interview for senior developer position',
      startTime: '2024-01-17 10:00',
      endTime: '2024-01-17 11:30',
      createdBy: 'Sarah Johnson',
      visitorEmail: 'sarah.j@example.com',
      visitorPhone: '+250 788 222 333',
      visitorCompany: 'Freelancer',
      guests: 0,
      priority: 'MEDIUM',
      location: 'Interview Room 2',
      notes: 'Candidate brings portfolio and references',
      attachments: ['resume.pdf', 'portfolio.pdf'],
      submitted: '2024-01-14 14:45'
    },
    {
      id: 3,
      referenceNumber: 'APT-20240003',
      title: 'Equipment Consultation',
      type: 'CONSULTATION',
      description: 'Consultation about new lab equipment specifications and pricing',
      startTime: '2024-01-18 11:00',
      endTime: '2024-01-18 12:30',
      createdBy: 'David Wilson',
      visitorEmail: 'david.w@labequip.com',
      visitorPhone: '+250 788 333 444',
      visitorCompany: 'LabEquip Inc.',
      guests: 2,
      priority: 'HIGH',
      location: 'Lab 3, Science Building',
      notes: 'Technical team will demonstrate equipment',
      attachments: ['catalog.pdf', 'specs.pdf'],
      submitted: '2024-01-13 09:15'
    },
    {
      id: 4,
      referenceNumber: 'APT-20240004',
      title: 'Campus Tour - Prospective Students',
      type: 'VISIT',
      description: 'Group visit from high school students interested in computer science',
      startTime: '2024-01-19 09:00',
      endTime: '2024-01-19 11:00',
      createdBy: 'Lisa Brown',
      visitorEmail: 'lisa.b@highschool.edu',
      visitorPhone: '+250 788 444 555',
      visitorCompany: 'Green Valley High School',
      guests: 25,
      priority: 'LOW',
      location: 'Department Tour Start Point',
      notes: 'Need student ambassadors for tour',
      attachments: ['student_list.pdf'],
      submitted: '2024-01-12 16:20'
    },
  ];

  const recentDecisions = [
    {
      id: 101,
      referenceNumber: 'APT-20230098',
      title: 'Research Collaboration Meeting',
      type: 'MEETING',
      decision: 'APPROVED',
      decidedBy: 'Dr. Michael Chen',
      decidedAt: '2024-01-14 11:30',
      notes: 'Approved with room allocation'
    },
    {
      id: 102,
      referenceNumber: 'APT-20230099',
      title: 'Media Interview Request',
      type: 'INTERVIEW',
      decision: 'REJECTED',
      decidedBy: 'Prof. James Wilson',
      decidedAt: '2024-01-13 15:45',
      notes: 'Schedule conflict with department event'
    },
    {
      id: 103,
      referenceNumber: 'APT-20230100',
      title: 'Parent Consultation',
      type: 'CONSULTATION',
      decision: 'APPROVED',
      decidedBy: 'Dr. Sarah Chen',
      decidedAt: '2024-01-12 10:15',
      notes: 'Approved for virtual meeting'
    },
  ];

  const approvalStats = [
    { label: 'Pending Appointments', value: '18', change: '-3', trend: 'down', icon: Clock, color: 'bg-yellow-500' },
    { label: 'Approved Today', value: '12', change: '+4', trend: 'up', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Rejected Today', value: '3', change: '-1', trend: 'down', icon: XCircle, color: 'bg-red-500' },
  ];

  const filteredAppointments = pendingAppointments.filter(apt => {
    const matchesSearch = apt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.createdBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         apt.visitorCompany.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || apt.type === selectedType;
    const matchesPriority = selectedPriority === 'all' || apt.priority === selectedPriority;
    return matchesSearch && matchesType && matchesPriority;
  });

  const getTypeInfo = (type) => {
    switch (type) {
      case 'MEETING':
        return { label: 'Meeting', color: 'bg-blue-100 text-blue-800', icon: Users };
      case 'INTERVIEW':
        return { label: 'Interview', color: 'bg-green-100 text-green-800', icon: User };
      case 'CONSULTATION':
        return { label: 'Consultation', color: 'bg-purple-100 text-purple-800', icon: Calendar };
      case 'VISIT':
        return { label: 'Visit', color: 'bg-yellow-100 text-yellow-800', icon: Building2 };
      case 'OTHER':
        return { label: 'Other', color: 'bg-gray-100 text-gray-800', icon: FileText };
      default:
        return { label: type, color: 'bg-gray-100 text-gray-800', icon: FileText };
    }
  };

  const getPriorityInfo = (priority) => {
    switch (priority) {
      case 'HIGH':
        return { label: 'High', color: 'bg-red-100 text-red-800' };
      case 'MEDIUM':
        return { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' };
      case 'LOW':
        return { label: 'Low', color: 'bg-blue-100 text-blue-800' };
      default:
        return { label: priority, color: 'bg-gray-100 text-gray-800' };
    }
  };

  const handleApproval = (appointmentId, action) => {
    console.log(`${action} appointment ${appointmentId}`);
    // Implement approval logic
  };

  const formatDateTime = (dateTimeStr) => {
    const date = new Date(dateTimeStr);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Appointment Approvals</h1>
          <p className="text-gray-600">Review and approve pending appointments for the department</p>
        </div>
        <div className="flex gap-3">
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4" />
            Bulk Approve
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
              placeholder="Search appointments by title, reference, visitor, or company..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-3">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Types</option>
              <option value="MEETING">Meetings</option>
              <option value="INTERVIEW">Interviews</option>
              <option value="CONSULTATION">Consultations</option>
              <option value="VISIT">Visits</option>
              <option value="OTHER">Other</option>
            </select>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Priorities</option>
              <option value="HIGH">High</option>
              <option value="MEDIUM">Medium</option>
              <option value="LOW">Low</option>
            </select>
            <button className="px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              More Filters
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {approvalStats.map((stat, index) => (
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
              <div className={`${stat.color} p-3 rounded-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
       
        
      </div>
    </div>
  );
};

export default DepartmentManagerApprovals;