"use client";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";
import { BsMoon, BsSun } from "react-icons/bs";

const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleTheme = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };
  return (

      <button
        aria-label="color-mode"
        className="color-mode"
        onClick={handleTheme}
      >
        {resolvedTheme === "dark" ? (
          <BsSun className="color-mode__icon hover:-rotate-90 duration-300" />
        ) : (
          <BsMoon className="color-mode__icon hover:-rotate-90 duration-300" />
        )}
      </button>
      
  );
};

export default ThemeSwitcher;
