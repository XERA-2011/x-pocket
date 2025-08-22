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
    <>
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/10 ${
          scrolled ? "py-4" : "py-6"
        }`}
      >
        <div className="container mx-auto px-4 flex justify-center">
          <motion.div
            className="relative group"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
          >
            <Link
              href="/"
              className="text-2xl md:text-3xl font-bold text-white hover:text-white/80 transition-colors duration-300 no-underline"
            >
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="relative"
              >
                X-POCKET
              </motion.span>
            </Link>
          </motion.div>
        </div>
      </motion.header>
      
      {/* Spacer to prevent content overlap */}
      <div className={`${scrolled ? "h-16" : "h-20"} transition-all duration-300`} />
    </>
  );
}