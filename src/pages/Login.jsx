import React, { useState } from "react";
import {
  Mail,
  Phone,
  Lock,
  Store,
  LogIn,
  Eye,
  EyeOff,
  Loader2,
  CheckCircle2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    navigate('/dashboard');
    e.preventDefault();

    if (!formData.emailOrPhone || !formData.password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    // Simulate login
    setTimeout(() => {
      setLoading(false);
      setLoggedIn(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-yellow-50 flex justify-center items-center p-6">
      <div className="bg-white shadow-xl rounded-2xl w-full max-w-md p-8 border-t-4 border-green-500 animate-fadeIn">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="flex justify-center items-center gap-2 text-green-600 text-3xl font-bold">
            <Store size={28} /> SmartMarket
          </div>
          <p className="text-gray-500 text-sm mt-2">
            Login to manage your supermarket dashboard
          </p>
        </div>

        {/* Success View */}
        {loggedIn ? (
          <div className="text-center py-10 animate-fadeIn">
            <CheckCircle2
              size={64}
              className="mx-auto text-green-500 mb-4 animate-pulse"
            />
            <h3 className="text-xl font-semibold text-gray-800">
              Welcome Back 👋
            </h3>
            <p className="text-gray-600 mt-2">
              You’re now logged into your SuperMarket portal.
            </p>
          </div>
        ) : (
          <form className="space-y-5" onSubmit={handleSubmit}>
            {/* Email / Phone */}
            <div>
              <label className="text-gray-700 font-medium flex items-center gap-2">
                <Mail className="text-green-600" size={18} />
                Email or Phone
              </label>
              <div className="relative">
                <input
                  name="emailOrPhone"
                  value={formData.emailOrPhone}
                  onChange={handleChange}
                  placeholder="Enter email or phone number"
                  className="input pr-10"
                />
                <Phone
                  size={18}
                  className="absolute right-3 top-4 text-gray-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-700 font-medium flex items-center gap-2">
                <Lock className="text-green-600" size={18} />
                Password
              </label>
              <div className="relative">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="input pr-10"
                />
                <div
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-4 text-gray-500 cursor-pointer hover:text-green-600 transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </div>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="text-right">
              <a
                href="/forgot-password"
                className="text-sm text-green-600 hover:underline font-medium"
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full btn-primary flex items-center justify-center gap-2 ${
                loading ? "opacity-80 cursor-not-allowed" : ""
              }`}
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Logging in...
                </>
              ) : (
                <>
                  <LogIn size={18} /> Login
                </>
              )}
            </button>

            {/* Divider */}
            <div className="flex items-center my-4">
              <div className="flex-grow h-[1px] bg-gray-300"></div>
              <span className="px-3 text-gray-500 text-sm">or</span>
              <div className="flex-grow h-[1px] bg-gray-300"></div>
            </div>

            {/* Register Link */}
            <p className="text-center text-sm text-gray-600">
              Don’t have an account?{" "}
              <a
                href="/register"
                className="text-green-600 font-medium hover:underline"
              >
                Register now
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}
