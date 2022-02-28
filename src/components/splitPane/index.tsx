import "./splitPane.css";

type SplitPaneProps = {
  minSize: string;
  pane1: React.ReactNode;
  pane2: React.ReactNode;
  pane1Style?: { [key: string]: string };
  pane2Style?: { [key: string]: string };
  splitDirection: string;
};

export function SplitPane({
  minSize,
  pane1,
  pane2,
  pane1Style,
  pane2Style,
  splitDirection,
}: SplitPaneProps): React.ReactElement {
  const splitPaneStyle: { [property: string]: string } = {
    flexDirection: splitDirection === "horizontal" ? "row" : "column",
  };

  const splitPane1Style = {
    [splitDirection === "horizontal" ? "width" : "height"]: minSize,
    ...pane1Style,
  };

  const splitPane2Style = pane2Style;

  return (
    <div className="split-pane" style={splitPaneStyle}>
      <div className="split-pane__pane1" style={splitPane1Style}>
        {pane1}
      </div>
      <div className="split-pane__pane2" style={splitPane2Style}>
        {pane2}
      </div>
    </div>
  );
}
