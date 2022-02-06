import React, { Fragment, useState } from "react";
import { useDeleteData } from "../../hooks/dataApi";
import { Dialog, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import { MdRestartAlt, MdSkipPrevious } from "react-icons/md";
import { useQueryClient } from "react-query";

const ResetButton = ({ label, path, question, reset }) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useDeleteData();

  const onSubmit = async () => {
    try {
      const { status } = await mutateAsync({ path });
      if (status === 204) {
        toast.success("সফল ভাবে সম্পন্ন হয়েছে!");
        queryClient.invalidateQueries("monthBooksOpenMonth", { exact: false });
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
        className="btn bg-darker "
        onClick={() => {
          openModal();
        }}
      >
        <div className="flex space-x-2 items-center justify-center">
          {reset === true ? (
            <MdRestartAlt size={30} className="text-white" />
          ) : (
            <MdSkipPrevious size={30} className="text-white" />
          )}

          <span className="text-xl text-white">{label}</span>
        </div>
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
                  <h3 className="mb-5 text-xl text-gray-800  font-medium">
                    {question}
                  </h3>
                  <div className="flex space-x-2">
                    <button className="btn-danger" onClick={onSubmit}>
                      হ্যাঁ
                    </button>
                    <button className="btn-success" onClick={closeModal}>
                      না
                    </button>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ResetButton;
