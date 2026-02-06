import React, { useState } from 'react';
import {
  Building2, MapPin, Phone, Mail, Users, BookOpen,
  Save, X, GraduationCap, Calendar, Clock, Shield,
  Plus, Trash2, Upload, CheckCircle, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

const CreateDepartment = () => {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    location: '',
    building: '',
    floor: '',
    phone: '',
    email: '',
    website: '',
    headId: '',
    establishedDate: '',
    departmentType: 'academic',
    
    // Academic Info
    totalSeats: '',
    programs: [],
    facilities: [],
    
    // Staff Information
    staffPositions: [
      { position: 'Professor', count: '' },
      { position: 'Associate Professor', count: '' },
      { position: 'Assistant Professor', count: '' },
      { position: 'Lecturer', count: '' },
      { position: 'Lab Technician', count: '' },
      { position: 'Administrative Staff', count: '' },
    ],
    
    // Operating Hours
    operatingHours: {
      monday: { open: '08:00', close: '17:00' },
      tuesday: { open: '08:00', close: '17:00' },
      wednesday: { open: '08:00', close: '17:00' },
      thursday: { open: '08:00', close: '17:00' },
      friday: { open: '08:00', close: '17:00' },
      saturday: { open: '09:00', close: '13:00' },
      sunday: { open: '', close: '' }
    },
    
    // Settings
    settings: {
      requireAppointmentApproval: true,
      allowStudentBookings: true,
      maxDailyAppointments: 30,
      appointmentDuration: 60,
      advanceBookingDays: 14
    }
  });

  const [step, setStep] = useState(1);
  const [newProgram, setNewProgram] = useState('');
  const [newFacility, setNewFacility] = useState('');

  const departmentTypes = [
    { value: 'academic', label: 'Academic Department', description: 'Teaching and research focused' },
    { value: 'administrative', label: 'Administrative Department', description: 'Support and operations' },
    { value: 'research', label: 'Research Center', description: 'Specialized research unit' },
    { value: 'service', label: 'Service Department', description: 'Student services and support' },
  ];

  const availableHeads = [
    { id: 1, name: 'Dr. Michael Chen', currentRole: 'Professor', department: 'Computer Science', email: 'michael.c@utech.edu' },
    { id: 2, name: 'Dr. Sarah Johnson', currentRole: 'Senior Lecturer', department: 'Engineering', email: 'sarah.j@utech.edu' },
    { id: 3, name: 'Prof. David Wilson', currentRole: 'Associate Professor', department: 'Business', email: 'david.w@utech.edu' },
    { id: 4, name: 'Dr. Lisa Brown', currentRole: 'Research Director', department: 'Medicine', email: 'lisa.b@utech.edu' },
  ];

  const daysOfWeek = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Department created:', formData);
    // Handle form submission
  };

  const handleDayChange = (day, field, value) => {
    setFormData(prev => ({
      ...prev,
      operatingHours: {
        ...prev.operatingHours,
        [day]: {
          ...prev.operatingHours[day],
          [field]: value
        }
      }
    }));
  };

  const addProgram = () => {
    if (newProgram.trim()) {
      setFormData(prev => ({
        ...prev,
        programs: [...prev.programs, newProgram.trim()]
      }));
      setNewProgram('');
    }
  };

  const removeProgram = (index) => {
    setFormData(prev => ({
      ...prev,
      programs: prev.programs.filter((_, i) => i !== index)
    }));
  };

  const addFacility = () => {
    if (newFacility.trim()) {
      setFormData(prev => ({
        ...prev,
        facilities: [...prev.facilities, newFacility.trim()]
      }));
      setNewFacility('');
    }
  };

  const removeFacility = (index) => {
    setFormData(prev => ({
      ...prev,
      facilities: prev.facilities.filter((_, i) => i !== index)
    }));
  };

  const updateStaffPosition = (index, count) => {
    const updatedPositions = [...formData.staffPositions];
    updatedPositions[index].count = count;
    setFormData(prev => ({
      ...prev,
      staffPositions: updatedPositions
    }));
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Computer Science Department"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.code}
                  onChange={(e) => setFormData({...formData, code: e.target.value.toUpperCase()})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., CSD"
                />
                <p className="text-xs text-gray-500 mt-1">Unique code for the department (uppercase)</p>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  rows="3"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Describe the department's purpose, goals, and key focus areas..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Type *
                </label>
                <select
                  required
                  value={formData.departmentType}
                  onChange={(e) => setFormData({...formData, departmentType: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {departmentTypes.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Established Date *
                </label>
                <input
                  type="date"
                  required
                  value={formData.establishedDate}
                  onChange={(e) => setFormData({...formData, establishedDate: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Department Head *
                </label>
                <select
                  required
                  value={formData.headId}
                  onChange={(e) => setFormData({...formData, headId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select a department head</option>
                  {availableHeads.map(head => (
                    <option key={head.id} value={head.id}>
                      {head.name} ({head.currentRole}) - {head.department}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  The department head will have administrative privileges for this department
                </p>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Location Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Location Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Building *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.building}
                    onChange={(e) => setFormData({...formData, building: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Science Building"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Floor/Room
                  </label>
                  <input
                    type="text"
                    value={formData.floor}
                    onChange={(e) => setFormData({...formData, floor: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Floor 3, Room 301"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Location Address
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Science Building, University of Technology Campus"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <div className="flex">
                    <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l-lg bg-gray-50">
                      +250
                    </span>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="flex-1 px-4 py-2 border border-gray-300 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="788 123 456"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="department@college.edu"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website
                  </label>
                  <input
                    type="url"
                    value={formData.website}
                    onChange={(e) => setFormData({...formData, website: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://department.college.edu"
                  />
                </div>
              </div>
            </div>

            {/* Programs */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Academic Programs</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newProgram}
                    onChange={(e) => setNewProgram(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addProgram()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a program (e.g., Bachelor of Computer Science)"
                  />
                  <button
                    type="button"
                    onClick={addProgram}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {formData.programs.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg">
                    {formData.programs.map((program, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <BookOpen className="w-4 h-4 text-gray-400" />
                          <span>{program}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeProgram(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-gray-200 border-dashed rounded-lg">
                    <BookOpen className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No programs added yet</p>
                  </div>
                )}
              </div>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Key Facilities</h3>
              <div className="space-y-4">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newFacility}
                    onChange={(e) => setNewFacility(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addFacility()}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Add a facility (e.g., Computer Lab 1)"
                  />
                  <button
                    type="button"
                    onClick={addFacility}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {formData.facilities.length > 0 ? (
                  <div className="border border-gray-200 rounded-lg">
                    {formData.facilities.map((facility, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border-b border-gray-200 last:border-b-0">
                        <div className="flex items-center gap-2">
                          <Building2 className="w-4 h-4 text-gray-400" />
                          <span>{facility}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFacility(index)}
                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6 border border-gray-200 border-dashed rounded-lg">
                    <Building2 className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500">No facilities added yet</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Staff Positions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Staff Positions</h3>
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-gray-600" />
                  <p className="text-sm text-gray-600">Specify the number of positions for each staff category</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {formData.staffPositions.map((position, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {position.position}
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={position.count}
                      onChange={(e) => updateStaffPosition(index, e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Number of positions"
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Operating Hours */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Operating Hours</h3>
              <div className="space-y-4">
                {daysOfWeek.map(day => (
                  <div key={day.key} className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg">
                    <div className="w-24">
                      <span className="font-medium text-gray-900">{day.label}</span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Open</label>
                        <input
                          type="time"
                          value={formData.operatingHours[day.key].open}
                          onChange={(e) => handleDayChange(day.key, 'open', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <span className="text-gray-400">to</span>
                      <div>
                        <label className="text-sm text-gray-600 mb-1 block">Close</label>
                        <input
                          type="time"
                          value={formData.operatingHours[day.key].close}
                          onChange={(e) => handleDayChange(day.key, 'close', e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="ml-auto">
                        <label className="flex items-center gap-2">
                          <input
                            type="checkbox"
                            checked={!formData.operatingHours[day.key].open}
                            onChange={(e) => {
                              if (e.target.checked) {
                                handleDayChange(day.key, 'open', '');
                                handleDayChange(day.key, 'close', '');
                              } else {
                                handleDayChange(day.key, 'open', '08:00');
                                handleDayChange(day.key, 'close', '17:00');
                              }
                            }}
                            className="rounded text-blue-600"
                          />
                          <span className="text-sm text-gray-600">Closed</span>
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Settings */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Department Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Max Daily Appointments
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="100"
                    value={formData.settings.maxDailyAppointments}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: {...formData.settings, maxDailyAppointments: parseInt(e.target.value)}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Duration (minutes)
                  </label>
                  <select
                    value={formData.settings.appointmentDuration}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: {...formData.settings, appointmentDuration: parseInt(e.target.value)}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="30">30 minutes</option>
                    <option value="45">45 minutes</option>
                    <option value="60">60 minutes</option>
                    <option value="90">90 minutes</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Advance Booking (days)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    value={formData.settings.advanceBookingDays}
                    onChange={(e) => setFormData({
                      ...formData,
                      settings: {...formData.settings, advanceBookingDays: parseInt(e.target.value)}
                    })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.settings.requireAppointmentApproval}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: {...formData.settings, requireAppointmentApproval: e.target.checked}
                      })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Require appointment approval</span>
                  </label>
                  
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.settings.allowStudentBookings}
                      onChange={(e) => setFormData({
                        ...formData,
                        settings: {...formData.settings, allowStudentBookings: e.target.checked}
                      })}
                      className="rounded text-blue-600"
                    />
                    <span className="text-sm font-medium text-gray-700">Allow student bookings</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        const selectedHead = availableHeads.find(h => h.id.toString() === formData.headId);
        const totalStaff = formData.staffPositions.reduce((sum, pos) => sum + (parseInt(pos.count) || 0), 0);
        
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Review & Confirm Department Creation</h3>
              </div>
              
              <div className="space-y-6">
                {/* Basic Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Basic Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Department Name</p>
                      <p className="font-medium">{formData.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Department Code</p>
                      <p className="font-medium">{formData.code}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Type</p>
                      <p className="font-medium">
                        {departmentTypes.find(t => t.value === formData.departmentType)?.label}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Established</p>
                      <p className="font-medium">{formData.establishedDate}</p>
                    </div>
                  </div>
                </div>

                {/* Department Head */}
                {selectedHead && (
                  <div>
                    <h4 className="font-medium text-gray-900 mb-3">Department Head</h4>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium">{selectedHead.name}</p>
                          <p className="text-sm text-gray-600">{selectedHead.email}</p>
                          <p className="text-xs text-gray-500">{selectedHead.currentRole}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Location & Contact */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Location & Contact</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{formData.building}{formData.floor ? `, ${formData.floor}` : ''}</span>
                    </div>
                    {formData.location && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin className="w-4 h-4" />
                        <span>{formData.location}</span>
                      </div>
                    )}
                    {formData.phone && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{formData.phone}</span>
                      </div>
                    )}
                    {formData.email && (
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Mail className="w-4 h-4" />
                        <span>{formData.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Academic Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Academic Information</h4>
                  <div className="space-y-4">
                    {formData.programs.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Programs Offered</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.programs.map((program, idx) => (
                            <span key={idx} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                              {program}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {formData.facilities.length > 0 && (
                      <div>
                        <p className="text-sm text-gray-600 mb-2">Key Facilities</p>
                        <div className="flex flex-wrap gap-2">
                          {formData.facilities.map((facility, idx) => (
                            <span key={idx} className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                              {facility}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    <div>
                      <p className="text-sm text-gray-600 mb-2">Staff Summary</p>
                      <div className="flex items-center gap-4">
                        <div className="text-center">
                          <p className="text-2xl font-bold">{totalStaff}</p>
                          <p className="text-xs text-gray-500">Total Staff</p>
                        </div>
                        <div className="text-sm text-gray-600">
                          {formData.staffPositions
                            .filter(pos => parseInt(pos.count) > 0)
                            .map((pos, idx) => (
                              <div key={idx} className="flex items-center gap-1">
                                <span>{pos.position}:</span>
                                <span className="font-medium">{pos.count}</span>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Settings Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">Settings Summary</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Max Daily Appointments</p>
                      <p className="font-medium">{formData.settings.maxDailyAppointments}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Appointment Duration</p>
                      <p className="font-medium">{formData.settings.appointmentDuration} minutes</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Advance Booking</p>
                      <p className="font-medium">{formData.settings.advanceBookingDays} days</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Appointment Approval</p>
                      <p className="font-medium">
                        {formData.settings.requireAppointmentApproval ? 'Required' : 'Not Required'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Final Confirmation */}
            <div className="border border-gray-200 rounded-lg p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  required
                  className="mt-1 rounded text-blue-600"
                />
                <div>
                  <div className="font-medium">Confirm Department Creation</div>
                  <div className="text-sm text-gray-600">
                    I confirm that all information provided is accurate and I have the authority to create this department.
                  </div>
                </div>
              </label>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create New Department</h1>
          <p className="text-gray-600">Add a new academic or administrative department</p>
        </div>
        <Link
          to="/college-admin/departments"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((stepNumber) => (
            <React.Fragment key={stepNumber}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  stepNumber === step
                    ? 'bg-blue-600 text-white'
                    : stepNumber < step
                    ? 'bg-green-100 text-green-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {stepNumber < step ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                </div>
                <span className="text-xs mt-2 text-center">
                  {stepNumber === 1 && 'Basic Info'}
                  {stepNumber === 2 && 'Location & Programs'}
                  {stepNumber === 3 && 'Staff & Settings'}
                  {stepNumber === 4 && 'Review'}
                </span>
              </div>
              {stepNumber < 4 && (
                <div className={`w-16 h-1 ${
                  step > stepNumber ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        {renderStepContent()}
        
        {/* Form Actions */}
        <div className="flex justify-between pt-6 mt-6 border-t border-gray-200">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back
            </button>
          )}
          {step < 4 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              Continue
            </button>
          )}
          {step === 4 && (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              Create Department
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateDepartment;