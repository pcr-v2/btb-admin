"use client";

import { styled } from "@mui/material";

import { TAttachedImage } from "@/app/(main)/realtime-chat";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";

interface IProps {
  emojiType: "Emoji" | "Picture" | "Video";
  emojiKey: string;
}

export default function useMappingEmojiConfig(data: TAttachedImage) {
  const { key, type } = data;

  if (type === "Picture") {
    const pictureValue = PictureData.find((data) => data.key === key);
    return <PreviewImg src={pictureValue?.url} alt="picture" />;
  }

  if (type === "Video") {
    const videoPictureValue = VideoPictureData.find((data) => data.key === key);
    return (
      <PreviewVideo loop autoPlay playsInline>
        <source src={videoPictureValue?.url} />
      </PreviewVideo>
    );
  }

  return <PreviewImg src={EmojiData[key]} alt="emoji" />;
}

const PreviewImg = styled("img")(() => {
  return {
    width: "100%",
    maxWidth: "320px",
    borderRadius: "8px",
  };
});

const PreviewVideo = styled("video")(() => {
  return {
    width: "100%",
    maxWidth: "320px",
    objectFit: "cover",
    borderRadius: "8px",
  };
});
