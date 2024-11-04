import React from "react";

const TopUpCard = ({ onTopUp }) => {
  return (
    <div
      className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center cursor-pointer relative"
      onClick={onTopUp}
    >
      {/* Top Left Title */}
      <div className="absolute top-4 left-4">
        <h3 className="text-xl font-bold">Top Up</h3>
      </div>

      {/* Plus Icon in Circle */}
      <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center text-6xl text-primary">
        +
      </div>

      {/* Add Data Package */}
      <div className="mt-4">
        <p className="text-gray-600">Add Data Package</p>
      </div>
    </div>
  );
};

export default TopUpCard;
