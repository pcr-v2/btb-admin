import { styled, Tooltip } from "@mui/material";
import { motion } from "framer-motion";

import EmojiReact from "@/assets/icon/emoji-add-2.svg";
import Notice from "@/assets/icon/notice.svg";
import Reply from "@/assets/icon/reply.png";

type TToolbox = {
  key: "notice" | "reply" | "emojireact";
  title: "공지등록" | "답장" | "공감";
  imgUrl: string;
  size: string;
};

interface IProps {
  position: "left" | "right";
  showTimeStamp: boolean;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  msgId: string;
  onClick: (toolKey: "notice" | "reply" | "emojireact", msgId: string) => void;
}

const ToolboxList: TToolbox[] = [
  {
    key: "notice",
    title: "공지등록",
    imgUrl: Notice.src,
    size: "16px",
  },
  {
    key: "reply",
    title: "답장",
    imgUrl: Reply.src,
    size: "16px",
  },
  {
    key: "emojireact",
    title: "공감",
    imgUrl: EmojiReact.src,
    size: "18px",
  },
];

export default function MessageToolbox(props: IProps) {
  const {
    showTimeStamp,
    onMouseEnter,
    onMouseLeave,
    onClick,
    position,
    msgId,
  } = props;

  return (
    <Wrapper
      position={position}
      hastime={showTimeStamp.toString()}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {ToolboxList.map((tool) => {
        return (
          <Tooltip
            arrow
            key={tool.key}
            title={tool.title}
            onClick={() => onClick(tool.key, msgId)}
          >
            <ToolImg
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
              src={tool.imgUrl}
              alt={tool.title}
              customsize={tool.size}
            />
          </Tooltip>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)<{
  hastime: string;
  position: "left" | "right";
}>(({ hastime, position }) => {
  return {
    bottom: 0,
    zIndex: 3,
    gap: "8px",
    display: "flex",
    minHeight: "24px",
    padding: "4px 8px",
    borderRadius: "8px",
    position: "absolute",
    border: "1px solid #eee",
    backgroundColor: "#f8f8f8",
    right: position === "left" ? (hastime === "true" ? -48 : -80) : "",
    left: position === "left" ? "" : hastime === "true" ? -48 : -80,
  };
});

const ToolImg = styled(motion.img)<{ customsize: string }>(({ customsize }) => {
  return {
    cursor: "pointer",
    width: customsize,
    height: customsize,
  };
});
