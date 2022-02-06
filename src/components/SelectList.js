import React from "react";
import { useGetData } from "../hooks/dataApi";
import ErrorMessage from "./Error/ErrorMessage";

export const SelectFromDb = ({
  register,
  label,
  path,
  name,
  errorMessage,
  ...rest
}) => {
  const { data: lists } = useGetData(label, path);
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select className="form-control" {...register(name)} {...rest}>
        <option value="">-- Select --</option>
        {lists?.data.map((item) => (
          <option key={item.listId} value={item.listId}>
            {item.listName}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};

export const SelectFromOptions = ({
  register,
  options,
  label,
  name,
  errorMessage,
  ...rest
}) => {
  return (
    <div className="form-row w-full">
      <label>{label}</label>
      <select className="form-control" {...register(name)} {...rest}>
        <option value="">-- Select --</option>
        {options.map((value) => (
          <option key={value} value={value}>
            {value}
          </option>
        ))}
      </select>
      <ErrorMessage message={errorMessage} />
    </div>
  );
};
