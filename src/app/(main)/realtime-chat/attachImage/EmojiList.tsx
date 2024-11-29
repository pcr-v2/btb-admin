"use client";

import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

import { EmojiData } from "@/config/emojiData";

interface IProps {
  onClickEmoji: (emojiKey: string) => void;
}

export default function EmojiList(props: IProps) {
  const { onClickEmoji } = props;

  return (
    <Wrapper>
      {EmojiData.map((el, index) => {
        const [key, value] = Object.entries(el)[0];
        return (
          <Emoji
            key={index}
            src={value}
            alt={key}
            initial="beforeHover"
            whileHover="onHover"
            variants={{
              beforeHover: { scale: 1 },
              onHover: { scale: 1.4 },
            }}
            onClick={() => onClickEmoji(key)}
          />
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    rowGap: "16px",
    height: "300px",
    display: "flex",
    flexWrap: "wrap",
    columnGap: "16px",
    alignItems: "start",
    padding: "0px 24px 12px",
    justifyContent: "center",
  };
});

const Emoji = styled(motion.img)(() => {
  return {
    width: "40px",
    height: "40px",
    cursor: "pointer",
  };
});