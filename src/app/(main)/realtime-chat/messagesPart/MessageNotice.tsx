"use client";

import { Box, styled } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

import DownArrow from "@/assets/icon/down-arrow.svg";
import NoticeIcon from "@/assets/icon/notice.svg";

interface IProps {
  notice: string;
}

export default function MessageNotice(props: IProps) {
  const { notice } = props;

  return (
    <>
      {notice && (
        <Wrapper>
          <NoticeInner>
            <NoticeTitle>
              <Title>
                <img
                  src={NoticeIcon.src}
                  alt="notice"
                  style={{
                    width: "20px",
                    height: "20px",
                  }}
                />
                {notice}
              </Title>
            </NoticeTitle>
          </NoticeInner>
        </Wrapper>
      )}
    </>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    top: 0,
    zIndex: 2,
    left: "0%",
    width: "100%",
    display: "flex",
    maxWidth: "550px",
    minHeight: "30px",
    position: "sticky",
    justifyContent: "center",
  };
});

const NoticeInner = styled(motion.header)(() => {
  return {
    gap: "8px",
    display: "flex",
    borderRadius: "24px",
    padding: "12px 24px",
    flexDirection: "column",
    justifyContent: "center",
    backgroundColor: "#fafafa",
    border: "1px solid #bcbcbc",
  };
});

const NoticeTitle = styled(motion.div)(() => {
  return {
    gap: "12px",
    width: "100%",
    padding: "8px",
    display: "flex",
    borderRadius: "12px",
    alignItems: "center",
    "&:hover": {
      cursor: "pointer",
      backgroundColor: "#fafafa",
    },
  };
});

const Title = styled(Box)(() => {
  return {
    gap: "12px",
    width: "100%",
    fontWeight: 600,
    display: "flex",
    fontSize: "16px",
    color: "#616161",
    alignItems: "center",
    justifyContent: "space-between",
  };
});

const ChildMenu = styled(motion.div)(() => ({
  padding: "8px 12px",
  cursor: "pointer",
  borderRadius: "12px",
  "&:hover": {
    color: "#3196ff",
  },
}));
