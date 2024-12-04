import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";
import React from "react";

interface IProps {
  onAnimate: boolean;
  onHoverStart: () => void;
  onClickEmoji: (selectedEmojiUrl: string) => void;
}

const EmojiReactList = [
  {
    imgUrl: "/emoji/done.png",
    emojiReactKey: "::done::",
  },
  {
    imgUrl: "/emoji/bomb.png",
    emojiReactKey: "::bomb::",
  },
  {
    imgUrl: "/emoji/clap.png",
    emojiReactKey: "::clap::",
  },
  {
    imgUrl: "/emoji/hundrad.png",
    emojiReactKey: "::hundrad::",
  },
  {
    imgUrl: "/emoji/monkey.png",
    emojiReactKey: "::monkey::",
  },
  {
    imgUrl: "/emoji/no.png",
    emojiReactKey: "::no::",
  },
];

export default function EmojiReact(props: IProps) {
  const { onHoverStart, onClickEmoji, onAnimate } = props;

  const reactVariants = {
    open: {
      x: 0,
      height: 20,
      opacity: 1,
      transition: { type: "spring", bounce: 0, duration: 0.4 },
    },
    closed: {
      x: 200,
      height: 0,
      opacity: 0,
      transition: { type: "spring", bounce: 0, duration: 0.4 },
    },
  };

  return (
    <Wrapper
      onHoverStart={onHoverStart}
      initial="closed"
      animate={onAnimate ? "open" : "closed"}
      variants={reactVariants}
    >
      <Inner>
        {EmojiReactList.map(({ emojiReactKey, imgUrl }) => {
          return (
            <EmojiBox key={emojiReactKey}>
              <EmojiImg
                onClick={() => onClickEmoji(imgUrl)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                src={imgUrl}
              />
            </EmojiBox>
          );
        })}
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    right: 0,
    zIndex: 3,
    bottom: -22,
    position: "absolute",
  };
});

const Inner = styled(Box)(() => {
  return {
    width: "150px",
    padding: "4px",
    display: "flex",
    borderRadius: "12px",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #bcbcbc",
  };
});

const EmojiBox = styled(Box)(() => {
  return {
    padding: "2px ",
    display: "flex",
  };
});

const EmojiImg = styled(motion.img)(() => {
  return {
    width: "20px",
    height: "20px",
    cursor: "pointer",
  };
});
