"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./style.module.scss";
import { height } from "../anim";
import Body from "./body";
import { links } from "../config";
import { cn } from "@/utils/cn";

interface IndexProps {
  setIsActive: (isActive: boolean) => void;
}

interface SelectedLinkState {
  isActive: boolean;
  index: number;
}

const Nav: React.FC<IndexProps> = ({ setIsActive }) => {
  const [selectedLink, setSelectedLink] = useState<SelectedLinkState>({
    isActive: false,
    index: 0,
  });

  return (
    <motion.div
      variants={height}
      initial="initial"
      animate="enter"
      exit="exit"
      className={styles.nav}
    >
      <div className={cn(styles.wrapper, 'flex justify-end sm:justify-start')}>
        <div className={styles.container}>
          <Body
            links={links}
            selectedLink={selectedLink}
            setSelectedLink={setSelectedLink}
            setIsActive={setIsActive}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default Nav;
