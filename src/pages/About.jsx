import React from "react";

const About = () => {
  return (
    <div className="w-full">
      {/* Header Banner */}
      <div
        className="w-full h-56 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df')",
        }}
      >
        <div className="absolute inset-0 bg-blue-500/60"></div>
        <h1 className="absolute bottom-5 left-10 text-white text-3xl font-bold">
          About Ikaze Visitor Management System
        </h1>
      </div>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-5 py-10">
        {/* OVERVIEW */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">Overview</h2>
          <p className="text-gray-700 leading-relaxed">
            <strong>Ikaze</strong> is a modern Visitor Management System designed to
            streamline, secure, and digitalize the visitor registration process in schools
            and institutions. The platform allows visitors to book appointments online,
            enables administration to approve or decline requests, and generates a unique
            APT Code for secure entry. Ikaze improves efficiency, reduces manual paperwork,
            and enhances campus security through organized, automated visitor tracking.
          </p>
        </section>

        {/* HOW IT WORKS */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">How Ikaze Works</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-3 leading-relaxed">
            <li>
              <strong>Visitor Books Appointment:</strong> Visitors schedule their visit
              online by filling in required information like name, phone, ID, purpose, and
              the person they want to meet.
            </li>
            <li>
              <strong>Administration Review:</strong> School administrators review,
              verify, and approve or reject appointments.
            </li>
            <li>
              <strong>APT Code Generation:</strong> Upon approval, the system generates a
              unique <strong>APT Code</strong> that acts as the visitor’s access
              authorization.
            </li>
            <li>
              <strong>Security Check-In:</strong> Visitors present their APT Code at the
              gate. Security staff use Ikaze to validate and check in the visitor.
            </li>
            <li>
              <strong>Visitor Tracking:</strong> Administrators can monitor active,
              completed, and pending visits in real time.
            </li>
          </ul>
        </section>

        {/* FEATURES */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">Key Features</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Online visitor appointment booking</li>
            <li>Admin approval & appointment management</li>
            <li>Automatic APT Code generation</li>
            <li>Secure visitor check-in & check-out</li>
            <li>Security dashboard for verification</li>
            <li>Visitor history tracking & reporting</li>
            <li>Simple, clean, and user-friendly interface</li>
          </ul>
        </section>

        {/* VISION */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">Vision</h2>
          <p className="text-gray-700 leading-relaxed">
            To create a safer, smarter, and more organized visitor experience for schools
            and institutions through secure digital automation.
          </p>
        </section>

        {/* MISSION */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">Mission</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-2 leading-relaxed">
            <li>Enhance security and visitor verification.</li>
            <li>Eliminate manual paperwork and long queues.</li>
            <li>Provide a transparent and accountable visitor process.</li>
            <li>Increase efficiency for administration and security teams.</li>
            <li>Improve visitor experience using modern technology.</li>
          </ul>
        </section>

        {/* CORE VALUES */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-3 text-blue-500">Core Values</h2>
          <ul className="list-disc pl-6 text-gray-700 space-y-1">
            <li>Security</li>
            <li>Transparency</li>
            <li>Efficiency</li>
            <li>Innovation</li>
            <li>Reliability</li>
          </ul>
        </section>

    
      </div>
    </div>
  );
};

export default About;
