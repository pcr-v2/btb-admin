import { Box, Button, styled } from "@mui/material";
import { motion } from "framer-motion";

import Emoji_Add from "@/assets/icon/emoji-add.svg";

interface IProps {
  onClickEmoji: () => void;
  onClickSend: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export default function ChatInputAdornment(props: IProps) {
  const { onClickEmoji, onClickSend } = props;

  return (
    <Wrapper>
      <AddEmojiImg
        initial="beforeHover"
        whileHover="onHover"
        variants={{
          beforeHover: { scale: 1 },
          onHover: { scale: 1.2 },
        }}
        src={Emoji_Add.src}
        alt="add"
        onClick={onClickEmoji}
      />
      <EndAdormentButton
        variant="contained"
        onClick={onClickSend}
        type="submit"
      >
        전송
      </EndAdormentButton>
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    gap: "8px",
    display: "flex",
    alignItems: "center",
  };
});

const AddEmojiImg = styled(motion.img)(() => {
  return {
    width: "32px",
    height: "32px",
    cursor: "pointer",
  };
});

const EndAdormentButton = styled(Button)(() => {
  return {
    fontWeight: 600,
    fontSize: "14px",
    paddin: "8px 10px",
    borderRadius: "24px",
    whiteSpace: "nowrap",
    letterSpacing: "1px",
  };
});
