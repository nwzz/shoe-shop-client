import React from "react";
import { FaSearch } from "react-icons/fa";

const SearchHeader = ({ action }) => {
  return (
    <>
      <div className="flex space-x-2 items-center p-1 border border-gray-300 text-gray-900 focus:border-none rounded-t-md focus:outline-none my-2">
        <input
          type="search"
          className="w-full outline-none px-2 py-2"
          placeholder="ফ্লাট / রুম অনুসন্ধান"
          onChange={(event) => action(event.target.value)}
        />
        <div className="p-1">
          <FaSearch size={30} />
        </div>
      </div>
    </>
  );
};

export default SearchHeader;
