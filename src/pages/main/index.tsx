import { useState, useContext, useCallback } from "react";
import { useUser } from "../../contexts/UserContext";
import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { CHAT_TYPE } from "../../constants/index";
import { getJoinedChannels, getConnections } from "../../helpers/index";
import { ConnectionType, JoinedChannelType } from "../../types";
import { SearchBar } from "../../components/SearchBar";
import { SplitPane } from "../../components/SplitPane";
import { useQuery } from "../../hooks/useQuery";
import "./Main.css";

type Selected = {
  type: CHAT_TYPE;
  id: string | null;
};

export default function Main() {
  const [user] = useUser();
  const { data: users } = useQuery<ConnectionType[]>(
    [user.id],
    ({ signal }) => getConnections(user.id, { signal }),
    { refetchInterval: 5000 }
  );
  const { data: channels } = useQuery<JoinedChannelType[]>(
    [user.id],
    ({ signal }) => getJoinedChannels(user.id, { signal }),
    { refetchInterval: 5000 }
  );
  const [selected, setSelected] = useState<Selected>({
    type: CHAT_TYPE.DM,
    id: null,
  });

  const selectedItem =
    selected.type === CHAT_TYPE.DM
      ? users?.find((user) => user.id === selected.id)
      : channels?.find((channel) => channel.id === selected.id);

  const changeSelected = useCallback((toSelect: Selected) => {
    setSelected(toSelect);
  }, []);

  return (
    <div className="main">
      <header className="main__header">
        <SearchBar />
      </header>
      <div className="main__body">
        <SplitPane
          minWidth="300px"
          leftPane={
            <Sidebar
              users={users || []}
              channels={channels || []}
              selected={selected}
              changeSelected={changeSelected}
            />
          }
          rightPane={
            selectedItem && (
              <Chat
                chatType={selected.type}
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
