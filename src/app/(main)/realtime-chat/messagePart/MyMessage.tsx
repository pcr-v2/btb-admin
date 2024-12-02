import { Box, styled } from "@mui/material";

import { IMessage } from "@/app/_components/SocketProvider";
import DotLoading from "@/app/_components/common/DotLoading";
import { EmojiData } from "@/config/emojiData";
import { PictureData } from "@/config/pictureData";
import { VideoPictureData } from "@/config/videoPictureData";
import useMappingEmojiConfig from "@/hooks/useMappingEmojiConfig";

interface IProps {
  message: IMessage;
  isMyOnTyping: boolean;
  msgId: number;
}

export default function MyMessage(props: IProps) {
  const { message, isMyOnTyping, msgId } = props;

  return (
    <Message>
      {isMyOnTyping && msgId === -1 ? (
        <DotLoading />
      ) : message.emoji.emojiKey === "" ? (
        message.content
      ) : (
        <WithEmojiMessageBox>
          {useMappingEmojiConfig({ ...message.emoji })}
          {message.content === "" ? "" : message.content}
        </WithEmojiMessageBox>
      )}
    </Message>
  );
}

const Message = styled(Box)(() => {
  return {
    display: "flex",
    fontSize: "12px",
    padding: "8px 12px",
    borderRadius: "4px",
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
