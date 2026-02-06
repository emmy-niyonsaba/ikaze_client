import { create } from "zustand";
import http from "../utils/http";

const useUserStore = create((set) => ({
  user: null,        
  isLoading: false,
  error: null,

  // FETCH CURRENT USER INFO
  fetchUser: async () => {
    set({ isLoading: true, error: null });
    try {
      const res = await http.get("/users/me"); 
      set({ user: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to fetch user info",
        isLoading: false,
      });
    }
  },

  // UPDATE CURRENT USER
  updateUser: async (data) => {
    set({ isLoading: true, error: null });
    try {
      const res = await http.put(`/users/${data.id}`, data);
      set({ user: res.data, isLoading: false });
    } catch (err) {
      set({
        error: err.response?.data?.message || "Failed to update user",
        isLoading: false,
      });
    }
  },

  // CLEAR USER (logout)
  clearUser: () => set({ user: null }),
}));

export default useUserStore;
