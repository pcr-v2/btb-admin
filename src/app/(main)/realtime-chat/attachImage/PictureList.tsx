"use client";

import { Box, styled } from "@mui/material";
import { motion } from "framer-motion";

import { PictureData } from "@/config/pictureData";

interface IProps {
  onClickEmoji: (
    emojiType: "Emoji" | "Picture" | "Video",
    emojiKey: string,
  ) => void;
}

export default function PictureList(props: IProps) {
  const { onClickEmoji } = props;

  return (
    <Wrapper>
      {PictureData.map((data, index) => {
        return (
          <PictrueWrap
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
            <Picture
              src={data.url}
              alt={data.key}
              onClick={() => onClickEmoji("Picture", data.key)}
            />

            <PictureDesc>{data.krName}</PictureDesc>
          </PictrueWrap>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    rowGap: "18px",
    height: "300px",
    display: "flex",
    flexWrap: "wrap",
    columnGap: "18px",
    overflowY: "auto",
    maxHeight: "300px",
    alignItems: "start",
    padding: "12px 24px 24px",
    justifyContent: "center",
  };
});

const PictrueWrap = styled(motion.div)(() => {
  return {
    gap: "4px",
    display: "flex",
    borderRadius: "4px",
    flexDirection: "column",
    backgroundColor: "#fff",
  };
});

const Picture = styled(motion.img)(() => {
  return {
    width: "100px",
    height: "100px",
    cursor: "pointer",
    borderRadius: "12px",
  };
});

const PictureDesc = styled("span")(() => {
  return {
    fontWeight: 200,
    fontSize: "10px",
  };
});
