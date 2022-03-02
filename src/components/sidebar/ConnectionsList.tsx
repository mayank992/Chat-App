import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { ConnectionType, Selected } from "../../types/index";
import { CHAT_TYPE } from "../../constants";

// TODO - temporary imports
import userIcon from "../../assets/user.png";

type ConnectionListProps = {
  connections: ConnectionType[];
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

export function ConnectionList({
  connections = [],
  selected,
  changeSelected,
}: ConnectionListProps): React.ReactElement {
  return (
    <div className="connection-list">
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
                <p className="list-item__text">Direct Messages</p>
                <List.ItemOptions>
                  <div className="list__add-item">+</div>
                </List.ItemOptions>
              </List.Item>
            );
          }}
        />
        <Collapsible.Content>
          <List>
            {connections.map((connection) => (
              <List.Item
                key={connection.id}
                isActive={
                  selected.type === CHAT_TYPE.DM &&
                  connection.id === selected.id
                }
                style={{ "padding-left": "20px" }}
                onClick={() => {
                  changeSelected({ type: CHAT_TYPE.DM, id: connection.id });
                }}
              >
                <List.ItemIcon>
                  <img
                    src={userIcon}
                    alt="user-icon"
                    style={{ maxHeight: "100%" }}
                  />
                </List.ItemIcon>
                <p className="list-item__text">{connection.name}</p>
              </List.Item>
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
