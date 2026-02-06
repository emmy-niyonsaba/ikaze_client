import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useCollegeStore = create(
  persist(
    (set, get) => ({
      colleges: [],
      departments: [],
      selectedCollege: null,
      selectedDepartment: null,
      isLoading: false,
      error: null,
      college:null,

      fetchCurrentCollege: async () => {
        set({ loading: true });
        try {
          const res = await http.get("/college-manager/my-college");
          set({ college: res.data.data, loading: false });
        } catch (err) {
          set({ loading: false });
        }
      },

      // College methods
      fetchColleges: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/colleges");
          set({ colleges: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load colleges",
            isLoading: false,
          });
        }
      },

      selectCollege: (college) => {
        set({ selectedCollege: college });
      },

      // Department methods
      fetchDepartments: async (collegeId) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get(`/colleges/${collegeId}/departments`);
          set({ departments: res.data, isLoading: false });
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to load departments",
            isLoading: false,
          });
        }
      },

      selectDepartment: (department) => {
        set({ selectedDepartment: department });
      },

      createDepartment: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("/departments", data);
          set((state) => ({
            departments: [...state.departments, res.data],
            isLoading: false,
          }));
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to create department",
            isLoading: false,
          });
          throw err;
        }
      },

      clearSelection: () => {
        set({ selectedCollege: null, selectedDepartment: null });
      },

      clearStore: () => {
        set({
          colleges: [],
          departments: [],
          selectedCollege: null,
          selectedDepartment: null,
          isLoading: false,
          error: null,
        });
      },
    }),
    {
      name: "college-storage",
      partialize: (state) => ({
        colleges: state.colleges,
        departments: state.departments,
        selectedCollege: state.selectedCollege,
        selectedDepartment: state.selectedDepartment,
      }),
    }
  )
);