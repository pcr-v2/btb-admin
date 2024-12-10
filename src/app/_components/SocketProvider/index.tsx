"use client";

import { createContext, ReactNode, useContext, useState } from "react";

import {
  TEmojiReaction,
  TSocket,
  TSocketContext,
  TTypingUser,
  TUserInfo,
} from "@/app/_components/SocketProvider/types";

const SocketContext = createContext<TSocketContext>({
  socket: null,
  connectedUsers: [{ userName: "", profileImg: "" }],
  isConnect: false,
  typingUsers: [{ userName: "", profileImg: "", isTyping: false }],
});

interface IProps {
  children: ReactNode;
}

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider({ children }: IProps) {
  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnect, setIsConnect] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<TUserInfo[]>([]);
  const [typingUsers, setTypingUsers] = useState<TTypingUser[]>([]);

  const onUserJoin = (userInfo: TUserInfo) => {
    setConnectedUsers([{ ...userInfo }]);
  };

  return (
    <SocketContext.Provider
      value={{ socket, isConnect, connectedUsers, typingUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
}
