"use client";

import { Box, styled } from "@mui/material";
import React from "react";

import { TAttachedImage } from "@/app/(main)/realtime-chat";
import Close from "@/assets/icon/close-light.svg";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";

interface IProps {
  attachedImage: TAttachedImage;
  onClose: () => void;
}

export default function PreviewDim(props: IProps) {
  const { onClose } = props;
  const { key, type } = props.attachedImage;

  const mappingEmoji = () => {
    if (type === "Emoji") {
      return <PreviewImg src={EmojiData[key]} alt="emoji" />;
    }
    if (type === "Picture") {
      const pictureValue = PictureData.find((data) => data.key === key);
      return <PreviewImg src={pictureValue?.url} alt="picture" />;
    }
    if (type === "Video") {
      const videoPictureValue = VideoPictureData.find(
        (data) => data.key === key,
      );
      return (
        <PreviewVideo loop autoPlay playsInline>
          <source src={videoPictureValue?.url} />
        </PreviewVideo>
      );
    }
  };

  return (
    <>
      {key && (
        <DimmedPart emojitype={type}>
          <CloseImg src={Close.src} alt="close" onClick={onClose} />
          {mappingEmoji()}
        </DimmedPart>
      )}
    </>
  );
}

const DimmedPart = styled(Box)<{ emojitype: "Emoji" | "Picture" | "Video" }>(({
  emojitype,
}) => {
  return {
    zIndex: 2,
    bottom: 120,
    width: "100%",
    display: "flex",
    padding: "24px",
    alignItems: "end",
    position: "absolute",
    borderRadius: "12px",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    maxWidth: emojitype === "Emoji" ? "150px" : "300px",
  };
});

const PreviewImg = styled("img")(() => {
  return {
    width: "100%",
    height: "100%",
    borderRadius: "8px",
  };
});

const PreviewVideo = styled("video")(() => {
  return {
    width: "100%",
    height: "100%",
    objectFit: "contain",
    borderRadius: "8px",
  };
});

const CloseImg = styled("img")(() => {
  return {
    top: 5,
    right: 5,
    width: "24px",
    height: "24px",
    fill: "#fff",
    cursor: "pointer",
    position: "absolute",
  };
});
