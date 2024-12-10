"use client";

import { Box, styled } from "@mui/material";
import React from "react";

import { TCheckTypingUser } from "@/app/(main)/realtime-chat";
import { GetUserResponse } from "@/app/_actions/account/auth/getUserSchema";

interface IProps {
  typingUsers: TCheckTypingUser[];
  checkTypingUser?: TCheckTypingUser;
  userData: Pick<GetUserResponse, "data">["data"];
}

export default function TypingUserInfo(props: IProps) {
  const { typingUsers, checkTypingUser, userData } = props;

  return (
    <Wrapper>
      {typingUsers.length >= 1 &&
        typingUsers.map((user, index) => {
          if (user.isTyping && user.userName !== checkTypingUser?.userName)
            return (
              <span style={{ fontWeight: 700 }} key={index}>
                {user.userName}
                {typingUsers.filter(
                  (el) => el.isTyping && el.userName !== userData.name,
                ).length >= 2 && index !== typingUsers.length - 1
                  ? ", "
                  : ""}
              </span>
            );
        })}

      {typingUsers.filter(
        (user) => user.isTyping && user.userName !== userData.name,
      ).length >= 1 && "님이 입력중입니다."}
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    fontSize: "12px",
    minHeight: "20px",
    padding: "0px 12px",
  };
});
