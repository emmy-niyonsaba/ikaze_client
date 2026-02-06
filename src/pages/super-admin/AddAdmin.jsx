import React, { useState, useEffect } from 'react';
import { 
  Shield, Building2, Save, X, Eye, EyeOff,
  CheckCircle, AlertCircle
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import useSuperAdminStore from '../../store/useSuperAdminStore'; 

const AddAdmin = () => {
  const { addAdmin, colleges, loading, success, error, clearState } = useSuperAdminStore();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'COLLEGE_MANAGER',
    collegeId: '',
  });

  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [invitationSent, setInvitationSent] = useState(false);

  // Clear store messages when component mounts or unmounts
  useEffect(() => {
    clearState?.();
    return () => clearState?.();
  }, []);

  // Watch for success to change view
 
  const roles = [
    { value: 'SUPER_ADMIN', label: 'Super Admin', description: 'Full system access across all colleges' },
    { value: 'COLLEGE_MANAGER', label: 'College Manager', description: 'Manage a specific college campus' },
  ];

  const handleSubmit =  (e) => {
    if (e) e.preventDefault();
    
    if (step < 3) {
      setStep(step + 1);
    } else {
      const add = addAdmin({
        ...formData,
        collegeId: formData.role === 'SUPER_ADMIN' ? null : Number(formData.collegeId)
      });

      add.then((res)=>{
         setInvitationSent(true)
      })

    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6 animate-in fade-in duration-300">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">First Name *</label>
                <input
                  type="text" required
                  value={formData.firstName}
                  onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="John"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Last Name *</label>
                <input
                  type="text" required
                  value={formData.lastName}
                  onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Email Address *</label>
                <input
                  type="email" required
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="admin@college.rw"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Phone Number</label>
                <div className="flex">
                  <span className="px-3 py-2 border border-r-0 border-gray-200 rounded-l-lg bg-gray-50 text-gray-500 text-sm font-bold">+250</span>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="flex-1 px-4 py-2 border border-gray-200 rounded-r-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="788 000 000"
                  />
                </div>
              </div>

              <div className="space-y-2 md:col-span-2">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Account Password *</label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"} required
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="••••••••"
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2 text-gray-400 hover:text-gray-600 p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div className="space-y-4">
              <label className="text-sm font-bold text-gray-700 uppercase tracking-wider">Select Administrative Role</label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {roles.map(role => (
                  <label key={role.value} className={`relative flex flex-col p-4 border-2 rounded-xl cursor-pointer transition-all ${formData.role === role.value ? 'border-blue-600 bg-blue-50/50' : 'border-gray-100 hover:border-gray-200'}`}>
                    <input
                      type="radio" name="role" value={role.value}
                      checked={formData.role === role.value}
                      onChange={(e) => setFormData({...formData, role: e.target.value})}
                      className="sr-only"
                    />
                    <div className="flex justify-between items-start mb-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-tighter ${formData.role === role.value ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                        {role.label}
                      </span>
                      {formData.role === role.value && <CheckCircle className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">{role.description}</p>
                  </label>
                ))}
              </div>
            </div>

            {formData.role === 'COLLEGE_MANAGER' && (
              <div className="space-y-4 pt-4 border-t border-gray-100 animate-in fade-in zoom-in duration-300">
                <label className="text-sm font-bold text-gray-700 uppercase tracking-wider flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" /> Assign to College
                </label>
                <select
                  required
                  value={formData.collegeId}
                  onChange={(e) => setFormData({...formData, collegeId: e.target.value})}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none bg-white font-medium"
                >
                  <option value="">Select a college campus...</option>
                  {colleges?.map(c => (
                    <option key={c.id} value={c.id}>{c.name} ({c.code})</option>
                  ))}
                </select>
              </div>
            )}
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-in zoom-in duration-300">
            {error && (
              <div className="flex items-center gap-3 p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 animate-pulse">
                <AlertCircle className="w-5 h-5 flex-shrink-0" />
                <p className="text-sm font-bold">{error}</p>
              </div>
            )}
            
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-600 rounded-lg text-white"><Shield className="w-5 h-5" /></div>
                <h3 className="text-lg font-bold text-gray-900">Summary Review</h3>
              </div>
              
              <div className="grid grid-cols-2 gap-y-6 gap-x-4">
                <DetailSummary label="Full Name" value={`${formData.firstName} ${formData.lastName}`} />
                <DetailSummary label="Role" value={roles.find(r => r.value === formData.role)?.label} />
                <DetailSummary label="Email" value={formData.email} />
                <DetailSummary label="Phone" value={formData.phone || 'N/A'} />
                <div className="col-span-2 pt-4 border-t border-gray-200">
                  <p className="text-[10px] text-gray-400 font-black uppercase mb-1">Assigned Institution</p>
                  <p className="text-sm font-bold text-gray-800">
                    {formData.role === 'SUPER_ADMIN' ? 'Global Access (All Colleges)' : 
                     colleges.find(c => c.id.toString() === formData.collegeId)?.name || 'None Selected'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default: return null;
    }
  };

  if (invitationSent) {
    return (
      <div className="max-w-md mx-auto py-12 animate-in slide-in-from-bottom duration-500">
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Admin Created!</h1>
          <p className="text-gray-500 text-sm font-medium mb-8">
            Account for <span className="text-blue-600 font-bold">{formData.email}</span> has been successfully set up.
          </p>
          <div className="flex flex-col gap-3">
            <Link to="/super-admin/admins" className="w-full py-3 bg-gray-900 text-white rounded-xl font-bold hover:bg-gray-800 transition-all">
              Return to List
            </Link>
            <button 
              onClick={() => { 
                clearState?.();
                setInvitationSent(false); 
                setStep(1); 
                setFormData({ firstName: '', lastName: '', email: '', phone: '', password: '', role: 'COLLEGE_MANAGER', collegeId: '' });
              }} 
              className="w-full py-3 text-gray-500 font-bold hover:bg-gray-50 rounded-xl"
            >
              Add Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-gray-900 tracking-tight">New College Manager</h1>
          <p className="text-gray-500 font-medium">Step {step} of 3: {step === 1 ? 'Personal Details' : step === 2 ? 'Access Level' : 'Confirmation'}</p>
        </div>
        <Link to="/super-admin/admins" className="p-2 bg-white border border-gray-200 rounded-xl text-gray-400 hover:text-red-500 hover:border-red-100 transition-all">
          <X className="w-6 h-6" />
        </Link>
      </div>

      <div className="flex gap-2">
        {[1, 2, 3].map((s) => (
          <div key={s} className={`h-1.5 flex-1 rounded-full transition-all duration-500 ${step >= s ? 'bg-blue-600' : 'bg-gray-200'}`} />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
        {renderStepContent()}
        
        <div className="flex justify-between pt-10 mt-10 border-t border-gray-100">
          {step > 1 ? (
            <button type="button" onClick={() => setStep(step - 1)} className="px-8 py-2.5 border-2 border-gray-100 rounded-xl font-bold text-gray-400 hover:bg-gray-50 transition-all" disabled={loading}>
              Back
            </button>
          ) : <div></div>}
          
          <button
            type="submit"
            disabled={loading}
            className={`px-8 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-lg ${step === 3 ? 'bg-green-600 hover:bg-green-700 shadow-green-200' : 'bg-blue-600 hover:bg-blue-700 shadow-blue-200'} text-white disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {loading ? 'Processing...' : step === 3 ? <><Save className="w-4 h-4" /> Finalize Account</> : 'Continue'}
          </button>
        </div>
      </form>
    </div>
  );
};

const DetailSummary = ({ label, value }) => (
  <div>
    <p className="text-[10px] text-gray-400 font-black uppercase mb-1 tracking-widest">{label}</p>
    <p className="text-sm font-bold text-gray-800 break-words">{value}</p>
  </div>
);

export default AddAdmin;