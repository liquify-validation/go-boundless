import React from "react";

const CountryCard = ({ countryName, countryIcon, price, link }) => {
  return (
    <div className="p-1 overflow-hidden border border-gray-300 rounded-lg shadow-md transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg endpoint-card">
      <div className="p-4">
        <div className="flex items-center mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full mr-4 ring-2 ring-gray-500 ring-offset-1">
            <img
              src={countryIcon}
              alt={`${countryName} Icon`}
              className="w-8 h-8 rounded-full"
            />
          </div>
          <div className=" align-left">
            <p className="subtitle">eSim</p>
            <h2 className="text-xl font-semibold">{countryName}</h2>
          </div>
        </div>
        <div className="flex justify-between items-center mb-2 pt-4">
          <p className="text-gray-50 font-weight-400 text-base">
            Starting from
          </p>
          <h3 className="text-gray-50 font-weight-400 text-base">{price}</h3>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
