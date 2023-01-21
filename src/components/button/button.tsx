import css from "./button.module.scss";

interface ButtonProps {
  name: string;
  type: string;
  children?: string;
  variant: string;
  disabled?: boolean;
  onClick: (value: string) => void;
}

export const Button = ({
  name,
  type,
  children,
  variant,
  disabled,
  onClick,
}: ButtonProps) => {
  const onClickHandler = (e: any) => {
    onClick(e);
  };
  return (
    <div className={css.wrapper}>
      {children && (
        <button
          onClick={onClickHandler}
          className={css.btn + " " + css[variant]}
          type={type}
          name={name}
          disabled={disabled}
        >
          {children}
        </button>
      )}
    </div>
  );
};
