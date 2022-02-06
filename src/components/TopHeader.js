import React from "react";
import { useNavigate } from "react-router";
import { FaPlusCircle } from "react-icons/fa";
import { BsFillXCircleFill } from "react-icons/bs";

const TopHeader = ({ title, btnSave, path = "" }) => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between px-0 pb-2">
      <h1 className="text-xl lg:text-2xl font-bold lg:text-semibold">
        {title}
      </h1>
      {btnSave ? (
        <button className="btn-header text-dark" onClick={() => navigate(path)}>
          <FaPlusCircle size={36} />
        </button>
      ) : (
        <button
          className="btn-header text-danger"
          onClick={() => navigate(path)}
        >
          <BsFillXCircleFill size={36} />
        </button>
      )}
    </div>
  );
};

export default TopHeader;
