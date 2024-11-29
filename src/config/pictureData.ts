export type TPictureCombined = {
  key: string; // "::end::" 같은 키
  url: string; // 이미지 URL
  krName: string; // 한국어 이름
};

export const PictureData: TPictureCombined[] = [
  { key: "::end::", url: "/picture/end.png", krName: "퇴사각" },
  { key: "::why::", url: "/picture/why.png", krName: "왜 출근했는가.." },
  { key: "::nothing::", url: "/picture/nothing.png", krName: "아무것도 안함" },
  { key: "::miracle::", url: "/picture/miracle.png", krName: "기적의 논리" },
  {
    key: "::dirty::",
    url: "/picture/dirty.png",
    krName: "만나서 더러웠고..",
  },
  {
    key: "::whatsee::",
    url: "/picture/whatsee.png",
    krName: "뭘 본거지",
  },
  { key: "::shock::", url: "/picture/shock.png", krName: "충격" },
  {
    key: "::wrong::",
    url: "/picture/wrong.png",
    krName: "머리가 잘못..",
  },
  { key: "::ikillu::", url: "/picture/ikillu.png", krName: "캌씨!" },
  { key: "::who::", url: "/picture/who.png", krName: "누구인가" },
  { key: "::punch::", url: "/picture/punch.png", krName: "딱대" },
  {
    key: "::smoke::",
    url: "/picture/smoke.png",
    krName: "꽁초 삼키세요",
  },
];
