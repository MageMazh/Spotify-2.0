"use client"
import React, { useState, useEffect } from "react";

function Navbar({ children }: any) {
  const [scrolling, setScrolling] = useState(false);

  const handleScroll = () => {
    setScrolling(window.scrollY > 400);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`flex items-center justify-end sticky top-0 w-full h-16 py-4 px-8 z-50 transition duration-500 ease-in-out ${
        scrolling ? "bg-black" : "bg-transparent"
      }`}
    >
      {children}
    </nav>
  );
}

export default Navbar;
