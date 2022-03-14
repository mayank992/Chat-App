import "./styles.css";

type SpinnerProps = {
  size?: "small" | "medium" | "large";
};

export function Spinner({ size = "small" }: SpinnerProps): React.ReactElement {
  return <div className={`spinner spinner--${size}`}></div>;
}

export function FullPageSpinner({ size }: SpinnerProps) {
  return (
    <div className="full-page">
      <Spinner size={size} />
    </div>
  );
}
