import css from "./input.module.scss";

interface InputProps {
  label?: string;
  name: string;
  onChange: (value: string) => void;
  placeholder?: string;
  value: string;
}

export const Input = ({
  label,
  name,
  onChange,
  placeholder,
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
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        value={value}
      />
    </div>
  );
};
