import { useState, useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { ChatArea } from "../../components/chatArea/index";
import { Sidebar } from "../../components/sidebar/index";
import { CHAT_TYPE } from "../../constants/index";
import { getUserDetails } from "../../helpers/index";
import { SplitPane } from "../../components/common/SplitPane";
import { useQuery } from "../../hooks/useQuery";
import "./Main.css";

type Selected = {
  type: CHAT_TYPE;
  id: string | null;
};

export default function Main() {
  const [user] = useUserContext();
  const { data: userData } = useQuery<any>(
    [user.id],
    ({ signal }) => getUserDetails(user.id, { signal }),
    { refetchInterval: 5000 }
  );
  // TODO - fix name
  const [selectedChat, setSelectedChat] = useState<Selected>({
    type: CHAT_TYPE.DM,
    id: null,
  });

  const selectedItem =
    selectedChat.type === CHAT_TYPE.DM
      ? userData?.connections.find(
          (connection: any) => connection.id === selectedChat.id
        )
      : userData?.channels.find(
          (channel: any) => channel.id === selectedChat.id
        );

  const changeSelected = useCallback((toSelect: Selected) => {
    setSelectedChat(toSelect);
  }, []);

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
                changeSelected={changeSelected}
              />
            )
          }
          rightPane={
            selectedItem && (
              <ChatArea
                chatType={selectedChat.type}
                id={selectedItem.id}
                name={selectedItem.name}
              />
            )
          }
        />
      </div>
    </div>
  );
}
