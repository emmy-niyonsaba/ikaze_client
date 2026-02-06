import React, { useState } from 'react';
import {
  BarChart3, PieChart, TrendingUp, Download, Filter,
  Calendar, Building2, Users, Clock, FileText, CheckCircle,
  AlertCircle, DollarSign, Printer, Share2, RefreshCw,
  Eye, MoreVertical, Search, ChevronDown, ArrowUpRight,
  ArrowDownRight, Circle
} from 'lucide-react';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [selectedReport, setSelectedReport] = useState('overview');
  const [exportFormat, setExportFormat] = useState('csv');

  const reportTypes = [
    { id: 'overview', label: 'Overview', icon: BarChart3, color: 'bg-blue-500' },
    { id: 'colleges', label: 'Colleges', icon: Building2, color: 'bg-green-500' },
    { id: 'users', label: 'Users', icon: Users, color: 'bg-purple-500' },
    { id: 'appointments', label: 'Appointments', icon: Calendar, color: 'bg-yellow-500' },
    { id: 'security', label: 'Security', icon: AlertCircle, color: 'bg-red-500' },
    { id: 'financial', label: 'Financial', icon: DollarSign, color: 'bg-emerald-500' },
  ];

  const metrics = [
    { label: 'Total Appointments', value: '2,458', change: '+12%', trend: 'up', icon: Calendar },
    { label: 'Active Users', value: '1,842', change: '+8%', trend: 'up', icon: Users },
    { label: 'Colleges', value: '24', change: '+3', trend: 'up', icon: Building2 },
    { label: 'Avg. Check-in Time', value: '4.2min', change: '-0.5min', trend: 'down', icon: Clock },
    { label: 'Approval Rate', value: '92%', change: '+2%', trend: 'up', icon: CheckCircle },
    { label: 'System Uptime', value: '99.8%', change: '+0.1%', trend: 'up', icon: TrendingUp },
  ];

  const collegePerformance = [
    { name: 'University of Technology', appointments: 456, users: 256, approvalRate: 94, trend: 'up' },
    { name: 'Medical College', appointments: 389, users: 203, approvalRate: 91, trend: 'up' },
    { name: 'College of Engineering', appointments: 342, users: 189, approvalRate: 89, trend: 'down' },
    { name: 'Business School', appointments: 287, users: 142, approvalRate: 87, trend: 'up' },
    { name: 'Law School', appointments: 215, users: 98, approvalRate: 92, trend: 'stable' },
  ];

  const recentReports = [
    { id: 1, name: 'Monthly System Report', type: 'System', date: 'Jan 15, 2024', size: '2.4 MB', status: 'generated' },
    { id: 2, name: 'College Performance Q4 2023', type: 'Performance', date: 'Jan 10, 2024', size: '3.1 MB', status: 'generated' },
    { id: 3, name: 'User Activity Analysis', type: 'Users', date: 'Jan 5, 2024', size: '1.8 MB', status: 'pending' },
    { id: 4, name: 'Security Audit Report', type: 'Security', date: 'Jan 2, 2024', size: '4.2 MB', status: 'generated' },
  ];

  const appointmentStats = {
    byStatus: [
      { status: 'Confirmed', count: 1842, color: 'bg-green-500' },
      { status: 'Pending', count: 345, color: 'bg-yellow-500' },
      { status: 'Cancelled', count: 156, color: 'bg-red-500' },
      { status: 'Completed', count: 115, color: 'bg-blue-500' },
    ],
    byType: [
      { type: 'Meeting', count: 856, percentage: 35 },
      { type: 'Consultation', count: 642, percentage: 26 },
      { type: 'Interview', count: 478, percentage: 19 },
      { type: 'Visit', count: 324, percentage: 13 },
      { type: 'Other', count: 158, percentage: 7 },
    ],
  };

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
              {metrics.map((metric, index) => (
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

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Appointment Status Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Status</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {appointmentStats.byStatus.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${stat.color}`}></div>
                        <span className="text-sm text-gray-700">{stat.status}</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{stat.count}</span>
                        <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${stat.color.replace('bg-', 'bg-')}`}
                            style={{ width: `${(stat.count / 2458) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Appointment Types Chart */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Appointment Types</h3>
                  <button className="text-blue-600 hover:text-blue-800 text-sm">
                    View Details
                  </button>
                </div>
                <div className="space-y-4">
                  {appointmentStats.byType.map((type, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-700">{type.type}</span>
                        <span className="font-medium">{type.count} ({type.percentage}%)</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500"
                          style={{ width: `${type.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* College Performance */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">College Performance</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm">
                  View All Colleges
                </button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="py-3 text-left text-sm font-medium text-gray-500">College</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Appointments</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Users</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Approval Rate</th>
                      <th className="py-3 text-left text-sm font-medium text-gray-500">Trend</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {collegePerformance.map((college, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="py-4">
                          <div className="font-medium text-gray-900">{college.name}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-900">{college.appointments.toLocaleString()}</div>
                        </td>
                        <td className="py-4">
                          <div className="text-gray-900">{college.users.toLocaleString()}</div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center gap-2">
                            <span className="font-medium">{college.approvalRate}%</span>
                            <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-green-500"
                                style={{ width: `${college.approvalRate}%` }}
                              ></div>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className={`flex items-center gap-1 ${
                            college.trend === 'up' ? 'text-green-600' :
                            college.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {college.trend === 'up' && <ArrowUpRight className="w-4 h-4" />}
                            {college.trend === 'down' && <ArrowDownRight className="w-4 h-4" />}
                            {college.trend === 'stable' && <Circle className="w-3 h-3" />}
                            <span className="text-sm capitalize">{college.trend}</span>
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

      case 'colleges':
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">College Reports</h3>
              <p className="text-gray-600">
                Detailed reports on college performance, usage statistics, and operational metrics.
              </p>
            </div>
            {/* College-specific report content would go here */}
            <div className="text-center py-12 text-gray-500">
              <Building2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p>College report details will be displayed here.</p>
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
          <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-600">Generate and analyze system reports</p>
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
                  <option value="custom">Custom Range</option>
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
                  <option value="csv">CSV</option>
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
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
              <Printer className="w-4 h-4" />
              Print Report
            </button>
          </div>
        </div>
      </div>

      {/* Report Scheduling */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Schedule Automatic Reports</h3>
            <p className="text-gray-600">
              Set up automated report generation and delivery to your email.
            </p>
          </div>
          <div className="flex gap-3">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Daily</option>
              <option>Weekly</option>
              <option>Monthly</option>
              <option>Quarterly</option>
            </select>
            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
              Schedule Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;