import React from "react";

const DataPlanCard = ({ planSize, sizeUnit, expiryDate, dataPurchased }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center relative">
      <div className="absolute top-4 right-4">
        <h3 className="text-xl font-bold">Data Plan</h3>
      </div>

      <div className="w-32 h-32 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
        {planSize} {sizeUnit}
      </div>

      <p className="mt-2 text-gray-600">
        Expires in {expiryDate} {expiryDate > 1 ? "days" : "day"}
      </p>

      <div className="absolute bottom-4 left-4">
        <p className="text-gray-600">Data Purchased</p>
      </div>
    </div>
  );
};

export default DataPlanCard;
