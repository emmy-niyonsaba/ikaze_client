import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import http from "../utils/http";
import { motion } from "framer-motion";
import { useAuthStore } from "../store/authStore";

const AppointmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const user = useAuthStore((s) => s.user);

  const fetchAppointment = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await http.get(`/appointment/${id}`);
      setAppointment(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load appointment");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, [id]);

  const handleApprove = async () => {
    if (!window.confirm("Approve this appointment?")) return;
    try {
      const res = await http.post(`/appointment/${id}/approve`);
      setAppointment((prev) => ({ ...prev, status: "CONFIRMED", aptCode: res.data.aptCode, aptExpiresAt: res.data.aptExpiresAt }));
      alert(`Approved. APT Code: ${res.data.aptCode}`);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to approve");
    }
  };

  const handleReject = async () => {
    if (!window.confirm("Reject this appointment?")) return;
    try {
      await http.post(`/appointment/${id}/reject`);
      alert("Rejected");
      navigate("/dashboard/appointment");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to reject");
    }
  };

  const handleCopyCode = async () => {
    if (!appointment?.aptCode) return;
    try {
      await navigator.clipboard.writeText(appointment.aptCode);
      alert("APT Code copied to clipboard");
    } catch (e) {
      alert("Copy failed");
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;
  if (error) return <div className="p-6 text-red-600">{error}</div>;
  if (!appointment) return null;

  return (
    <div className="p-6">
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h2 className="text-2xl font-bold">Appointment #{appointment.referenceNumber || appointment.id}</h2>
            <p className="text-sm text-gray-600">Status: <strong>{appointment.status}</strong></p>
          </div>
          <div className="flex gap-2">
            {(user?.role === "ADMIN" || user?.role === "DEAN") && appointment.status === "PENDING" && (
              <>
                <button onClick={handleApprove} className="bg-green-500 text-white px-4 py-2 rounded">Approve</button>
                <button onClick={handleReject} className="bg-red-500 text-white px-4 py-2 rounded">Reject</button>
              </>
            )}
            {appointment.aptCode && (
              <button onClick={handleCopyCode} className="bg-blue-500 text-white px-3 py-2 rounded">Copy APT Code</button>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <h3 className="font-semibold">Visitor Info</h3>
            <p><strong>Booked by:</strong> {appointment.User?.firstName} {appointment.User?.lastName} (<Link to={`/dashboard/profile/${appointment.User?.id}`} className="text-blue-600 hover:underline">{appointment.User?.email}</Link>)</p>
            <p><strong>Phone:</strong> {appointment.User?.phone}</p>
            <p><strong>Guests:</strong></p>
            <ul className="list-disc pl-6">
              {(appointment.guests || []).map((g, idx) => (
                <li key={idx}>{g.fullname} {g.id ? `(${g.id})` : ""}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-semibold">Appointment Details</h3>
            <p><strong>Type:</strong> {appointment.type}</p>
            <p><strong>Department:</strong> {appointment.department}</p>
            <p><strong>College:</strong> {appointment.rpCollege}</p>
            <p><strong>Start:</strong> {new Date(appointment.startTime).toLocaleString()}</p>
            <p><strong>End:</strong> {new Date(appointment.endTime).toLocaleString()}</p>
            <p><strong>Description:</strong></p>
            <p className="bg-gray-100 p-3 rounded">{appointment.description}</p>
          </div>
        </div>

        {appointment.aptCode && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <h4 className="font-semibold">APT Code</h4>
            <p className="text-lg font-mono">{appointment.aptCode}</p>
            <p className="text-sm text-gray-600">Expires: {new Date(appointment.aptExpiresAt).toLocaleString()}</p>
          </div>
        )}

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={() => navigate(-1)} className="px-4 py-2 border rounded">Back</button>
        </div>
      </motion.div>
    </div>
  );
};

export default AppointmentDetails;
