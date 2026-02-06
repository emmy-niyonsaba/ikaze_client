import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  try {
    const stored = localStorage.getItem("ikaze_credentials");
    if (stored) {
      const credentials = JSON.parse(stored);
      if (credentials?.token) {
        config.headers.Authorization = `Bearer ${credentials.token}`;
      }
    }
  } catch (error) {
    console.error("Error parsing credentials:", error);
    // Clear malformed storage
    localStorage.removeItem("ikaze_credentials");
  }
  return config;
});

// Global response interceptor to handle 401 (token expired/invalid)
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Clear auth and redirect to login
      localStorage.removeItem("ikaze_credentials");
      delete http.defaults.headers.common['Authorization'];
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default http;