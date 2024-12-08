"use client";
import { fetchSettings, updateTheme } from "@/redux/slices/settingsSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const darkTheme = useSelector((state) => state.settings.darkTheme);
  const loading = useSelector((state) => state.settings.loading);
  const [notification, setNotification] = useState(false);

  useEffect(() => {
  
    dispatch(fetchSettings());
    console.log(darkTheme);
  }, [dispatch]);

  const handleThemeToggle = () => {
    dispatch(updateTheme(!darkTheme));
  };

  // console.log("theme", darkTheme);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="text-gray-200">
      <div className="w-full max-w-[500px] flex flex-col gap-y-4">
        <div className="w-full flex flex-row justify-between">
          <p>Dark mode</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={darkTheme}
              onChange={() => handleThemeToggle()}
            />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="w-full flex flex-row justify-between">
          <p>Notification</p>
          <label className="switch">
            <input
              type="checkbox"
              checked={notification}
              onChange={() => setNotification(!notification)}
            />
            <span className="slider round"></span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Page;
