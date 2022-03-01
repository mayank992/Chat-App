import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { MESSAGE_TYPE } from "../../constants/index";
import { getJoinedChannels, getConnections } from "../../helpers/index";
import { ConnectionType, JoinedChannelType } from "../../types";
import { SplitPane } from "../../components/SplitPane";
import { useQuery } from "../../hooks/useQuery";
import "./Main.css";

type Selected = {
  type: MESSAGE_TYPE;
  id: string | null;
};

export function Main() {
  const [user] = useContext(UserContext);
  const { data: users } = useQuery<ConnectionType[]>(
    () => getConnections(user.id),
    { refetchInterval: 5000 }
  );
  const { data: channels } = useQuery<JoinedChannelType[]>(
    () => getJoinedChannels(user.id),
    { refetchInterval: 5000 }
  );
  const [selected, setSelected] = useState<Selected>({
    type: MESSAGE_TYPE.DM,
    id: null,
  });

  const selectedItem =
    selected.type === MESSAGE_TYPE.DM
      ? users?.find((user) => user.id === selected.id)
      : channels?.find((channel) => channel.id === selected.id);

  function changeSelected(toSelect: Selected) {
    setSelected(toSelect);
  }

  return (
    <div className="main">
      <header className="main__header">
        <input className="header__input" placeholder="Search" />
      </header>
      <div className="main__body">
        <SplitPane
          minWidth="300px"
          leftPane={
            users &&
            channels && (
              <Sidebar
                users={users}
                channels={channels}
                selected={selected}
                changeSelected={changeSelected}
              />
            )
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
