// stores/useDepartmentStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useDepartmentStore = create(
  persist(
    (set, get) => ({
      // State
      departmentInfo: null,
      appointments: [],
      pendingApprovals: [],
      dashboardStats: null,
      isLoading: false,
      error: null,
      success: null,

      // Actions
      fetchDepartmentInfo: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/department/info");
          set({ departmentInfo: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load department info",
            isLoading: false,
          });
        }
      },

      fetchAppointments: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const params = new URLSearchParams(filters).toString();
          const {data } = await http.get(`/department/appointments?${params}`);
          set({ appointments: data.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load appointments",
            isLoading: false,
          });
        }
      },

      fetchPendingApprovals: async () => {
        set({ isLoading: true, error: null });
        try {
          const { data } = await http.get("/department/pending-approvals");
        //   console.log(data,"asdasdsa")
          set({ pendingApprovals: data.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load pending approvals",
            isLoading: false,
          });
        }
      },

      fetchDashboardStats: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/department/dashboard-stats");
          set({ dashboardStats: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load dashboard stats",
            isLoading: false,
          });
        }
      },

      approveAppointment: async (id, data = {}) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/department/appointments/${id}/approve`, data);
          
          // Update the appointment in the list
          const currentAppointments = get().appointments;
          set({
            appointments: currentAppointments.map(appt =>
              appt.id === id ? { ...appt, ...res.data.appointment } : appt
            ),
            isLoading: false,
            success: "Appointment approved successfully"
          });
          
          // Also update pending approvals if it exists there
          const currentApprovals = get().pendingApprovals;
          set({
            pendingApprovals: currentApprovals.filter(approval => approval.id !== id)
          });
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to approve appointment",
            isLoading: false,
          });
        }
      },

      rejectAppointment: async (id, reason) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/department/appointments/${id}/reject`, { reason });
          
          // Update the appointment in the list
          const currentAppointments = get().appointments;
          set({
            appointments: currentAppointments.map(appt =>
              appt.id === id ? { ...appt, ...res.data.appointment } : appt
            ),
            isLoading: false,
            success: "Appointment rejected successfully"
          });
          
          // Remove from pending approvals
          const currentApprovals = get().pendingApprovals;
          set({
            pendingApprovals: currentApprovals.filter(approval => approval.id !== id)
          });
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to reject appointment",
            isLoading: false,
          });
        }
      },

      createAppointment: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("/department/appointments", data);
          
          set((state) => ({
            appointments: [...state.appointments, res.data],
            isLoading: false,
            success: "Appointment created successfully"
          }));
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to create appointment",
            isLoading: false,
          });
        }
      },

      updateAppointment: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.put(`/department/appointments/${id}`, data);
          
          set((state) => ({
            appointments: state.appointments.map(appt =>
              appt.id === id ? res.data : appt
            ),
            isLoading: false,
            success: "Appointment updated successfully"
          }));
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update appointment",
            isLoading: false,
          });
        }
      },

      cancelAppointment: async (id, reason) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/department/appointments/${id}/cancel`, { reason });
          
          set((state) => ({
            appointments: state.appointments.map(appt =>
              appt.id === id ? { ...appt, ...res.data.appointment } : appt
            ),
            isLoading: false,
            success: "Appointment cancelled successfully"
          }));
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to cancel appointment",
            isLoading: false,
          });
        }
      },

      // Handle student approval actions
      approveStudentRequest: async (id, data = {}) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/department/approvals/${id}/approve`, data);
          
          // Remove from pending approvals
          const currentApprovals = get().pendingApprovals;
          set({
            pendingApprovals: currentApprovals.filter(approval => approval.id !== id),
            isLoading: false,
            success: "Request approved successfully"
          });
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to approve request",
            isLoading: false,
          });
        }
      },

      rejectStudentRequest: async (id, reason) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/department/approvals/${id}/reject`, { reason });
          
          // Remove from pending approvals
          const currentApprovals = get().pendingApprovals;
          set({
            pendingApprovals: currentApprovals.filter(approval => approval.id !== id),
            isLoading: false,
            success: "Request rejected successfully"
          });
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to reject request",
            isLoading: false,
          });
        }
      },

      // Helper methods
      clearErrorSuccess: () => {
        set({ success: null, error: null });
      },

      clearStore: () => {
        set({
          departmentInfo: null,
          appointments: [],
          pendingApprovals: [],
          dashboardStats: null,
          isLoading: false,
          error: null,
          success: null
        });
      },

      // Get computed stats for dashboard
      getComputedStats: () => {
        const appointments = get().appointments;
        const pendingApprovals = get().pendingApprovals;
        const now = new Date();
        
        const today = now.toISOString().split('T')[0];
        
        return {
          todayAppointments: appointments.filter(appt => 
            appt.date === today && appt.status === 'confirmed'
          ).length,
          pendingApprovalsCount: pendingApprovals.length,
          upcomingAppointments: appointments.filter(appt => 
            appt.status === 'confirmed' && new Date(appt.date) >= now
          ).length,
          completedAppointments: appointments.filter(appt => 
            appt.status === 'completed'
          ).length,
          cancelledAppointments: appointments.filter(appt => 
            appt.status === 'cancelled'
          ).length,
          totalAppointments: appointments.length
        };
      },

      // Get appointments by status
      getAppointmentsByStatus: (status) => {
        return get().appointments.filter(appt => appt.status === status);
      },

      // Get appointments by date range
      getAppointmentsByDateRange: (startDate, endDate) => {
        const appointments = get().appointments;
        return appointments.filter(appt => {
          const apptDate = new Date(appt.date);
          return apptDate >= new Date(startDate) && apptDate <= new Date(endDate);
        });
      }
    }),
    {
      name: "department-storage",
      partialize: (state) => ({
        departmentInfo: state.departmentInfo,
        appointments: state.appointments,
        pendingApprovals: state.pendingApprovals,
        dashboardStats: state.dashboardStats
      }),
      version: 1
    }
  )
);