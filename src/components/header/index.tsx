"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import styles from "./style.module.scss";
import { background } from "./anim";
import Nav from "./nav";
import { cn } from "@/utils/cn";

interface HeaderProps {
  loader?: boolean;
}

const Header = ({ loader }: HeaderProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  return (
    <motion.header
      className={cn(
        styles.header,
        "transition-colors delay-100 duration-500 ease-in"
      )}
      style={{
        background: isActive ? "rgba(0, 0, 0, 0.8)" : "transparent",
      }}
      initial={{
        y: -80,
      }}
      animate={{
        y: 0,
      }}
      transition={{
        delay: loader ? 3.5 : 0,
        duration: 0.8,
      }}
    >
      <div className={cn(styles.bar, "flex items-center justify-between")}>
        <Link href="/" className="flex items-center justify-center cursor-can-hover">
          <span className="text-base md:text-lg font-bold">
            X-POCKET
          </span>
        </Link>

        <button
          onClick={() => setIsActive(!isActive)}
          className={cn(
            styles.el,
            "m-0 p-0 h-6 bg-transparent flex items-center justify-center border-none cursor-can-hover"
          )}
        >
          <div
            className={`${styles.burger} ${
              isActive ? styles.burgerActive : ""
            }`}
          ></div>
        </button>
      </div>

      <motion.div
        variants={background}
        initial="initial"
        animate={isActive ? "open" : "closed"}
        className={styles.background}
      ></motion.div>

      <AnimatePresence mode="wait">
        {isActive && <Nav setIsActive={setIsActive} />}
      </AnimatePresence>
    </motion.header>
  );
};

export default Header;
