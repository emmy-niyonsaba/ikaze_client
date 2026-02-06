import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import http from "../utils/http";

const useSuperAdminStore = create(
  persist(
    (set, get) => ({
      colleges: [],
      collegeAdmins: [],
      systemHealth: {
        api: 'Checking...',
        database: 'Checking...',
        storage: 'Checking...'
      },
      stats: {
        totalColleges: 0,
        activeUsers: 0,
        totalAdmins: 0,
        growth: 0
      },
      loading: false,
      error: null,
      managers:[],
      success:null,
      addAdmin: async (adminData) => {
          set({ loading: true, error:null });
          try {
            const response = await http.post('/super-admin/college-admins', adminData);
            
            // Update local state with the new admin
            set((state) => ({
              admins: [...state.admins, response.data],
              loading: false,
              success:true,
              error:null
            }));
             
            return response;
          } catch (error) {
            const message = error.response?.data?.message ;
            set({ loading: false,error:message });
            return false;
          }
        },
      


       fetchManagers: async () => {
          set({ loading: true, error: null });
          try {
            const response = await http.get('super-admin/college-admins'); 
            
            if (response.data.success) {
              set({ 
                managers: response.data.data, 
                loading: false 
              });
            }
            console.log("asdasdsdsa")
            return response.data;
          } catch (err) {
            set({ 
              error: err.response?.data?.message || "Failed to fetch managers", 
              loading: false 
            });
          }
        },
      fetchDashboardData: async () => {
        set({ loading: true });
        try {
          const response = await http.get('super-admin/stats/summary');
          const { summary, recentColleges } = response.data.data;
          set({ 
            stats: summary,
            colleges: recentColleges, // Pre-populates the dashboard list
            loading: false 
          });
        } catch (error) {
          set({ error: error.response?.data?.message || error.message, loading: false });
        }
      },

      fetchSystemHealth: async () => {
        try {
          const response = await http.get('/system/health');
          set({ systemHealth: response.data.data.services });
        } catch (error) {
          set({ systemHealth: { api: 'Error', database: 'Error', storage: 'Error' } });
        }
      },

      // --- College Management (/api/manage/colleges) ---
      fetchColleges: async () => {
        set({ loading: true });
        try {
          const response = await http.get('super-admin/colleges');
          set({ 
            colleges: response.data.data, 
            loading: false 
          });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      createCollege: async (collegeData) => {
        set({ loading: true });
        try {
          const response = await http.post('super-admin/colleges', collegeData);
          set((state) => ({ 
            colleges: [response.data.data, ...state.colleges],
            loading: false,
            error:null,
            success:response.data.message
          }));
        } catch (error) {
          set({ error: error.response?.data?.message || "Failed to create college", loading: false });
        }
      },

      // --- Admin Management (/api/manage/admins) ---
      fetchCollegeAdmins: async () => {
        set({ loading: true });
        try {
          const response = await http.get('super-admin/admins');
          set({ 
            collegeAdmins: response.data.data, 
            loading: false 
          });
        } catch (error) {
          set({ error: error.message, loading: false });
        }
      },

      toggleAdminStatus: async (adminId) => {
        try {
          const response = await http.patch(`super-admin/admins/${adminId}/status`);
          const updatedStatus = response.data.data.isActive;
          
          set((state) => ({
            collegeAdmins: state.collegeAdmins.map(admin => 
              admin.id === adminId ? { ...admin, isActive: updatedStatus } : admin
            )
          }));
        } catch (error) {
          set({ error: "Failed to update status" });
        }
      },

      clearError: () => set({ error: null }),
      clearState: () => set({ 
        loading: false, 
        success: false, 
        error: null 
      }),
    }),
    {
      name: 'super-admin-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        // We persist the data but NOT the transient UI states like loading/error
        colleges: state.colleges,
        collegeAdmins: state.collegeAdmins,
        stats: state.stats,
      }),
    }
  )
);

export default useSuperAdminStore;