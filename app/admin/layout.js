"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { loadFromLocalStorage, logout } from "@/redux/slices/authSlice";
import AdminDashboard from "@/components/AdminDashboard/AdminDashboard";

const Layout = ({ children }) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    dispatch(loadFromLocalStorage());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated === null) return; 

    if (!isAuthenticated) {
    
      router.push("/login");
    } else if (role !== "ADMIN") {
      
      router.push("/worker");
    } else {
    
      setIsLoading(false);
    }
  }, [isAuthenticated, role, router]);

  const handleLogout = () => {
    dispatch(logout()); 
    router.push("/login");
  };

  if (isLoading) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <AdminDashboard>{children}</AdminDashboard>
    </>
  );
};

export default Layout;
