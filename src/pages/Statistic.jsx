import React, { useState } from "react";
import { motion } from "framer-motion";

// Example static data
const data = {
  weekly: { visitors: 25, appointments: 15, approved: 12 },
  monthly: { visitors: 110, appointments: 80, approved: 65 },
  yearly: { visitors: 1200, appointments: 950, approved: 870 },
};

const Statistic = () => {
  const [timeFrame, setTimeFrame] = useState("weekly");

  const stats = data[timeFrame];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Statistics</h1>

      {/* Time frame selector */}
      <div className="mb-6 flex gap-4">
        {["weekly", "monthly", "yearly"].map((frame) => (
          <button
            key={frame}
            onClick={() => setTimeFrame(frame)}
            className={`px-4 py-2 rounded-xl font-semibold ${
              timeFrame === frame
                ? "bg-blue-500 text-white shadow-md"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            } transition-all duration-200`}
          >
            {frame.charAt(0).toUpperCase() + frame.slice(1)}
          </button>
        ))}
      </div>

      {/* Statistics cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">Visitors</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.visitors}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">Appointments</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.appointments}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white p-6 rounded-2xl shadow-md flex flex-col items-center"
        >
          <h2 className="text-xl font-semibold mb-2">Approved</h2>
          <p className="text-3xl font-bold text-blue-500">{stats.approved}</p>
        </motion.div>
      </div>
    </div>
  );
};

export default Statistic;
