import clsx from "clsx";
import css from "./button.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
  variant: "primary" | "secondary" | "general";
}

export const Button = ({
  children,
  disabled,
  onClick,
  type,
  variant,
}: ButtonProps) => {
  return (
    <button
      className={clsx(css.btn, css[variant])}
      disabled={disabled}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};

Button.defaultProps = {
  type: "submit",
  variant: "general",
};
