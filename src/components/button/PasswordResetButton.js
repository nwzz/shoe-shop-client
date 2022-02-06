import React, { Fragment, useState } from "react";
import { RiLockPasswordFill } from "react-icons/ri";
import { usePostData } from "../../hooks/dataApi";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Input from "../Input";

const schema = yup.object({
  userId: yup.string().max(50),
  password: yup
    .string()
    .max(20)
    .required("প্রয়োজন")
    .min(8, "পাসওয়ার্ড খুব ছোট, ন্যূনতম ৮ অক্ষর হওয়া উচিত"),
});

const PasswordResetButton = ({ defaultValues, path }) => {
  const { mutateAsync } = usePostData();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: defaultValues,
    resolver: yupResolver(schema),
  });
  const { password } = errors;

  const onSubmit = async (formData) => {
    try {
      const { status } = await mutateAsync({
        path: path,
        formData: formData,
      });
      if (status === 204) {
        toast.success("Successfully Reseted!");
        reset();
      }
    } catch (error) {
      if (error.response) {
        toast.error("Response : " + error.response.data);
      } else if (error.request) {
        toast.error("Request : " + error.message);
      } else {
        toast.error("Error :", error.message);
      }
    } finally {
      closeModal();
    }
  };

  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className="btn-success"
        onClick={() => {
          openModal();
        }}
      >
        <RiLockPasswordFill />
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-gray-900 bg-opacity-70" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-12 my-8 overflow-hidden text-left align-middle transition-all transform bg-lighter shadow-xl rounded-2xl">
                <div className="flex flex-col items-center justify-center">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <input type="hidden" {...register("userId")} />
                    <div className="form-col">
                      <Input
                        name="password"
                        label="পাসওয়ার্ড রিসেট করতে চান?"
                        type="password"
                        register={register}
                        errorMessage={password?.message}
                        isAutoFocus={true}
                      />
                    </div>
                    <div className="flex space-x-2 mt-2">
                      <button className="btn-danger">হ্যাঁ</button>
                      <button className="btn-success" onClick={closeModal}>
                        না
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PasswordResetButton;
