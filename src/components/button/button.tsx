import css from "./button.module.scss";

interface ButtonProps {
  name: string;
  type: string;
  children: string;
  priority: string;
  onClick: (value: string) => void;
}

export const Button = ({
  name,
  type,
  children,
  priority,
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
          className={css.btn + " " + css[priority]}
          type={type}
          name={name}
        >
          {children}
        </button>
      )}
    </div>
  );
};
