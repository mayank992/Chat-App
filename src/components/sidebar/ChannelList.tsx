import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { JoinedChannelType, Selected } from "../../types/index";
import { CHAT_TYPE } from "../../constants";

// TODO - temporary imports
import hashIcon from "../../assets/hashtag.png";

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
          render={(isOpen) => {
            return (
              <List.Item>
                <List.ItemIcon>
                  <div
                    className={"arrow" + (isOpen ? " arrow--down" : "")}
                  ></div>
                </List.ItemIcon>
                <p className="list-item__text">Channels</p>
                <List.ItemOptions>
                  <div className="list__add-item">+</div>
                </List.ItemOptions>
              </List.Item>
            );
          }}
        />
        <Collapsible.Content>
          <List>
            {channels.map((channel) => (
              <List.Item
                key={channel.id}
                isActive={
                  selected.type === CHAT_TYPE.CHANNEL &&
                  channel.id === selected.id
                }
                style={{ "padding-left": "20px" }}
                onClick={() => {
                  changeSelected({ type: CHAT_TYPE.CHANNEL, id: channel.id });
                }}
              >
                <List.ItemIcon>
                  <img
                    src={hashIcon}
                    alt="user-icon"
                    style={{ maxHeight: "100%" }}
                  />
                </List.ItemIcon>
                <p className="list-item__text">{channel.name}</p>
              </List.Item>
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
