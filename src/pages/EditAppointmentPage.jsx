import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiCalendar, FiClock, FiCheckCircle, FiArrowLeft, FiEdit3, FiUsers, FiPlus, FiTrash2 } from "react-icons/fi";
import { useAppointmentStore } from "../store/appointmentStore";

const EditAppointmentPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const { 
    appointment, 
    getAppointmentById, 
    updateAppointment, 
    isLoading, 
    success, 
    error, 
    clearErrorSuccess 
  } = useAppointmentStore();

  const [formData, setFormData] = useState({
    rpCollege: "",
    department: "GENERAL",
    staffMember: "",
    type: "",
    startTime: "",
    endTime: "",
    description: "",
  });

  const [checked, setChecked] = useState(false);
  const [guestList, setGuestList] = useState([]);
  const [errors, setErrors] = useState({});

  // Constants
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
  ];

  const appointmentTypes = ["Admission Inquiry", "Campus Tour", "Student Consultation", "Document Submission", "Other"];

  useEffect(() => {
    getAppointmentById(id);
  }, [id, getAppointmentById]);

  // Sync Store Data to Local State
  useEffect(() => {
    if (appointment) {
      setFormData({
        rpCollege: appointment.rpCollege || "",
        department: appointment.department || "GENERAL",
        staffMember: appointment.staffMember || "",
        type: appointment.type || "",
        startTime: appointment.startTime ? new Date(appointment.startTime).toISOString().slice(0, 16) : "",
        endTime: appointment.endTime ? new Date(appointment.endTime).toISOString().slice(0, 16) : "",
        description: appointment.description || "",
      });

      // Handle your stringified guests array
      if (appointment.guests) {
        try {
          const parsedGuests = typeof appointment.guests === 'string' 
            ? JSON.parse(appointment.guests) 
            : appointment.guests;

          if (Array.isArray(parsedGuests) && parsedGuests.length > 0) {
            setChecked(true);
            setGuestList(parsedGuests);
          }
        } catch (e) {
          console.error("Error parsing guests:", e);
        }
      }
    }
  }, [appointment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleGuestChange = (index, field, value) => {
    const updated = [...guestList];
    updated[index][field] = value;
    setGuestList(updated);
  };

  const addGuestRow = () => setGuestList([...guestList, { fullname: "", id: "" }]);
  const removeGuestRow = (index) => setGuestList(guestList.filter((_, i) => i !== index));

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const dataToSubmit = {
      ...formData,
      // Convert guest array back to string for your backend
      guests: JSON.stringify(checked ? guestList : []),
    };

    await updateAppointment(id, dataToSubmit);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        clearErrorSuccess();
        // navigate("/appointments"); 
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [success, navigate, clearErrorSuccess]);

  if (isLoading && !appointment) return <div className="p-20 text-center font-bold">Loading...</div>;

  return (
    <div className="mx-auto p-4 pb-20 bg-gray-200 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-gray-500 hover:text-rp font-semibold">
            <FiArrowLeft className="mr-2" /> Back
          </button>
          <div className="flex items-center gap-2 text-gray-400">
             <FiEdit3 />
             <span className="text-sm">Ref: {appointment?.referenceNumber}</span>
          </div>
        </div>

        {error && <div className="mb-4 p-4 bg-red-50 text-red-600 rounded-xl border border-red-200">{error}</div>}
        {success && <div className="mb-4 p-4 bg-green-50 text-green-600 rounded-xl border border-green-200 flex items-center gap-2">
          <FiCheckCircle /> {success}
        </div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-rp p-6 text-white">
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FiCalendar /> Edit Appointment Information
              </h2>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              {/* College Selection Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {colleges.map((college) => (
                  <button
                    key={college.value}
                    type="button"
                    onClick={() => setFormData({ ...formData, rpCollege: college.value })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      formData.rpCollege === college.value ? "border-rp bg-blue-50" : "border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <p className="font-bold text-rp">{college.label.split(' ')[1]}</p>
                    <p className="text-xs text-gray-500">{college.label}</p>
                  </button>
                ))}
              </div>

              {/* Department & Staff */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Department</label>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    {departments.map(d => <option key={d.value} value={d.value}>{d.label}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-2">Staff Member (Optional)</label>
                  <input type="text" name="staffMember" value={formData.staffMember} onChange={handleChange} />
                </div>
              </div>

              {/* Type & Dates */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Appointment Type</label>
                    <select name="type" value={formData.type} onChange={handleChange}>
                       <option value="">Select Type</option>
                       {appointmentTypes.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Start Time</label>
                    <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
                 </div>
                 <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">End Time</label>
                    <input type="datetime-local" name="endTime" value={formData.endTime} onChange={handleChange} />
                 </div>
              </div>

              {/* Guest Section */}
              <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <FiUsers className={checked ? "text-rp" : "text-gray-400"} />
                    <span className="font-bold text-gray-700">Update Guest List?</span>
                  </div>
                  <input 
                    type="checkbox" 
                    checked={checked} 
                    onChange={(e) => {
                      setChecked(e.target.checked);
                      if(e.target.checked && guestList.length === 0) addGuestRow();
                    }} 
                  />
                </div>
                
                {checked && (
                  <div className="space-y-3">
                    {guestList.map((g, i) => (
                      <div key={i} className="flex flex-col sm:flex-row gap-2 items-start bg-white p-3 rounded-lg border border-gray-200">
                        <div className="flex-1 w-full">
                          <input 
                            placeholder="Guest Full Name" 
                            value={g.fullname} 
                            onChange={(e) => handleGuestChange(i, 'fullname', e.target.value)}
                          />
                        </div>
                        <div className="flex-1 w-full">
                          <input 
                            placeholder="ID / Passport" 
                            value={g.id} 
                            onChange={(e) => handleGuestChange(i, 'id', e.target.value)}
                          />
                        </div>
                        <button type="button" onClick={() => removeGuestRow(i)} className="p-2 text-red-500"><FiTrash2 /></button>
                      </div>
                    ))}
                    <button type="button" onClick={addGuestRow} className="text-rp text-sm font-bold flex items-center gap-1">
                      <FiPlus /> Add Guest
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Description</label>
                <textarea name="description" value={formData.description} onChange={handleChange} rows="4" />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-rp text-white font-bold rounded-xl shadow-lg hover:brightness-110 transition-all disabled:opacity-50"
              >
                {isLoading ? "Saving Changes..." : "Update Appointment"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAppointmentPage;