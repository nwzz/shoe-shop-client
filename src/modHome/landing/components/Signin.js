import React from "react";
import { useState } from "react";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonPassword from "../../../components/ButtonPassword";
import { useGlobalContext } from "../../../hooks/context";

const schema = yup.object().shape({
  phoneNumber: yup.string().max(20).required("প্রয়োজন"),
  password: yup
    .string()
    .max(20)
    .required("প্রয়োজন")
    .min(8, "পাসওয়ার্ড খুব ছোট, ন্যূনতম ৮ অক্ষর হওয়া উচিত"),
});

const Signin = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();
  const value = useGlobalContext();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  let { from } = location.state || { from: { pathname: "/dashboard" } };

  const { phoneNumber, password } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/Login",
        formData: formData,
      });

      if (status === 200 && data.isSuccess === true) {
        reset();
        value.setUser(data.accessToken);
        navigate(from);
      } else {
        toast.error(data.message);
      }
    } catch (exception) {
      if (exception.config && exception.config.url) {
        // network error
        toast.error(exception.message);
      } else {
        // other errors
        exception.response.data.status === 400 &&
          toast.error(exception.response.data.title);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-0 text-white">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="দেশের কোড সহ ফোন নম্বর, উদাহরণ: ৮৮০১৭৭৭২০৩৬১৮ "
            {...register("phoneNumber")}
          />
          {phoneNumber && (
            <div className="text-danger">{phoneNumber.message}</div>
          )}
        </div>
        <div className="mb-2">
          <ButtonPassword control={control} />
          {password && <div className="text-danger">{password.message}</div>}
        </div>
        <div className="mt-3 flex items-center justify-between">
          <button
            className="w-full btn-orange"
            type="submit"
            disabled={submitting}
          >
            লগ ইন &#10148;
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signin;
