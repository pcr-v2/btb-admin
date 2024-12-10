"use client";

import { RefObject, useCallback } from "react";

export default function useScollBottom(ref: RefObject<HTMLElement>) {
  const scrollToBottom = useCallback(() => {
    if (!ref?.current) return;

    setTimeout(() => {
      ref.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 10);
  }, [ref]);

  return scrollToBottom;
}
