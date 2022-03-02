import { List } from "../common/list/index";

type ListHeaderProps = { title: string; isOpen: boolean };

export function ListHeader({ title, isOpen }: ListHeaderProps) {
  return (
    <List.Item>
      <List.ItemIcon>
        <div className={"arrow" + (isOpen ? " arrow--down" : "")}></div>
      </List.ItemIcon>
      <p className="list-item__text">{title}</p>
      <List.ItemOptions>
        <div className="list__add-item">+</div>
      </List.ItemOptions>
    </List.Item>
  );
}
