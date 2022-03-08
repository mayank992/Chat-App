import { useContext, useCallback } from "react";
import { UserContext } from "../../contexts/UserContext";
import { JoinedChannelType, ConnectionType, Selected } from "../../types";
import { ModalContents } from "../common/modal/index";
import { CHAT_TYPE } from "../../constants";
import { CreateChannel } from "./CreateChannel";
import { AddUser } from "./AddUser";
import { Menu } from "./Menu";
import "./Sidebar.css";

type Props = {
  users: ConnectionType[];
  channels: JoinedChannelType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export function Sidebar({ users, channels, selected, changeSelected }: Props) {
  const [user] = useContext(UserContext);

  const handleDirectMessageSelect = useCallback((connectionId: string) => {
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
        title="Channels"
        items={channels}
        selectedId={selected.id}
        onChangeSelected={handleChannelSelect}
        modalContent={
          <ModalContents title="Create channel">
            <CreateChannel />
          </ModalContents>
        }
      />
      <Menu
        title="Direct Messages"
        items={users}
        selectedId={selected.id}
        onChangeSelected={handleDirectMessageSelect}
        modalContent={
          <ModalContents title="Add user">
            <AddUser id={user.id} chatType={CHAT_TYPE.DM} />
          </ModalContents>
        }
      />
    </div>
  );
}
