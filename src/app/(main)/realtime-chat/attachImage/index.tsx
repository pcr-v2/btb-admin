"use client";

import { Box, styled } from "@mui/material";
import { useState } from "react";

import { TAttachedImage } from "@/app/(main)/realtime-chat";
import EmojiList from "@/app/(main)/realtime-chat/attachImage/EmojiList";
import PictureList from "@/app/(main)/realtime-chat/attachImage/PictureList";
import SwichTab from "@/app/(main)/realtime-chat/attachImage/SwichTab";
import VideoPictureList from "@/app/(main)/realtime-chat/attachImage/VideoPictureList";

type TShowList = {
  type: "Emoji" | "Picture" | "Video";
};

interface IProps {
  onClose: () => void;
  onClickAttachImg: (data: TAttachedImage) => void;
}

export default function AttachImage(props: IProps) {
  const { onClickAttachImg, onClose } = props;

  const [showList, setShowList] = useState<TShowList>({ type: "Emoji" });

  return (
    <Wrapper>
      <SwichTab
        onClose={onClose}
        handleSwitch={(value: TShowList) => setShowList(value)}
      />
      {showList.type === "Emoji" && (
        <EmojiList onClickAttachImg={onClickAttachImg} />
      )}
      {showList.type === "Picture" && (
        <PictureList onClickAttachImg={onClickAttachImg} />
      )}
      {showList.type === "Video" && (
        <VideoPictureList onClickAttachImg={onClickAttachImg} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    top: 10,
    right: 10,
    zIndex: 3,
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
