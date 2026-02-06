import React, { useState } from 'react';
import {
  BarChart3, PieChart, TrendingUp, Download, Filter,
  Calendar, Building2, Users, Clock, FileText, CheckCircle,
  AlertCircle, DollarSign, Printer, Share2, RefreshCw,
  Eye, MoreVertical, Search, ChevronDown, ArrowUpRight,
  ArrowDownRight, Circle, DownloadCloud, Database, Users as UsersIcon
} from 'lucide-react';

const CollegeAdminReports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [exportFormat, setExportFormat] = useState('pdf');

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'bg-blue-500' },
    { id: 'departments', label: 'Departments', icon: Building2, color: 'bg-green-500' },
    { id: 'students', label: 'Students', icon: UsersIcon, color: 'bg-purple-500' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'bg-yellow-500' },
    { id: 'security', label: 'Security', icon: AlertCircle, color: 'bg-red-500' },
    { id: 'financial', label: 'Financial', icon: DollarSign, color: 'bg-emerald-500' },
  ];

  const collegeMetrics = [
    { label: 'Total Students', value: '2,560', change: '+4%', trend: 'up', icon: Users },
    { label: 'Active Staff', value: '342', change: '+8', trend: 'up', icon: UsersIcon },
    { label: 'Departments', value: '12', change: '+1', trend: 'up', icon: Building2 },
    { label: 'Appointments Today', value: '156', change: '+12%', trend: 'up', icon: Calendar },
    { label: 'Security Incidents', value: '4', change: '-2', trend: 'down', icon: AlertCircle },
    { label: 'Approval Rate', value: '92%', change: '+2%', trend: 'up', icon: CheckCircle },
  ];

  const departmentPerformance = [
    { name: 'Computer Science', students: 320, appointments: 156, avgRating: 4.8, trend: 'up' },
    { name: 'Engineering', students: 285, appointments: 142, avgRating: 4.6, trend: 'stable' },
    { name: 'Business', students: 310, appointments: 128, avgRating: 4.5, trend: 'up' },
    { name: 'Medicine', students: 240, appointments: 98, avgRating: 4.9, trend: 'up' },
    { name: 'Law', students: 180, appointments: 85, avgRating: 4.4, trend: 'down' },
  ];

  const appointmentAnalytics = {
    byStatus: [
      { status: 'Confirmed', count: 1842, color: 'bg-green-500' },
      { status: 'Pending', count: 345, color: 'bg-yellow-500' },
      { status: 'Cancelled', count: 156, color: 'bg-red-500' },
      { status: 'Completed', count: 115, color: 'bg-blue-500' },
    ],
    byDepartment: [
      { department: 'Computer Science', count: 456, percentage: 35 },
      { department: 'Engineering', count: 342, percentage: 26 },
      { department: 'Business', count: 287, percentage: 22 },
      { department: 'Medicine', count: 215, percentage: 17 },
    ],
  };

  const studentDemographics = [
    { year: '1st Year', count: 650, percentage: 25 },
    { year: '2nd Year', count: 620, percentage: 24 },
    { year: '3rd Year', count: 580, percentage: 23 },
    { year: '4th Year', count: 510, percentage: 20 },
    { year: 'Graduate', count: 200, percentage: 8 },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly College Report - Jan 2024', type: 'College', date: 'Jan 15, 2024', size: '3.2 MB', status: 'generated' },
    { id: 2, name: 'Department Performance Q4 2023', type: 'Performance', date: 'Jan 10, 2024', size: '2.8 MB', status: 'generated' },
    { id: 3, name: 'Student Enrollment Analysis', type: 'Students', date: 'Jan 5, 2024', size: '1.5 MB', status: 'pending' },
    { id: 4, name: 'Security Audit Report', type: 'Security', date: 'Jan 2, 2024', size: '4.5 MB', status: 'generated' },
  ];

  const generateReport = () => {
    console.log(`Generating ${selectedReport} report for ${dateRange} in ${exportFormat} format`);
    // Implement report generation logic
  };

  const renderReportContent = () => {
    switch (selectedReport) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {collegeMetrics.map((metric, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gray-100 rounded-lg">
                      <metric.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div className={`flex items-center gap-1 text-sm ${
                      metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {metric.trend === 'up' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                      {metric.change}
                    </div>
                  </div>
                  <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                  <p className="text-sm text-gray-500 mt-1">{metric.label}</p>
                </div>
              ))}
            </div>

            {/* Department Performance */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View Details
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Department</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Students</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Appointments</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Avg. Rating</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {departmentPerformance.map((dept, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{dept.name}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-900">{dept.students.toLocaleString()}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-900">{dept.appointments.toLocaleString()}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{dept.avgRating}/5</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-yellow-500"
                                style={{ width: `${dept.avgRating * 20}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className={`flex items-center gap-1 ${
                            dept.trend === 'up' ? 'text-green-600' :
                            dept.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {dept.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                            {dept.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                            {dept.trend === 'stable' && <Circle className="w-3 h-3" />}
                            <span className="text-sm capitalize">{dept.trend}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Appointment Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Appointment Status */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Status</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {appointmentAnalytics.byStatus.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                        <span className="text-sm text-gray-700">{stat.status}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{stat.count}</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${stat.color}`}
                            style={{ width: `${(stat.count / 2458) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment by Department */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appointments by Department</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {appointmentAnalytics.byDepartment.map((dept, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{dept.department}</span>
                        <span className="font-medium">{dept.count} ({dept.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
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

      case 'students':
        return (
          <div className="space-y-6">
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Student Reports</h3>
              <p className="text-gray-600">
                Detailed reports on student enrollment, demographics, and academic performance.
              </p>
            </div>

            {/* Student Demographics */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Student Demographics</h3>
              <div className="space-y-4">
                {studentDemographics.map((demo, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-700">{demo.year}</span>
                      <span className="font-medium">{demo.count} students ({demo.percentage}%)</span>
                    </div>
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-500"
                        style={{ width: `${demo.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Student Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Gender Distribution</h4>
                  <Users className="w-5 h-5 text-blue-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Male</span>
                    <span className="font-medium">58%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Female</span>
                    <span className="font-medium">42%</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">International Students</h4>
                  <Globe className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-3xl font-bold">15%</p>
                <p className="text-sm text-gray-600 mt-1">384 students from 42 countries</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Avg. GPA</h4>
                  <TrendingUp className="w-5 h-5 text-purple-500" />
                </div>
                <p className="text-3xl font-bold">3.42</p>
                <p className="text-sm text-green-600 mt-1">↑ 0.08 from last semester</p>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p>Select a report type to view detailed information.</p>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">College Reports</h1>
          <p className="text-gray-600">Generate and analyze college-specific reports</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={generateReport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" />
            Generate Report
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
            <Printer className="w-4 h-4" />
            Print
          </button>
        </div>
      </div>

      {/* Report Selection & Filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center gap-6">
          {/* Report Type Selector */}
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Report Type
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {reportTypes.map((report) => (
                <button
                  key={report.id}
                  onClick={() => setSelectedReport(report.id)}
                  className={`flex flex-col items-center p-3 rounded-lg border transition-all ${
                    selectedReport === report.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <div className={`${report.color} p-2 rounded-lg mb-2`}>
                    <report.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-sm font-medium">{report.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-4">
            <div className="flex gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Date Range
                </label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="today">Today</option>
                  <option value="week">This Week</option>
                  <option value="month">This Month</option>
                  <option value="quarter">This Quarter</option>
                  <option value="year">This Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Export Format
                </label>
                <select
                  value={exportFormat}
                  onChange={(e) => setExportFormat(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>
            </div>
            <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800">
              <Filter className="w-4 h-4" />
              <span className="text-sm">More Filters</span>
            </button>
          </div>
        </div>
      </div>

      {/* Recent Generated Reports */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Recently Generated Reports</h2>
          <button className="text-blue-600 hover:text-blue-800 text-sm">
            View All Reports
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {recentReports.map((report) => (
            <div key={report.id} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start mb-3">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FileText className="w-5 h-5 text-gray-600" />
                </div>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  report.status === 'generated' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {report.status}
                </span>
              </div>
              <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
              <div className="text-sm text-gray-500 space-y-1">
                <div>Type: {report.type}</div>
                <div>Date: {report.date}</div>
                <div>Size: {report.size}</div>
              </div>
              <div className="flex gap-2 mt-4">
                <button className="flex-1 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm">
                  <Download className="w-4 h-4 inline mr-1" />
                  Download
                </button>
                <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Main Report Content */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {renderReportContent()}
      </div>

      {/* Export Options */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Options</h3>
            <p className="text-gray-600">Choose how you want to export the current report</p>
          </div>
          <div className="flex gap-3">
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download as {exportFormat.toUpperCase()}
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Share2 className="w-4 h-4" />
              Share Report
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2">
              <Database className="w-4 h-4" />
              Save to Database
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CollegeAdminReports;