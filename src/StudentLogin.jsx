import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; // <-- Added Link

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const savedUser = JSON.parse(localStorage.getItem("student"));

    if (savedUser && savedUser.username === formData.username && savedUser.password === formData.password) {
      // login successful
    }

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!formData.username || !formData.password) {
    setError("Please fill in all fields.");
    return;
  }

  // Get the saved user from localStorage
  const savedUser = JSON.parse(localStorage.getItem("student"));

  if (!savedUser) {
    setError("No account found. Please sign up first.");
    return;
  }

  // Check if username/email and password match
  if (
    (formData.username === savedUser.username || formData.username === savedUser.email) &&
    formData.password === savedUser.password
  ) {
    // Login successful
    localStorage.setItem("isLoggedIn", "true"); // optional
    alert("Welcome back Student");
    navigate("/home");
  } else {
    setError("Invalid username/email or password.");
  }
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
              className="w-full mt-1 px-3 text-[#020a02] py-2 border border-green-700 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
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
              className="w-full mt-1 px-3 py-2 border border-green-700 text-[#020a02] rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 text-sm"
            />
          </div>

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <p className="text-xs text-[#020a02] text-center">
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

          <p className="text-xs text-[#020a02] text-end">
            Don't have an account?{" "}
            <Link to="/student_signup" className="text-red-600 hover:underline">
              Sign Up Here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
