import { useContext, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import { JoinedChannelType, ConnectionType } from "../../types";
import { CHAT_TYPE } from "../../constants";
import { Menu } from "./Menu";
import "./Sidebar.css";

type Selected = { type: CHAT_TYPE; id: string | null };

type Props = {
  users: ConnectionType[];
  channels: JoinedChannelType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export function Sidebar({ users, channels, selected, changeSelected }: Props) {
  const [user] = useContext(UserContext);

  const handleConnectionSelect = useCallback((connectionId: string) => {
    changeSelected({ type: CHAT_TYPE.DM, id: connectionId });
  }, []);

  const handleChannelSelect = useCallback((channelId: string) => {
    changeSelected({ type: CHAT_TYPE.CHANNEL, id: channelId });
  }, []);

  return (
    <div className="sidebar">
      <header className="sidebar__header">
        <h2>{user.username}</h2>
      </header>
      <Menu
        title="Direct messages"
        items={channels}
        selectedId={selected.id || ""}
        onChangeSelected={handleChannelSelect}
      />
      <Menu
        title="Channels"
        items={users}
        selectedId={selected.id || ""}
        onChangeSelected={handleConnectionSelect}
      />
    </div>
  );
}
