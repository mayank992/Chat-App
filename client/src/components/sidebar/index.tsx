import React, { useCallback } from "react";
import { useUserContext } from "../../contexts/UserContext";
import { CreateChannelModal } from "./CreateChannelModal";
import { AddUserDmModal } from "./AddUserDmModal";

import { JoinedChannelType, ConnectionType, Selected } from "../../types";
import { CHAT_TYPE } from "../../constants";

import { Collapsible } from "../library/collapsible/index";
import { List, ListItem } from "../library/list/index";
import { useWindow } from "../../hooks/useWindow";

import hashIcon from "../../assets/hashtag.png";
import userIcon from "../../assets/user.png";
import "./Sidebar.css";

type Props = {
  users: ConnectionType[];
  channels: JoinedChannelType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export const Sidebar = React.memo(
  ({ users, channels, selected, changeSelected }: Props) => {
    const [user] = useUserContext();
    const {
      window: modalName,
      openWindow: openModal,
      closeWindow: closeModal,
    } = useWindow<"createChannel" | "addUserDm">();

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
        <Collapsible
          defaultIsOpen={true}
          headerContent={
            <>
              <p className="list-item__text">Channels</p>
              <div
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("createChannel");
                }}
              >
                +
              </div>
              <CreateChannelModal
                isOpen={modalName === "createChannel"}
                onClose={closeModal}
              />
            </>
          }
        >
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
        </Collapsible>
        <Collapsible
          defaultIsOpen={true}
          headerContent={
            <>
              <p className="list-item__text">Direct messages</p>
              <div
                className="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  openModal("addUserDm");
                }}
              >
                +
              </div>
              <AddUserDmModal
                isOpen={modalName === "addUserDm"}
                onClose={closeModal}
              />
            </>
          }
        >
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
        </Collapsible>
      </div>
    );
  }
);
