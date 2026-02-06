import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useUserManagementStore = create(
  persist(
    (set, get) => ({
      // --- State ---
      users: [],
      securityPersonnel: [],
      departmentManagers: [],
      departments: [],
      stats: {
        totalUsers: 0,
        activeSecurity: 0,
        activeManagers: 0,
        pendingApprovals: 0,
        totalDepartments: 0,
      },
      isLoading: false,
      error: null,
      success: null,
      appointments: [],

      // --- Actions: Appointments ---
      fetchRecentAppointments: async () => {
        set({ isLoading: true });
        try {
          const res = await http.get("appointments/recent-appointments");
          set({ appointments: res.data, isLoading: false });
        } catch (err) {
          set({ isLoading: false });
        }
      },

      // --- Actions: Dashboard Stats ---
      fetchDashboardStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/college-manager/dashboard-stats");
          set({ stats: res.data.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load statistics",
            isLoading: false,
          });
        }
      },

      // --- Actions: Departments ---
      fetchDepartments: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("college-manager/departments");
          set({ departments: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load departments",
            isLoading: false,
          });
        }
      },

      createDepartment: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("college-manager/departments", data);
          set((state) => ({
            departments: [res.data, ...state.departments],
            isLoading: false,
            success: "Department created successfully",
          }));
          get().fetchDashboardStats();
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to create department",
            isLoading: false,
          });
          throw err;
        }
      },

      updateDepartment: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.put(`college-manager/departments/${id}`, data);
          set((state) => ({
            departments: state.departments.map((d) => (d.id === id ? res.data : d)),
            isLoading: false,
            success: "Department updated successfully",
          }));
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update department",
            isLoading: false,
          });
          throw err;
        }
      },

      deleteDepartment: async (id) => {
        set({ isLoading: true, error: null });
        try {
          await http.delete(`college-manager/departments/${id}`);
          set((state) => ({
            departments: state.departments.filter((d) => d.id !== id),
            isLoading: false,
            success: "Department deleted successfully",
          }));
          get().fetchDashboardStats();
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to delete department",
            isLoading: false,
          });
        }
      },

      // --- Actions: Accounts (New Implementation for the Modal) ---
      createUserAccount: async (accountData) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("college-manager/new-manager", accountData);
          const newUser = res.data.user;

          set((state) => {
            const updates = { isLoading: false, success: "Account created successfully" };
            
            // Add to general users list
            updates.users = [newUser, ...state.users];

            // Add to specific arrays based on role
            if (newUser.role === "DEPARTMENT_MANAGER") {
              updates.departmentManagers = [newUser, ...state.departmentManagers];
            } else if (newUser.role === "SECURITY" || newUser.role === "SECURITY_MANAGER") {
              updates.securityPersonnel = [newUser, ...state.securityPersonnel];
            }
            
            return updates;
          });

          get().fetchDashboardStats();
          return newUser;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to create account",
            isLoading: false,
          });
          throw err;
        }
      },

      // --- Actions: Users ---
      fetchUsers: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`college-manager/users${query ? `?${query}` : ""}`);
          
          set({ users: res.data.data, isLoading: false });

        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load users",
            isLoading: false,
          });
        }
      },

      updateUserStatus: async (userId, isActive) => {
        set({ isLoading: true, error: null });
        try {
          await http.put(`college-manager/users/${userId}/status`, { isActive });
          set((state) => ({
            users: state.users.map((u) => (u.id === userId ? { ...u, isActive } : u)),
            securityPersonnel: state.securityPersonnel.map((p) =>
              p.id === userId ? { ...p, isActive } : p
            ),
            departmentManagers: state.departmentManagers.map((m) =>
              m.id === userId ? { ...m, isActive } : m
            ),
            isLoading: false,
            success: `User ${isActive ? "activated" : "deactivated"} successfully`,
          }));
          get().fetchDashboardStats();
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update status",
            isLoading: false,
          });
        }
      },

      // --- Actions: Security Personnel ---
      fetchSecurityPersonnel: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("college-manager/security-personnel");
          set({ securityPersonnel: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load security personnel",
            isLoading: false,
          });
        }
      },

      // --- Actions: Department Managers ---
      fetchDepartmentManagers: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("college-manager/department-managers");
          set({ departmentManagers: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load department managers",
            isLoading: false,
          });
        }
      },

      // --- Helpers ---
      clearErrorSuccess: () => set({ error: null, success: null }),

      clearStore: () => {
        set({
          users: [],
          securityPersonnel: [],
          departmentManagers: [],
          departments: [],
          stats: {
            totalUsers: 0,
            activeSecurity: 0,
            activeManagers: 0,
            pendingApprovals: 0,
            totalDepartments: 0,
          },
          isLoading: false,
          error: null,
          success: null,
          appointments: [],
        });
      },
    }),
    {
      name: "user-management-storage",
      partialize: (state) => ({
        users: state.users,
        securityPersonnel: state.securityPersonnel,
        departmentManagers: state.departmentManagers,
        departments: state.departments,
        stats: state.stats,
      }),
    }
  )
);