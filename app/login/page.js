"use client";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { loadFromLocalStorage } from "@/redux/slices/authSlice";
import { loginUser } from "@/redux/actions/authActions";
import Link from "next/link";

export default function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [isInitialLoading, setIsInitialLoading] = useState(true); 

  useEffect(() => {
    dispatch(loadFromLocalStorage()); 
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsInitialLoading(false); 
      router.push(role === "ADMIN" ? "/admin" : "/worker");
    } else {
      setIsInitialLoading(false); 
    }
  }, [isAuthenticated, role, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await dispatch(loginUser({ email, password }));
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (isInitialLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 py-8">
      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center">
          Welcome Back!
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300 text-center">
          Please enter your credentials to continue.
        </p>

        <form onSubmit={handleLogin} className="mt-6 space-y-6">
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:focus:ring-blue-500"
              required
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300 disabled:bg-blue-400`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link
            href="#"
            className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500 text-sm"
          >
            Forgot your password?
          </Link>
        </div>

        <div className="mt-6 space-y-4">
          <button className="w-full py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-300">
            Login with Google
          </button>
          <button className="w-full py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300">
            Login with GitHub
          </button>
        </div>

        <div className="mt-6 text-center text-sm">
          <p className="text-gray-600 dark:text-gray-300">
            Don’t have an account?{" "}
            <Link
              href="/register"
              className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-500"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
