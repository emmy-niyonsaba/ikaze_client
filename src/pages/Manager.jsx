import React, { useState } from "react";
import { motion } from "framer-motion";

// Static user data
const initialUsers = [
  {
    id: 1,
    firstName: "Emmy",
    lastName: "Niyonsaba",
    phone: "0788888888",
    email: "emmy1@example.com",
    rpCollege: "RPTUMBA",
    role: "ADMIN",
  },
  {
    id: 2,
    firstName: "Alice",
    lastName: "Smith",
    phone: "0781234567",
    email: "alice@example.com",
    rpCollege: "RPKIGALI",
    role: "USER",
  },
  {
    id: 3,
    firstName: "Bob",
    lastName: "Johnson",
    phone: "0789876543",
    email: "bob@example.com",
    rpCollege: "RPKARONGI",
    role: "SECURITY",
  },
];

const Manager = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
    rpCollege: "RPTUMBA",
    role: "USER",
  });

  // Handle new user input change
  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  // Add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    const userWithId = { ...newUser, id: users.length + 1 };
    setUsers([...users, userWithId]);
    setNewUser({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      rpCollege: "RPTUMBA",
      role: "USER",
    });
  };

  // Delete user
  const handleDelete = (id) => {
    setUsers(users.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Manager Section</h1>

      {/* Add New User Form */}
      <motion.form
        className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-2 gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        onSubmit={handleAddUser}
      >
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          value={newUser.firstName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          value={newUser.lastName}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleChange}
          className="p-2 border rounded"
          required
        />
        <select
          name="rpCollege"
          value={newUser.rpCollege}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="RPTUMBA">RPTUMBA</option>
          <option value="RPKIGALI">RPKIGALI</option>
          <option value="RPKARONGI">RPKARONGI</option>
        </select>
        <select
          name="role"
          value={newUser.role}
          onChange={handleChange}
          className="p-2 border rounded"
        >
          <option value="USER">USER</option>
          <option value="SECURITY">SECURITY</option>
          <option value="DEAN">DEAN</option>
          <option value="ADMIN">ADMIN</option>
        </select>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="col-span-full bg-blue-500 text-white p-2 rounded-xl font-semibold"
        >
          Add User
        </motion.button>
      </motion.form>

      {/* Users Table */}
      <div className="overflow-x-auto bg-white rounded-xl shadow">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-blue-500 text-white">
            <tr>
              <th className="px-4 py-2 text-left">ID</th>
              <th className="px-4 py-2 text-left">First Name</th>
              <th className="px-4 py-2 text-left">Last Name</th>
              <th className="px-4 py-2 text-left">Phone</th>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">College</th>
              <th className="px-4 py-2 text-left">Role</th>
              <th className="px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map((user) => (
              <motion.tr
                key={user.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="hover:bg-gray-100"
              >
                <td className="px-4 py-2">{user.id}</td>
                <td className="px-4 py-2">{user.firstName}</td>
                <td className="px-4 py-2">{user.lastName}</td>
                <td className="px-4 py-2">{user.phone}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2">{user.rpCollege}</td>
                <td className="px-4 py-2">{user.role}</td>
                <td className="px-4 py-2 flex gap-2">
                  <button className="text-blue-500 hover:underline">
                    Edit
                  </button>
                  <button
                    className="text-red-500 hover:underline"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Manager;
