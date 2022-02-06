import React from "react";
import { MdBook } from "react-icons/md";
import { useNavigate } from "react-router";

const LedgerButton = ({ path }) => {
  const navigate = useNavigate();
  return (
    <button className="btn-sky" onClick={() => navigate(path)}>
      <MdBook size={16} />
    </button>
  );
};

export default LedgerButton;
