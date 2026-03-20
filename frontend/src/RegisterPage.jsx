import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("learner");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Registration failed");
      }

      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      navigate("/goal-setting");

    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT SECTION */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-16">
        
        {/* Logo */}
        <div className="absolute top-6 left-10 flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg text-white">✨</div>
          <h1 className="text-2xl font-bold text-purple-600">
            CareerPath
          </h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-purple-600 mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6 italic">
            Start your career journey today
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
            <button
              onClick={() => navigate("/")}
              className="w-1/2 py-2 text-gray-500 font-medium"
            >
              Login
            </button>
            <button className="w-1/2 bg-white py-2 rounded-md shadow text-purple-600 font-medium">
              Sign Up
            </button>
          </div>

          {/* Email */}
          <label className="text-sm text-gray-600">Email Address</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-white">
            <Mail className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full outline-none text-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mb-4 bg-white">
            <Lock className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              className="w-full outline-none text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {showPassword ? (
              <EyeOff
                className="w-4 h-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <Eye
                className="w-4 h-4 text-gray-400 cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>

          {/* Role Selection */}
          <label className="text-sm text-gray-600">Select Role</label>
          <div className="flex gap-4 mb-6">
            <button
              onClick={() => setRole("learner")}
              className={`w-1/2 py-2 rounded-lg border ${
                role === "learner"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Learner
            </button>

            <button
              onClick={() => setRole("mentor")}
              className={`w-1/2 py-2 rounded-lg border ${
                role === "mentor"
                  ? "bg-purple-600 text-white"
                  : "bg-white text-gray-600"
              }`}
            >
              Mentor
            </button>
          </div>

          {/* Register Button */}
          <button
            onClick={handleRegister}
            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:opacity-90 transition mb-6"
          >
            Create Account
          </button>

          {/* Google Auth */}
          <button
            onClick={() =>
              (window.location.href =
                "http://localhost:3000/auth/google")
            }
            className="w-full border rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="google"
              className="w-4 h-4"
            />
            Continue with Google
          </button>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white flex items-center justify-center px-20">
        <h1 className="text-4xl font-bold leading-snug">
          Join us and start building <br />
          your dream career today 🚀
        </h1>
      </div>
    </div>
  );
}