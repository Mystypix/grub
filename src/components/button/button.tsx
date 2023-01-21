import React, { SyntheticEvent } from "react";
import css from "./button.module.scss";

interface ButtonProps {
  children?: string;
  disabled?: boolean;
  name: string;
  onClick: (value: SyntheticEvent<HTMLButtonElement>) => void;
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
  const onClickHandler = (e: SyntheticEvent<HTMLButtonElement>) => {
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
