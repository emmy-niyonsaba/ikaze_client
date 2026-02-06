import React from "react";
import{Link} from "react-router-dom"
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-blue-400 text-white py-10 mt-20">
      <div className="max-w-6xl mx-auto px-5 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold">Ikaze</h2>
          <p className="text-blue-100 mt-3 leading-relaxed">
            Ikaze is a modern Visitor Management System designed to simplify,
            secure, and digitalize the visitor appointment process for schools
            and institutions across Rwanda.
          </p>
        </div>

      {/* Quick Links */}
<div>
  <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
  <ul className="space-y-2 text-blue-100">

    <li className="hover:text-white cursor-pointer">
      <Link
        to="/"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Home
      </Link>
    </li>

    <li className="hover:text-white cursor-pointer">
      <Link
        to="/about"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        About
      </Link>
    </li>

    <li className="hover:text-white cursor-pointer">
      <Link
        to="/booking"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Book Appointment
      </Link>
    </li>

    <li className="hover:text-white cursor-pointer">
      <Link
        to="/login"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Admin Login
      </Link>
    </li>

    <li className="hover:text-white cursor-pointer">
      <Link
        to="/contact"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        Contact
      </Link>
    </li>

  </ul>
</div>

        {/* Contact */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
          <ul className="space-y-2 text-blue-100">
            <li>Email: support@ikaze.rw</li>
            <li>Phone: +250 788 000 000</li>
            <li>Kigali, Rwanda</li>
          </ul>

          {/* Social Icons */}
          <div className="flex items-center gap-4 mt-4">
            <FaFacebook className="text-2xl hover:text-white cursor-pointer" />
            <FaTwitter className="text-2xl hover:text-white cursor-pointer" />
            <FaInstagram className="text-2xl hover:text-white cursor-pointer" />
            <FaLinkedin className="text-2xl hover:text-white cursor-pointer" />
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-blue-400 mt-8 pt-5 text-center text-blue-100 text-sm">
        © {new Date().getFullYear()} Ikaze Visitor Management System. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
