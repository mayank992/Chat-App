import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { ConnectionType, Selected } from "../../types/index";
import { CHAT_TYPE } from "../../constants";
import { ListHeader } from "./ListHeader";

// TODO - temporary imports
import userIcon from "../../assets/user.png";

type ConnectionListItemProps = {
  connection: ConnectionType;
  selected: Selected;
  changeSelected: (toSelect: Selected) => void;
};

function ConnectionListItem({
  connection,
  selected,
  changeSelected,
}: ConnectionListItemProps) {
  return (
    <List.Item
      key={connection.id}
      isActive={selected.type === CHAT_TYPE.DM && connection.id === selected.id}
      style={{ "padding-left": "20px" }}
      onClick={() => {
        changeSelected({ type: CHAT_TYPE.DM, id: connection.id });
      }}
    >
      <List.ItemIcon>
        <img src={userIcon} alt="user-icon" style={{ maxHeight: "100%" }} />
      </List.ItemIcon>
      <p className="list-item__text">{connection.name}</p>
    </List.Item>
  );
}

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
          render={(isOpen) => (
            <ListHeader title="Direct messages" isOpen={isOpen} />
          )}
        />
        <Collapsible.Content>
          <List>
            {connections.map((connection) => (
              <ConnectionListItem
                connection={connection}
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
