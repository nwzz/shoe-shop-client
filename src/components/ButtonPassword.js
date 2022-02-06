import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";

const ButtonPassword = ({ control }) => {
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="flex justify-between form-control bg-white ">
      <Controller
        control={control}
        name="password"
        render={({ field }) => (
          <input
            {...field}
            placeholder="পাসওয়ার্ড"
            type={passwordShown ? "text" : "password"}
            className="border-0 p-0 outline-none flex-grow"
          />
        )}
      />
      {passwordShown ? (
        <FaRegEyeSlash onClick={togglePassword} size={24} />
      ) : (
        <FaEye onClick={togglePassword} size={24} />
      )}
    </div>
  );
};

export default ButtonPassword;
