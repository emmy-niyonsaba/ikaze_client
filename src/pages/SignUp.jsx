import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";
import { useCollegeStore } from "../store/useCollegeStore";

export default function Signup() {
  const { register, isLoading, error: authError } = useAuthStore();
 
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
    rpCollege: "" 
  });

  const [localError, setLocalError] = useState(null);

  
  useEffect(() => {
    if (!formData.rpCollege) {
      setFormData(prev => ({
        ...prev,
      }));
    }
  }, [ formData.rpCollege]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError(null);

    const { firstName, lastName, phone, email, password, confirmPassword, rpCollege } = formData;

    if (!firstName || !lastName || !phone || !email || !password || !confirmPassword) {
      setLocalError("Please fill all required fields");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match");
      return;
    }

    try {
      await register({ 
        firstName, 
        lastName, 
        phone, 
        email, 
        password,
        collegeId: rpCollege 
      });
      window.location.href = "/login";
    } catch (err) {
      // Handled by store
    }
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-2xl bg-white p-8 rounded-2xl shadow-xl"
      >
        <h2 className="text-2xl font-bold text-center mb-6">Create Account</h2>

        {/* --- ERROR DISPLAY --- */}
        {(localError || authError ) && (
          <div className="mb-4 p-3 bg-red-100 border-l-4 border-red-500 text-red-700 text-sm rounded">
            {localError || authError || collegeError}
          </div>
        )}

        <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit}>
          <div>
            <label className="block mb-1 font-medium">First Name</label>
            <input
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              type="text"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter first name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Last Name</label>
            <input
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              type="text"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter last name"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Phone</label>
            <input
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              type="text"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter phone number"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              type="email"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              type="password"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter password"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Confirm Password</label>
            <input
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              type="password"
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Confirm password"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={isLoading }
            className="col-span-2 block w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md mt-2"
          >
            {(isLoading ) ? "Processing..." : "Create Account"}
          </motion.button>
        </form>

        <p className="text-center text-sm mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </motion.div>
    </div>
  );
}