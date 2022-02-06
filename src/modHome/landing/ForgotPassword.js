import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { usePostData } from "../../hooks/dataApi";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object({
  phoneNumber: yup.string().max(20).required("প্রয়োজন"),
});

export default function ForgotPassword() {
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
      // phoneNumber: "8801765263343",
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formData) => {
    setSubmitting(true);
    try {
      const { status, data } = await mutateAsync({
        path: "/auth/forgetpassword",
        formData: formData,
      });
      if (status === 200 && data.isSuccess === true) {
        // action();
        reset();
        navigate("/reset-password/" + data.accessToken);
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
    <Layout>
      <div className="container mx-auto flex flex-col md:flex-row items-center text-white">
        <div className="flex flex-col w-full lg:w-1/2 justify-center items-start py-10 px-6">
          <p className="uppercase tracking-loose">হাতের মধ্যে বাড়ির হিসাব</p>
          <h1 className="font-bold text-4xl my-4">পাসওয়ার্ড ভুলে গেছেন?</h1>
          <p className="leading-normal mb-4 text-md">
            দুটি ধাপে দ্রুত পাসওয়ার্ড রিসেট করুন
          </p>
          <div className="w-full lg:w-2/3">
            <div className="mt-0 text-white">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-2">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="দেশের কোড সহ ফোন নম্বর, উদাহরণ: ৮৮০১৭৭৭২০৩৬১৮ "
                    {...register("phoneNumber")}
                  />
                  {errors.phoneNumber && (
                    <div className="text-danger">
                      {errors.phoneNumber.message}
                    </div>
                  )}
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full btn-orange"
                    type="submit"
                    disabled={submitting}
                  >
                    পাসওয়ার্ড রিসেট
                  </button>
                </div>
              </form>
            </div>
            <div className="grid place-content-center mt-2">
              <Link
                to="/"
                className="px-4 py-2 text-white rounded-lg hover:text-orange tracking-wider cursor-pointer font-semibold text-sm"
              >
                শুরুতে
              </Link>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/2 lg:py-6 text-center">
          <img
            className="object-cover object-center text-gray-900 w-full mx-auto"
            src="/images/forgot.jpg"
            alt="SobHisab"
          />
        </div>
      </div>
    </Layout>
  );
}
