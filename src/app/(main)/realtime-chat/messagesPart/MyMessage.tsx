"use client";

import { Box, styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";
import axios from "axios";
import { count } from "console";
import { motion, useAnimate } from "framer-motion";
import { useEffect, useState } from "react";

import EmojiReact from "@/app/(main)/realtime-chat/messagesPart/EmojiReact";
import MessageToolbox from "@/app/(main)/realtime-chat/messagesPart/MessageToolbox";
import SelectedEmoji from "@/app/(main)/realtime-chat/messagesPart/SelectedEmoji";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { createEmojiReactAction } from "@/app/_actions/chats/createEmojiReactAction";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import Anxious from "@/assets/emoji/anxious.png";
import Done from "@/assets/emoji/done.png";
import Headbomb from "@/assets/emoji/headbomb.png";
import Monkey from "@/assets/emoji/monkey.png";
import Thumb from "@/assets/emoji/thumb.png";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";
import dayjs from "@/lib/dayjs";

export type TSelectedEmoji = {
  imgUrl: string;
  userName: string;
  profileImg: string;
  time?: string;
};

interface IProps {
  message: IMessage;
  msgId: string;
  userInfo: Pick<GetUserResponse, "data">["data"];
  showTimeStamp: boolean;
  onClickNotice: (value: string) => void;
}

export default function MyMessage(props: IProps) {
  const { message, showTimeStamp, msgId, onClickNotice, userInfo } = props;

  const todayTime = dayjs().format("YY/MM/DD HH:mm");

  const [isHover, setIsHover] = useState(false);
  const [showEmojiReact, setShowEmojiReact] = useState({
    msgId: "",
    open: false,
  });
  const [selectedEmoji, setSelectedEmoji] = useState<TSelectedEmoji[]>(
    (message.emojiReact as any) ?? [],
  );

  const { test, socket } = useSocket();
  useEffect(() => {
    console.log("test id", test?.msgId);
    console.log("실 id", msgId);

    if (test?.msgId === msgId) {
      setSelectedEmoji((prev) => [...prev, test]);
    }
  }, [socket, test]);

  const handleToolbox = (toolKey: string, msgId: string) => {
    if (toolKey === "notice") {
      onClickNotice(message.content);
      return;
    }
    if (toolKey === "reply") {
      // onClickReply(message.content);
      return;
    }
    if (toolKey === "emojireact") {
      setShowEmojiReact({ msgId: msgId, open: !showEmojiReact.open });
      return;
    }
  };

  const handleSelectEmoji = async (selectedEmojiUrl: string) => {
    setShowEmojiReact({ msgId: msgId, open: false });

    const res = await createEmojiReactAction({
      msgId: msgId,
      userName: userInfo.name,
      profileImg: userInfo.profile_img,
      emojiKey: selectedEmojiUrl,
    });

    await axios.post("/api/reaction", {
      msgId: msgId,
      userName: userInfo.name,
      emoji: selectedEmojiUrl,
      profileImg: userInfo.profile_img,
      timeStamp: dayjs().format("HH:mm"),
    });

    // setSelectedEmoji((prev) => {
    //   // prev가 undefined일 경우 빈 배열로 초기화
    //   if (!prev) return [];

    //   if (prev.length < 1) return [];
    //   const existing = prev.find(
    //     (emoji) =>
    //       emoji.imgUrl === selectedEmojiUrl &&
    //       emoji.userName === userInfo.userName,
    //   );

    //   if (existing) {
    //     return prev.map((emoji) =>
    //       emoji.imgUrl === selectedEmojiUrl &&
    //       emoji.userName === userInfo.userName
    //         ? { ...emoji, count: emoji.count + 1 }
    //         : emoji,
    //     );
    //   } else {
    //     return [
    //       ...prev,
    //       {
    //         count: 1,
    //         imgUrl: selectedEmojiUrl,
    //         userName: userInfo.userName,
    //         profileImg: userInfo.profileImg,
    //         time: todayTime,
    //       },
    //     ];
    //   }
    // });
  };

  // const reClickSelectedEmoji = (emojiUrl: string) => {
  //   setSelectedEmoji(
  //     (prev) =>
  //       prev
  //         .map((emoji) => {
  //           if (
  //             emoji.imgUrl === emojiUrl &&
  //             emoji.userName === userInfo.userName
  //           ) {
  //             // 현재 유저가 선택한 이모지라면
  //             if (emoji.count > 1) {
  //               return { ...emoji, count: emoji.count - 1 }; // count 감소
  //             }
  //             return null; // count가 1이면 제거
  //           }
  //           return emoji; // 다른 유저의 이모지는 변경하지 않음
  //         })
  //         .filter((emoji) => emoji !== null), // null인 경우 제거
  //   );
  // };
  return (
    <Wrapper
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
          onClick={(toolKey, msgId) => handleToolbox(toolKey, msgId)}
        />
      )}

      <Content>
        {showTimeStamp && <TimeStamp>{message.timeStamp.toString()}</TimeStamp>}

        <Message>
          {message.attachedImage?.key === "" ? (
            message.content
          ) : (
            <WithEmojiMessageBox>
              {useMappingEmojiConfig({ ...message.attachedImage })}
              {message.content === "" ? "" : message.content}
            </WithEmojiMessageBox>
          )}
        </Message>
      </Content>

      {showEmojiReact.msgId === msgId && showEmojiReact.open && (
        <EmojiReact
          onAnimate={showEmojiReact.open}
          onHoverStart={() => setIsHover(false)}
          onClickEmoji={(selectedEmojiUrl: string) =>
            // 이모지 add
            handleSelectEmoji(selectedEmojiUrl)
          }
        />
      )}

      {selectedEmoji && (
        <SelectedEmoji
          // prevSelectedEmoji={message.emojiReact as any}
          selectedEmoji={selectedEmoji}
          onClickSelectedEmoji={(emojiUrl: string) =>
            // 이모지 delete
            // reClickSelectedEmoji(emojiUrl)
            {}
          }
        />
      )}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
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

const Content = styled(Box)(() => {
  return {
    display: "flex",
    alignItems: "end",
  };
});

const TimeStamp = styled("span")(() => {
  return {
    fontSize: "10px",
    marginRight: "8px",
    color: "#9e9e9e",
    letterSpacing: "0.4px",
  };
});
