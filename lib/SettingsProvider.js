"use client";
import React from "react";
import { loadFromLocalStorage } from "@/redux/slices/authSlice";
import { fetchSettings } from "@/redux/slices/settingsSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaShieldAlt } from "react-icons/fa";

const SettingsProvider = ({ children }) => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.settings.darkTheme);

  useEffect(() => {
    // Toggle the dark theme class on the <html> element
    if (darkTheme) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkTheme]);

  useEffect(() => {
    dispatch(fetchSettings());
  }, [dispatch]);
  return <>{children}</>;
};

export default SettingsProvider;
