import React from "react";
import clsx from "clsx";
import css from "./input.module.scss";

interface InputProps {
  disabled?: boolean;
  label?: React.ReactNode;
  name: string;
  placeholder?: string;
  register: any; // TODO - type properly
  validation?: Record<string, unknown>;
  type?: string;
}

export const Input = ({
  disabled,
  label,
  name,
  placeholder,
  register,
  validation = {},
  type = "text",
}: InputProps) => (
  <div className={css.wrapper}>
    {label && (
      <label className={css.label} htmlFor={name}>
        {label}
      </label>
    )}
    <input
      {...register(name, { ...validation })}
      className={clsx(css.input, { [css.disabled]: disabled })}
      disabled={disabled}
      placeholder={placeholder}
      type={type}
    />
  </div>
);
