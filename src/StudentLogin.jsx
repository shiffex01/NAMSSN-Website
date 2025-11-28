import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const StudentLogin = () => {
  const [formData, setFormData] = useState({
    regNumber: "",
    password: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // clear previous error

    const { regNumber, password } = formData;

    if (!regNumber || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const response = await fetch("http://192.168.126.155:5173/namssn_portal/login.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          reg_number: regNumber,
          password: password,
        }),
      });

      const data = await response.json();
      console.log("Server response:", data);

      if (data.status === "success") {
        const fullName = data.student.full_name;
        alert(`Welcome back, ${fullName}!`); // ✅ Display student's name

        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("loggedInStudent", JSON.stringify(data.student));

        navigate("/home");
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error connecting to server:", err);
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
            className="w-full bg-green-800 hover:bg-green-900 text-white py-2.5 rounded-full font-semibold shadow-md transition-all"
          >
            Login
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
