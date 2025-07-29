"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 pb-8 pt-8 flex flex-col items-center transition-all duration-300 backdrop-filter backdrop-blur-[12px] ${scrolled ? "pt-6 pb-6" : ""
        }`}
    >
      <motion.span
        className="relative group inline-block transition-all duration-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-white hover:to-black"
        whileHover={{ scale: 1.2 }}
        transition={{ type: "tween", duration: 0.1 }}
      >
        <Link
          href="/"
          className="text-3xl font-bold text-center block"
        >
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            X-POCKET
          </motion.span>
        </Link>
      </motion.span>
    </motion.header>
  );
}