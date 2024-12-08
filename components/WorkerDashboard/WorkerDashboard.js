"use client";

import { logout } from "@/redux/slices/authSlice";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FiMenu, FiHome, FiSettings, FiLogOut, FiBell } from "react-icons/fi";
import { TbUsersGroup } from "react-icons/tb";
import { LiaProjectDiagramSolid } from "react-icons/lia";
import { useDispatch } from "react-redux";

const WorkerDashboard = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900">
      <div
        className={`${
          isSidebarOpen ? "w-64" : "w-20"
        } bg-white dark:bg-gray-800 h-screen p-5 flex flex-col justify-between transition-all duration-300 shadow-lg`}
      >
        <div className="flex flex-row items-center justify-start gap-x-5">
          <h2
            className={`text-white font-bold text-4xl transition-all duration-300 delay-300 ${
              isSidebarOpen ? "" : "hidden"
            }`}
          >
            Taskify Pro
          </h2>
        </div>

        <nav className="mt-10 space-y-4">
          <Link
            href="/worker"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg"
          >
            <FiHome size={20} />
            <span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Home
            </span>
          </Link>
          <Link
            href="/worker/projects"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg"
          >
            <LiaProjectDiagramSolid size={20} />
            <span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Projects
            </span>
          </Link>
          <Link
            href="/worker/task"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg"
          >
            <LiaProjectDiagramSolid size={20} />
            <span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Tasks
            </span>
          </Link>

          <Link
            href="/worker/settings"
            className="flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg"
          >
            <FiSettings size={20} />
            <span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Settings
            </span>
          </Link>
        </nav>

        <div className="mt-auto">
          <button
            onClick={handleLogout}
            className="w-full flex items-center text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 p-3 rounded-lg"
          >
            <FiLogOut size={20} />
            <span
              className={`ml-4 text-sm font-medium transition-all duration-300 ${
                isSidebarOpen ? "block" : "hidden"
              }`}
            >
              Logout
            </span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col">
    
        <div className="bg-white dark:bg-gray-800 shadow-lg py-4 px-6 flex justify-between items-center">
          <div className="flex flex-row items-center justify-center gap-x-3">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="text-gray-800 dark:text-white focus:outline-none"
            >
              <FiMenu size={24} />
            </button>
            <h1 className="text-lg font-bold text-gray-800 dark:text-white">
              Dashboard
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <button className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white">
              <FiBell size={20} />
            </button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Profile
            </button>
          </div>
        </div>

        <div className="flex-1 p-4">
         
          <main className="flex-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default WorkerDashboard;
