"use client";

import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

import { VideoPictureData } from "@/config/videoPictureData";

interface IProps {
  onClickEmoji: (
    emojiType: "Emoji" | "Picture" | "Video",
    emojiKey: string,
  ) => void;
}

export default function VideoPictureList(props: IProps) {
  const { onClickEmoji } = props;

  return (
    <Wrapper>
      {VideoPictureData.map((data, index) => {
        return (
          <VideoPictrueWrap
            key={index}
            initial="beforeHover"
            whileHover="onHover"
            variants={{
              beforeHover: { scale: 1 },
              onHover: {
                scale: 1.2,
              },
            }}
          >
            <VideoPicture
              src={data.url}
              loop
              autoPlay
              playsInline
              onClick={() => onClickEmoji("Video", data.key)}
            />

            <VideoPictureDesc>{data.krName}</VideoPictureDesc>
          </VideoPictrueWrap>
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
    overflowY: "auto",
    maxHeight: "300px",
    alignItems: "start",
    padding: "12px 24px 24px",
    justifyContent: "center",
  };
});

const VideoPictrueWrap = styled(motion.div)(() => {
  return {
    gap: "4px",
    width: "100px",
    display: "flex",
    borderRadius: "4px",
    flexDirection: "column",
    backgroundColor: "#fff",
  };
});

const VideoPicture = styled(motion.video)(() => {
  return {
    width: "100%",
    height: "100px",
    cursor: "pointer",
    objectFit: "cover",
    borderRadius: "4px",
  };
});

const VideoPictureDesc = styled("span")(() => {
  return {
    fontWeight: 200,
    fontSize: "10px",
    paddingLeft: "4px",
  };
});
