import { useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { CreateChannel } from "./CreateChannel";
import { AddUserDm } from "./AddUserDm";

import { JoinedChannelType, ConnectionType, Selected } from "../../types";
import { CHAT_TYPE } from "../../constants";

import { Modal, ModalOpenButton, ModalContents } from "../common/modal";
import { Collapsible } from "../common/collapsible/index";
import { List, ListItem } from "../common/list/index";
import { Icon } from "../common/icons/index";

import hashIcon from "../../assets/hashtag.png";
import userIcon from "../../assets/user.png";
import "./Sidebar.css";

type Props = {
  users: ConnectionType[];
  channels: JoinedChannelType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export function Sidebar({ users, channels, selected, changeSelected }: Props) {
  const [user] = useUserContext();

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
      <Collapsible defaultIsOpen={true}>
        <Collapsible.Header>
          <p className="list-item__text">Channels</p>
          <Modal>
            <ModalOpenButton>
              <Icon>+</Icon>
            </ModalOpenButton>
            <ModalContents title="Create channel">
              <CreateChannel />
            </ModalContents>
          </Modal>
        </Collapsible.Header>
        <Collapsible.Content>
          <List>
            {channels.map((channel) => (
              <ListItem
                key={channel.id}
                isActive={selected.id === channel.id}
                onClick={() => handleChannelSelect(channel.id)}
              >
                <img
                  src={hashIcon}
                  alt="channel-icon"
                  style={{ maxHeight: "100%" }}
                />
                <p className="list-item__text">{channel.name}</p>
              </ListItem>
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
      <Collapsible defaultIsOpen={true}>
        <Collapsible.Header>
          <p className="list-item__text">Direct messages</p>
          <Modal>
            <ModalOpenButton>
              <Icon>+</Icon>
            </ModalOpenButton>
            <ModalContents title="Add user">
              <AddUserDm />
            </ModalContents>
          </Modal>
        </Collapsible.Header>
        <Collapsible.Content>
          <List>
            {users.map((user) => (
              <ListItem
                key={user.id}
                isActive={selected.id === user.id}
                onClick={() => handleDirectMessageSelect(user.id)}
              >
                <img
                  src={userIcon}
                  alt="channel-icon"
                  style={{ maxHeight: "100%" }}
                />
                <p className="list-item__text">{user.name}</p>
              </ListItem>
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
