import { Children, ReactNode, ReactElement } from 'react';
import { useToggle } from '../../../hooks/useToggle';
import { Arrow } from '../icons';
import './Collapsible.css';

const Slot = (props: { name: 'header' | 'body'; children?: ReactNode }) => null;

const Collapsible = ({
  defaultIsOpen = false,
  children,
}: {
  defaultIsOpen?: boolean;
  children?: ReactNode;
}): React.ReactElement => {
  const { isOpen, toggle } = useToggle(defaultIsOpen);

  const childrenArr = Children.toArray(children) as ReactElement[];
  const headerSlot = childrenArr.find((child: ReactElement) => child?.props?.name === 'header');
  const bodySlot = childrenArr.find((child: ReactElement) => child?.props?.name === 'body');

  return (
    <div className="collapsible">
      <div className="collapsible__header" onClick={toggle}>
        <Arrow direction={isOpen ? 'down' : 'right'} />
        {headerSlot?.props?.children}
      </div>
      <div className="collapsible__content">{isOpen && bodySlot?.props?.children}</div>
    </div>
  );
};

Collapsible.Slot = Slot;

export { Collapsible };
