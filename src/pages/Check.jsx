import React, { useState } from "react";
import { motion } from "framer-motion";
import BackgroundImage from "../assets/images/Tumba.jpg"; // replace with your photo path
import http from "../utils/http";

const Check = () => {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await http.post("/appointment/validate", { aptCode: code.trim() });
      setResult({ ok: true, appointment: res.data.appointment });
    } catch (err) {
      setResult({ ok: false, message: err.response?.data?.message || "Invalid code" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full h-screen flex items-center justify-center p-4 bg-cover bg-center"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md bg-white bg-opacity-80 p-8 rounded-2xl shadow-xl backdrop-blur-sm"
      >
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-600">
          Visitor Check
        </h2>

        <form onSubmit={handleCheck} className="flex flex-col space-y-4">
          <div>
            <label className="block mb-1 font-medium">Enter your code</label>
            <input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter code here"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl font-semibold shadow-md"
          >
            {loading ? "Checking..." : "Verify"}
          </motion.button>
        </form>

        {result && (
          <div className={`mt-4 p-4 rounded ${result.ok ? 'bg-green-100' : 'bg-red-100'}`}>
            {result.ok ? (
              <div>
                <h4 className="font-semibold">Visitor Verified</h4>
                <p>{result.appointment.description}</p>
                <p className="text-sm text-gray-600">Code: {result.appointment.aptCode}</p>
                <p className="text-sm text-gray-600">Valid until: {new Date(result.appointment.aptExpiresAt).toLocaleString()}</p>
              </div>
            ) : (
              <div>
                <h4 className="font-semibold">Invalid</h4>
                <p>{result.message}</p>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Check;
