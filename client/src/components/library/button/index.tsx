import { Spinner } from "../spinner/index";
import "./Button.css";

type ButtonWithSpinnerProps = {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
  disabled?: boolean;
  [propName: string]: any;
};

export function ButtonWithSpinner({
  children,
  isLoading = false,
  className = "",
  disabled = false,
  ...restProps
}: ButtonWithSpinnerProps) {
  return (
    <button
      className={`btn ${disabled ? "btn--disabled" : ""} ${className}`}
      disabled={disabled}
      {...restProps}
    >
      {children}
      {isLoading && <Spinner />}
    </button>
  );
}
