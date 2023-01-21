import css from "./button.module.scss";

interface ButtonProps {
  children?: string;
  disabled?: boolean;
  name: string;
  onClick: (value: string) => void;
  type: string;
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
  const onClickHandler = (e: any) => {
    onClick(e);
  };
  return (
    <div className={css.wrapper}>
      {children && (
        <button
          className={css.btn + " " + css[variant]}
          disabled={disabled}
          name={name}
          onClick={onClickHandler}
          type={type}
        >
          {children}
        </button>
      )}
    </div>
  );
};
