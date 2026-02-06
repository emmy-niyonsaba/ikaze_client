import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa"; // Home icon
import kigali from '../assets/images/kigali.jpg'
import kigali1 from '../assets/images/kigali1.jpg'
import ngoma from '../assets/images/ngoma.jpg'
import tumba from '../assets/images/Tumba.jpg'

const slides = [
  {
    id: 1,
    image: tumba, // replace with your image
    title: "Welcome to the System",
    subtitle: "Manage appointments smoothly and faster.",
  },
  {
    id: 2,
    image: kigali,
    title: "Security & Check-in",
    subtitle: "Track all entry and approvals efficiently.",
  },
  {
    id: 3,
    image: ngoma,
    title: "Smart Scheduling",
    subtitle: "Plan and manage your daily operations.",
  },
  {
    id: 4,
    image: kigali1,
    title: "Developeb by Emmanuel Niyonsaba",
    subtitle: "Work with us for software develpment",
  },
];

const Home = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Auto slide every 5s
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <motion.div
          key={slide.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: index === activeSlide ? 1 : 0 }}
          transition={{ duration: 1 }}
          className="absolute top-0 left-0 w-full h-full"
          style={{
            background: `url(${slide.image}) center/cover no-repeat`,
          }}
        >
          {index === activeSlide && (
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="w-full h-full flex flex-col items-center justify-center bg-black/40 text-white"
            >
              <h1 className="text-4xl font-bold mb-4">{slide.title}</h1>
              <p className="text-lg">{slide.subtitle}</p>
            </motion.div>
          )}
        </motion.div>
      ))}

      {/* HOME ICON + SIDEBAR */}
      
    </div>
  );
};

export default Home;
