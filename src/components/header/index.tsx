"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/ElasticButton";
export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md bg-black/10 py-6"
    >
      <div className="container mx-auto px-4 flex justify-center">
        <motion.div
          className="relative group"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
        >
          <Button
            asChild
            variant="ghost"
          >
            <Link href="/" className="text-2xl md:text-3xl font-bold text-white no-underline">
              X-POCKET
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.header>
  );
}
