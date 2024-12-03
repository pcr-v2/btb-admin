import { Box, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import { count } from "console";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

import MessageToolbox from "@/app/(main)/realtime-chat/messagePart/MessageToolbox";
import { IMessage } from "@/app/_components/SocketProvider";
import DotLoading from "@/app/_components/common/DotLoading";
import Anxious from "@/assets/emoji/anxious.png";
import Done from "@/assets/emoji/done.png";
import Headbomb from "@/assets/emoji/headbomb.png";
import Monkey from "@/assets/emoji/monkey.png";
import Thumb from "@/assets/emoji/thumb.png";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";

interface IProps {
  message: IMessage;
  msgId: number;
  showTimeStamp: boolean;
  onClickNotice: (value: string) => void;
  onClickReply: (value: string) => void;
}

const EmojiReactList = [
  {
    imgUrl: "/emoji/done.png",
    key: "::done::",
  },
  {
    imgUrl: "/emoji/bomb.png",
    key: "::bomb::",
  },
  {
    imgUrl: "/emoji/clap.png",
    key: "::clap::",
  },
  {
    imgUrl: "/emoji/hundrad.png",
    key: "::hundrad::",
  },
  {
    imgUrl: "/emoji/monkey.png",
    key: "::monkey::",
  },
  {
    imgUrl: "/emoji/no.png",
    key: "::no::",
  },
];

export default function MyMessage(props: IProps) {
  const { message, showTimeStamp, msgId, onClickNotice, onClickReply } = props;
  const [isHover, setIsHover] = useState(false);

  const [react, setReact] = useState({
    id: 0,
    open: false,
  });

  const reactVariants = {
    open: {
      // width: "auto",
      height: 20,
      opacity: 1,
      x: 0, // 최종 위치
      transition: { type: "spring", bounce: 0, duration: 0.4 },
    },
    closed: {
      // width: 0,
      height: 0,
      opacity: 0,
      x: 200,
      transition: { type: "spring", bounce: 0, duration: 0.4 },
    },
  };

  const [selected, setSelected] = useState<{ count: number; imgUrl: string }[]>(
    [],
  );
  console.log("selected", selected);

  return (
    <Wrapper
      isemoji={message.emoji.emojiKey}
      onHoverStart={() => setIsHover(true)}
      onHoverEnd={() => setIsHover(false)}
    >
      {isHover && (
        <MessageToolbox
          position="right"
          msgId={msgId}
          showTimeStamp={showTimeStamp}
          onMouseEnter={() => setIsHover(true)}
          onMouseLeave={() => setIsHover(false)}
          onClick={(toolKey, msgId) => {
            if (toolKey === "notice" || toolKey === "reply") {
              onClickNotice(message.content);
              // onClickReply(message.content);
            }
            if (toolKey === "emojireact") {
              setReact({ id: msgId, open: !react.open });
            }
          }}
        />
      )}
      <Box sx={{ display: "flex", alignItems: "end" }}>
        {showTimeStamp && (
          <span
            style={{
              marginRight: "8px",
              fontSize: "10px",
              color: "#9e9e9e",
              letterSpacing: "0.4px",
            }}
          >
            {message.timeStamp}
          </span>
        )}

        <Message>
          {message.emoji.emojiKey === "" ? (
            message.content
          ) : (
            <WithEmojiMessageBox>
              {useMappingEmojiConfig({ ...message.emoji })}
              {message.content === "" ? "" : message.content}
            </WithEmojiMessageBox>
          )}
        </Message>
      </Box>
      {react.id === msgId && react.open && (
        <motion.div
          onHoverStart={() => setIsHover(false)}
          initial="closed"
          animate={react.open ? "open" : "closed"}
          variants={reactVariants}
          style={{
            position: "absolute",
            right: 0,
            bottom: -22,
            zIndex: 3,
          }}
        >
          <Box
            sx={{
              display: "flex",
              backgroundColor: "#fff",
              width: "150px",
              padding: "4px",
              borderRadius: "12px",
              justifyContent: "center",
              // height: "100px",
              border: "1px solid #bcbcbc",
            }}
          >
            {EmojiReactList.map((emojiReact) => {
              return (
                <Box
                  sx={{
                    padding: "2px ",
                    display: "flex",
                  }}
                  key={emojiReact.key}
                >
                  <motion.img
                    onClick={() => {
                      setReact({ id: msgId, open: false });

                      const exists = selected.find(
                        (el) => el.imgUrl === emojiReact.imgUrl,
                      );

                      if (exists) {
                        // 중복된 경우 count 증가
                        setSelected((prev) =>
                          prev.map((el) =>
                            el.imgUrl === emojiReact.imgUrl
                              ? { ...el, count: el.count + 1 }
                              : el,
                          ),
                        );
                      } else {
                        // 중복되지 않은 경우 새 항목 추가
                        setSelected((prev) => [
                          ...prev,
                          { count: 1, imgUrl: emojiReact.imgUrl },
                        ]);
                      }
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    src={emojiReact.imgUrl}
                    style={{ width: "20px", height: "20px", cursor: "pointer" }}
                  />
                </Box>
              );
            })}
          </Box>
        </motion.div>
      )}

      <Box
        style={{
          zIndex: 2,
          position: "absolute",
          right: 0,
          bottom: -30,
        }}
      >
        <Box
          sx={{
            padding: "2px ",
            display: "flex",
            gap: "4px",
          }}
        >
          {selected.map((el, index) => {
            return (
              <Box
                sx={{
                  gap: "4px",
                  padding: "2px 4px",
                  display: "flex",
                  borderRadius: "12px",
                  alignItems: "center",
                  border: "1px solid #3196ff",
                  backgroundColor: "#e5f2ff",
                }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "#3196ff",
                    fontWeight: 800,
                  }}
                >
                  {el.count}
                </span>
                <img
                  key={index}
                  src={el.imgUrl}
                  style={{ width: "18px", height: "18px", cursor: "pointer" }}
                />
              </Box>
            );
          })}
        </Box>
      </Box>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{ isemoji: string }>(({ isemoji }) => {
  return {
    display: "flex",
    alignItems: "end",
    paddingLeft: "10px",
    position: "relative",
    flexDirection: "column",
  };
});

const Message = styled(Box)(() => {
  return {
    display: "flex",
    fontSize: "12px",
    padding: "12px",
    borderRadius: "8px",
    alignItems: "center",
    whiteSpace: "normal",
    position: "relative",
    wordBreak: "break-word",
    backgroundColor: "#e5f2ff",
    border: "1px solid #deebf9",

    ":after": {
      right: 0,
      top: "50%",
      width: "0px",
      height: "0px",
      content: `""`,
      borderTop: "0px",
      borderRight: "0px",
      marginTop: "-18px",
      marginRight: "-18px",
      position: "absolute",
      border: "12px solid transparent",
      borderLeftColor: "#e5f2ff",
    },
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
