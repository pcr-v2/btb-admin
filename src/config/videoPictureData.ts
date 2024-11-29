export type TVideoPictureCombined = {
  key: string; // "::end::" 같은 키
  url: string; // 이미지 URL
  krName: string; // 한국어 이름
};

export const VideoPictureData: TVideoPictureCombined[] = [
  { key: "::out::", url: "/video-picture/out.mp4", krName: "나가" },
  { key: "::wow::", url: "/video-picture/wow.mp4", krName: "WOW" },
  { key: "::fall::", url: "/video-picture/fall.mp4", krName: "꽈당" },
  { key: "::byunghun::", url: "/video-picture/byunghun.mp4", krName: "병헌리" },
];
