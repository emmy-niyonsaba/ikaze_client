import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  FiCalendar, 
  FiHome, 
  FiClock, 
  FiInfo, 
  FiFile, 
  FiCheckCircle, 
  FiAlertCircle,
  FiUsers,
  
  FiUser,
  FiFileText,
  FiArrowLeft
} from "react-icons/fi";
import { useAppointmentStore } from "../store/appointmentStore";

const BookAppointment = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    rpCollege: "",
    department: "GENERAL",
    staffMember: "",
    type: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    description: "",
    attachmentUrls: [],
    guests: 0,
  });

  const { createAppointment, isLoading, success, error, clearErrorSuccess } = useAppointmentStore();
  const [hasGuests, setHasGuests] = useState(false);
  const [errors, setErrors] = useState({});
  const [guestList, setGuestList] = useState([]);

  const colleges = [
    { value: "RPTUMBA", label: "RP Tumba College" },
    { value: "RPKIGALI", label: "RP Kigali College" },
    { value: "RPKARONGI", label: "RP Karongi College" },
  ];

  const departments = [
    { value: "ADMISSIONS", label: "Admissions Office" },
    { value: "ACADEMICS", label: "Academic Department" },
    { value: "FINANCE", label: "Finance Office" },
    { value: "REGISTRAR", label: "Registrar's Office" },
    { value: "GENERAL", label: "General Administration" },
    { value: "OTHER", label: "Other Department" },
  ];

  const appointmentTypes = [
    "Admission Inquiry",
    "Campus Tour",
    "Student Consultation",
    "Parent Meeting",
    "Document Submission",
    "Fee Payment",
    "Academic Advising",
    "Career Counseling",
    "Library Access",
    "Other",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.rpCollege) newErrors.rpCollege = "School campus is required";
    if (!formData.department) newErrors.department = "Department is required";
    if (!formData.type) newErrors.type = "Appointment type is required";
    if (!formData.startDate) newErrors.startDate = "Start date is required";
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endDate) newErrors.endDate = "End date is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Validate guest information if has guests
    if (hasGuests) {
      const emptyGuest = guestList.some(guest => !guest.fullname.trim());
      if (emptyGuest) {
        newErrors.guests = "All guests must have a full name";
      }
    }

    // Date validation
    if (formData.startDate && formData.endDate) {
      const startDate = new Date(formData.startDate);
      const endDate = new Date(formData.endDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      if (startDate < today) {
        newErrors.startDate = "Start date cannot be in the past";
      }
      if (endDate < startDate) {
        newErrors.endDate = "End date must be after start date";
      }
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Combine date and time
    const startDateTime = `${formData.startDate}T${formData.startTime}`;
    const endDateTime = `${formData.endDate}T${formData.endTime}`;

    const data = {
      guestList: hasGuests ? guestList.filter(g => g.fullname.trim() !== "") : [],
      ...formData,
      guests: hasGuests ? guestList.length : 0,
      startTime: startDateTime,
      endTime: endDateTime,
    };

    await createAppointment(data);
  };

  useEffect(() => {
    if (success || error) {
      setErrors({});
      const timeOut = setTimeout(() => {
        clearErrorSuccess();
      }, 3000);
      return () => clearTimeout(timeOut);
    }
  }, [success, error]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white p-4 md:p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
              >
                <FiArrowLeft className="mr-2" />
                Back
              </button>
              <h1 className="text-3xl font-bold text-gray-900">Book New Appointment</h1>
              <p className="text-gray-600 mt-2">Schedule your campus visit with ease</p>
            </div>
            
            {/* Success/Error Messages */}
            <div className="mt-4 md:mt-0">
              {error && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm"
                >
                  <FiAlertCircle className="inline mr-2" />
                  {error}
                </motion.div>
              )}
              {success && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="p-3 bg-green-50 border border-green-200 rounded-lg text-green-600 text-sm"
                >
                  <FiCheckCircle className="inline mr-2" />
                  {success}
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form - Left Column */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
            >
              <form onSubmit={handleSubmit}>
                {/* School Selection */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-4 flex items-center">
                    <FiHome className="mr-2" />
                    Select School Campus *
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {colleges.map((college) => (
                      <button
                        key={college.value}
                        type="button"
                        onClick={() => setFormData({...formData, rpCollege: college.value})}
                        className={`p-4 rounded-lg border transition-all ${
                          formData.rpCollege === college.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                        } ${errors.rpCollege ? 'border-red-500' : ''}`}
                      >
                        <div className="font-bold">{college.label.split(' ')[1]}</div>
                        <div className="text-sm text-gray-600 mt-1">{college.label}</div>
                      </button>
                    ))}
                  </div>
                  {errors.rpCollege && (
                    <p className="mt-2 text-sm text-red-600">{errors.rpCollege}</p>
                  )}
                </div>

                {/* Department and Staff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      {/* <FiBuilding className="mr-2" /> */}
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                  </div>

                  {formData.department === "GENERAL" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <FiUser className="mr-2" />
                        Specific Staff Member (Optional)
                      </label>
                      <input
                        type="text"
                        name="staffMember"
                        value={formData.staffMember}
                        onChange={handleChange}
                        placeholder="e.g., Mr. John Doe"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  )}
                </div>

                {/* Appointment Type */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Appointment Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.type ? 'border-red-500' : 'border-gray-300'
                    }`}
                  >
                    <option value="">Select appointment type</option>
                    {appointmentTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                  {errors.type && (
                    <p className="mt-2 text-sm text-red-600">{errors.type}</p>
                  )}
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiCalendar className="mr-2" />
                      Start Date & Time *
                    </label>
                    <div className="space-y-3">
                      <input
                        type="date"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.startDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min={new Date().toISOString().split('T')[0]}
                      />
                      <input
                        type="time"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.startTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {(errors.startDate || errors.startTime) && (
                      <p className="mt-2 text-sm text-red-600">{errors.startDate || errors.startTime}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                      <FiClock className="mr-2" />
                      End Date & Time *
                    </label>
                    <div className="space-y-3">
                      <input
                        type="date"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.endDate ? 'border-red-500' : 'border-gray-300'
                        }`}
                        min={formData.startDate || new Date().toISOString().split('T')[0]}
                      />
                      <input
                        type="time"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                          errors.endTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                    </div>
                    {(errors.endDate || errors.endTime) && (
                      <p className="mt-2 text-sm text-red-600">{errors.endDate || errors.endTime}</p>
                    )}
                  </div>
                </div>

                {/* Guests */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <label className="block text-sm font-medium text-gray-700 flex items-center">
                      <FiUsers className="mr-2" />
                      Additional Guests
                    </label>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-600 mr-3">Bringing guests?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setHasGuests(!hasGuests);
                          if (!hasGuests) {
                            setGuestList([{ fullname: '', id: '' }]);
                          } else {
                            setGuestList([]);
                          }
                        }}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          hasGuests ? 'bg-blue-600' : 'bg-gray-300'
                        }`}
                      >
                        <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          hasGuests ? 'translate-x-6' : 'translate-x-1'
                        }`} />
                      </button>
                    </div>
                  </div>

                  {hasGuests && (
                    <div className="space-y-4">
                      {guestList.map((guest, index) => (
                        <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50">
                          <div>
                            <label className="text-sm font-medium text-gray-700">Fullname *</label>
                            <input
                              type="text"
                              value={guest.fullname}
                              onChange={(e) => {
                                const updated = [...guestList];
                                updated[index].fullname = e.target.value;
                                setGuestList(updated);
                              }}
                              placeholder="Enter full name"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="text-sm font-medium text-gray-700">ID Number (Optional)</label>
                            <input
                              type="text"
                              value={guest.id}
                              onChange={(e) => {
                                const updated = [...guestList];
                                updated[index].id = e.target.value;
                                setGuestList(updated);
                              }}
                              placeholder="Enter ID number"
                              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      ))}
                      
                      <div className="flex justify-between">
                        <button
                          type="button"
                          onClick={() => setGuestList([...guestList, { fullname: '', id: '' }])}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          + Add Another Guest
                        </button>
                        {guestList.length > 1 && (
                          <button
                            type="button"
                            onClick={() => setGuestList(guestList.slice(0, -1))}
                            className="text-red-600 hover:text-red-800 text-sm font-medium"
                          >
                            Remove Last Guest
                          </button>
                        )}
                      </div>
                      
                      {errors.guests && (
                        <p className="mt-2 text-sm text-red-600">{errors.guests}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mb-8">
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <FiFileText className="mr-2" />
                    Appointment Details *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Please provide detailed information about your appointment purpose, specific requirements, or any additional notes..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-2 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 10 characters, maximum 2000 characters
                  </p>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing Your Appointment...
                    </span>
                  ) : (
                    "Book Appointment"
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Right Column - Info & Tips */}
          <div className="lg:col-span-1 space-y-6">
            {/* Booking Guidelines */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-blue-900 mb-4 flex items-center">
                <FiInfo className="mr-2" />
                Booking Guidelines
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-blue-800 text-sm">Book at least 24 hours in advance</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-blue-800 text-sm">Provide clear description of purpose</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-blue-800 text-sm">Include all guest information</span>
                </li>
                <li className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span>
                  <span className="text-blue-800 text-sm">Check confirmation before visiting</span>
                </li>
              </ul>
            </motion.div>

            {/* Requirements */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-purple-900 mb-4">📋 Requirements</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-3">
                    1
                  </div>
                  <span className="text-purple-800 text-sm">Valid ID required for all visitors</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-3">
                    2
                  </div>
                  <span className="text-purple-800 text-sm">APT code needed for check-in</span>
                </div>
                <div className="flex items-center">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs mr-3">
                    3
                  </div>
                  <span className="text-purple-800 text-sm">Arrive 15 minutes before appointment</span>
                </div>
              </div>
            </motion.div>

            {/* Help Section */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-green-900 mb-4">🆘 Need Assistance?</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-green-900">Email</p>
                  <p className="text-sm text-green-700">appointments@rpschools.rw</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Phone</p>
                  <p className="text-sm text-green-700">+250 788 123 456</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-900">Hours</p>
                  <p className="text-sm text-green-700">Mon-Fri: 8AM-5PM</p>
                </div>
              </div>
            </motion.div>

            {/* Estimated Timeline */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-6"
            >
              <h3 className="font-bold text-orange-900 mb-4">⏱️ Timeline</h3>
              <div className="space-y-4">
                <div className="relative">
                  <div className="w-3 h-3 bg-orange-600 rounded-full absolute left-0 top-1"></div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-orange-900">Booking Submitted</p>
                    <p className="text-xs text-orange-700">Immediately</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-[5px] top-3 bottom-3 w-0.5 bg-orange-300"></div>
                  <div className="w-3 h-3 bg-orange-600 rounded-full absolute left-0 top-1"></div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-orange-900">Review & Approval</p>
                    <p className="text-xs text-orange-700">Within 24 hours</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-[5px] top-0 bottom-3 w-0.5 bg-orange-300"></div>
                  <div className="w-3 h-3 bg-orange-600 rounded-full absolute left-0 top-1"></div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-orange-900">Confirmation</p>
                    <p className="text-xs text-orange-700">After approval</p>
                  </div>
                </div>
                <div className="relative">
                  <div className="absolute left-[5px] top-0 bottom-3 w-0.5 bg-orange-300"></div>
                  <div className="w-3 h-3 bg-orange-600 rounded-full absolute left-0 top-1"></div>
                  <div className="ml-6">
                    <p className="text-sm font-medium text-orange-900">Visit</p>
                    <p className="text-xs text-orange-700">On scheduled date</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookAppointment;