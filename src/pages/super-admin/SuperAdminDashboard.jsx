import React, { useEffect } from 'react';
import { 
  Building2, Users, Shield, Download, 
  ChevronRight, RefreshCcw
} from 'lucide-react';
import useSuperAdminStore from '../../store/useSuperAdminStore';

const SuperAdminDashboard = () => {
  const [timeRange, setTimeRange] = React.useState('month');
  
  const { 
    colleges, 
    stats, 
    systemHealth,
    loading, 
    fetchDashboardData,
    fetchSystemHealth 
  } = useSuperAdminStore();

  useEffect(() => {
    // Initial data load
    fetchDashboardData();
    fetchSystemHealth();

    // Set up interval for system health polling (every 30s)
    // const healthInterval = setInterval(fetchSystemHealth, 30000);
    // return () => clearInterval(healthInterval);
  }, [fetchDashboardData, fetchSystemHealth]);

  const statCards = [
    { label: 'Total Colleges', value: stats.totalColleges, icon: Building2, color: 'bg-blue-600' },
    { label: 'Active Users', value: stats.activeUsers, icon: Users, color: 'bg-emerald-600' },
    { label: 'Total Admins', value: stats.totalAdmins, icon: Shield, color: 'bg-amber-600' },
  ];

  return (
    <div className="p-6 space-y-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black title tracking-tight uppercase">Dashboard</h1>
          <p className="text-gray-500 font-medium">Overview and college management</p>
        </div>
        <div className="flex gap-3">
          <select 
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-4 py-2 border border-gray-200 rounded-xl bg-white text-sm font-bold outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <button className="px-5 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 flex items-center gap-2 text-sm font-bold shadow-sm transition-all">
            <Download className="w-4 h-4" /> Export Report
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{stat.label}</p>
                <p className="text-3xl font-black mt-1 text-gray-900">
                  {loading ? '...' : stat.value}
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl shadow-lg shadow-current/20`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className={`absolute -right-4 -bottom-4 w-24 h-24 rounded-full opacity-5 transition-transform group-hover:scale-150 ${stat.color}`}></div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Recent Colleges */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-5 border-b border-gray-50 flex justify-between items-center">
              <h2 className="font-black text-gray-900 uppercase tracking-tight flex items-center gap-2">
                <Building2 className="w-5 h-5 text-blue-500" /> Recent Colleges
              </h2>
              <button 
                onClick={fetchDashboardData}
                className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-blue-600 transition-colors"
              >
                <RefreshCcw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
              </button>
            </div>
            <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-100 bg-gray-50/50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Institution</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Manager</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Created</th>
                        <th className="px-6 py-4 text-right"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {colleges.map((college, index) => (
                        <tr key={college.id || index} className="hover:bg-blue-50/30 transition-colors group">

                          <td className="px-6 py-4">
                            <div className="flex flex-col  ">
                              <div className=" bg-gray-50 rounded-lg  border border-gray-100 font-bold text-blue-600 uppercase text-xs">
                                {college.code}
                              </div>
                              <span className="font-semibold text-sm text-gray-900">{college.name}</span>
                            </div>
                          </td>

                          <td className="px-6 py-4 text-sm text-gray-500 font-medium">
                            {college.manager ? (
                              <div className="flex flex-col">
                                <span className="text-gray-900 font-bold">{college.manager.firstName} {college.manager.lastName}</span>
                                <span className="text-[10px] text-gray-400">{college.manager.email}</span>
                              </div>
                            ) : (
                              <span className="italic text-gray-300">Unassigned</span>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span className={`px-2 py-1 text-[10px] font-black uppercase rounded-lg ${college.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {college.isActive ? 'Active' : 'Inactive'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-[10px] text-gray-400 font-bold uppercase">
                            {new Date(college.createdAt).toLocaleDateString()}
                          </td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {colleges.length === 0 && !loading && (
                    <div className="p-12 text-center text-gray-400 font-medium uppercase tracking-widest text-xs">
                      No colleges found.
                    </div>
                  )}
                </div>
          </div>
        </div>

        {/* Right: Dynamic System Health */}
        <div className="space-y-6">
          <div className="bg-gray-900 rounded-3xl p-6 text-white shadow-xl shadow-gray-200 border border-gray-800">
            <h3 className="font-black text-lg mb-1 uppercase tracking-tight">System Health</h3>
            <p className="text-gray-500 text-[10px] font-bold uppercase mb-6 tracking-widest">Live Monitoring</p>
            <div className="space-y-3">
              <HealthItem 
                label="API Server" 
                status={systemHealth.api} 
                isAlert={systemHealth.api === 'Error' || systemHealth.api === 'Down'}
              />
              <HealthItem 
                label="Database" 
                status={systemHealth.database} 
                isAlert={systemHealth.database === 'Error' || systemHealth.database === 'Down'}
              />
              <HealthItem 
                label="Storage" 
                status={systemHealth.storage} 
                isAlert={false}
              />
            </div>
            <div className="mt-6 pt-6 border-t border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">All Systems Operational</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HealthItem = ({ label, status, isAlert }) => (
  <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/[0.08] transition-colors">
    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{label}</span>
    <span className={`text-[10px] font-black uppercase tracking-widest ${isAlert ? 'text-red-400' : 'text-emerald-400'}`}>
      {status}
    </span>
  </div>
);

export default SuperAdminDashboard;