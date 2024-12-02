"use client";

import { styled } from "@mui/material";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface IProps {
  userName: string;
  connectedUsers: {
    userName: string;
    profileImg: string;
  };
}

export default function ConnectedUserProfile(props: IProps) {
  const { connectedUsers, userName } = props;

  const [connectedUser, setConnectedUser] = useState({
    userName: connectedUsers.userName,
    profileImg: connectedUsers.profileImg,
  });
  const [isConnectedVisible, setIsConnectedVisible] = useState(false);

  useEffect(() => {
    if (connectedUsers.userName) {
      setConnectedUser({
        userName: connectedUsers.userName,
        profileImg: connectedUsers.profileImg,
      });
      setIsConnectedVisible(true);
      setTimeout(() => {
        setIsConnectedVisible(false);
      }, 5000);
    }
  }, [connectedUsers]);

  return (
    <Wrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: isConnectedVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.5 }}
    >
      <IsConnectedBox>
        <ProfileImg src={connectedUser.profileImg} alt="profile" />
        {connectedUser.userName === userName
          ? "내가 돌아왔다"
          : `${connectedUser.userName}님이 접속했습니다!`}
      </IsConnectedBox>
    </Wrapper>
  );
}

const Wrapper = styled(motion.div)(() => {
  return {
    top: 20,
    zIndex: 1,
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
