import React from "react";
import PropTypes from "prop-types";

const CustomButton = ({
  textSize = "text-base", // Tailwind text size utility
  borderRadius = "rounded-lg", // Use Tailwind's rounded-lg for 15px equivalent
  bgColor = "bg-primary", // Tailwind bg color class
  textColor = "text-black", // Tailwind text color class
  text,
  link,
}) => {
  const baseClasses = `px-4 py-2 ${textSize} ${borderRadius} ${bgColor} ${textColor} border border-transparent`;

  if (link) {
    return (
      <a href={link} className={baseClasses}>
        {text}
      </a>
    );
  }

  return <button className={baseClasses}>{text}</button>;
};

CustomButton.propTypes = {
  textSize: PropTypes.string,
  borderRadius: PropTypes.string,
  bgColor: PropTypes.string,
  textColor: PropTypes.string,
  text: PropTypes.string.isRequired,
  link: PropTypes.string,
};

export default CustomButton;
