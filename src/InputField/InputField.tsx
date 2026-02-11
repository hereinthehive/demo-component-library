import React from "react";
import styles from "./InputField.module.scss";

export interface InputFieldProps {
  id: string;
  name: string;
  type?: "text" | "email" | "password" | "number" | "tel" | "url";
  value?: string;
  placeholder?: string;
  label?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
}

export const InputField: React.FC<InputFieldProps> = ({
  id,
  name,
  type = "text",
  value,
  placeholder,
  label,
  error,
  disabled = false,
  required = false,
  onChange,
  onBlur,
  onFocus,
  className,
}) => {
  return (
    <div className={`${styles.inputField} ${className || ""}`.trim()}>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
          {required && <span className={styles.required} aria-label="required">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
        className={styles.input}
      />
      {error && (
        <div id={`${id}-error`} role="alert" className={styles.error}>
          {error}
        </div>
      )}
    </div>
  );
};
