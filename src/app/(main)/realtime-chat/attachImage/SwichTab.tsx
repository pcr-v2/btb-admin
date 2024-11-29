import { Box, styled } from "@mui/material";

import Close from "@/assets/icon/close.svg";

interface IProps {
  onClose: () => void;
  handleSwitch: (value: { type: "emoji" | "picture" | "video" }) => void;
}
export default function SwichTab(props: IProps) {
  const { onClose, handleSwitch } = props;

  return (
    <Wrapper>
      <Tabs>
        <TabItem onClick={() => handleSwitch({ type: "emoji" })}>
          이모지
        </TabItem>
        <TabItem onClick={() => handleSwitch({ type: "picture" })}>
          짤방
        </TabItem>
        <TabItem onClick={() => handleSwitch({ type: "video" })}>움짤</TabItem>
      </Tabs>
      <CloseImg src={Close.src} alt="close" onClick={onClose} />
    </Wrapper>
  );
}

const Wrapper = styled(Box)(() => {
  return {
    width: "100%",
    display: "flex",
    padding: "8px 8px 8px",
    justifyContent: "space-between",
  };
});

const CloseImg = styled("img")(() => {
  return {
    width: "24px",
    height: "24px",
    cursor: "pointer",
  };
});

const Tabs = styled(Box)(() => {
  return {
    gap: "12px",
    display: "flex",
    padding: "4px 0px 0px 20px",
  };
});

const TabItem = styled(Box)(() => {
  return {
    fontWeight: 500,
    fontSize: "13px",
    cursor: "pointer",
    letterSpacing: "1.2px",
  };
});
