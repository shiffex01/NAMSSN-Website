import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const AdminSignup = () => {
  const [formData, setFormData] = useState({
    fullname: "",
    ID: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.fullname ||
      !formData.ID ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Save to localStorage (later I’ll replace with backend API)
    localStorage.setItem("admin", JSON.stringify(formData));

    alert("Signup successful! You can now log in.");
    navigate("/admin_login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-[#041b04]/50 backdrop-blur-sm"></div>

      <div className="relative bg-white/95 rounded-3xl p-8 md:p-10 shadow-2xl w-[90%] max-w-md border border-green-200">
        <h1 className="text-3xl font-extrabold text-center text-green-900 mb-3">
          Admin Sign Up
        </h1>
        <p className="text-sm text-center text-green-700 mb-6">
          Create your admin account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              placeholder="Enter your full name"
              value={formData.fullname}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="ID"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Admin ID / Code
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              placeholder="e.g. ADM1234"
              value={formData.ID}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-full font-semibold shadow-md transition-all"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Already have an admin account?{" "}
            <Link
              to="/admin_login"
              className="text-green-800 font-semibold hover:underline"
            >
              Login here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
