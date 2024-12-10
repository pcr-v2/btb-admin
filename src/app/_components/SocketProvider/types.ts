import { Socket, io as ClientIO } from "socket.io-client";

export type TSocketContext = {
  socket: TSocket | null;
  connectedUsers: TUserInfo[];
  isConnect: boolean;
  typingUsers: TTypingUser[];
  onUserJoin?: (userInfo: TUserInfo) => void;
};

export type TSocket = Socket<IServerToClientEvents, IClientToServerEvents>;

export type TTypingUser = {
  userName: string;
  profileImg: string;
  isTyping: boolean;
};

export type TUserInfo = {
  userName: string;
  profileImg: string;
};

export type TEmojiReaction = {
  userName: string;
  profileImg: string;
  msgId: number;
  emoji: string;
  timeStamp: string;
};

export interface IMessage {
  msgId: string;
  userName: string;
  attachedImage: { type: "Emoji" | "Picture" | "Video"; key: string };
  content: string;
  profileImg: string;
  timeStamp: string | Date;
  emojiReact: { userName: string; profileImg: string; emojiKey: string }[];
}

interface IServerToClientEvents {
  message: (data: IMessage) => void;
  connect: () => void;
  disconnect: () => void;
  onUserJoin: (userInfo: TUserInfo) => void;
  addReaction: (reaction: TEmojiReaction) => void;
  removeReaction: (reaction: TEmojiReaction) => void;
  onTyping: (data: TTypingUser) => void;
}

interface IClientToServerEvents {
  sendMessage: (data: IMessage) => void;
  onUserJoin: (userInfo: TUserInfo) => void;
  addReaction: (reaction: TEmojiReaction) => void;
  removeReaction: (reaction: TEmojiReaction) => void;
  onTyping: (data: TTypingUser) => void;
}
