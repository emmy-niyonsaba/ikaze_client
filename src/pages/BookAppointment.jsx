import React, { useEffect, useState } from "react";
import { FiCalendar, FiHome, FiClock, FiInfo, FiFile, FiCheckCircle, FiAlertCircle } from "react-icons/fi";
import { useAppointmentStore } from "../store/appointmentStore";

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    rpCollege: "",
    department: "GENERAL",
    staffMember: "",
    type: "",
    startTime: "",
    endTime: "",
    description: "",
    attachmentUrls: [],
    guests: 0,
  });

  const { createAppointment,isLoading, success, error, clearErrorSuccess } = useAppointmentStore()

  const [checked, setChecked] = useState(false);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
const [guestCount, setGuestCount] = useState(0);
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

  const handleToggle = (e) => {
    setChecked(e.target.checked);
  };

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
    if (!formData.startTime) newErrors.startTime = "Start time is required";
    if (!formData.endTime) newErrors.endTime = "End time is required";

    if (!formData.description.trim())
      newErrors.description = "Description is required";

    // Time logic
    if (formData.startTime && formData.endTime) {
      const start = new Date(formData.startTime);
      const end = new Date(formData.endTime);
      const now = new Date();

      if (start <= now)
        newErrors.startTime = "Start time must be in the future";

      if (end <= start)
        newErrors.endTime = "End time must be after start time";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

      window.scrollTo({
        top:0,
        left:0,
        behavior:"instant"
      })

    const data = {
      guestList,
      ...formData,
      guests:guestList.length
    }


    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
   createAppointment(data)

    try {

      setFormData({
        rpCollege: "",
        department: "GENERAL",
        staffMember: "",
        type: "",
        startTime: "",
        endTime: "",
        description: "",
        attachmentUrls: [],
        guests: 0,
      });


    } finally {
      setIsSubmitting(false);
    }
  };


  useEffect(()=>{
  if(success || error){
     
      setErrors({})
      const timeOut = setTimeout(()=>{
        clearErrorSuccess()
      },3000)

      return ()=>clearTimeout(timeOut)
  }
  },[success,error])

  return (
    <div className="max-w-4xl mx-auto">
      {/* Success Message */}
      {isSubmitted && (
        <div className="p-6 bg-green-50 border border-green-200 rounded-xl flex items-center gap-3 mb-6">
          <FiCheckCircle className="text-green-600 w-6 h-6" />
          <span className="text-green-700 font-semibold">
            Appointment submitted successfully!
          </span>
        </div>
      )}

      <div className="py-3 my-2">
         { error && <div className="error">{error}</div> }
          { success  && <div className="success">{success}</div> }
      </div>
              

      <form onSubmit={handleSubmit} className="space-y-8 max-w-">
           

            {/* Appointment Details Section */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-xl p-6 sm:p-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-4 border-b border-gray-200 flex items-center">
                <FiCalendar className="mr-3" />
                Appointment Details
              </h2>

              
              <div className="space-y-6">
                {/* School Selection */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    <div className="flex items-center">
                      <FiHome className="mr-2" />
                      Select School Campus *
                    </div>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {colleges.map((college) => (
                      <button
                        key={college.value}
                        type="button"
                        onClick={() => setFormData({...formData, rpCollege: college.value})}
                        className={`p-5 rounded-xl border-2 transition-all text-left ${
                          formData.rpCollege === college.value
                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        } ${errors.rpCollege ? 'border-red-500' : ''}`}
                      >
                        <div className="font-bold text-lg">{college.label.split(' ')[1]}</div>
                        <div className="text-sm text-gray-600 mt-1">{college.label}</div>
                      </button>
                    ))}
                  </div>
                  {errors.rpCollege && (
                    <p className="mt-2 text-sm text-red-600">{errors.rpCollege}</p>
                  )}
                </div>

                {/* Department and Staff */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Department *
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    >
                      {departments.map((dept) => (
                        <option key={dept.value} value={dept.value}>{dept.label}</option>
                      ))}
                    </select>
                  </div>

                 {
                  formData.department == "GENERAL" && 
                   <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Specific Staff Member (Optional)
                    </label>
                    <input
                      type="text"
                      name="staffMember"
                      value={formData.staffMember}
                      onChange={handleChange}
                      placeholder="e.g., Mr. John Doe"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>
                  
                 }
                </div>

                {/* Appointment Type and Priority */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end ">
                  <div>
                    <label className="flex text-sm font-semibold text-gray-700 mb-2 items-center">
                      Appointment Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                        errors.type ? 'border-red-500' : 'border-gray-300'
                      }`}
                    >
                      <option value="">Select appointment type</option>
                      {appointmentTypes.map((type, index) => (
                        <option key={index} value={type}>{type}</option>
                      ))}
                    </select>
                    {errors.type && (
                      <p className="mt-1 text-sm text-red-600">{errors.type}</p>
                    )}
                  </div>

                  <div
                    className="flex text-sm font-semibold text-gray-700 mb-2 items-center gap-3"
                  >
                    <span>I have additional guest</span>
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={handleToggle}
                      className="w-4 h-4 cursor-pointer rounded border-gray-400"
                    />
    
                  </div>


               {checked && (
                      <div className="text-sm font-semibold text-gray-700 mb-2">
                        <label>Number of guests:</label>
                        <input
                          type="number"
                          min="1"
                          value={guestCount}
                          onChange={(e) => {
                            const value = parseInt(e.target.value || 0);
                            setGuestCount(value);

                           

                            // Auto-generate guest rows
                            const arr = Array.from({ length: value }, (_, i) => ({
                              fullname: guestList[i]?.fullname || "",
                              id: guestList[i]?.id || "",
                            }));
                            setGuestList(arr);
                          }}
                          placeholder="Enter how many guests..."
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    )}




                </div>

                {checked && guestList.length > 0 && (
                  <div className="mt-4 space-y-4">
                    <h3 className="text-md font-bold text-gray-800">Guest Information</h3>

                    {guestList.map((guest, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border border-gray-200 rounded-lg bg-gray-50"
                      >
                        <div>
                          <label className="text-sm font-semibold">Fullname</label>
                          <input
                            type="text"
                            value={guest.fullname}
                            onChange={(e) => {
                              const updated = [...guestList];
                              updated[index].fullname = e.target.value;
                              setGuestList(updated);
                            }}
                            placeholder="Enter full name"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                        </div>

                        <div>
                          <label className="text-sm font-semibold">ID</label>
                          <input
                            type="text"
                            value={guest.id}
                            onChange={(e) => {
                              const updated = [...guestList];
                              updated[index].id = e.target.value;
                              setGuestList(updated);
                            }}
                            placeholder="Enter ID number"
                            className="w-full px-4 py-2 border rounded-lg"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}


                {/* Date and Time */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-4">
                    <div className="flex items-center">
                      <FiClock className="mr-2" />
                      Appointment Schedule *
                    </div>
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        name="startTime"
                        value={formData.startTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.startTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.startTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.startTime}</p>
                      )}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date & Time *
                      </label>
                      <input
                        type="datetime-local"
                        name="endTime"
                        value={formData.endTime}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                          errors.endTime ? 'border-red-500' : 'border-gray-300'
                        }`}
                      />
                      {errors.endTime && (
                        <p className="mt-1 text-sm text-red-600">{errors.endTime}</p>
                      )}
                    </div>
                  </div>
                </div>

              

              

                {/* Recurring Appointment */}
                <div className="p-4 border border-gray-200 rounded-lg">
                  
                  
                  
                  {formData.isRecurring && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pl-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Recurrence Pattern *
                        </label>
                        <select
                          name="recurrencePattern"
                          value={formData.recurrencePattern}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.recurrencePattern ? 'border-red-500' : 'border-gray-300'
                          }`}
                        >
                          <option value="">Select pattern</option>
                          {recurrencePatterns.map((pattern) => (
                            <option key={pattern.value} value={pattern.value}>{pattern.label}</option>
                          ))}
                        </select>
                        {errors.recurrencePattern && (
                          <p className="mt-1 text-sm text-red-600">{errors.recurrencePattern}</p>
                        )}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          End Date *
                        </label>
                        <input
                          type="date"
                          name="recurrenceEndDate"
                          value={formData.recurrenceEndDate}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                            errors.recurrenceEndDate ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.recurrenceEndDate && (
                          <p className="mt-1 text-sm text-red-600">{errors.recurrenceEndDate}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                    Appointment Details *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="5"
                    placeholder="Please provide detailed information about your appointment purpose, specific requirements, or any additional notes..."
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.description && (
                    <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                  )}
                  <p className="mt-2 text-sm text-gray-500">
                    Minimum 10 characters, maximum 2000 characters
                  </p>
                </div>

                {/* Attachments */}

                {/* <div>
                  <label className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                    Supporting Documents (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      type="file"
                      id="fileUpload"
                      multiple
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="fileUpload" className="cursor-pointer">
                      <div className="text-gray-500">
                        <FiFile className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                        <p className="font-medium">Click to upload files</p>
                        <p className="text-sm mt-1">PDF, DOC, JPG, PNG up to 10MB each</p>
                      </div>
                    </label>
                  </div>
                  
                
                  {attachments.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</h4>
                      <div className="space-y-2">
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center">
                              <FiFile className="w-4 h-4 text-gray-500 mr-2" />
                              <span className="text-sm text-gray-700 truncate">{file.name}</span>
                              <span className="text-xs text-gray-500 ml-2">
                                ({(file.size / 1024).toFixed(1)} KB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeAttachment(index)}
                              className="text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div> */}
              </div>
            </div>

        
            {/* Submit Button */}
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4  bg-blue-600 text-white font-bold text-lg rounded  cursor-pointer  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:-translate-y-0.5 shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing Your Appointment...
                  </span>
                ) : 'Book Now'}
              </button>
              
              <p className="text-center text-gray-500 text-sm mt-4">
                By booking this appointment, you agree to our terms of service and privacy policy.
              </p>
            </div>

      </form>

       {/* Help Section */}
        {!isSubmitted && (
          <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
            <h3 className="font-bold text-gray-900 mb-4">Need Assistance?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-blue-600 font-bold text-xl mb-2">Email</div>
                <div className="text-gray-600 text-sm">appointments@rpschools.rw</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-blue-600 font-bold text-xl mb-2">Phone</div>
                <div className="text-gray-600 text-sm">+250 788 123 456</div>
              </div>
              <div className="text-center p-4 border border-gray-200 rounded-lg">
                <div className="text-blue-600 font-bold text-xl mb-2">Hours</div>
                <div className="text-gray-600 text-sm">Mon-Fri: 8AM-5PM</div>
              </div>
            </div>
          </div>
        )}

    </div>
  );
};

export default BookAppointment;
