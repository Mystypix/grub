import css from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void; // TODO wanna know more about the syntax
  type: string;
}

export const Input = ({
  label,
  name,
  placeholder,
  value, // TODO what about some validation - for example password validation ?
  onChange,
  type,
}: InputProps) => {
  const onChangeHandler = (e: any) => {
    onChange(e.target.value);
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
        placeholder={placeholder}
        onChange={onChangeHandler}
        value={value}
        type={type}
      />
    </div>
  );
};
