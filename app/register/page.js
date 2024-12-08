"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";

export default function Register() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isPasswordStrong, setIsPasswordStrong] = useState(false);
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/register`,
        { email, password, name }
      );

      if (res.status === 201) {
        setIsOtpSent(true);

        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(
          err.response.data.message || "Registration failed. Please try again."
        );
      } else {
        setError("An error occurred. Please check your connection.");
      }
    }
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_PROD_SERVER}/user/verify-otp`,
        { email, otp }
      );

      if (res.status === 201) {
        setSuccess("OTP verified successfully!");
        setLoading(false);
        router.push("/login");
      }
    } catch (err) {
      setLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Invalid OTP. Please try again.");
      } else {
        setError("An error occurred. Please check your connection.");
      }
    }
  };

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setPassword(password);
    // Check for password strength (min 8 characters, must contain at least one number and one special character)
    const strongPasswordPattern =
      /^(?=.*[0-9])(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    setIsPasswordStrong(strongPasswordPattern.test(password));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 py-8">
      <div className="w-full max-w-lg p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          {/* <Image src="/logo.png" alt="Logo" className="mx-auto w-24 mb-4" /> */}
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white">
            {isOtpSent ? "Verify Your OTP" : "Create Your Account"}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            Join our community and start using our platform to enhance your
            productivity.
          </p>
        </div>

        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
        {success && (
          <p className="text-green-500 text-center mt-4">{success}</p>
        )}

        {!isOtpSent ? (
          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-gray-600 dark:text-gray-300"
              >
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-gray-600 dark:text-gray-300"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                required
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-gray-600 dark:text-gray-300"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={passwordVisible ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={handlePasswordChange}
                  className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                  required
                />
                <button
                  type="button"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 dark:text-gray-300"
                >
                  {passwordVisible ? "Hide" : "Show"}
                </button>
              </div>
              <p
                className={`text-sm ${
                  isPasswordStrong ? "text-green-500" : "text-red-500"
                }`}
              >
                {isPasswordStrong
                  ? "Password is strong"
                  : "Password must be at least 8 characters, include a number and a special character"}
              </p>
            </div>

            <button
              type="submit"
              disabled={loading || !isPasswordStrong}
              className={`w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400`}
            >
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpVerify} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="otp" className="text-gray-600 dark:text-gray-300">
                OTP
              </label>
              <input
                id="otp"
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3 mt-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-300 disabled:bg-green-400`}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        )}

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
