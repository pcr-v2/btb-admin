import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

const ContainerVariants = {
  initial: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const DotVariants = {
  initial: {
    y: "0%",
    backgroundColor: "#3196ff",
  },
  animate: {
    y: "100%",
    backgroundColor: "#c0cedd",
  },
  exit: {
    backgroundColor: "#eee",
  },
};

const DotTransition = {
  duration: 0.8,
  repeat: Infinity,
  ease: "easeInOut",
  repeatType: "reverse" as const,
};

export default function DotLoading() {
  return (
    <Wrapper variants={ContainerVariants} initial="initial" animate="animate">
      <Dot variants={DotVariants} transition={DotTransition} />
      <Dot variants={DotVariants} transition={DotTransition} />
      <Dot variants={DotVariants} transition={DotTransition} />
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    gap: "8px",
    width: "60px",
    height: "20px",
    display: "flex",
    // position: "absolute",
    justifyContent: "center",
    // border: "1px solid blue",
  };
});

const Dot = styled(motion.span)(() => {
  return {
    width: "8px",
    height: "8px",
    display: "block",
    borderRadius: "50%",
    backgroundColor: "#3196ff",
  };
});
