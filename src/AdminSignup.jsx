import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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

    // ✅ Validation checks
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

    // ✅ Save user info to localStorage
    localStorage.setItem("admin", JSON.stringify(formData));

    alert("Signup successful! You can now log in.");

    // Redirect to login page
    navigate("/admin_login");
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-[#041b04]/10 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-2xl p-8 shadow-lg w-[90%] max-w-sm border border-green-200">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-2">
          Sign Up
        </h2>
        <p className="text-sm text-center text-green-700 mb-4">
          Create your student account
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium text-green-800"
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
              className="w-full mt-1 px-3 py-2 text-black border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="ID"
              className="block text-sm font-medium text-green-800"
            >
              ID
            </label>
            <input
              type="text"
              id="ID"
              name="ID"
              placeholder="Generate a combination or letters and numbers"
              value={formData.ID}
              onChange={handleChange}
              className="w-full placeholder:text-[12px] mt-1 px-3 py-2 text-black border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-800"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full mt-1 px-3 py-2 text-black border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-800"
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
              className="w-full mt-1 px-3 py-2 text-black border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-green-800"
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
              className="w-full mt-1 px-3 py-2 text-black border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-800 hover:bg-green-900 text-white py-2 rounded-full transition-all"
          >
            Sign Up
          </button>

          <p className="text-xs text-center mt-2 text-[#020a02]">
            Already have an account?{" "}
            <a href="/admin_login" className="text-red-600 hover:underline">
              Login Here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AdminSignup;
