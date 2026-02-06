// src/store/authStore.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import http from "../utils/http";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      success: null,

      login: async (identifier, password) => {
        set({ isLoading: true, error: null, success: null });

        try {
          // Determine if identifier is email or phone
          const isEmail = identifier.includes('@');
          const loginData = isEmail 
            ? { email: identifier, password }
            : { phone: identifier, password };

          const res = await http.post("/users/signin", loginData);
          const { user, token } = res.data;
          
          // Set authorization header for future requests
          http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Store credentials in localStorage for http.js interceptor
          localStorage.setItem("ikaze_credentials", JSON.stringify({ token, user }));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            success: "Login successful!"
          });
          
          // Redirect based on role
          get().redirectBasedOnRole(user.role);
          
          return user;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Login failed",
            isLoading: false,
          });
          console.log("Login error:", err);
          throw err;
        }
      },

      // Register new user
      register: async (userData) => {
        set({ isLoading: true, error: null, success: null });

        try {
          const res = await http.post("/users/signup", userData);
          const { user, token } = res.data;

          // Set authorization header for future requests
          http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Store credentials in localStorage for http.js interceptor
          localStorage.setItem("ikaze_credentials", JSON.stringify({ token, user }));

          set({
            user,
            token,
            isAuthenticated: true,
            isLoading: false,
            success: "Registration successful!"
          });

          // Redirect based on role (USER goes to dashboard)
          if (user.role === 'USER') {
            window.location.href = "/dashboard";
          } else {
            get().redirectBasedOnRole(user.role);
          }
          
          return user;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Registration failed",
            isLoading: false,
          });
          throw err;
        }
      },

      // Fetch current user profile
      fetchProfile: async () => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.get("/users/me");
          set({ 
            user: res.data, 
            isLoading: false,
            isAuthenticated: true 
          });
          return res.data;
        } catch (err) {
          set({ isLoading: false });
          
          if (err.response?.status === 401) {
            // Token invalid or expired
            get().clearAuth();
            window.location.href = "/login";
          } else {
            set({ 
              error: err.response?.data?.message || "Failed to fetch profile" 
            });
          }
          throw err;
        }
      },

      // Update user profile
      updateProfile: async (data) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.put("/users/profile", data);
          
          set({
            user: res.data.user,
            isLoading: false,
            success: "Profile updated successfully!"
          });
          
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to update profile",
            isLoading: false,
          });
          throw err;
        }
      },
      
      // Change password
      changePassword: async (currentPassword, newPassword) => {
        set({ isLoading: true, error: null });
        try {
          const res = await http.post("/auth/change-password", {
            currentPassword,
            newPassword
          });
          set({
            isLoading: false,
            success: "Password changed successfully!"
          });
          return res.data;
        } catch (err) {
          set({
            error: err.response?.data?.message || "Failed to change password",
            isLoading: false,
          });
          throw err;
        }
      },

      // Logout
      logout: () => {
        get().clearAuth();
        window.location.href = "/login";
      },

      // Clear auth data (without redirect)
      clearAuth: () => {
        // Remove authorization header
        delete http.defaults.headers.common['Authorization'];
        
        // Clear localStorage
        localStorage.removeItem("ikaze_credentials");
        
        // Clear store state
        set({
          user: null,
          token: null,
          isAuthenticated: false,
          error: null,
          success: null
        });
      },

      // Clear error/success messages
      clearMessages: () => {
        set({ error: null, success: null });
      },

      // Redirect based on user role
      redirectBasedOnRole: (role) => {
        const redirects = {
          'SUPER_ADMIN': '/super-admin/dashboard',
          'COLLEGE_MANAGER': '/college-admin/dashboard',
          'DEPARTMENT_MANAGER': '/department-manager/dashboard',
          'SECURITY_MANAGER': '/security-manager/dashboard',
          'SECURITY': '/security/dashboard',
          'USER': '/dashboard'
        };

        const path = redirects[role] || '/';
        window.location.href = path;
      },

      // Check if user has specific role
      hasRole: (role) => {
        const { user } = get();
        return user?.role === role;
      },

      // Check if user has any of the specified roles
      hasAnyRole: (roles) => {
        const { user } = get();
        return roles.includes(user?.role);
      },

      // Check if user can access college (for managers/admins)
      canAccessCollege: (collegeId) => {
        const { user } = get();
        
        if (!user) return false;
        
        // SUPER_ADMIN can access all colleges
        if (user.role === 'SUPER_ADMIN') return true;
        
        // COLLEGE_ADMIN can access their managed college
        if (user.role === 'COLLEGE_ADMIN' && user.managedCollegeId === collegeId) {
          return true;
        }
        
        // Other roles need to check UserCollege membership
        // This would require additional API call in practice
        return false;
      },

      // Initialize auth from persisted storage
      initializeAuth: () => {
        const { token, user } = get();
        if (token) {
          http.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          
          // Auto-fetch fresh user data if token exists
          if (user) {
            get().fetchProfile().catch(() => {
              // Silent fail - token might be expired
              get().clearAuth();
            });
          }
        }
      }
    }),
    {
      name: "ikaze-auth-storage",
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
      onRehydrateStorage: () => {
        // Called when store is rehydrated from storage
        return (state) => {
          if (state?.token) {
            // Re-set authorization header
            http.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;
            
            // Ensure localStorage is in sync
            const stored = localStorage.getItem("ikaze_credentials");
            if (!stored && state.token && state.user) {
              localStorage.setItem("ikaze_credentials", JSON.stringify({ 
                token: state.token, 
                user: state.user 
              }));
            }
          }
        };
      }
    }
  )
);

// Initialize auth when store is created
useAuthStore.getState().initializeAuth();

// Optional: Auto-refresh token interval
if (typeof window !== 'undefined') {
  setInterval(() => {
    const { token, isAuthenticated } = useAuthStore.getState();
    if (isAuthenticated && token) {
      // Refresh token every 30 minutes
      useAuthStore.getState().fetchProfile().catch(() => {
        // Silent fail - will handle on next API call
      });
    }
  }, 30 * 60 * 1000); // 30 minutes
}