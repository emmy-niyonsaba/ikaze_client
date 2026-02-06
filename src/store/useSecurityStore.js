import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useSecurityStore = create(
  persist(
    (set, get) => ({
      todaysAppointments: [],
      checkedInAppointments: [],
      myActivity: [],
      isLoading: false,
      error: null,
      success: null,

      // Get today's appointments for check-in
      fetchTodaysAppointments: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/security/today-appointments");
          set({ todaysAppointments: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load today's appointments",
            isLoading: false,
          });
        }
      },

      // Check in/out actions
      checkInAppointment: async (appointmentId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/security/checkin/${appointmentId}`);
          const updatedAppointment = res.data;
          
          set((state) => ({
            todaysAppointments: state.todaysAppointments.map((appt) =>
              appt.id === appointmentId ? updatedAppointment : appt
            ),
            checkedInAppointments: [...state.checkedInAppointments, updatedAppointment],
            isLoading: false,
            success: "Checked in successfully",
          }));
          
          return updatedAppointment;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to check in",
            isLoading: false,
          });
          throw err;
        }
      },

      checkOutAppointment: async (appointmentId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post(`/security/checkout/${appointmentId}`);
          const updatedAppointment = res.data;
          
          set((state) => ({
            todaysAppointments: state.todaysAppointments.map((appt) =>
              appt.id === appointmentId ? updatedAppointment : appt
            ),
            checkedInAppointments: state.checkedInAppointments.filter(
              (appt) => appt.id !== appointmentId
            ),
            isLoading: false,
            success: "Checked out successfully",
          }));
          
          return updatedAppointment;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to check out",
            isLoading: false,
          });
          throw err;
        }
      },

      // Verify appointment code
      verifyAppointmentCode: async (code) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("/security/verify-code", { code });
          set({ isLoading: false, success: "Appointment verified" });
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Invalid appointment code",
            isLoading: false,
          });
          throw err;
        }
      },

      // Get security's own activity
      fetchMyActivity: async (filters = {}) => {
        set({ isLoading: true, error: null });
        try {
          const query = new URLSearchParams(filters).toString();
          const res = await http.get(`/security/my-appointments${query ? `?${query}` : ''}`);
          set({ myActivity: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load activity",
            isLoading: false,
          });
        }
      },

      fetchTodaysAppointments: async () => {
        set({ isLoading: true });
        try {
          const res = await http.get('/security/today-appointments');
          set({ todaysAppointments: res.data, isLoading: false });
        } catch (error) {
          set({ error: 'Failed to fetch today\'s appointments', isLoading: false });
        }
      },

      clearErrorSuccess: () => set({ error: null, success: null }),

      clearStore: () => {
        set({
          todaysAppointments: [],
          checkedInAppointments: [],
          myActivity: [],
          isLoading: false,
          error: null,
          success: null,
        });
      },
    }),
    {
      name: "security-storage",
      partialize: (state) => ({
        myActivity: state.myActivity,
      }),
    }
  )
);