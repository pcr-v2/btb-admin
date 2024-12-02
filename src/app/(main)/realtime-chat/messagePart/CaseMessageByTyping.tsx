import { Box, styled } from "@mui/material";

import MyMessage from "@/app/(main)/realtime-chat/messagePart/MyMessage";
import SomeOneMessage from "@/app/(main)/realtime-chat/messagePart/SomeOneMessage";

interface IProps {
  onTypingUser: { userName: string; profileImg: string; isTyping: boolean };
  userName: string;
}
export default function CaseMessageByTyping(props: IProps) {
  const { onTypingUser, userName } = props;
  const isMyOnTyping = userName === onTypingUser.userName;

  return (
    <>
      {onTypingUser.isTyping && (
        <Message ismymessage={isMyOnTyping.toString()}>
          {isMyOnTyping ? (
            <MyMessage
              message={{
                content: "",
                emoji: { emojiKey: "", emojiType: "Emoji" },
                userName: "",
                profileImg: "",
              }}
              msgId={-1}
              isMyOnTyping={true}
            />
          ) : (
            <SomeOneMessage
              {...{
                content: "",
                emoji: { emojiKey: "", emojiType: "Emoji" },
                userName: "",
                profileImg: "",
              }}
              userName={onTypingUser.userName}
              profileImg={onTypingUser.profileImg}
              onTypingUser={onTypingUser}
              msgId={-1}
            />
          )}
        </Message>
      )}
    </>
  );
}

const Message = styled(Box)<{ ismymessage: string }>(({ ismymessage }) => {
  return {
    width: "100%",
    display: "flex",
    justifyContent: ismymessage === "true" ? "end" : "start",
  };
});
