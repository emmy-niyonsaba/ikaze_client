import React, { useState } from "react";
import { motion } from "framer-motion";

// Static appointment data
const initialAppointments = [
  {
    id: 1,
    name: "Emmy Niyonsaba",
    email: "emmy1@example.com",
    college: "RPTUMBA",
    status: "APPROVED",
    startTime: "2025-12-01 09:00",
    endTime: "2025-12-01 10:00",
    visitors: 1,
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    college: "RPKIGALI",
    status: "APPROVED",
    startTime: "2025-12-01 09:30",
    endTime: "2025-12-01 10:30",
    visitors: 2,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    college: "RPKARONGI",
    status: "PENDING",
    startTime: "2025-12-01 11:00",
    endTime: "2025-12-01 12:00",
    visitors: 1,
  },
  {
    id: 1,
    name: "Emmy Niyonsaba",
    email: "emmy1@example.com",
    college: "RPTUMBA",
    status: "APPROVED",
    startTime: "2025-12-01 09:00",
    endTime: "2025-12-01 10:00",
    visitors: 1,
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    college: "RPKIGALI",
    status: "APPROVED",
    startTime: "2025-12-01 09:30",
    endTime: "2025-12-01 10:30",
    visitors: 2,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    college: "RPKARONGI",
    status: "PENDING",
    startTime: "2025-12-01 11:00",
    endTime: "2025-12-01 12:00",
    visitors: 1,
  },
  {
    id: 1,
    name: "Emmy Niyonsaba",
    email: "emmy1@example.com",
    college: "RPTUMBA",
    status: "APPROVED",
    startTime: "2025-12-01 09:00",
    endTime: "2025-12-01 10:00",
    visitors: 1,
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    college: "RPKIGALI",
    status: "APPROVED",
    startTime: "2025-12-01 09:30",
    endTime: "2025-12-01 10:30",
    visitors: 2,
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    college: "RPKARONGI",
    status: "PENDING",
    startTime: "2025-12-01 11:00",
    endTime: "2025-12-01 12:00",
    visitors: 1,
  },
];

const Schedule = () => {
  const [appointments, setAppointments] = useState(initialAppointments);

  // Filter only approved appointments
  const approvedAppointments = appointments.filter(
    (app) => app.status === "APPROVED"
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Schedule</h1>

      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">College</th>
              <th className="px-4 py-2 text-left">Start Time</th>
              <th className="px-4 py-2 text-left">End Time</th>
              <th className="px-4 py-2 text-left">Visitors</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {approvedAppointments.map((app) => (
              <motion.tr
                key={app.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-100"
              >
                <td className="px-4 py-2">{app.id}</td>
                <td className="px-4 py-2">{app.name}</td>
                <td className="px-4 py-2">{app.email}</td>
                <td className="px-4 py-2">{app.college}</td>
                <td className="px-4 py-2">{app.startTime}</td>
                <td className="px-4 py-2">{app.endTime}</td>
                <td className="px-4 py-2">{app.visitors}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Schedule;
