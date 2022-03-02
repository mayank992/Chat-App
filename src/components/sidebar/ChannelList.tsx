import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { JoinedChannelType, Selected } from "../../types/index";
import { CHAT_TYPE } from "../../constants";
import { ListHeader } from "./ListHeader";

// TODO - temporary imports
import hashIcon from "../../assets/hashtag.png";

type ChannelListItemProps = {
  channel: JoinedChannelType;
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

function ChannelListItem({
  channel,
  selected,
  changeSelected,
}: ChannelListItemProps) {
  return (
    <List.Item
      key={channel.id}
      isActive={
        selected.type === CHAT_TYPE.CHANNEL && channel.id === selected.id
      }
      style={{ "padding-left": "20px" }}
      onClick={() => {
        changeSelected({ type: CHAT_TYPE.CHANNEL, id: channel.id });
      }}
    >
      <List.ItemIcon>
        <img src={hashIcon} alt="user-icon" style={{ maxHeight: "100%" }} />
      </List.ItemIcon>
      <p className="list-item__text">{channel.name}</p>
    </List.Item>
  );
}

type ChannelListProps = {
  channels: JoinedChannelType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export function ChannelList({
  channels = [],
  selected,
  changeSelected,
}: ChannelListProps): React.ReactElement {
  return (
    <div className="channel-list">
      <Collapsible defaultIsOpen={true}>
        <Collapsible.Header
          render={(isOpen) => <ListHeader title="Channels" isOpen={isOpen} />}
        />
        <Collapsible.Content>
          <List>
            {channels.map((channel) => (
              <ChannelListItem
                channel={channel}
                selected={selected}
                changeSelected={changeSelected}
              />
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
