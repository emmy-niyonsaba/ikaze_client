import React, { useState } from "react";
import { FiSearch, FiArrowRight, FiActivity, FiUsers, FiClock } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const SecurityDashboard = () => {
  const navigate = useNavigate();
  const [ref, setRef] = useState("");

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <section>
        <h2 className="title">Hello, Officer</h2>
        <p className="subtitle">Monitor campus access for today.</p>
      </section>

      {/* Quick Search Card */}
      <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-200">
        <label className="block text-xs font-bold text-gray-400 uppercase mb-2 ml-1">Quick Verification</label>
        <div className="relative">
          <input 
            type="text" 
            placeholder="Paste Reference Number..." 
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="w-full !rounded-2xl !py-4 !pr-14" // Overriding your global CSS for extra padding
          />
          <button 
            onClick={() => navigate(`/appointments/${ref}/verify`)}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-rp text-white p-3 rounded-xl shadow-lg active:scale-90 transition-transform"
          >
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Stats Grid */}
     <div>
        <h4 className="text-gray-700 font-bold text-lg py-2">Today</h4>
         <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-5 rounded-xl border border-gray-300">
          <FiUsers className="text-rp mb-2" size={24} />
          <p className="text-2xl font-black">42</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Expected Visitors</p>
        </div>
        <div className="bg-white p-5 rounded-xl border border-gray-300">
          <FiActivity className="text-green-500 mb-2" size={24} />
          <p className="text-2xl font-black">18</p>
          <p className="text-[10px] text-gray-400 uppercase font-bold">Currently In</p>
        </div>
      </div>
     </div>

     {/* Recent List Placeholder */}
<div className="bg-white rounded-3xl p-6 border border-gray-200">
  <div className="flex justify-between items-center mb-4">
    <h3 className="font-bold text-gray-800">Recent Arrivals</h3>
    <button 
      onClick={() => navigate('appointments')} 
      className="text-xs text-rp font-bold underline"
    >
      See All
    </button>
  </div>
  
  <div className="space-y-4">
    {[
      { name: "John Doe", ref: "APT-26-001", guests: '[{"name":"A"}, {"name":"B"}]' },
      { name: "Sarah Kane", ref: "APT-26-002", guests: '[]' },
      { name: "Mike Ross", ref: "APT-26-003", guests: '[{"name":"C"}]' }
    ].map((item, i) => {
      // Logic to get guest count from your JSON string
      let guestCount = 0;
      try {
        const parsed = typeof item.guests === 'string' ? JSON.parse(item.guests) : item.guests;
        guestCount = Array.isArray(parsed) ? parsed.length : 0;
      } catch (e) {
        guestCount = 0;
      }

      return (
        <div key={i} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-xl transition-colors group">
          <div className="w-10 h-10 bg-blue-50 text-rp rounded-full flex items-center justify-center font-bold">
            {item.name.charAt(0)}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-sm font-bold text-gray-700">{item.name}</p>
              {/* Guest Count Badge */}
              {guestCount > 0 && (
                <span className="flex items-center gap-1 text-[9px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full font-bold">
                  <FiUsers size={10} /> +{guestCount}
                </span>
              )}
            </div>
            <p className="text-[10px] text-gray-400 font-mono">{item.ref}</p>
          </div>

          <div className="text-right">
            <span className="block text-[10px] font-bold text-green-600 bg-green-50 px-2 py-1 rounded-md mb-1">
              IN
            </span>
            <p className="text-[9px] text-gray-300 font-bold uppercase tracking-tighter">2 mins ago</p>
          </div>
        </div>
      );
    })}
  </div>
</div>
    </div>
  );
};

export default SecurityDashboard;