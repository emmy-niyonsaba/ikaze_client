import React, { useState } from "react";
import { FiPhone, FiExternalLink, FiClock, FiSearch, FiLogIn, FiLogOut, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SecurityAppointmentsPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  
  // Mock data - In production, "status" could be 'CONFIRMED', 'CHECKED_IN', or 'COMPLETED'
  const [appointments, setAppointments] = useState([
    { id: 1, name: "Emmanuel Niyonsaba", ref: "APT-26-000006", time: "10:30 AM", status: "CONFIRMED", phone: "0780000000" },
    { id: 2, name: "Alice Umutoni", ref: "APT-26-000009", time: "11:00 AM", status: "CHECKED_IN", phone: "0790000000" },
    { id: 3, name: "Justin Kagame", ref: "APT-26-000012", time: "01:45 PM", status: "CONFIRMED", phone: "0781234567" },
  ]);

  const handleAction = (id, newStatus) => {
    // This logic would normally be an API call to your Sequelize backend
    setAppointments(prev => 
      prev.map(apt => apt.id === id ? { ...apt, status: newStatus } : apt)
    );
    alert(`${newStatus === 'CHECKED_IN' ? 'Check-in' : 'Check-out'} successful`);
  };

  const filteredApts = appointments.filter(apt => 
    apt.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    apt.ref.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="title">Daily Appointments</h2>
          <p className="subtitle">Confirmed visits for today</p>
        </div>
        <div className="text-right">
          <span className="text-[10px] font-bold bg-blue-100 text-rp px-3 py-1 rounded-full uppercase tracking-wider">
            Jan 07, 2026
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <input 
          type="text" 
          placeholder="Search visitor name or reference..." 
          className="w-full pl-12 pr-4 py-4 bg-white border border-gray-200 rounded-2xl shadow-sm focus:ring-2 focus:ring-rp/20 outline-none transition-all"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* List Area */}
      <div className="grid gap-4">
        {filteredApts.length > 0 ? (
          filteredApts.map((apt) => (
            <div key={apt.id} className="bg-white p-5 rounded-xl border border-gray-300 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center font-black text-xl shadow-inner ${
                  apt.status === 'CHECKED_IN' ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                }`}>
                  {apt.status === 'CHECKED_IN' ? <FiCheckCircle /> : apt.name.charAt(0)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-gray-800">{apt.name}</h4>
                    {apt.status === 'CHECKED_IN' && (
                      <span className="text-[9px] font-black bg-green-500 text-white px-2 py-0.5 rounded-md animate-pulse">INSIDE</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-gray-400 font-mono mt-0.5">
                    <FiClock className="text-rp" /> {apt.time} • <span className="text-gray-600 font-bold">{apt.ref}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2 border-t sm:border-t-0 pt-3 sm:pt-0">
                {/* Contact Button */}
                <a href={`tel:${apt.phone}`} className="p-3 bg-gray-50 text-gray-500 rounded-xl hover:bg-blue-50 hover:text-rp transition-all active:scale-90">
                  <FiPhone size={18} />
                </a>

                {/* Primary Action Button */}
                {apt.status === "CONFIRMED" ? (
                  <button 
                    onClick={() => handleAction(apt.id, 'CHECKED_IN')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-rp text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all active:scale-95"
                  >
                    <FiLogIn /> Check In
                  </button>
                ) : (
                  <button 
                    onClick={() => handleAction(apt.id, 'COMPLETED')}
                    className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-100 hover:bg-orange-600 transition-all active:scale-95"
                  >
                    <FiLogOut /> Check Out
                  </button>
                )}

                {/* Details Link */}
                <button 
                  onClick={() => navigate(`/appointments/${apt.ref}/verify`)}
                  className="p-3 bg-gray-100 text-gray-400 rounded-xl hover:bg-gray-200 transition-all"
                >
                  <FiExternalLink size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
            <p className="text-gray-400 font-bold">No appointments found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SecurityAppointmentsPage;