import React from "react";
import css from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  onChange: (s: string) => void; // will setState for a form everytime input is changed
  placeholder: string; // hint for a user
  type: string;
  value: string;
}

export const Input = ({
  label,
  name,
  onChange,
  placeholder,
  type,
  value,
}: InputProps) => {
  function onChangeHandler(event: React.ChangeEvent<HTMLInputElement>) {
    onChange(event.currentTarget.value);
  }
  return (
    <div className={css.wrapper}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={css.input}
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
