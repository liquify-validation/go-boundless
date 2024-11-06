import React from "react";

const LoadingSpinner = ({ size = 56, text = "Loading...", className = "" }) => {
  return (
    <div
      className={`absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50 z-50 ${className}`}
    >
      <svg
        className="animate-spin text-[#b3ff4a]"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        style={{ width: `${size}px`, height: `${size}px` }}
        role="status"
        aria-label="loading"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
        ></path>
      </svg>
      {text && <p className="text-gray-50 mt-3 text-sm">{text}</p>}
    </div>
  );
};

export default LoadingSpinner;
