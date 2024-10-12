// components/HowItWorksCards.jsx
import React from "react";

const HowItWorksCards = ({ data }) => {
  return (
    <div className="px-2 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl md:px-24 lg:px-2 lg:py-20">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <img src={item.icon} alt="Tick Icon" className="w-8 h-8" />{" "}
            {/* Render the icon as an image */}
            <span className="text-md">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorksCards;
