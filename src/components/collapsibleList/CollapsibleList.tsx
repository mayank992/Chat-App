import { useToggle } from "../../hooks/useToggle";
import "./styles.css";

type Props = {
  title: string;
  renderOnClickAdd?: React.ReactNode;
  children: React.ReactNode;
  addDisabled?: boolean;
};

export function CollapsibleList({
  title,
  renderOnClickAdd,
  children,
  addDisabled,
}: Props) {
  const { open, toggle } = useToggle(true);

  return (
    <dl className="list">
      <dt className="list__title" onClick={() => toggle()}>
        <div className={"arrow" + (open ? " arrow--down" : "")}></div>
        {title}
        {!addDisabled && (
          <>
            <div className="list__add-item">+</div>
          </>
        )}
      </dt>
      {open && children}
    </dl>
  );
}
