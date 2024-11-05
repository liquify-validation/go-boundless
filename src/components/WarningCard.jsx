import React from "react";
import { Link } from "react-router-dom";
import { WarningIcon } from "../assets";
import CustomButton from "../ui/CustomButton";

const WarningCard = ({ title, message, buttonText, buttonLink }) => {
  return (
    <div className="flex flex-col items-center justify-center endpoint-card max-w-2xl mx-auto rounded-xl shadow-lg ">
      <img src={WarningIcon} alt="Warning" className="w-16 h-16 mb-4 mt-8" />
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      <p className="mb-16">{message}</p>
      <div className="pb-8 pt-8">
        {buttonText && buttonLink && (
          <Link to={buttonLink}>
            <CustomButton
              text={buttonText}
              link={buttonLink}
              fullWidth={false}
            />
          </Link>
        )}
      </div>
    </div>
  );
};

export default WarningCard;
