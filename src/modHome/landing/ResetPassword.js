import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "./components/Layout";
import { useForm } from "react-hook-form";
import { usePostData } from "../../hooks/dataApi";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  id: yup.string().max(50).required("প্রয়োজন"),
  otp: yup.string().max(6).min(6).required("প্রয়োজন"),
  newPassword: yup
    .string()
    .max(20)
    .required("প্রয়োজন")
    .min(8, "পাসওয়ার্ড খুব ছোট, ন্যূনতম ৮ অক্ষর হওয়া উচিত"),
  confirmPassword: yup
    .string()
    .max(20)
    .required("প্রয়োজন")
    .min(8, "পাসওয়ার্ড খুব ছোট, ন্যূনতম ৮ অক্ষর হওয়া উচিত")
    .oneOf([yup.ref("newPassword"), null], "পাসওয়ার্ড অবশ্যই মিলবে"),
});

export default function ResetPassword() {
  let { id } = useParams();

  const navigate = useNavigate();

  const [submitting, setSubmitting] = useState(false);
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      id: id,
      otp: "",
      newPassword: "",
      confirmPassword: "",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/resetpassword",
        formData: formData,
      });
      if (status === 200) {
        // action();
        reset();
        navigate("/");
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

  useEffect(() => {
    document.title = "Reset Password : Sobhisab";
  }, []);

  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="max-w-full col-span-1 md:col-span-2">
          <div className="sm:max-w-3xl px-3 pt-14 lg:pt-28">
            <div className="flex flex-col space-y-3">
              <span className="text-white text-4xl lg:text-4xl xl:text-4xl">
                নতুন পাসওয়ার্ড দিন
              </span>
            </div>

            <div className="pt-10 sm:mt-6">
              <div className="mt-0 text-white">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <input type="hidden" {...register("id")} />
                  <div className="px-0 pt-2 pb-0 mb-4 flex flex-col">
                    <div className="mb-2">
                      <input
                        autoFocus
                        type="text"
                        className="form-control"
                        placeholder="ওটিপি দিন"
                        {...register("otp")}
                      />
                      {errors.otp ? <div>{errors.otp.message}</div> : null}
                    </div>
                    <div className="mb-2">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="নতুন পাসওয়ার্ড"
                        {...register("newPassword")}
                      />
                      {errors.newPassword ? (
                        <div>{errors.newPassword.message}</div>
                      ) : null}
                    </div>
                    <div className="mb-2">
                      <input
                        type="password"
                        className="form-control"
                        placeholder="পাসওয়ার্ড নিশ্চিত করুন"
                        {...register("confirmPassword")}
                      />
                      {errors.confirmPassword ? (
                        <div>{errors.confirmPassword.message}</div>
                      ) : null}
                    </div>

                    <div className="flex items-center justify-center">
                      <button
                        className="w-full btn-orange"
                        type="submit"
                        disabled={submitting}
                      >
                        নতুন পাসওয়ার্ড সেট করুন
                      </button>
                    </div>
                  </div>
                </form>
              </div>
              <div className="flex items-center justify-center mt-2">
                <Link
                  to="/"
                  className="px-4 py-2 text-white rounded-lg hover:text-primary tracking-wider cursor-pointer font-semibold text-sm"
                >
                  শুরুতে
                </Link>
              </div>
            </div>

            <img
              className="mt-5 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center md:hidden"
              src="/images/core/login.jpg"
              alt="SobHisab"
            />
          </div>
        </div>
        <div className="hidden md:block lg:hidden md:col-span-3 pl-6">
          <div className="relative w-full">
            <img
              className="absolute inset-0 h-98 object-cover object-center"
              src="/images/core/login.jpg"
              alt="SobHisab"
            />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-3">
          <img
            className="h-98 m-auto"
            src="/images/core/login.jpg"
            alt="SobHisab"
          />
        </div>
      </div>
    </Layout>
  );
}
