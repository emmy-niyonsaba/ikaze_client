import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiShield, FiAlertCircle, FiMaximize, FiX } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { Html5Qrcode } from "html5-qrcode"; // Use this instead of Scanner

const SecurityVerifyPage = () => {
  const [ref, setRef] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const navigate = useNavigate();
  const html5QrCodeRef = useRef(null); // To store the instance

  const handleSearch = (e) => {
    if (e) e.preventDefault();
    if (ref.trim()) window.location.href=`${ref.trim()}`;
  };

  const stopScanner = async () => {
    if (html5QrCodeRef.current && html5QrCodeRef.current.isScanning) {
      await html5QrCodeRef.current.stop();
      await html5QrCodeRef.current.clear();
      html5QrCodeRef.current = null;
    }
  };

  const startScanner = async () => {
    try {
      const qrCodeId = "reader";
      html5QrCodeRef.current = new Html5Qrcode(qrCodeId);
      
      const config = { fps: 10, qrbox: { width: 250, height: 250 } };

      await html5QrCodeRef.current.start(
        { facingMode: "environment" }, // Prioritize back camera
        config,
        (decodedText) => {
          setRef(decodedText);
          stopScanner().then(() => {
            setIsScanning(false);
            navigate(`/appointments/${decodedText}/verify`);
          });
        }
      );
    } catch (err) {
      console.error("Scanner Error:", err);
      setIsScanning(false);
    }
  };

  useEffect(() => {
    if (isScanning) {
      startScanner();
    } else {
      stopScanner();
    }
    return () => stopScanner();
  }, [isScanning]);

  return (
    <div className="max-w-md mx-auto space-y-8 pt-10 px-4">
      <div className="text-center">
        <div className="bg-blue-100 text-rp w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          <FiShield size={32} />
        </div>
        <h2 className="title">Verification</h2>
        <p className="subtitle">Scan QR or enter code manually</p>
      </div>

      <div className="space-y-4">
        {!isScanning ? (
          <button
            type="button"
            onClick={() => setIsScanning(true)}
            className="w-full bg-gray-800 text-white py-6 rounded-2xl font-bold shadow-lg flex flex-col items-center justify-center gap-2 border-4 border-white"
          >
            <FiMaximize size={28} />
            <span>Open QR Scanner</span>
          </button>
        ) : (
          <div className="relative bg-black rounded-3xl overflow-hidden shadow-2xl border-4 border-rp min-h-[300px]">
            <div id="reader" className="w-full h-full"></div>
            <button
              onClick={() => setIsScanning(false)}
              className="absolute top-2 right-2 z-[70] bg-red-500 text-white p-2 rounded-full shadow-lg"
            >
              <FiX size={20} />
            </button>
          </div>
        )}

        <div className="relative flex items-center justify-center py-4">
          <hr className="w-full border-gray-200" />
          <span className="absolute bg-gray-100 px-4 text-xs font-bold text-gray-400">OR</span>
        </div>

        <form onSubmit={handleSearch} className="space-y-4">
          <input
            type="text"
            placeholder="e.g. APT-26-000001"
            value={ref}
            onChange={(e) => setRef(e.target.value)}
            className="uppercase tracking-widest text-center font-mono !py-4 shadow-sm border border-gray-300 rounded-xl w-full"
          />
          <button type="submit" className="w-full bg-rp text-white py-4 rounded-xl font-bold">
            Verify Appointment
          </button>
        </form>
      </div>
    </div>
  );
};

export default SecurityVerifyPage;