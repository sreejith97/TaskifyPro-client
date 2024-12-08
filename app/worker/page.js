"use client";

import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";

export default function WorkerDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout()); 
    router.push("/login"); 
  };

  return (
    <div>
      <h1>Worker Dashboard</h1>
      <p>Welcome, Worker! Manage your tasks and teams here.</p>
      <button onClick={handleLogout}>Logout</button> 
    </div>
  );
}
