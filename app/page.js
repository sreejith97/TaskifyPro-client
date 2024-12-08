"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  // Initialize dark mode based on localStorage or default to light mode
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode((prevMode) => !prevMode);
  };

  // Apply dark or light mode to the HTML element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 dark:text-white">
      {/* Header Section */}
      <header className="p-4 flex items-center justify-between bg-white dark:bg-gray-800 shadow-md">
        <h1 className="text-2xl font-bold">TaskifyPro</h1>
        <button
          className="p-2 rounded-md bg-gray-200 dark:bg-gray-700"
          onClick={toggleDarkMode}
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-6 text-center">
        <h2 className="text-4xl font-extrabold mb-4">
          Simplify Task and Workflow Management
        </h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
          Streamline your team’s productivity with TaskifyPro’s intuitive task
          assignment, progress tracking, and collaboration features.
        </p>
        <div className="flex space-x-4">
          <Link href="/login">
            <p className="px-6 py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
              Login
            </p>
          </Link>
          <Link href="/register">
            <p className="px-6 py-3 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600">
              Register
            </p>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-gray-100 dark:bg-gray-800 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h3 className="text-3xl font-bold text-center mb-8">Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Task Management</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Create tasks, assign them to employees, set priorities, and
                deadlines.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Collaboration</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Employees can update statuses, request clarifications, and add
                comments.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Reports & Analytics</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Generate insightful reports to monitor progress and
                productivity.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Kanban Board</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Use drag-and-drop task management for an intuitive workflow.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Notifications</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Get reminders and updates for task deadlines and progress.
              </p>
            </div>
            <div className="p-6 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <h4 className="text-xl font-bold mb-2">Time Tracking</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Track time spent on tasks to improve efficiency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="p-6 bg-white dark:bg-gray-800 text-center">
        <p className="text-gray-600 dark:text-gray-300">
          &copy; 2024 TaskifyPro. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
}
