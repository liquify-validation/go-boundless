import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ link }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (link) {
      window.location.href = link;
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="top-4 left-4">
      <span
        onClick={handleBackClick}
        className="cursor-pointer underline hover:no-underline font-size-[50px] text-gray-50"
      >
        &lt; Back
      </span>
    </div>
  );
};

export default Back;
