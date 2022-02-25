import { useToggle } from "../../hooks/useToggle";
import "./styles.css";

type Props = {
  title: string;
  onClickAdd?: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
};

export function CollapsibleList({ title, onClickAdd, children }: Props) {
  const { open, toggle } = useToggle(true);

  return (
    <dl className="list">
      <dt className="list__title" onClick={() => toggle()}>
        <div className={"arrow" + (open ? " arrow--down" : "")}></div>
        {title}
        <div className="list__add-item" onClick={onClickAdd}>
          +
        </div>
      </dt>
      {open && children}
    </dl>
  );
}
