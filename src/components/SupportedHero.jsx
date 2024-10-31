import React from "react";

const SupportedHero = ({ title, subtitle, image }) => {
  return (
    <div className="flex flex-col items-start ">
      <h1 className="text-4xl font-bold mb-4">{title}</h1>
      <h2 className="text-xl text-gray-50 mb-6">{subtitle}</h2>
      {image && <img src={image} alt="Hero" className="mt-8 w-full h-auto" />}
    </div>
  );
};

export default SupportedHero;
