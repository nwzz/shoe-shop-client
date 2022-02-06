import React from "react";
import { useState } from "react";
import { usePostData } from "../../../hooks/dataApi";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../hooks/context";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import ButtonPassword from "../../../components/ButtonPassword";

const schema = yup.object().shape({
  fullName: yup.string().max(100).required("প্রয়োজন"),
  phoneNumber: yup.string().max(20).required("প্রয়োজন"),
  password: yup
    .string()
    .max(20)
    .required("প্রয়োজন")
    .min(8, "পাসওয়ার্ড খুব ছোট, ন্যূনতম ৮ অক্ষর হওয়া উচিত"),
});

const Signup = () => {
  const navigate = useNavigate();
  const value = useGlobalContext();
  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });

  const { fullName, phoneNumber, password } = errors;

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/register",
        formData: formData,
      });
      if (status === 201) {
        toast.success("Thanks for signing up.");
        value.setUser(data.accessToken);
        navigate("/dashboard");
      } else {
        toast.error(data.message);
      }
    } catch (exception) {
      if (exception.config && exception.config.url) {
        // network error
        toast.error(exception.message);
      } else {
        // other errors
        const msg = exception.response.data;
        msg.status === 400 && toast.error(msg.title);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mt-2">
        <div className="px-0 pt-2 pb-0 mb-4 flex flex-col">
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="পূর্ণ নাম"
              {...register("fullName")}
            />
            {fullName ? (
              <div className="text-danger">{fullName.message}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <input
              type="text"
              className="form-control"
              placeholder="দেশের কোড সহ ফোন নম্বর, উদাহরণ: 8801777203618"
              {...register("phoneNumber")}
            />

            {phoneNumber ? (
              <div className="text-danger">{phoneNumber.message}</div>
            ) : null}
          </div>
          <div className="mb-2">
            <ButtonPassword control={control} />
            {password ? (
              <div className="text-danger">{password.message}</div>
            ) : null}
          </div>

          <div className="flex flex-col items-center justify-center">
            <h6 className="text-sm text-center mb-2">
              "সম্মত হন এবং যোগ দিন" এ ক্লিক করার মাধ্যমে, আপনি সবহিসাব
              ব্যবহারকারী চুক্তি, গোপনীয়তা নীতি এবং কুকি নীতি মেনে চলতে সম্মত
              হবেন।
            </h6>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <button
          className="btn-orange w-full"
          type="submit"
          disabled={submitting}
        >
          সম্মত হন এবং যোগ দিন
        </button>
      </div>
    </form>
  );
};

export default Signup;
