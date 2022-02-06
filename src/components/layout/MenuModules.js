import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { Link } from "react-router-dom";
import ButtonExit from "./ButtonExit";

const MenuModules = () => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button className="text-darker transform duration-500 hover:-translate-y-1">
          <FiSettings size={30} />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 w-60 p-2 mt-2 origin-top-right bg-dark divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1 ">
            <Menu.Item>
              <Link
                to="/profile"
                className="hover:bg-darker hover:text-white text-gray-400 group flex rounded-md items-center w-full px-2 py-2 text-sm"
              >
                <FaUserCircle className="w-5 h-5 mr-2" />
                প্রোফাইল
              </Link>
            </Menu.Item>
          </div>
          <div className="px-1 py-1">
            <Menu.Item>
              <ButtonExit />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default MenuModules;
