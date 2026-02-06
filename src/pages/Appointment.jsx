import React, { useState } from "react";
import { motion } from "framer-motion";

// Static appointment data
const appointmentsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    code: "A002",
    status: "APPROVED",
    entryTime: "2025-12-01 11:00",
    exitTime: "2025-12-01 12:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    code: "A001",
    status: "PENDING",
    entryTime: "2025-12-01 09:00",
    exitTime: "2025-12-01 10:00",
  },
  {
    id: 2,
    name: "Alice Smith",
    email: "alice@example.com",
    code: "A002",
    status: "APPROVED",
    entryTime: "2025-12-01 11:00",
    exitTime: "2025-12-01 12:00",
  },
  {
    id: 3,
    name: "Bob Johnson",
    email: "bob@example.com",
    code: "A003",
    status: "IN",
    entryTime: "2025-12-01 08:30",
    exitTime: "2025-12-01 09:15",
  },
];

const Appointment = () => {
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [search, setSearch] = useState("");

  // Filter appointments by status and search
  const filteredAppointments = appointmentsData.filter((a) => {
    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchesSearch =
      a.email.toLowerCase().includes(search.toLowerCase()) ||
      a.code.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments</h1>

      {/* Filters */}
      <div className="flex flex-col md:flex-row md:justify-between mb-4 gap-4">
        <div>
          <label className="mr-2 font-medium">Filter by Status:</label>
          <select
            className="p-2 border rounded-lg"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">ALL</option>
            <option value="PENDING">PENDING</option>
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
            <option value="APPROVED">APPROVED</option>
          </select>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search by email or code"
            className="p-2 border rounded-lg w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">Name3</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Status</th>
              <th className="px-4 py-2 text-left">Entry Time</th>
              <th className="px-4 py-2 text-left">Exit Time</th>
              <th className="px-4 py-2 text-left">More</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredAppointments.map((app) => (
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
                <td className="px-4 py-2">{app.status}</td>
                <td className="px-4 py-2">{app.entryTime}</td>
                <td className="px-4 py-2">{app.exitTime}</td>
                <td className="px-4 py-2">
                  <a
                    href={`/appointment/${app.id}`}
                    className="text-blue-500 hover:underline"
                  >
                    More
                  </a>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Appointment;
