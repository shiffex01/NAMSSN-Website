import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API_BASE } from "./api";

const AdminLogin = () => {
  const [formData, setFormData] = useState({
    admin_code: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.admin_code || !formData.password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/login.php`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          admin_code: formData.admin_code,
          password: formData.password,
        }),
      });

      const data = await res.json();

      const payloadAdmin = data?.admin || data?.data?.admin;

      if (data.status === "success" && payloadAdmin) {
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminName", payloadAdmin.full_name);

        alert(`Welcome back, ${payloadAdmin.full_name}!`);
        navigate("/admin");
      } else {
        setError(data.message || "Login failed.");
      }

    } catch (err) {
      console.error(err);
      setError("Server error. Please try again.");
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

      <div className="relative bg-white/95 rounded-3xl p-8 md:p-10 shadow-2xl w-[90%] max-w-md border border-green-200">
        <h1 className="text-3xl font-extrabold text-center text-green-900 mb-3">
          Admin Login
        </h1>
        <p className="text-sm text-center text-green-700 mb-6">
          Sign in with your Admin ID or email
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="admin_code"
              className="block text-sm font-semibold text-green-800 mb-1"
            >
              Admin ID / Email
            </label>
            <input
              type="text"
              id="admin_code"
              name="admin_code"
              placeholder="Enter your Admin ID"
              value={formData.admin_code}
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

          {error && (
            <p className="text-red-600 text-sm text-center font-medium">
              {error}
            </p>
          )}

          <div className="text-center">
            <p className="text-xs text-green-800 hover:text-green-900 hover:underline transition-all">
              Forgot password?{" "}
              <a href="#" className="text-red-600 hover:underline">
                Click here to reset
              </a>
            </p>
          </div>

          <button
            type="submit"
            className="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-full font-semibold shadow-md transition-all"
          >
            Login
          </button>

          <p className="text-sm text-center text-gray-700 mt-4">
            Don’t have an account?{" "}
            <Link
              to="/admin_signup"
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

export default AdminLogin;
