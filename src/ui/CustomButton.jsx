import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const CustomButton = ({
  textSize = "text-base",
  borderRadius = "rounded-full",
  bgColor = "bg-primary",
  textColor = "text-black",
  px = "px-4",
  py = "py-2",
  text,
  link,
  onClick,
  disabled = false,
  type = "button",
  fullWidth = false,
}) => {
  const widthClass = fullWidth ? "w-full" : px;
  const baseClasses = `${widthClass} ${py} ${px} ${textSize} ${borderRadius} ${bgColor} ${textColor} border border-transparent`;

  if (onClick || type === "submit") {
    return (
      <button
        onClick={onClick}
        className={baseClasses}
        disabled={disabled}
        type={type}
      >
        {text}
      </button>
    );
  }

  if (link) {
    return (
      <Link to={link} className={baseClasses}>
        {text}
      </Link>
    );
  }

  return (
    <button className={baseClasses} disabled={disabled}>
      {text}
    </button>
  );
};

CustomButton.propTypes = {
  textSize: PropTypes.string,
  borderRadius: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  px: PropTypes.string,
  py: PropTypes.string,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
  fullWidth: PropTypes.bool,
};

export default CustomButton;
