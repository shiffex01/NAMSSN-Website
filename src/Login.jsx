import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate(); // <-- Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.username || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }
  alert('Welcome back Student')

  if (formData.username && formData.password) {
      // ✅ Set login status in localStorage
      localStorage.setItem("isLoggedIn", "true");

      // Redirect to dashboard
      navigate("/home");
    } else {
      setError("Invalid registration number or password");
    }
  console.log("Logging in with:", formData);

  // ✅ Redirect to dashboard
  setError("");
  navigate("/home");
};

  return (
    <div
        className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
        style={{ backgroundImage: "url('/background.png')" }}
    >

      <div className="absolute inset-0 bg-[#041b04]/10 backdrop-blur-sm"></div>

      <div className="relative bg-white/90 rounded-2xl p-8 shadow-lg w-[90%] max-w-sm border border-green-200">
        <h2 className="text-2xl font-bold text-center text-green-900 mb-2">
          Login
        </h2>
        <p className="text-sm text-center text-green-700 mb-4">
          Login with your username and password
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium text-green-800"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter your email or username"
              value={formData.username}
              onChange={handleChange}
              className="w-full mt-1 px-3 text-black py-2 border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
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
              className="w-full mt-1 px-3 py-2 border border-green-700 text-black rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <p className="text-xs text-center">
            Forgot password?{" "}
            <a href="#" className="text-red-600 hover:underline">
              Click here to reset
            </a>
          </p>

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-800 hover:bg-green-900 text-white py-2 rounded-full transition-all"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
