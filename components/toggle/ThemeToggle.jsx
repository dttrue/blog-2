"use client";
import { BsMoonFill, BsSunFill } from "react-icons/bs";
import { useState } from "react";

const ThemeToggle = () => {
  const themes = {
    winter: "winter",
    dracula: "dracula",
  };

  const [theme, setTheme] = useState(themes.winter);

  const toggleTheme = () => {
    const newTheme = theme === themes.winter ? themes.dracula : themes.winter;
    document.documentElement.setAttribute("data-theme", newTheme);
    setTheme(newTheme);
  };
  return (
    <button onClick={toggleTheme} className="btn btn-outline btn-sm">
      {theme === "winter" ? (
        <BsMoonFill className="h-4 w-4" />
      ) : (
        <BsSunFill className="h-4 w-4" />
      )}
    </button>
  );
};

export default ThemeToggle;
