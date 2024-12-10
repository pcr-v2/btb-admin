import RealTimeChat from "@/app/(main)/realtime-chat";
import { getUser } from "@/app/_actions/account/auth/getUser";
import { getChatAction } from "@/app/_actions/chats/getChatAction";
import PageContainer from "@/app/_components/MainLayout/PageContainer";

export default async function RealtimeChatPage() {
  const userData = await getUser();
  const prevChats = await getChatAction();

  return (
    <PageContainer>
      {userData.code === "SUCCESS" && prevChats.code === "SUCCESS" && (
        <RealTimeChat userData={userData.data} chatData={prevChats.data} />
      )}
    </PageContainer>
  );
}
