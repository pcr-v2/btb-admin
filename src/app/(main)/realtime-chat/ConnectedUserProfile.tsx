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
    justifyContent: "center",
  };
});

const IsConnectedBox = styled(motion.div)(() => {
  return {
    gap: "12px",
    display: "flex",
    fontSize: "14px",
    marginLeft: "8px",
    alignItems: "center",
    justifyContent: "start",
  };
});

const ProfileImg = styled("img")(() => {
  return {
    width: "48px",
    height: "48px",
    padding: "1px",
    objectFit: "cover",
    borderRadius: "100%",
    border: "1px solid #bcbcbc",
  };
});
