import { List, ListItem } from "../common/list/index";
import { Collapsible } from "../common/collapsible/index";
import { Icon, Arrow } from "../common/icons/index";
import { Modal, ModalOpenButton } from "../common/modal";
import { Portal } from "../Portal";

// TODO - temporary imports
import hashIcon from "../../assets/hashtag.png";

type MenuProps = {
  title: string;
  items: any[];
  selectedId: string | null;
  onChangeSelected: (id: string) => void;
  modalContent: React.ReactElement;
};

export function Menu({
  title,
  items = [],
  selectedId,
  onChangeSelected,
  modalContent,
}: MenuProps): React.ReactElement {
  return (
    <div className="menu">
      <Collapsible defaultIsOpen={true}>
        <Collapsible.Header
          render={(isOpen) => (
            <ListItem>
              <Arrow direction={isOpen ? "down" : "right"}></Arrow>
              <p className="list-item__text">{title}</p>
              <Modal>
                <ModalOpenButton>
                  <Icon>+</Icon>
                </ModalOpenButton>
                {modalContent}
              </Modal>
            </ListItem>
          )}
        />
        <Collapsible.Content>
          <List>
            {items.map((item) => (
              <ListItem
                key={item.id}
                isActive={selectedId === item.id}
                style={{ paddingLeft: "20px" }}
                onClick={() => onChangeSelected(item.id)}
              >
                <img
                  src={hashIcon}
                  alt="user-icon"
                  style={{ maxHeight: "100%" }}
                />
                <p className="list-item__text">{item.name}</p>
              </ListItem>
            ))}
          </List>
        </Collapsible.Content>
      </Collapsible>
    </div>
  );
}
