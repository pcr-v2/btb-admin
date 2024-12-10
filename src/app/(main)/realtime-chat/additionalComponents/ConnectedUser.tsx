"use client";

import { styled } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import { useSocket } from "@/app/_components/SocketProvider";

interface IProps {
  userName: string;
}

export default function ConnectedUser(props: IProps) {
  const { userName } = props;
  const { connectedUsers } = useSocket();
  const lastConnectUser = connectedUsers[connectedUsers.length - 1];
  const [showConnected, setShowConnected] = useState(false);

  useEffect(() => {
    if (lastConnectUser.userName) {
      setShowConnected(true);
    }
    setTimeout(() => {
      setShowConnected(false);
    }, 5000);
  }, [connectedUsers]);

  return (
    <Wrapper
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: showConnected ? 1 : 0 }}
      transition={{ duration: 1.5 }}
      sx={{ display: showConnected ? "" : "none" }}
    >
      <IsConnectedBox>
        <ProfileImg src={lastConnectUser.profileImg} alt="profile" />
        {lastConnectUser.userName === userName
          ? "내가 돌아왔다"
          : `${lastConnectUser.userName}님이 접속했습니다!`}
      </IsConnectedBox>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    top: 20,
    zIndex: 3,
    display: "flex",
    position: "absolute",
    alignItems: "center",
    borderRadius: "32px",
    justifyContent: "center",
    backgroundColor: "#fff",
    border: "1px solid #fafafa",
    padding: "4px 12px 4px 8px",
    boxShadow: "0 1px 12px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
  };
});

const IsConnectedBox = styled(motion.div)(() => {
  return {
    gap: "12px",
    display: "flex",
    fontSize: "14px",
    alignItems: "center",
    justifyContent: "start",
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "48px",
    height: "48px",
    objectFit: "cover",
    borderRadius: "100%",
  };
});
