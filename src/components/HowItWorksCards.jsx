import React from "react";

const HowItWorksCards = ({ data }) => {
  return (
    <div className=" md:py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-2xl g:py-20">
      <ul className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data.map((item, index) => (
          <li key={index} className="flex items-center space-x-2">
            <img src={item.icon} alt="Tick Icon" className="w-8 h-8" />{" "}
            <span className="text-md">{item.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HowItWorksCards;
