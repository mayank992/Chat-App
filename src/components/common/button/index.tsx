import { Spinner } from "../spinner/index";
import "./Button.css";

type ButtonWithSpinnerProps = {
  children: React.ReactNode;
  isLoading: boolean;
  className?: string;
  [propName: string]: any;
};

export function ButtonWithSpinner({
  children,
  isLoading,
  className,
  ...restProps
}: ButtonWithSpinnerProps) {
  return (
    <button className={`btn ${className}`} {...restProps}>
      {children}
      {isLoading && <Spinner />}
    </button>
  );
}
