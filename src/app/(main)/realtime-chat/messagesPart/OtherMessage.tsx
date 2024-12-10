"use client";

import { Box, styled, Tooltip } from "@mui/material";
import axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import EmojiReact from "@/app/(main)/realtime-chat/messagesPart/EmojiReact";
import MessageToolbox from "@/app/(main)/realtime-chat/messagesPart/MessageToolbox";
import { TSelectedEmoji } from "@/app/(main)/realtime-chat/messagesPart/MyMessage";
import SelectedEmoji from "@/app/(main)/realtime-chat/messagesPart/SelectedEmoji";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";
import { createEmojiReactAction } from "@/app/_actions/chats/createEmojiReactAction";
import { IMessage, useSocket } from "@/app/_components/SocketProvider";
import DotLoading from "@/app/_components/common/DotLoading";
import Notice from "@/assets/icon/notice.svg";
import Reply from "@/assets/icon/reply.png";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";
import dayjs from "@/lib/dayjs";

interface IProps {
  message: IMessage;
  msgId: string;
  userInfo: Pick<GetUserResponse, "data">["data"];
  showTimeStamp: boolean;
  onClickNotice: (value: string) => void;
  // onClickReply: (value: string) => void;
}

export default function OtherMessage(props: IProps) {
  const {
    message,
    userInfo,
    showTimeStamp,
    onClickNotice,
    // onClickReply,
    msgId,
  } = props;

  const [isHover, setIsHover] = useState(false);
  const [showEmojiReact, setShowEmojiReact] = useState({
    msgId: "",
    open: false,
  });
  const [selectedEmoji, setSelectedEmoji] = useState<TSelectedEmoji[]>(
    (message.emojiReact as any[]) ?? [],
  );

  const { test } = useSocket();
  useEffect(() => {
    console.log("test id", test?.msgId);
    console.log("실 id", msgId);
    if (test?.msgId === msgId) {
      setSelectedEmoji((prev) => [...prev, test]);
    }
  }, [test]);

  const todayTime = dayjs().format("YY/MM/DD HH:mm");

  const handleSelectEmoji = async (selectedEmojiUrl: string) => {
    setShowEmojiReact({ msgId: msgId, open: false });

    await createEmojiReactAction({
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
    //   const exists = prev.find(
    //     (emoji) =>
    //       emoji.imgUrl === selectedEmojiUrl &&
    //       emoji.userName === userInfo.userName,
    //   );

    //   if (exists) {
    //     // 중복된 경우 count 증가
    //     return prev
    //       .map((el) => {
    //         if (
    //           el.imgUrl === selectedEmojiUrl &&
    //           el.userName === userInfo.userName
    //         ) {
    //           if (el.count > 1) {
    //             return { ...el, count: el.count - 1 }; // count 감소
    //           }
    //           return null; // count가 1이면 이모지를 제거
    //         }
    //         return el; // 다른 유저의 데이터는 그대로 유지
    //       })
    //       .filter((el) => el !== null); // null 값 제거
    //   } else {
    //     // 중복되지 않은 경우 새 항목 추가
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
    // }
    // );
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

  return (
    <Wrapper
      isemoji={message.emoji.emojiKey}
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
          onClick={(toolKey, msgId) => handleToolbox(toolKey, msgId)}
        />
      )}
      <Box sx={{ display: "flex", gap: "12px", alignItems: "start" }}>
        <ProfileImg src={message.profileImg} alt="profile" />
        <Contents>
          <UserName>{message.userName}</UserName>
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
        </Contents>
      </Box>
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
          selectedEmoji={selectedEmoji}
          onClickSelectedEmoji={(emojiUrl: string) =>
            // 이모지 delete
            // reClickSelectedEmoji(emojiUrl)
            {}
          }
        />
      )}
      {showTimeStamp && (
        <span
          style={{ fontSize: "10px", color: "#9e9e9e", letterSpacing: "0.4px" }}
        >
          {message.timeStamp.toString()}
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
