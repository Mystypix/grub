import React from "react";
import css from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
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
  return (
    <div className={css.wrapper}>
      {label && (
        <label className={css.label} htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className={css.input}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};
