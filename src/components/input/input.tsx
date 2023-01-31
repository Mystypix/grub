import React from "react";
import clsx from "clsx";
import css from "./input.module.scss";

interface InputProps {
  disabled?: boolean;
  label?: React.ReactNode;
  name: string;
  onChange?: (s: React.ChangeEvent<HTMLInputElement>) => void; // will setState for a form everytime input is changed
  placeholder?: string; // hint for a user
  type?: string;
  value: string;
}

export const Input = ({
  disabled,
  label,
  name,
  onChange,
  placeholder,
  type = "text",
  value,
}: InputProps) => {
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    onChange && onChange(event);
  }

  return (
    <div className={css.wrapper}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={clsx(css.input, { [css.disabled]: disabled })}
        disabled={disabled}
        id={name}
        name={name}
        onChange={onChangeHandler}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};
