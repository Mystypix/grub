import React, { SyntheticEvent } from "react";
import css from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type: string;
  validator?: (func: Object) => boolean;
  value: string;
}

export const Input = ({
  label,
  name,
  onChange,
  placeholder,
  type,
  validator,
  value,
}: InputProps) => {
  const onChangeHandler = (e: SyntheticEvent) => {
    if (validator && !validator(e)) return; // TODO do something when it is not valid
    onChange(e.currentTarget.value); // BUG value property does not exist on currentTarget in ts. but it is there in browser :)
  };
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
        onChange={onChangeHandler}
        placeholder={placeholder}
        type={type}
        value={value}
      />
    </div>
  );
};
