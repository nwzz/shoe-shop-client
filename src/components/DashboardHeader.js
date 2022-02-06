import React from "react";

const DashboardHeader = ({ title }) => {
  return (
    <div className="flex justify-between px-0 pb-2">
      <h1 className="text-2xl font-medium">{title}</h1>
    </div>
  );
};

export default DashboardHeader;
