type SplitPaneProps = {
  minWidth: string;
  leftPane: React.ReactNode;
  rightPane: React.ReactNode;
  leftPaneStyle?: { [key: string]: string };
  rightPaneStyle?: { [key: string]: string };
};

export function SplitPane({
  minWidth,
  leftPane,
  rightPane,
  leftPaneStyle: customLeftPaneStyle = {},
  rightPaneStyle: customRightPaneStyle = {},
}: SplitPaneProps): React.ReactElement {
  const splitPaneStyle = {
    width: "100%",
    height: "100%",
    display: "flex",
  };

  const leftPaneStyle = {
    width: minWidth,
    ...customLeftPaneStyle,
  };

  const rightPaneStyle = {
    flex: 1,
    ...customRightPaneStyle,
  };

  return (
    <div className="split-pane" style={splitPaneStyle}>
      <div className="split-pane__left-pane" style={leftPaneStyle}>
        {leftPane}
      </div>
      <div className="split-pane__right-pane" style={rightPaneStyle}>
        {rightPane}
      </div>
    </div>
  );
}
