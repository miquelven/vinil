"use client";

import { useEffect, useState } from "react";
import { ChevronUp } from "lucide-react";

export default function ToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 200);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-10 right-10 z-20 p-3 rounded-lg transition-all duration-300 cursor-pointer hover:scale-90 ${
        isVisible ? "opacity-100 bg-darkLight" : "opacity-0 pointer-events-none"
      }`}
    >
      <ChevronUp className="text-white" />
    </button>
  );
}
