import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "./api";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    regNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { regNumber, password } = formData;

    if (!regNumber || !password) {
      setLoading(false);
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        credentials: "include", 
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reg_number: regNumber,
          password,
        }),
      });

      const text = await response.text();
      let data;

      try {
        data = JSON.parse(text);
      } catch (e) {
        console.log("RAW RESPONSE (not JSON):", text);
        setLoading(false);
        setError("Backend did not return JSON. Check console for RAW RESPONSE.");
        return;
      }

      console.log("Server response:", data);

      if (data.status === "success") {
      
        const student = data.data?.student;

        //  local storage
        localStorage.setItem("isLoggedIn", "true");
        if (student) {
          localStorage.setItem("loggedInStudent", JSON.stringify(student));
          alert(`Welcome back, ${student.full_name}!`);
        } else {
          alert("Login successful!");
        }

        navigate("/home");
      } else {
        setError(data.message || "Login failed.");
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
      setError("Something went wrong while connecting to the server.");
    } finally {
      setLoading(false);
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
          Student Login
        </h1>
        <p className="text-sm text-center text-green-700 mb-6">
          Please log in using your registration number and password.
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
              className="w-full px-4 py-2 text-sm border border-green-700 text-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-green-600 placeholder-gray-400"
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
              placeholder="Enter your password"
              value={formData.password}
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
            disabled={loading}
            className="w-full bg-green-800 hover:bg-green-900 disabled:opacity-60 text-white py-2.5 rounded-full font-semibold shadow-md transition-all"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/student_signup"
              className="text-green-800 font-semibold hover:underline"
            >
              Sign up here
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
