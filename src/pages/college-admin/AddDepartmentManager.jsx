import React, { useState } from 'react';
import {
  User, Mail, Phone, Shield, Building2, Save, X,
  Search, CheckCircle, AlertCircle, Send, Copy
} from 'lucide-react';
import { Link } from 'react-router-dom';

const AddDepartmentManager = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    departmentId: '',
    permissions: {
      approve_appointments: true,
      manage_schedule: false,
      manage_staff: false,
      view_reports: true
    },
    sendInvitation: true
  });

  const [step, setStep] = useState(1);
  const [invitationSent, setInvitationSent] = useState(false);

  const departments = [
    { id: 1, name: 'Computer Science Department', head: 'Dr. Michael Chen', totalStaff: 24 },
    { id: 2, name: 'Engineering Department', head: 'Dr. Sarah Johnson', totalStaff: 32 },
    { id: 3, name: 'Business Department', head: 'Prof. David Wilson', totalStaff: 18 },
    { id: 4, name: 'Medical Department', head: 'Dr. Lisa Brown', totalStaff: 28 },
    { id: 5, name: 'Law Department', head: 'Prof. Robert Taylor', totalStaff: 15 },
    { id: 6, name: 'Arts & Humanities', head: 'Dr. Maria Garcia', totalStaff: 22 },
  ];

  const existingUsers = [
    { id: 101, name: 'Prof. James Miller', email: 'james.m@utech.edu', department: 'Computer Science' },
    { id: 102, name: 'Dr. Anna Lee', email: 'anna.l@utech.edu', department: 'Engineering' },
    { id: 103, name: 'Mr. Thomas Clark', email: 'thomas.c@utech.edu', department: 'Business' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      console.log('Form submitted:', formData);
      setInvitationSent(true);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="manager@college.edu"
                />
              </div>

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
            </div>

            {/* Existing Users */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Select Existing User</h3>
              <p className="text-gray-600 mb-4">Or choose from existing college members</p>
              
              <div className="space-y-3">
                {existingUsers.map(user => (
                  <label
                    key={user.id}
                    className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer ${
                      formData.email === user.email
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="existingUser"
                        checked={formData.email === user.email}
                        onChange={() => setFormData({
                          ...formData,
                          firstName: user.name.split(' ')[0],
                          lastName: user.name.split(' ').slice(1).join(' '),
                          email: user.email
                        })}
                        className="text-blue-600"
                      />
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-gray-600">{user.email}</div>
                        <div className="text-xs text-gray-500">Department: {user.department}</div>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setFormData({
                        ...formData,
                        firstName: user.name.split(' ')[0],
                        lastName: user.name.split(' ').slice(1).join(' '),
                        email: user.email
                      })}
                      className="text-sm text-blue-600 hover:text-blue-800"
                    >
                      Select
                    </button>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            {/* Department Selection */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Assign Department</h3>
              <p className="text-gray-600 mb-6">
                Select which department this manager will be responsible for.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {departments.map(dept => (
                  <label
                    key={dept.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      formData.departmentId === dept.id.toString()
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <input
                        type="radio"
                        name="department"
                        value={dept.id}
                        checked={formData.departmentId === dept.id.toString()}
                        onChange={(e) => setFormData({...formData, departmentId: e.target.value})}
                        className="mt-1 text-blue-600"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{dept.name}</div>
                        <div className="text-sm text-gray-600 mt-1">
                          Head: {dept.head}
                        </div>
                        <div className="text-xs text-gray-500 mt-2">
                          Total Staff: {dept.totalStaff}
                        </div>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Permissions */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">Manager Permissions</h3>
              
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium">Approve Appointments</div>
                    <div className="text-sm text-gray-600">Can approve or reject appointment requests</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.permissions.approve_appointments}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, approve_appointments: e.target.checked}
                    })}
                    className="rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium">Manage Schedule</div>
                    <div className="text-sm text-gray-600">Can set department schedule and appointment slots</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.permissions.manage_schedule}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, manage_schedule: e.target.checked}
                    })}
                    className="rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium">Manage Staff</div>
                    <div className="text-sm text-gray-600">Can add/remove department staff members</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.permissions.manage_staff}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, manage_staff: e.target.checked}
                    })}
                    className="rounded text-blue-600"
                  />
                </label>

                <label className="flex items-center justify-between p-4 border border-gray-300 rounded-lg hover:bg-gray-50">
                  <div>
                    <div className="font-medium">View Reports</div>
                    <div className="text-sm text-gray-600">Can view and export department reports</div>
                  </div>
                  <input
                    type="checkbox"
                    checked={formData.permissions.view_reports}
                    onChange={(e) => setFormData({
                      ...formData,
                      permissions: {...formData.permissions, view_reports: e.target.checked}
                    })}
                    className="rounded text-blue-600"
                  />
                </label>
              </div>
            </div>
          </div>
        );

      case 3:
        const selectedDept = departments.find(d => d.id.toString() === formData.departmentId);
        
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-blue-600" />
                <h3 className="text-lg font-medium text-gray-900">Review & Confirm</h3>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Manager Name</p>
                    <p className="font-medium">{formData.firstName} {formData.lastName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="font-medium">{formData.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Phone</p>
                    <p className="font-medium">{formData.phone || 'Not provided'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Department</p>
                    <p className="font-medium">{selectedDept?.name || 'Not selected'}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-600 mb-2">Permissions</p>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(formData.permissions).map(([key, value]) => (
                      value && (
                        <span key={key} className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                          {key.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </span>
                      )
                    ))}
                  </div>
                </div>

                {selectedDept && (
                  <div className="border-t border-blue-200 pt-4 mt-4">
                    <p className="text-sm text-gray-600 mb-2">Department Information</p>
                    <div className="text-sm text-gray-700">
                      <p>Head: {selectedDept.head}</p>
                      <p>Total Staff: {selectedDept.totalStaff}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="border border-gray-200 rounded-lg p-4">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={formData.sendInvitation}
                  onChange={(e) => setFormData({...formData, sendInvitation: e.target.checked})}
                  className="mt-1 rounded text-blue-600"
                />
                <div>
                  <div className="font-medium">Send invitation email</div>
                  <div className="text-sm text-gray-600">
                    An invitation email with setup instructions will be sent to {formData.email}
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

  if (invitationSent) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Manager Invitation Sent!</h1>
          <p className="text-gray-600 mb-6">
            An invitation has been sent to <span className="font-medium">{formData.email}</span> 
            with instructions to complete their account setup as a department manager.
          </p>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Invitation Link</span>
              <button className="text-blue-600 hover:text-blue-800 flex items-center gap-1">
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
            <code className="text-sm bg-white p-2 rounded border border-gray-200 block text-gray-800 break-all">
              https://app.example.com/invite/dept-{formData.firstName.toLowerCase()}-{Date.now().toString().slice(-6)}
            </code>
          </div>
          
          <div className="flex justify-center gap-3">
            <Link
              to="/college-admin/department-managers"
              className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Back to Managers
            </Link>
            <button
              onClick={() => {
                setInvitationSent(false);
                setStep(1);
                setFormData({
                  firstName: '',
                  lastName: '',
                  email: '',
                  phone: '',
                  departmentId: '',
                  permissions: {
                    approve_appointments: true,
                    manage_schedule: false,
                    manage_staff: false,
                    view_reports: true
                  },
                  sendInvitation: true
                });
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Another Manager
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Add Department Manager</h1>
          <p className="text-gray-600">Create a new department manager account</p>
        </div>
        <Link
          to="/college-admin/department-managers"
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <X className="w-4 h-4" />
          Cancel
        </Link>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-center">
        <div className="flex items-center">
          {[1, 2, 3].map((stepNumber) => (
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
                <span className="text-xs mt-2">
                  {stepNumber === 1 && 'Basic Info'}
                  {stepNumber === 2 && 'Department & Permissions'}
                  {stepNumber === 3 && 'Review'}
                </span>
              </div>
              {stepNumber < 3 && (
                <div className={`w-24 h-1 ${
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
          {step < 3 && (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 ml-auto"
            >
              Continue
            </button>
          )}
          {step === 3 && (
            <button
              type="submit"
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 ml-auto flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Send Invitation
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default AddDepartmentManager;