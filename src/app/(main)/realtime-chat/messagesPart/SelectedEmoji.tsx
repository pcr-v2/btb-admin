"use client";

import { Box, styled } from "@mui/material";
import React, { useEffect, useState } from "react";

import { TSelectedEmoji } from "@/app/(main)/realtime-chat/messagesPart/MyMessage";
import { useSocket } from "@/app/_components/SocketProvider";

interface IProps {
  // prevSelectedEmoji: TSelectedEmoji[];
  selectedEmoji: TSelectedEmoji[];
  onClickSelectedEmoji: (emojiUrl: string) => void;
}

export default function SelectedEmoji(props: IProps) {
  const { selectedEmoji, onClickSelectedEmoji } = props;

  // if (prevSelectedEmoji != null) {
  //   prevSelectedEmoji.map((el) => selectedEmoji.push(el));
  // }
  const { test } = useSocket();

  return (
    <Wrapper>
      <Inner>
        {selectedEmoji.map((emoji, index) => {
          return (
            <EmojiBox
              key={index}
              onClick={() => onClickSelectedEmoji(emoji?.imgUrl)}
            >
              <CountSpan>{emoji?.count}</CountSpan>
              <EmojiImg src={emoji?.imgUrl} />
            </EmojiBox>
          );
        })}
      </Inner>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  {
    return {
      right: 0,
      zIndex: 2,
      bottom: -30,
      position: "absolute",
    };
  }
});

const Inner = styled(Box)(() => {
  return {
    gap: "4px",
    padding: "2px ",
    display: "flex",
  };
});

const EmojiBox = styled(Box)(() => {
  return {
    gap: "4px",
    minWidth: "42px",
    display: "flex",
    cursor: "pointer",
    padding: "2px 6px",
    borderRadius: "8px",
    alignItems: "center",
    backgroundColor: "#e5f2ff",
    border: "1px solid #3196ff",
  };
});

const CountSpan = styled("span")(() => {
  return {
    fontWeight: 800,
    fontSize: "10px",
    color: "#3196ff",
  };
});

const EmojiImg = styled("img")(() => {
  return {
    width: "18px",
    height: "18px",
  };
});
