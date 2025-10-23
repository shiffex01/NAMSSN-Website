import React from "react";

const Profilee = () => {
  return (
    <div className="bg-[#041b04] min-h-screen text-white px-6 py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">PROFILE</h1>

      {/* Student Info Section */}
      <div className="grid lg:grid-cols-2 gap-6 mb-8">
        {/* Student Card */}
        <div className="bg-green-900/40 rounded-2xl p-6 shadow-md">
          <div className="flex items-center gap-4">
            <img
              src="/prove.jpg"
              alt="Student"
              className="w-20 h-20 rounded-full border-2 border-green-500"
            />
            <div>
              <h2 className="font-bold text-lg">Shiffy Anny</h2>
              <p>U21MT1025 • Mathematics</p>
              <p>Faculty of Physical Science</p>
              <p>Department of Mathematics</p>
              <p>2025/2026 Session</p>
            </div>
          </div>
          <div className="mt-4 bg-green-700/30 p-3 rounded-lg flex justify-between items-center">
            <p className="font-semibold">
              Calculated GPA: <span className="text-green-300">4.57 / 5.0</span>
            </p>
            <span className="text-green-400 text-xl">✔</span>
          </div>
        </div>

        {/* Settings */}
        <div className="bg-green-900/40 rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold mb-3">Settings</h3>
          <ul className="space-y-2 text-green-200">
            <li>Notification Preference</li>
            <li>Edit My Profile</li>
          </ul>
        </div>
      </div>

      {/* Personal Details */}
      <h2 className="text-xl font-semibold mb-4">Personal Details</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="bg-green-900/40 rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold mb-3">Contact Information</h3>
          <p>Email Address: <span className="text-green-300">shiffex123.com</span></p>
          <p>Phone Number: <span className="text-green-300">080334456622</span></p>
          <p>Residential Address: <span className="text-green-300">ABU, Zaria</span></p>
        </div>

        {/* Demographic Info */}
        <div className="bg-green-900/40 rounded-2xl p-6 shadow-md">
          <h3 className="font-semibold mb-3">Demographic Info</h3>
          <p>Date of Birth: <span className="text-green-300">03/30/2000</span></p>
          <p>Gender: <span className="text-green-300">Female</span></p>
          <p>Nationality: <span className="text-green-300">Nigeria</span></p>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="mt-6 bg-green-900/40 rounded-2xl p-6 shadow-md">
        <h3 className="font-semibold mb-3">Emergency Contact</h3>
        <p>Name: <span className="text-green-300">Ayodeji Anny</span></p>
        <p>Phone Number: <span className="text-green-300">080334456622</span></p>
        <p>Relationship: <span className="text-green-300">—</span></p>
      </div>
    </div>
  );
};

export default Profilee;
