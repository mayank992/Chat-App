import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { Chat } from "../../components/chat/Chat";
import { Sidebar } from "../../components/sidebar/Sidebar";
import { MESSAGE_TYPE } from "../../constants/index";
import { getKnownChannels, getKnownUsers } from "../../helpers/index";
import { usePolling } from "../../hooks/usePolling";
import { SplitPane } from "../../components/splitPane/index";
import "./Main.css";

import { KnownUserType, KnownChannelType } from "../../types";

type Selected = {
  type: MESSAGE_TYPE;
  id: string | null;
};

export function Main() {
  const [user] = useContext(UserContext);
  const [users, setUsers] = useState<KnownUserType[]>([]);
  const [channels, setChannels] = useState<KnownChannelType[]>([]);
  const [selected, setSelected] = useState<Selected>({
    type: MESSAGE_TYPE.DM,
    id: null,
  });
  const selectedItem =
    selected.type === MESSAGE_TYPE.DM
      ? users.find((user) => user.id === selected.id)
      : channels.find((channel) => channel.id === selected.id);

  usePolling(
    async () => {
      // apply pooling to refresh the data
      const users = await getKnownUsers(user.id);
      setUsers(users);

      const channels = await getKnownChannels(user.id);
      setChannels(channels);
    },
    [],
    5000
  );

  function changeSelected(toSelect: Selected) {
    setSelected(toSelect);
  }

  return (
    <div className="main">
      <header className="main__header">
        <input className="header__input" value={""} placeholder="Search" />
      </header>
      <div className="main__body">
        <SplitPane
          splitDirection="horizontal"
          minSize="300px"
          pane1={
            <Sidebar
              users={users}
              channels={channels}
              selected={selected}
              changeSelected={changeSelected}
            />
          }
          pane2={
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
