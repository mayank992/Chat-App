import { List } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { Icon, Arrow } from "../common/icons/index";

// TODO - temporary imports
import hashIcon from "../../assets/hashtag.png";

type MenuHeaderProps = { title: string; isOpen: boolean };

export function MenuHeader({ title, isOpen }: MenuHeaderProps) {
  return (
    <List.Item>
      <List.ItemIcon>
        <Arrow direction={isOpen ? "down" : "right"}></Arrow>
      </List.ItemIcon>
      <p className="list-item__text">{title}</p>
      <List.ItemOptions>
        <Icon>+</Icon>
      </List.ItemOptions>
    </List.Item>
  );
}

type MenuItemProps = {
  item: any;
  selectedId: string | null;
  onChangeSelected: (id: string) => void;
};

function MenuItem({ item, selectedId, onChangeSelected }: MenuItemProps) {
  return (
    <List.Item
      isActive={selectedId === item.id}
      style={{ paddingLeft: "20px" }}
      onClick={() => onChangeSelected(item.id)}
    >
      <List.ItemIcon>
        <img src={hashIcon} alt="user-icon" style={{ maxHeight: "100%" }} />
      </List.ItemIcon>
      <p className="list-item__text">{item.name}</p>
    </List.Item>
  );
}

type MenuProps = {
  title: string;
  items: any[];
  selectedId: string | null;
  onChangeSelected: (id: string) => void;
};

export function Menu({
  title,
  items = [],
  selectedId,
  onChangeSelected,
}: MenuProps): React.ReactElement {
  return (
    <div className="menu">
      <Collapsible defaultIsOpen={true}>
        <Collapsible.Header
          render={(isOpen) => <MenuHeader title={title} isOpen={isOpen} />}
        />
        <Collapsible.Content>
          <List>
            {items.map((item) => (
              <MenuItem
                key={item.id}
                item={item}
                selectedId={selectedId}
                onChangeSelected={onChangeSelected}
              />
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
