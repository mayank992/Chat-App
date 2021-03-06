import { useState, useCallback, useMemo } from "react";
import { ChatArea } from "../../components/chatArea/index";
import { Sidebar } from "../../components/sidebar/index";
import { CHAT_TYPE } from "../../constants/index";
import { SplitPane } from "../../components/library/SplitPane";
import { useGetUserDetails } from "../../hooks/useGetUserDetails";
import "./Main.css";

type Selected = {
  type: CHAT_TYPE;
  id: string | null;
};

export default function Main() {
  const { userData } = useGetUserDetails();
  const [selectedChat, setSelectedChat] = useState<Selected>({
    type: CHAT_TYPE.DM,
    id: null,
  });

  const selectedItem = useMemo(() => {
    return selectedChat.type === CHAT_TYPE.DM
      ? userData?.connections.find(
          (connection: any) => connection.id === selectedChat.id
        )
      : userData?.channels.find(
          (channel: any) => channel.id === selectedChat.id
        );
  }, [selectedChat, userData]);

  return (
    <div className="main">
      <div className="main__body">
        <SplitPane
          minWidth="300px"
          leftPane={
            userData && (
              <Sidebar
                users={userData.connections}
                channels={userData.channels}
                selected={selectedChat}
                changeSelected={setSelectedChat}
              />
            )
          }
          rightPane={
            selectedItem && (
              <ChatArea
                key={selectedChat.id}
                chatType={selectedChat.type}
                chat={selectedItem}
              />
            )
          }
        />
      </div>
    </div>
  );
}
