import React from "react";
import ReactDOM from "react-dom";

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Background overlay */}
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      {/* Modal container */}
      <div className="bg-gray-800 text-white rounded-lg shadow-lg z-50 w-full max-w-md mx-auto relative">
        {/* Close button */}
        <button
          className="absolute top-2 right-2 text-gray-200 hover:text-gray-400 text-2xl font-bold focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {/* Modal content */}
        <div className="p-6">{children}</div>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
