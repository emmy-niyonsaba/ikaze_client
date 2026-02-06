import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useDashboardStore = create(
  persist(
    (set, get) => ({
      // Department Manager Dashboard
      departmentStats: null,
      departmentAppointments: [],

      // Security Manager Dashboard
      securityStats: null,
      securityReports: [],

      // College Admin Dashboard
      collegeStats: null,
      collegeReports: [],

      isLoading: false,
      error: null,

      // Department Manager Dashboard
      fetchDepartmentDashboard: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`/dashboard/department${query ? `?${query}` : ''}`);
          set({ 
            departmentStats: res.data.stats,
            departmentAppointments: res.data.appointments,
            isLoading: false 
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load department dashboard",
            isLoading: false,
          });
        }
      },

      // Security Manager Dashboard
      fetchSecurityDashboard: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`/dashboard/security${query ? `?${query}` : ''}`);
          set({ 
            securityStats: res.data.stats,
            securityReports: res.data.reports,
            isLoading: false 
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load security dashboard",
            isLoading: false,
          });
        }
      },

      // College Admin Dashboard
      fetchCollegeDashboard: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`/dashboard/college${query ? `?${query}` : ''}`);
          set({ 
            collegeStats: res.data.stats,
            collegeReports: res.data.reports,
            isLoading: false 
          });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load college dashboard",
            isLoading: false,
          });
        }
      },

      // Export reports
      exportReport: async (type, filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`/dashboard/export/${type}${query ? `?${query}` : ''}`, {
            responseType: 'blob'
          });
          
          // Create download link
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', `${type}-report-${new Date().toISOString().split('T')[0]}.csv`);
          document.body.appendChild(link);
          link.click();
          link.remove();
          
          set({ isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to export report",
            isLoading: false,
          });
        }
      },

      clearStore: () => {
        set({
          departmentStats: null,
          departmentAppointments: [],
          securityStats: null,
          securityReports: [],
          collegeStats: null,
          collegeReports: [],
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "dashboard-storage",
      partialize: (state) => ({
        // Store only recent data for quick loading
        departmentStats: state.departmentStats,
        securityStats: state.securityStats,
        collegeStats: state.collegeStats,
      }),
    }
  )
);