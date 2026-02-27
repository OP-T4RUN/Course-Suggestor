import React, { useState } from "react";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Target,
  Zap,
  TrendingUp,
} from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen flex font-sans">
      {/* LEFT SECTION */}
      <div className="w-1/2 bg-gray-50 flex flex-col justify-center items-center px-16">
        {/* Logo */}
        <div className="absolute top-6 left-10 flex items-center gap-2">
          <div className="bg-purple-600 p-2 rounded-lg text-white">
            ✨
          </div>
          <h1 className="text-2xl font-bold text-purple-600">
            CareerPath
          </h1>
        </div>

        <div className="w-full max-w-md">
          <h2 className="text-3xl font-bold text-purple-600 mb-1">
            CareerPath
          </h2>
          <p className="text-gray-500 mb-6 italic">
            "Your career journey starts here"
          </p>

          {/* Tabs */}
          <div className="flex bg-gray-200 rounded-lg p-1 mb-6">
            <button className="w-1/2 bg-white py-2 rounded-md shadow text-purple-600 font-medium">
              Login
            </button>
            <button className="w-1/2 py-2 text-gray-500 font-medium">
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
            />
          </div>

          {/* Password */}
          <label className="text-sm text-gray-600">Password</label>
          <div className="flex items-center border rounded-lg px-3 py-2 mb-2 bg-white">
            <Lock className="text-gray-400 w-4 h-4 mr-2" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              className="w-full outline-none text-sm"
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

          {/* Remember + Forgot */}
          <div className="flex justify-between items-center mb-6 text-sm">
            <div className="flex items-center gap-2">
              <input type="checkbox" />
              <span className="text-gray-600">Remember me</span>
            </div>
            <span className="text-purple-600 cursor-pointer">
              Forgot password?
            </span>
          </div>

          {/* Login Button */}
          <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-purple-700 text-white font-semibold shadow-lg hover:opacity-90 transition mb-6">
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-300" />
            <span className="text-gray-400 text-sm">
              or continue with
            </span>
            <div className="flex-1 h-px bg-gray-300" />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-4">
            <button className="w-1/2 border rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/475656/google-color.svg"
                alt="google"
                className="w-4 h-4"
              />
              Google
            </button>

            <button className="w-1/2 border rounded-lg py-2 flex justify-center items-center gap-2 hover:bg-gray-100">
              <img
                src="https://www.svgrepo.com/show/512317/github-142.svg"
                alt="github"
                className="w-4 h-4"
              />
              GitHub
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 bg-gradient-to-br from-purple-700 via-purple-600 to-purple-500 text-white flex flex-col justify-center px-20 relative">
        <div>
          <h1 className="text-4xl font-bold leading-snug mb-10">
            Success is not just about <br />
            making a life, it's about <br />
            making a difference.
          </h1>

          {/* Feature Cards */}
          <div className="space-y-6">
            <FeatureCard
              icon={<Target />}
              title="Get job ready"
              desc="Build the skills employers are looking for"
            />
            <FeatureCard
              icon={<Zap />}
              title="Learn Faster"
              desc="Accelerate your learning with expert guidance"
            />
            <FeatureCard
              icon={<TrendingUp />}
              title="Achieve your goals"
              desc="Turn your career aspirations into reality"
            />
          </div>

          {/* Stats */}
          <div className="flex gap-16 mt-16 text-center">
            <div>
              <h2 className="text-2xl font-bold">10k+</h2>
              <p className="text-sm text-purple-200">Active Users</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">500+</h2>
              <p className="text-sm text-purple-200">Companies</p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">95%</h2>
              <p className="text-sm text-purple-200">Success Rate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }) {
  return (
    <div className="flex items-center gap-4 bg-white/10 p-4 rounded-xl backdrop-blur-md">
      <div className="bg-white/20 p-3 rounded-lg">{icon}</div>
      <div>
        <h3 className="font-semibold">{title}</h3>
        <p className="text-sm text-purple-200">{desc}</p>
      </div>
    </div>
  );
}