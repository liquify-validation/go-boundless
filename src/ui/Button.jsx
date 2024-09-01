// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";

const Button = ({
  textSize = "text-base", // Default text size 16px (1rem)
  borderRadius = "rounded-custom", // Default border radius
  bgColor = "bg-primary", // Default background color
  textColor = "text-dark",
  children,
}) => (
  <button
    className={`px-4 py-2 ${textSize} ${borderRadius} ${bgColor} ${textColor} border border-transparent`}
  >
    {children}
  </button>
);

Button.propTypes = {
  textSize: PropTypes.string,
  borderRadius: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default Button;
