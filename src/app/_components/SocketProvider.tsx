"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { Socket, io as ClientIO } from "socket.io-client";

interface IProps {
  children: ReactNode;
}

interface IContent {
  emoji: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  msg: string;
}

export interface IMessage {
  userName: string;
  emoji: { emojiType: "Emoji" | "Picture" | "Video"; emojiKey: string };
  content: string;
  profileImg?: string;
}

interface IServerToClientEvents {
  message: (data: IMessage) => void;
  connect: () => void;
  disconnect: () => void;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void;
  onTyping: (data: {
    userName: string;
    isTyping: boolean;
    profileImg: string;
  }) => void;
}

interface IClientToServerEvents {
  sendMessage: (data: IMessage) => void;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void;
  onTyping: (data: {
    userName: string;
    isTyping: boolean;
    profileImg: string;
  }) => void;
}

type TSocket = Socket<IServerToClientEvents, IClientToServerEvents>;

type TSocketContext = {
  socket: TSocket | null;
  connectedUsers: { userName: string; profileImg: string }[];
  isConnected: boolean;
  onUserJoin: (userInfo: { userName: string; profileImg: string }) => void;
  // handleTyping: (userName: string, isTyping: boolean) => void;
};

const SocketContext = createContext<TSocketContext>({
  socket: null,
  isConnected: false,
  connectedUsers: [{ userName: "", profileImg: "" }],
  onUserJoin: () => {},
  // handleTyping: () => {}, // 초기값 설정
});

export const useSocket = () => {
  return useContext(SocketContext);
};

export default function SocketProvider(props: IProps) {
  const { children } = props;

  const [socket, setSocket] = useState<TSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState<
    [
      {
        userName: string;
        profileImg: string;
      },
    ]
  >([{ userName: "", profileImg: "" }]);

  const onUserJoin = (userInfo: { userName: string; profileImg: string }) => {
    setConnectedUsers([{ ...userInfo }]);
  };

  const handleTyping = (data: {
    userName: string;
    profileImg: string;
    isTyping: boolean;
  }) => {
    // console.log(
    //   "userName 프로바이더 로그",
    //   data.userName,
    //   data.isTyping,
    //   data.profileImg,
    // );
    socket?.emit("onTyping", data);
  };

  useEffect(() => {
    if (!socket) {
      return;
    }

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("onTyping", (data) => handleTyping(data));

    return () => {
      socket.off("disconnect");
    };
  }, [socket]);

  useEffect(() => {
    const socketInstance: TSocket = ClientIO("http://192.168.3.20:2024", {
      path: "/api/socket",
      addTrailingSlash: false,
      transports: ["polling", "websocket"],
    });
    socketInstance.on("connect", () => setIsConnected(true));
    socketInstance.on("onUserJoin", onUserJoin);
    socketInstance.on(
      "onTyping",
      (data: { userName: string; isTyping: boolean }) => {
        // console.log(`${data.userName} is typing: ${data.isTyping}`);
      },
    );
    socketInstance.on("disconnect", () => setIsConnected(false));

    setSocket(socketInstance);

    return () => {
      socketInstance.off("connect");
      socketInstance.off("onUserJoin", onUserJoin);
      socketInstance.off("onTyping");

      socketInstance.off("disconnect");

      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider
      value={{ socket, isConnected, onUserJoin, connectedUsers }}
    >
      {children}
    </SocketContext.Provider>
  );
}
