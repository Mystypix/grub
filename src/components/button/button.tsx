import css from "./button.module.scss";

interface ButtonProps {
  children: string;
  disabled?: boolean;
  name: string;
  onClick: () => void;
  type: "submit" | "reset" | "button" | undefined;
  variant: string;
}

export const Button = ({
  children,
  disabled,
  name,
  onClick,
  type,
  variant,
}: ButtonProps) => {
  return (
    <button
      className={css.btn + " " + css[variant]}
      disabled={disabled}
      name={name}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};
