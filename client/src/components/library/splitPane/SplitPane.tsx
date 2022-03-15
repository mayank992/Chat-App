import React, { Children, ReactNode, ReactElement } from 'react';
import './SplitPane.css';

const Slot = (props: { name: 'leftPane' | 'rightPane'; children?: ReactNode }) => null;

const SplitPane = ({ children }: { children?: ReactNode }): React.ReactElement => {
  const childrenArr = Children.toArray(children) as ReactElement[];
  const leftPaneSlot = childrenArr.find((child: ReactElement) => child?.props?.name === 'leftPane');
  const rightPaneSlot = childrenArr.find((child: ReactElement) => child?.props?.name === 'rightPane');

  return (
    <div className="split-pane">
      <div className="split-pane__left-pane">{leftPaneSlot?.props?.children}</div>
      <div className="split-pane__right-pane">{rightPaneSlot?.props?.children}</div>
    </div>
  );
};

SplitPane.Slot = Slot;

export { SplitPane };
