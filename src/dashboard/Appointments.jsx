import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  FiCalendar, 
  FiClock, 
  FiUser, 
  FiHome, 
  FiSearch, 
  FiFilter, 
  FiDownload, 
  FiTrash2,
  FiEdit2,
  FiEye,
  FiCheckCircle,
  FiXCircle,
  FiRefreshCw,
  FiChevronLeft,
  FiChevronRight,
  FiInfo,
  FiPlus
} from 'react-icons/fi';
import { MdPriorityHigh } from 'react-icons/md';
import { useAppointmentStore } from '../store/appointmentStore';
import {
  statusOptions,
  collegeOptions,
  calculateDuration,
  formatTime,
  formatDateTime,
  getCollegeName,
  getPriorityColor,
  getStatusColor
} from "../utils/constants";
import { useNavigate, Link } from 'react-router-dom';
import { PDFDownloadLink } from '@react-pdf/renderer';
import AppointmentPDF from '../pdf/AppointmentPDF';

const Appointments = () => {
  const { fetchAppointments, isLoading, appointments } = useAppointmentStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [collegeFilter, setCollegeFilter] = useState('ALL');
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 5;
  const navigate = useNavigate();

  // Filter appointments
  const filteredAppointments = appointments.filter(appointment => {
    const matchesSearch = searchTerm === '' || 
      (appointment.referenceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.type?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      appointment.staffMember?.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesStatus = statusFilter === 'ALL' || appointment.status === statusFilter;
    const matchesCollege = collegeFilter === 'ALL' || appointment.rpCollege === collegeFilter;
    
    return matchesSearch && matchesStatus && matchesCollege;
  });

  // Calculate statistics
  const stats = {
    total: appointments.length,
    pending: appointments.filter(a => a.status === 'PENDING').length,
    confirmed: appointments.filter(a => a.status === 'CONFIRMED').length,
    completed: appointments.filter(a => a.status === 'COMPLETED').length,
    cancelled: appointments.filter(a => a.status === 'CANCELLED').length,
  };

  // Pagination
  const totalPages = Math.ceil(filteredAppointments.length / appointmentsPerPage);
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = filteredAppointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  const handleViewDetails = (appointment) => {
    setSelectedAppointment(appointment);
  };

  const handleCancelAppointment = (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      // Your cancel logic here
      console.log('Cancel appointment:', appointmentId);
    }
  };

  const handleRefresh = () => {
    fetchAppointments();
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Effect to reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, statusFilter, collegeFilter]);

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Appointments</h1>
              <p className="text-gray-600 mt-2">Manage and track all your scheduled appointments</p>
            </div>
            <div className="flex items-center space-x-3 mt-4 md:mt-0">
              <button
                onClick={handleRefresh}
                className="flex items-center text-gray-600 hover:text-gray-900"
              >
                <FiRefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </button>
              <Link
                to="/dashboard/book-appointment"
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FiPlus className="mr-2" />
                New Appointment
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-blue-500 p-3 rounded-lg mr-4">
                <FiCalendar className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-sm text-gray-600">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-yellow-500 p-3 rounded-lg mr-4">
                <FiClock className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
                <p className="text-sm text-gray-600">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-green-500 p-3 rounded-lg mr-4">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.confirmed}</p>
                <p className="text-sm text-gray-600">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-center">
              <div className="bg-purple-500 p-3 rounded-lg mr-4">
                <FiCheckCircle className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-900">{stats.completed}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by reference, type, or name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <FiFilter className="text-gray-400 mr-3" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {statusOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Appointments Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"
        >
          {/* Table Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-gray-50">
            <h2 className="text-lg font-semibold text-gray-900">
              Appointments ({filteredAppointments.length})
            </h2>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reference
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {isLoading ? (
                  <tr>
                    <td colSpan={5}>
                      <div className='flex items-center justify-center py-12'>
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                      </div>
                    </td>
                  </tr>
                ) : currentAppointments.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-12 text-center">
                      <FiCalendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-500">No appointments found</p>
                      <p className="text-gray-400 text-sm mt-1">
                        Try adjusting your filters or book a new appointment
                      </p>
                    </td>
                  </tr>
                ) : (
                  currentAppointments.map((appointment, index) => (
                    <motion.tr
                      key={appointment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">
                          {appointment.referenceNumber}
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          {appointment.type}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <div className="flex items-center text-sm text-gray-900">
                            <FiHome className="w-4 h-4 mr-2 text-gray-400" />
                            {getCollegeName(appointment.rpCollege)}
                          </div>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <FiUser className="w-4 h-4 mr-2" />
                            {appointment.staffMember || 'Not specified'}
                          </div>
                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(appointment.priority)}`}>
                              <MdPriorityHigh className="w-3 h-3 mr-1" />
                              {appointment.priority}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {formatDateTime(appointment.startTime)}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <FiClock className="w-4 h-4 mr-1" />
                          {formatTime(appointment.startTime)} - {formatTime(appointment.endTime)}
                          <span className="ml-2 px-2 py-1 text-xs bg-gray-100 rounded">
                            {calculateDuration(appointment.startTime, appointment.endTime)}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(appointment.status)}`}>
                          {appointment.status === 'PENDING' && <FiClock className="w-4 h-4 mr-1" />}
                          {appointment.status === 'CONFIRMED' && <FiCheckCircle className="w-4 h-4 mr-1" />}
                          {appointment.status === 'COMPLETED' && <FiCheckCircle className="w-4 h-4 mr-1" />}
                          {appointment.status === 'CANCELLED' && <FiXCircle className="w-4 h-4 mr-1" />}
                          {appointment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => handleViewDetails(appointment)}
                            className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded cursor-pointer"
                            title="View Details"
                          >
                            <FiEye className="w-5 h-5" />
                          </button>
                          
                          {(appointment.status === 'PENDING' || appointment.status === 'CONFIRMED') && (
                            <>
                              <button
                                onClick={() => navigate(`/dashboard/appointments/edit/${appointment.id}`)}
                                className="text-yellow-600 hover:text-yellow-900 p-1 hover:bg-yellow-50 rounded cursor-pointer"
                              >
                                <FiEdit2 className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => handleCancelAppointment(appointment.id)}
                                className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded cursor-pointer"
                                title="Cancel"
                              >
                                <FiTrash2 className="w-5 h-5" />
                              </button>
                            </>
                          )}
                          
                          <PDFDownloadLink
                            document={<AppointmentPDF data={appointment} />}
                            fileName={`Appointment_${appointment.referenceNumber}.pdf`}
                            className="px-3 py-1 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all"
                          >
                            {({ loading }) => (
                              <>
                                <FiDownload className="w-4 h-4" />
                              </>
                            )}
                          </PDFDownloadLink>
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-200">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-700">
                  Showing <span className="font-medium">{indexOfFirstAppointment + 1}</span> to{' '}
                  <span className="font-medium">
                    {Math.min(indexOfLastAppointment, filteredAppointments.length)}
                  </span>{' '}
                  of <span className="font-medium">{filteredAppointments.length}</span> results
                </div>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronLeft className="w-5 h-5" />
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNumber;
                    if (totalPages <= 5) {
                      pageNumber = i + 1;
                    } else if (currentPage <= 3) {
                      pageNumber = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNumber = totalPages - 4 + i;
                    } else {
                      pageNumber = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNumber}
                        onClick={() => handlePageChange(pageNumber)}
                        className={`px-3 py-1 border rounded-md text-sm ${
                          currentPage === pageNumber
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {pageNumber}
                      </button>
                    );
                  })}
                  <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <FiChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </motion.div>

        {/* Selected Appointment Modal - Kept exactly as you provided */}
        {selectedAppointment && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div 
              className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm animate-in fade-in duration-300" 
              onClick={() => setSelectedAppointment(null)} 
            />
            
            {/* Modal Container */}
            <div className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col animate-in zoom-in duration-200">
              
              {/* 1. Header with Gradient */}
              <div className="relative bg-rp p-6 sm:p-8 text-white">
                <button 
                  onClick={() => setSelectedAppointment(null)}
                  className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors"
                >
                  <FiXCircle className="w-6 h-6" />
                </button>
                <div className="flex items-center gap-3 mb-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold bg-white/20 border border-white/30`}>
                    {selectedAppointment.referenceNumber}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusColor(selectedAppointment.status)} bg-white`}>
                    {selectedAppointment.status}
                  </span>
                </div>
                <h2 className="text-2xl font-bold">{selectedAppointment.type}</h2>
              </div>

              {/* 2. Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-8">
                
                {/* Basic Grid Info */}
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FiInfo className="text-blue-500" /> General Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-5 rounded-2xl border border-gray-100">
                    <div>
                      <label className="text-xs font-semibold text-gray-500">College / School</label>
                      <p className="text-gray-900 font-medium flex items-center gap-2 mt-1">
                        <FiHome className="text-gray-400" /> {getCollegeName(selectedAppointment.rpCollege)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500">Department</label>
                      <p className="text-gray-900 font-medium mt-1">{selectedAppointment.department}</p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500">Start Time</label>
                      <p className="text-gray-900 font-medium flex items-center gap-2 mt-1">
                        <FiClock className="text-gray-400" /> {formatDateTime(selectedAppointment.startTime)}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-semibold text-gray-500">End Time</label>
                      <p className="text-gray-900 font-medium flex items-center gap-2 mt-1">
                        <FiClock className="text-gray-400" /> {formatDateTime(selectedAppointment.endTime)}
                      </p>
                    </div>
                  </div>
                </section>

                {/* Guest List Section */}
                <section>
                  <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <FiUser className="text-blue-500" /> Accompanied Guests
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {(() => {
                      try {
                        const guests = typeof selectedAppointment.guests === 'string' 
                          ? JSON.parse(selectedAppointment.guests) 
                          : selectedAppointment.guests;
                        
                        if (!guests || guests.length === 0) return <p className="text-gray-400 text-sm italic">No guests registered</p>;

                        return guests.map((guest, idx) => (
                          <div key={idx} className="flex items-center gap-3 p-3 border border-gray-100 rounded-xl bg-white shadow-sm">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                              {guest.fullname?.charAt(0) || 'G'}
                            </div>
                            <div>
                              <p className="text-sm font-bold text-gray-800">{guest.fullname}</p>
                              <p className="text-[10px] text-gray-400">ID: {guest.id || 'N/A'}</p>
                            </div>
                          </div>
                        ));
                      } catch (e) {
                        return <p className="text-red-400 text-sm">Error loading guest data</p>;
                      }
                    })()}
                  </div>
                </section>

                {/* Description & Admin Notes */}
                <section className="space-y-4">
                  <div>
                    <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Purpose / Description</h3>
                    <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
                      <p className="text-gray-700 leading-relaxed text-sm italic">"{selectedAppointment.description}"</p>
                    </div>
                  </div>

                  {selectedAppointment.adminNotes && (
                    <div>
                      <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Admin Remarks</h3>
                      <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
                        <p className="text-amber-800 text-sm font-medium">{selectedAppointment.adminNotes}</p>
                      </div>
                    </div>
                  )}
                </section>

                {/* Timestamps Footer */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100 text-[10px] text-gray-400 uppercase font-bold tracking-tighter">
                  <span>Created: {new Date(selectedAppointment.createdAt).toLocaleDateString()}</span>
                  <span>Last Update: {new Date(selectedAppointment.updatedAt).toLocaleDateString()}</span>
                </div>
              </div>

              {/* 3. Action Footer */}
              <div className="p-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                <div className="mt-8 pt-6 border-t border-gray-200 flex justify-end space-x-3">
                  <PDFDownloadLink
                    document={<AppointmentPDF data={selectedAppointment} />}
                    fileName={`Appointment_${selectedAppointment.referenceNumber}.pdf`}
                    className="px-4 py-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center gap-2 transition-all font-medium"
                  >
                    {({ loading }) => (
                      <>
                        <FiDownload />
                        {loading ? 'Preparing...' : 'Download Pass'}
                      </>
                    )}
                  </PDFDownloadLink>

                  <button
                    onClick={() => setSelectedAppointment(null)}
                    className="px-4 py-2 cursor-pointer bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Appointments;