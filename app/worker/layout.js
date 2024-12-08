"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadFromLocalStorage, logout } from "@/redux/slices/authSlice";
import WorkerDashboard from "@/components/WorkerDashboard/WorkerDashboard";

const Layout = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === null) return; // Wait for auth state to initialize

    if (!isAuthenticated) {
      // Redirect to login only if not authenticated
      router.push("/login");
    } else if (role !== "WORKER") {
      // Redirect to user dashboard if not admin
      router.push("/admin");
    } else {
      // If everything is fine, stop loading
      setIsLoading(false);
    }
  }, [isAuthenticated, role, router]);

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    router.push("/login"); // Redirect to login page after logout
  };

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading indicator while waiting for auth check
  }

  return <WorkerDashboard>{children}</WorkerDashboard>;
};

export default Layout;
