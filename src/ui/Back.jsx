import React from "react";
import { useNavigate } from "react-router-dom";

const Back = ({ link }) => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    if (link) {
      navigate(link);
    } else {
      navigate(-1);
    }
  };

  return (
    <div className="top-4 left-4">
      <button
        onClick={handleBackClick}
        className="cursor-pointer underline hover:no-underline font-size-[50px] text-gray-50"
        aria-label="Go Back"
      >
        &lt; Back
      </button>
    </div>
  );
};

export default Back;
