import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiArrowLeft, FiAlertTriangle, FiCheckCircle, FiUser, FiMapPin, FiClock, FiActivity } from "react-icons/fi";
import { useAppointmentStore } from "../store/appointmentStore";

const AppointmentCheckPage = () => {
  const { ref } = useParams();
  const navigate = useNavigate();
  const { appointment, fetchByRef, handleCheckAction, isLoading, error, success, clearErrorSuccess } = useAppointmentStore();

  useEffect(() => {
    fetchByRef(ref);
    return () => clearErrorSuccess();
  }, [ref]);

  if (isLoading) return <div className="p-20 text-center animate-pulse font-bold text-rp">Verifying Reference...</div>;

  if (error) return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl text-center">
      <FiAlertTriangle className="text-6xl text-red-500 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-2">Verification Failed</h2>
      <p className="text-gray-500 mb-6">{error}</p>
      <button onClick={() => navigate(-1)} className="bg-rp text-white px-6 py-2 rounded-xl">Go Back</button>
    </div>
  );

  const isConfirmed = appointment?.status === "CONFIRMED";
  const isCheckedIn = !!appointment?.checkedInAt;

  // Helper to parse guests
  const guests = typeof appointment?.guests === 'string' ? JSON.parse(appointment.guests) : appointment?.guests || [];

  return (
    <div className="min-h-screen bg-gray-100 p-4 pb-20">
      <div className="max-w-2xl mx-auto space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between">
          <button onClick={() => navigate(-1)} className="p-2 hover:bg-white rounded-full transition-all text-gray-600">
            <FiArrowLeft size={24} />
          </button>
          <span className="font-mono font-bold text-gray-400">{appointment?.referenceNumber}</span>
        </div>

        {/* Warning for Non-Approved Appointments */}
        {!isConfirmed && (
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-xl flex items-start gap-3 shadow-sm">
            <FiAlertTriangle className="text-amber-500 mt-1" size={20} />
            <div>
              <h4 className="font-bold text-amber-800">Appointment Not Approved</h4>
              <p className="text-sm text-amber-700">This visit has not been confirmed by the department. Access should be restricted.</p>
            </div>
          </div>
        )}

        {/* Visitor Card */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
          <div className={`${isConfirmed ? 'bg-rp' : 'bg-gray-400'} p-6 text-white flex justify-between items-center`}>
            <div>
              <p className="text-xs opacity-80 uppercase tracking-widest font-bold">Primary Visitor</p>
              <h1 className="text-2xl font-bold">{appointment?.User?.firstName} {appointment?.User?.lastName}</h1>
            </div>
            <div className="bg-white/20 p-3 rounded-2xl">
              <FiUser size={30} />
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-rp rounded-lg"><FiMapPin /></div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Location</p>
                  <p className="text-sm font-bold text-gray-700">{appointment?.rpCollege}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 text-rp rounded-lg"><FiActivity /></div>
                <div>
                  <p className="text-[10px] uppercase text-gray-400 font-bold tracking-tighter">Department</p>
                  <p className="text-sm font-bold text-gray-700">{appointment?.department}</p>
                </div>
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Guest List */}
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase mb-3 flex items-center gap-2">
                Accompanying Guests ({guests.length})
              </h3>
              {guests.length > 0 ? (
                <div className="space-y-2">
                  {guests.map((g, i) => (
                    <div key={i} className="flex justify-between items-center bg-gray-50 p-3 rounded-xl border border-gray-100">
                      <span className="font-bold text-gray-700">{g.fullname}</span>
                      <span className="text-xs font-mono bg-white px-2 py-1 rounded border">{g.id}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 italic">No additional guests listed.</p>
              )}
            </div>

            {/* Timing */}
            <div className="bg-gray-50 p-4 rounded-2xl flex justify-between items-center">
              <div className="flex items-center gap-2 text-gray-600">
                <FiClock />
                <span className="text-sm font-semibold">
                  {new Date(appointment?.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <div className={`px-3 py-1 rounded-full text-[10px] font-bold ${isConfirmed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                {appointment?.status}
              </div>
            </div>
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-4">
          <button
            disabled={!isConfirmed || isCheckedIn}
            onClick={() => handleCheckAction(appointment.id, 'checkin')}
            className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              !isCheckedIn && isConfirmed 
              ? 'bg-green-600 text-white hover:bg-green-700 shadow-green-200' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <FiCheckCircle /> Check-In
          </button>

          <button
            disabled={!isCheckedIn}
            onClick={() => handleCheckAction(appointment.id, 'checkout')}
            className={`py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
              isCheckedIn 
              ? 'bg-rp text-white hover:bg-blue-900 shadow-blue-200' 
              : 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
            }`}
          >
            <FiActivity /> Check-Out
          </button>
        </div>

        {/* Activity Status */}
        {isCheckedIn && (
          <p className="text-center text-xs font-bold text-green-600 animate-pulse">
            Currently on Campus (Arrived: {new Date(appointment.checkedInAt).toLocaleTimeString()})
          </p>
        )}
      </div>
    </div>
  );
};

export default AppointmentCheckPage;