import React from "react";

const LoadingSpinner = ({ size = 56, text = "Loading...", className = "" }) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 ${className}`}
    >
      <div
        className="animate-spin inline-block border-[6px] border-current border-t-transparent text-[#b3ff4a] rounded-full"
        role="status"
        aria-label="loading"
        style={{ width: `${size}px`, height: `${size}px` }}
      ></div>
      {text && <p className="text-gray-50 mt-3 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
