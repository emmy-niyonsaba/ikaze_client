import React, { useState } from "react";
import { motion } from "framer-motion";
import rpLogo from "../assets/images/RP_Logo.jpeg"
import { useAuthStore } from "../store/authStore";

export default function Login() {


  const { user, isLoading, error, login } = useAuthStore();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(formData.email.trim(), formData.password);
  }



  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-100 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white p-8 rounded-2xl shadow-xl"
      >
        <img src={rpLogo} alt="rpLogo" className="w-64 mx-auto"/>

        <div className="error">
          {error}
        </div>

        <form className="flex flex-col space-y-4" onSubmit={handleSubmit}> 
          <div>
            <label className="block mb-1 font-medium">Email<small>*</small></label>
            <input
              type="email"
              className="w-full p-3 border rounded focus:outline-none "
              placeholder="Email"
              onChange={(e)=>setFormData({...formData, email:e.target.value})}
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Password<small>*</small></label>
            <input
              type="password"
              className="w-full p-3 border rounded focus:outline-none"
              placeholder="Password"
               onChange={(e)=>setFormData({...formData, password:e.target.value})}
               required
            />
          </div>

        

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full button-7 bg-blue-600 text-white p-3 rounded font-semibold shadow-md cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? "processing":"Login"}
          </motion.button>
        </form>
      <p className="text-center text-sm mt-4">
        Don't have an account? <a href="/signup" className="text-blue-600 hover:underline">Create Account</a>
      </p>
      </motion.div>
    </div>
  );
}
