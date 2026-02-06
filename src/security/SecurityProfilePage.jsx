import React, { useState } from "react";
import { 
  FiUser, FiMapPin, FiShield, FiClock, 
  FiPhone, FiMail, FiLogOut, FiEdit2, FiSave, FiX, FiLock, FiEye, FiEyeOff 
} from "react-icons/fi";

const SecurityProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Matches your Sequelize Model structure
  const [profileData, setProfileData] = useState({
    firstName: "Jean Bosco",
    lastName: "Niyonsaba",
    phone: "+250 788 000 000",
    email: "j.niyonsaba@rp.ac.rw",
    password: "••••••••", // Hidden by default
    // Read-only metadata
    rank: "Senior Security Officer",
    station: "Main Gate - RP Tumba",
    shift: "Day Shift (06:00 - 18:00)"
  });

  const handleSave = () => {
    setLoading(true);
    // Here you would call: await axios.put('/api/profile', profileData)
    setTimeout(() => {
      setLoading(false);
      setIsEditing(false);
      alert("Profile updated successfully!");
    }, 1000);
  };

  return (
    <div className="mx-auto space-y-6 pb-20">
      
      {/* --- HEADER CARD --- */}
      <div className="bg-white  p-8 border border-gray-300 rounded-xl shadow-sm text-center relative">
        <div className="w-28 h-28 bg-rp text-white rounded-full flex items-center justify-center text-4xl font-black mx-auto mb-4 border-8 border-blue-50">
          {profileData.firstName[0]}{profileData.lastName[0]}
        </div>

        {isEditing ? (
          <div className="flex gap-2 justify-center mb-2">
            <input 
              placeholder="First Name"
              className="text-right font-bold !text-lg !py-1 w-32 border-b-2 border-blue-200 focus:border-rp rounded-none" 
              value={profileData.firstName}
              onChange={(e) => setProfileData({...profileData, firstName: e.target.value})}
            />
            <input 
              placeholder="Last Name"
              className="text-left font-bold !text-lg !py-1 w-32 border-b-2 border-blue-200 focus:border-rp rounded-none" 
              value={profileData.lastName}
              onChange={(e) => setProfileData({...profileData, lastName: e.target.value})}
            />
          </div>
        ) : (
          <h2 className="text-2xl font-black text-gray-800 uppercase tracking-tight">
            {profileData.firstName} {profileData.lastName}
          </h2>
        )}
        
        <p className="text-rp font-bold text-sm tracking-wide">{profileData.rank}</p>

        <button 
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`absolute top-6 right-6 p-3 rounded-2xl transition-all ${
            isEditing ? "bg-green-600 text-white shadow-lg" : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
        >
          {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" /> : 
           isEditing ? <FiSave size={20} /> : <FiEdit2 size={20} />}
        </button>
      </div>

      {/* --- EDITABLE FIELDS (Based on Model) --- */}
      <div className="bg-white rounded-xl border border-gray-300 overflow-hidden shadow-sm">
        <div className="p-4 bg-gray-50 border-b border-gray-100 flex justify-between items-center">
          <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest">Account Security & Contact</h3>
          {isEditing && (
            <button onClick={() => setIsEditing(false)} className="text-red-500 text-xs font-bold flex items-center gap-1">
              <FiX /> Cancel
            </button>
          )}
        </div>
        
        <div className="divide-y divide-gray-50">
          <EditableRow 
            icon={<FiPhone />} 
            label="Phone Number" 
            value={profileData.phone} 
            isEditing={isEditing}
            onChange={(val) => setProfileData({...profileData, phone: val})}
          />
          <EditableRow 
            icon={<FiMail />} 
            label="Email Address" 
            value={profileData.email} 
            isEditing={isEditing}
            type="email"
            onChange={(val) => setProfileData({...profileData, email: val})}
          />
          <div className="flex items-center gap-4 p-4 relative">
             <div className="p-2 bg-blue-50 text-rp rounded-xl"><FiLock /></div>
             <div className="flex-1">
                <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Password</p>
                {isEditing ? (
                  <div className="relative">
                    <input 
                      type={showPassword ? "text" : "password"} 
                      value={profileData.password} 
                      onChange={(e) => setProfileData({...profileData, password: e.target.value})}
                      className="w-full  !bg-transparent border-b py-2 border-blue-200
                       focus:border-rp rounded-none text-sm font-bold text-gray-700"
                    />
                    <button 
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2 top-3 text-gray-400"
                    >
                      {showPassword ? <FiEyeOff size={16}/> : <FiEye size={16}/>}
                    </button>
                  </div>
                ) : (
                  <p className="text-sm font-bold text-gray-700">••••••••••••</p>
                )}
             </div>
          </div>
        </div>
      </div>

      {/* --- READ-ONLY METADATA (Non-Editable) --- */}
      <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 border-dashed">
        <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">Official Duty Info (Read-Only)</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-3 opacity-60">
            <FiMapPin className="text-gray-400" />
            <p className="text-sm font-bold text-gray-500">{profileData.station}</p>
          </div>
          <div className="flex items-center gap-3 opacity-60">
            <FiClock className="text-gray-400" />
            <p className="text-sm font-bold text-gray-500">{profileData.shift}</p>
          </div>
        </div>
      </div>

      <button className="button-7 py-4 bg-rp text-white  px-4 rounded   flex items-center">
        <FiLogOut /> End Shift & Logout
      </button>
    </div>
  );
};

// Reusable Editable Row Component
const EditableRow = ({ icon, label, value, isEditing, onChange, type = "text" }) => (
  <div className="flex items-center gap-4 p-4">
    <div className="p-2 bg-blue-50 text-rp rounded-xl shrink-0">{icon}</div>
    <div className="flex-1">
      <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">{label}</p>
      {isEditing ? (
        <input 
          type={type} 
          value={value} 
          onChange={(e) => onChange(e.target.value)}
          className="w-full !bg-transparent border-b py-2 border-blue-200 focus:border-rp rounded-none text-sm font-bold text-gray-700"
        />
      ) : (
        <p className="text-sm font-bold text-gray-700">{value}</p>
      )}
    </div>
  </div>
);

export default SecurityProfilePage;