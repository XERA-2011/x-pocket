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
        className="relative group inline-block bg-gradient-to-r from-white to-black bg-no-repeat bg-clip-text bg-[length:0%_100%] transition-all duration-300 hover:text-transparent hover:bg-[length:100%_100%]"
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