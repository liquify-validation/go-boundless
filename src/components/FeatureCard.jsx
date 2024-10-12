// components/FeatureCard.js
import React from "react";

const FeatureCard = ({ icon: Icon, title, details }) => {
  return (
    <div className="flex flex-col items-center p-4">
      <img src={Icon} alt="Contact Icon" className="w-32 h-32" />
      <h3 className="my-3 text-3xl font-semibold text-center">{title}</h3>
      <div className="space-y-1 leading-tight text-center">
        {details.map((detail, index) => (
          <p className="mt-4" key={index}>
            {detail}
          </p>
        ))}
      </div>
    </div>
  );
};

export default FeatureCard;
