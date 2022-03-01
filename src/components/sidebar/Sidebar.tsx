import { useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemBadge,
  CollapsibleList,
} from "../collapsibleList/index";
import { JoinedChannelType, ConnectionType } from "../../types";
import userIcon from "../../assets/user.png";
import channelIcon from "../../assets/hashtag.png";
import { MESSAGE_TYPE } from "../../constants";

type Selected = { type: MESSAGE_TYPE; id: string | null };

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
      <CollapsibleList title="Channels">
        {channels.map((channel) => (
          <ListItem
            key={channel.id}
            selected={
              selected.type === MESSAGE_TYPE.CHANNEL
                ? channel.id === selected.id
                : false
            }
            onClick={(e) => {
              e.stopPropagation();
              changeSelected({ type: MESSAGE_TYPE.CHANNEL, id: channel.id });
            }}
          >
            <ListItemIcon src={channelIcon} />
            <ListItemText text={channel.name} />
          </ListItem>
        ))}
      </CollapsibleList>
      <CollapsibleList title="Direct messages">
        {users.map((user) => (
          <ListItem
            key={user.id}
            selected={
              selected.type === MESSAGE_TYPE.DM
                ? user.id === selected.id
                : false
            }
            onClick={(e) => {
              e.stopPropagation();
              changeSelected({ type: MESSAGE_TYPE.DM, id: user.id });
            }}
          >
            <ListItemIcon src={userIcon} />
            <ListItemText text={user.name} />
          </ListItem>
        ))}
      </CollapsibleList>
    </div>
  );
}
