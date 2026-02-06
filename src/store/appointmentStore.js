import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useAppointmentStore = create(
  persist(
    (set, get) => ({
      appointments: [],
      appointment: null,
      isLoading: false,
      error: null,
      success: null,

      fetchAppointments: async () => {
        set({ isLoading: true, error: null });

        try {
          const res = await http.get("/appointment/mine");
          set({ appointments: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load appointments",
            isLoading: false,
          });
        }
      },

      getAppointmentById: async (id) => {
        set({ isLoading: true, error: null });

        try {
          const res = await http.get(`/appointment/${id}`);
          set({ appointment: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load appointment",
            isLoading: false,
          });
        }
      },

      createAppointment: async (data) => {
        set({ isLoading: true, error: null });

        try {
          const res = await http.post("/appointment/create", data);

          set((state) => ({
            appointments: [...state.appointments, res.data],
            isLoading: false,
            success: "Created Successfully..."
          }));

          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to create appointment",
            isLoading: false,
          });
        }
      },

      updateAppointment: async (id, updatedData) => {
        set({ isLoading: true, error: null });

        try {
          const res = await http.put(`/appointment/${id}`, updatedData);

          set((state) => ({
            appointments: state.appointments.map((a) =>
              a.id === id ? res.data : a
            ),
            isLoading: false,
            success: "Updated Successfully..."
          }));

          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update appointment",
            isLoading: false,
          });
        }
      },

      deleteAppointment: async (id) => {
        set({ isLoading: true, error: null });

        try {
          await http.delete(`/appointments/${id}`);

          set((state) => ({
            appointments: state.appointments.filter((a) => a.id !== id),
            isLoading: false,
          }));
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to delete appointment",
            isLoading: false,
          });
        }
      },

      fetchByRef: async (ref) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get(`/appointment/verify/${ref}`);
          set({ appointment: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Invalid Reference Number",
            isLoading: false,
            appointment: null
          });
        }
      },

      handleCheckAction: async (id, action) => {
        try {
          const res = await http.post(`/appointment/${action}/${id}`);
          set({ 
            appointment: res.data.appointment, 
            success: `Successfully ${action}ed!` 
          });
          
          // Update the appointment in the list if it exists
          const currentAppointments = get().appointments;
          if (currentAppointments.length > 0) {
            set({
              appointments: currentAppointments.map(appt => 
                appt.id === id ? { ...appt, ...res.data.appointment } : appt
              )
            });
          }
        } catch (err) {
          set({ 
            error: err.response?.data?.message || `Failed to ${action}` 
          });
        }
      },

      clearErrorSuccess: () => {
        set({ success: null, error: null });
      },

      // Helper method to clear persisted data (logout)
      clearStore: () => {
        set({
          appointments: [],
          appointment: null,
          isLoading: false,
          error: null,
          success: null
        });
      },

      // Add method to refresh single appointment
      refreshAppointment: async (id) => {
        try {
          const res = await http.get(`/appointment/${id}`);
          set({ appointment: res.data });
          
          // Also update in list
          const currentAppointments = get().appointments;
          if (currentAppointments.length > 0) {
            set({
              appointments: currentAppointments.map(appt => 
                appt.id === id ? res.data : appt
              )
            });
          }
        } catch (err) {
          console.error("Failed to refresh appointment:", err);
        }
      }
    }),
    {
      name: "appointment-storage", // Unique name for localStorage key
      // Optional: Specify what to persist
      partialize: (state) => ({
        appointments: state.appointments,
        appointment: state.appointment,
        // Don't persist loading/error states
      }),
      // Optional: Add migration if store structure changes
      version: 1,
      // Optional: Migrate old storage to new structure
      migrate: (persistedState, version) => {
        if (version === 0) {
          // Migration from version 0 to 1
          return {
            ...persistedState,
            // Add any migration logic here
          };
        }
        return persistedState;
      }
    }
  )
);


