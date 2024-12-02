"use client";

import { styled } from "@mui/material";

import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";

interface IProps {
  emojiType: "Emoji" | "Picture" | "Video";
  emojiKey: string;
}

export default function useMappingEmojiConfig(props: IProps) {
  const { emojiKey, emojiType } = props;

  if (emojiType === "Picture") {
    const pictureValue = PictureData.find((data) => data.key === emojiKey);
    return <PreviewImg src={pictureValue?.url} alt="picture" />;
  }

  if (emojiType === "Video") {
    const videoPictureValue = VideoPictureData.find(
      (data) => data.key === emojiKey,
    );
    return (
      <PreviewVideo loop autoPlay playsInline>
        <source src={videoPictureValue?.url} />
      </PreviewVideo>
    );
  }

  return <PreviewImg src={EmojiData[emojiKey]} alt="emoji" />;
}

const PreviewImg = styled("img")(() => {
  return {
    width: "70%",
    height: "70%",
    borderRadius: "8px",
  };
});

const PreviewVideo = styled("video")(() => {
  return {
    width: "70%",
    height: "70%",
    objectFit: "contain",
    borderRadius: "8px",
  };
});
