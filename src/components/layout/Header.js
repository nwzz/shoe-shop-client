import React from "react";
import { Link } from "react-router-dom";
import MobileSidebar from "./MobileSidebar";
import MenuModules from "./MenuModules";

const Header = () => {
  return (
    <div className="flex justify-between lg:justify-end shadow-lg px-4 bg-lighter text-darker">
      <div className="block lg:hidden">
        <Link to="/" className="grid place-content-center shadow-lg h-14">
          <img className="h-8" src="/images/logo.png" alt="logo" />
        </Link>
      </div>
      <div className="grid place-content-center h-14">
        <div className="flex space-x-3">
          <div className="block lg:hidden">
            <MobileSidebar />
          </div>
          <MenuModules />
        </div>
      </div>
    </div>
  );
};
export default Header;
