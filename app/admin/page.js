"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { logout } from "@/redux/slices/authSlice";

export default function AdminHome() {
  return (
    <div className="text-white">
      <h1>Admin Dashboard</h1>
      <p>Welcome, Admin! Manage your tasks and teams here.</p>
    </div>
  );
}
