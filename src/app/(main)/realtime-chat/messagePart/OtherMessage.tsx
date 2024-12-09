"use client";

import { Box, styled, Tooltip } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import MessageToolbox from "@/app/(main)/realtime-chat/messagePart/MessageToolbox";
import DotLoading from "@/app/_components/common/DotLoading";
import EmojiReact from "@/assets/icon/emoji-add-2.svg";
import Notice from "@/assets/icon/notice.svg";
import Reply from "@/assets/icon/reply.png";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";

interface IProps {
  emoji: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  content: string;
  userName: string;
  profileImg?: string;
  timeStamp: string;
  emojiReact: { userName: string; profileImg: string; emojiKey: string }[];
  msgId: string;
  userInfo: { userName: string; profileImg: string };
  showTimeStamp: boolean;
  onClickNotice: (value: string) => void;
  onClickReply: (value: string) => void;
}

export default function OtherMessage(props: IProps) {
  const {
    content,
    userName,
    profileImg,
    emoji,
    emojiReact,
    userInfo,
    timeStamp,
    showTimeStamp,
    onClickNotice,
    onClickReply,
    msgId,
  } = props;

  const [isHover, setIsHover] = useState(false);
  // const [emojiReact, setEmojiReact] = useState({ id: "", opne: false });

  return (
    <Wrapper
      isemoji={emoji.emojiKey}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      {isHover && (
        <MessageToolbox
          position="left"
          msgId={msgId}
          showTimeStamp={showTimeStamp}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(toolKey) => {
            if (toolKey === "notice" || toolKey === "reply") {
              onClickNotice(content);
            }
            if (toolKey === "reply") {
              onClickReply(content);
            }
            if (toolKey === "emojireact") {
              // setReact({ id: msgId, open: !react.open });
            }
          }}
        />
      )}
      <Box sx={{ display: "flex", gap: "12px", alignItems: "start" }}>
        <ProfileImg src={profileImg} alt="profile" />
        <Contents>
          <UserName>{userName}</UserName>
          <Message>
            {emoji.emojiKey === "" ? (
              content
            ) : (
              <WithEmojiMessageBox>
                {useMappingEmojiConfig({ ...emoji })}
                {content === "" ? "" : content}
              </WithEmojiMessageBox>
            )}
          </Message>

          <div style={{ display: "flex", gap: "4px" }}>
            {emojiReact &&
              emojiReact.map((react, index) => {
                if (react.emojiKey != null) {
                  return (
                    <img
                      key={index}
                      src={react.emojiKey}
                      alt=""
                      style={{ width: "20px", height: "20px" }}
                    />
                  );
                }
              })}
          </div>
        </Contents>
      </Box>
      {showTimeStamp && (
        <span
          style={{ fontSize: "10px", color: "#9e9e9e", letterSpacing: "0.4px" }}
        >
          {timeStamp}
        </span>
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ isemoji: string }>(({ isemoji }) => {
  return {
    gap: "8px",
    zIndex: 1,
    padding: "1px",
    display: "flex",
    alignItems: "end",
    position: "relative",
    paddingRight: "10px",
    // width: isemoji === "" ? "unset" : "100%",
    // maxWidth: isemoji === "" ? "unset" : "320px",
  };
});

const Message = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    fontSize: "12px",
    maxWidth: "400px",
    padding: "12px",
    borderRadius: "8px",
    alignItems: "center",
    whiteSpace: "normal",
    position: "relative",
    wordBreak: "break-word",
    backgroundColor: "#f3f0f0",
    border: "1px solid #ebebeb",

    ":after": {
      left: 0,
      top: "50%",
      width: "0px",
      height: "0px",
      content: '""',
      borderTop: "0px",
      borderLeft: "0px",
      marginTop: "-18px",
      marginLeft: "-18px",
      position: "absolute",
      border: "12px solid transparent",
      borderRightColor: "#f3f0f0",
    },
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "56px",
    height: "56px",
    objectFit: "cover",
    borderRadius: "10px",
    boxShadow: "0 5px 12px rgba(0,0,0,0.12), 0 1px 5px rgba(0,0,0,0.24)",
  };
});

const UserName = styled("span")(() => {
  return {
    fontSize: "10px",
    lineHeight: "120%",
    letterSpacing: "0.5px",
  };
});

const Contents = styled(Box)(() => {
  return {
    gap: "4px",
    display: "flex",
    flexDirection: "column",
  };
});

const WithEmojiMessageBox = styled(Box)(() => {
  return {
    gap: "4px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  };
});
