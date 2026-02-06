import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import http from "../utils/http";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function UserProfileView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchUser = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = id ? await http.get(`/users/${id}`) : await http.get(`/users/me`);
      setUser(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!user) return null;

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-sm text-gray-600">{user.role} • {user.rpCollege}</p>
            <p className="text-sm">{user.email}</p>
            <p className="text-sm">{user.phone}</p>
          </div>
          <div>
            <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
          </div>
        </div>

        <div className="mt-4">
          <h3 className="font-semibold mb-2">Appointments</h3>
          {(!user.Appointments || user.Appointments.length === 0) ? (
            <div className="text-sm text-gray-600">No visible appointments for this user in your college.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100 text-left">
                  <tr>
                    <th className="px-4 py-2">Ref</th>
                    <th className="px-4 py-2">Description</th>
                    <th className="px-4 py-2">Start</th>
                    <th className="px-4 py-2">End</th>
                    <th className="px-4 py-2">Status</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {user.Appointments.map((a) => (
                    <tr key={a.id} className="hover:bg-gray-50">
                      <td className="px-4 py-2">{a.referenceNumber}</td>
                      <td className="px-4 py-2">{a.description}</td>
                      <td className="px-4 py-2">{new Date(a.startTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{new Date(a.endTime).toLocaleString()}</td>
                      <td className="px-4 py-2">{a.status}</td>
                      <td className="px-4 py-2"> <Link to={`/dashboard/appointment/${a.id}`} className="text-blue-600 hover:underline">View</Link> </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}