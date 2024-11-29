"use client";

import { Box, styled } from "@mui/material";
import { useState } from "react";

import EmojiList from "@/app/(main)/realtime-chat/attachImage/EmojiList";
import PictureList from "@/app/(main)/realtime-chat/attachImage/PictureList";
import SwichTab from "@/app/(main)/realtime-chat/attachImage/SwichTab";
import VideoPictureList from "@/app/(main)/realtime-chat/attachImage/VideoPictureList";

type TShowList = {
  type: "emoji" | "picture" | "video";
};

interface IProps {
  onClose: () => void;
  onClickEmoji: (emojiKey: string) => void;
}

export default function AttachImage(props: IProps) {
  const { onClickEmoji, onClose } = props;

  const [showList, setShowList] = useState<TShowList>({ type: "emoji" });

  return (
    <Wrapper>
      <SwichTab
        onClose={onClose}
        handleSwitch={(value: TShowList) => setShowList(value)}
      />
      {showList.type === "emoji" && <EmojiList onClickEmoji={onClickEmoji} />}
      {showList.type === "picture" && <PictureList />}
      {showList.type === "video" && <VideoPictureList />}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 10,
    right: 10,
    zIndex: 2,
    gap: "8px",
    width: "100%",
    display: "flex",
    maxWidth: "400px",
    alignItems: "center",
    borderRadius: "12px",
    position: "absolute",
    flexDirection: "column",
    backgroundColor: "#fff",
    border: "1px solid #bdbdbd",
    boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  };
});

const EmojiPart = styled(Box)(() => {
  return {
    width: "100%",
    rowGap: "12px",
    height: "300px",
    padding: "0px 24px 12px",
    display: "flex",
    flexWrap: "wrap",
    columnGap: "12px",
    maxWidth: "250px",
    alignItems: "start",
    justifyContent: "center",
  };
});
