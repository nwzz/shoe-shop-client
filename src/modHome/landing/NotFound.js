import React from "react";
import { Link } from "react-router-dom";
import Layout from "./components/Layout";
import Signin from "./components/Signin";

export default function NotFound() {
  return (
    <Layout>
      <div className="grid grid-cols-1 md:grid-cols-5">
        <div className="max-w-full col-span-1 md:col-span-2">
          <div className="sm:max-w-3xl px-3 pt-14 lg:pt-28">
            <div className="flex flex-col space-y-3">
              <span className="text-white text-3xl lg:text-4xl xl:text-4xl">
                We couldn't Find the page at the moment.
              </span>
              <span className="text-white sm:text-sm lg:text-lg">
                404 Error, Don't worry you are safe now. Try to login
              </span>
            </div>

            <div className="pt-10 sm:mt-6">
              <Signin />
              <div className="flex items-center justify-center mt-2">
                <Link
                  to="/forgot-password"
                  className="px-4 py-2 text-white rounded-lg hover:text-orange tracking-wider cursor-pointer font-semibold text-sm"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <img
              className="mt-5 rounded-lg shadow-xl sm:mt-8 sm:h-64 sm:w-full sm:object-cover object-center md:hidden"
              src="/images/error404.jpg"
              alt="SobHisab"
            />
          </div>
        </div>
        <div className="hidden md:block lg:hidden md:col-span-3 pl-6">
          <div className="relative w-full">
            <img
              className="absolute inset-0 h-98 object-cover object-center"
              src="/images/error404.jpg"
              alt="SobHisab"
            />
          </div>
        </div>
        <div className="hidden lg:block lg:col-span-3">
          <img
            className="h-98 m-auto"
            src="/images/error404.jpg"
            alt="SobHisab"
          />
        </div>
      </div>
    </Layout>
  );
}
