"use client";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [theme, setTheme] = useState("light"); 

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const updateTheme = () => {
      setTheme(mediaQuery.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", updateTheme);
    updateTheme();

    return () => {
      mediaQuery.removeEventListener("change", updateTheme);
    };
  }, []);

  return (
    <div>
      <h1>The current theme is: {theme}</h1>
    </div>
  );
};

export default Page;
