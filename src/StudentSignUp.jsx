import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const StudentSignup = () => {
  const [formData, setFormData] = useState({
    email: "",
    regNumber: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, regNumber, password, confirmPassword } = formData;

    // ✅ Validation
    if (!email || !regNumber || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    console.log("Sending data:", {
      reg_number: regNumber,
      email: email,
      password: password,
    }); // 👈 debug - shows payload before sending

    try {
      const response = await fetch("http://localhost/namssn_portal/signup.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          reg_number: regNumber,
          email: email,
          password: password,
        }),
      });

      // If server returns non-JSON (blank page / php error), this will throw
      const data = await response.json();
      console.log("Server response:", data); // check server response

      if (data.status === "success") {
        alert("Signup successful! You can now log in.");
        navigate("/student_login");
      } else {
        setError(data.message || "Signup failed.");
      }
    } catch (error) {
      console.error("Error connecting to server:", error);
      setError("Something went wrong while connecting to the server.");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
      style={{ backgroundImage: "url('/background.png')" }}
    >
      <div className="absolute inset-0 bg-[#041b04]/50 backdrop-blur-sm"></div>

      <div className="relative bg-white/95 rounded-3xl shadow-2xl w-[90%] max-w-md p-8 border border-green-200">
        <h1 className="text-3xl font-extrabold text-center text-green-900 mb-2">
          Student Signup
        </h1>
        <p className="text-sm text-center text-green-700 mb-6">
          Create an account using your registration number and email.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Registration Number */}
          <div>
            <label
              htmlFor="regNumber"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Registration Number
            </label>
            <input
              type="text"
              id="regNumber"
              name="regNumber"
              placeholder="Enter your registration number"
              value={formData.regNumber}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400 uppercase"
              autoComplete="off"
            />
          </div>

          {/* Email */}
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
              placeholder="Enter your email address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
              autoComplete="email"
            />
          </div>

          {/* Password */}
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
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
              autoComplete="new-password"
            />
          </div>

          {/* Confirm Password */}
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
              autoComplete="new-password"
            />
          </div>

          {/* Error message */}
          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          {/* Signup button */}
          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-full font-semibold shadow-md transition-all"
          >
            Sign Up
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Already have an account?{" "}
            <Link
              to="/student_login"
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

export default StudentSignup;
