import React from "react";
import { Link } from "react-router-dom";
import Signin from "./Signin";

const Hero = () => {
  return (
    <div className="container mx-auto flex flex-col md:flex-row items-center text-white">
      <div className="flex flex-col w-full lg:w-1/2 justify-center items-start py-10 px-6">
        <p className="uppercase tracking-loose">হাতের মধ্যে বাড়ির হিসাব</p>
        <h1 className="font-bold text-4xl my-4">সবহিসাব হোম</h1>
        <p className="leading-normal mb-4 text-md break-words lg:w-96">
          সময় এবং অর্থ সংরক্ষণ করুন. আপনার ভাড়া ব্যবসা পরিচালনা করুন এবং আপনার
          ব্যয় নিয়ন্ত্রণ করুন।
        </p>
        <div className="w-full lg:w-2/3">
          <Signin />
          <div className="grid place-content-center mt-2">
            <Link
              to="/forgot-password"
              className="px-4 py-2 text-white rounded-lg hover:text-orange tracking-wider cursor-pointer font-semibold text-sm"
            >
              পাসওয়ার্ড ভুলে গেছেন??
            </Link>
          </div>
        </div>
      </div>

      <div className="w-full lg:w-1/2 lg:py-6 text-center">
        <img
          className="object-cover object-center text-gray-900 w-full mx-auto"
          src="/images/hero.jpg"
          alt="SobHisab"
        />
      </div>
    </div>
  );
};

export default Hero;
