export type TVideoPictureCombined = {
  key: string; // "::end::" 같은 키
  url: string; // 이미지 URL
  krName: string; // 한국어 이름
};

export const VideoPictureData: TVideoPictureCombined[] = [
  { key: "::out::", url: "/video-picture/out.mp4", krName: "나가" },
  { key: "::wow::", url: "/video-picture/wow.mp4", krName: "WOW" },
  { key: "::fall::", url: "/video-picture/fall.mp4", krName: "꽈당" },
  { key: "::king::", url: "/video-picture/king.mp4", krName: "빠밤" },
  { key: "::flower::", url: "/video-picture/flower.mp4", krName: "밀가루 팡" },
  { key: "::dongyup::", url: "/video-picture/dongyup.mp4", krName: "동엽신" },
  { key: "::verycry::", url: "/video-picture/verycry.mp4", krName: "펑펑" },
  { key: "::sleepy::", url: "/video-picture/sleepy.mp4", krName: "졸리다" },
  { key: "::catwow::", url: "/video-picture/catwow.mp4", krName: "와우" },
  { key: "::you::", url: "/video-picture/you.mp4", krName: "너 그래너" },
  { key: "::sora::", url: "/video-picture/sora.mp4", krName: "소라..게.." },
  { key: "::thanks::", url: "/video-picture/thanks.mp4", krName: "감사 제리" },
];
