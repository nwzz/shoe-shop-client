import React from "react";
import ErrorMessage from "./Error/ErrorMessage";

const Input = ({
  name,
  label,
  type = "text",
  register,
  errorMessage = "",
  isAutoFocus = false,
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <input
        type={type}
        className={
          errorMessage
            ? "form-control input-border-danger select-all"
            : "form-control  input-border-primary select-all"
        }
        {...register(name)}
        autoFocus={isAutoFocus}
      />
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export default Input;
