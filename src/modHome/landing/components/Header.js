import React from "react";
import { Link } from "react-router-dom";
import Modal from "../../../components/Modal";
import Signup from "./Signup";

const Header = () => {
  return (
    <header className="">
      <nav className="max-w-full px-2 sm:px-8">
        <div className="flex justify-between">
          <Link to="/" className="flex items-center py-2">
            <img className="h-10" src="/images/logo.png" alt="logo" />
          </Link>

          <div className="flex items-center space-x-1">
            <Modal
              title="অ্যাকাউন্ট তৈরি করুন"
              buttonLabel="সাইন আপ"
              children={<Signup />}
            />
          </div>
        </div>
      </nav>
    </header>
  );
};
export default Header;
