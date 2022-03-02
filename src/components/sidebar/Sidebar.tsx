import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { JoinedChannelType, ConnectionType } from "../../types";
import { CHAT_TYPE } from "../../constants";
import { ChannelList } from "./ChannelList";
import { ConnectionList } from "./ConnectionsList";
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

  return (
    <div className="sidebar">
      <header className="sidebar__header">
        <h2>{user.username}</h2>
      </header>
      <ChannelList
        channels={channels}
        selected={selected}
        changeSelected={changeSelected}
      />
      <ConnectionList
        connections={users}
        selected={selected}
        changeSelected={changeSelected}
      />
    </div>
  );
}
