import React from "react";

const UsedDataCard = ({ usedData, totalData, expiryDate, daysUntilExpiry }) => {
  const percentageUsed = (usedData / totalData) * 100;

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col items-center relative">
      {/* Progress Circle */}
      <div className="relative">
        <div className="w-32 h-32 rounded-full border-4 border-gray-200 flex items-center justify-center">
          <div
            className="absolute top-0 left-0 w-32 h-32 rounded-full"
            style={{
              clipPath: "inset(0% 0% 0% 50%)",
              backgroundColor: "#4F46E5",
              transform: `rotate(${(percentageUsed / 100) * 360}deg)`,
            }}
          ></div>
          <div className="text-center text-xl font-bold">
            {usedData} / {totalData} GB
          </div>
        </div>
      </div>

      {/* Bottom Left: Expiry Date */}
      <div className="absolute bottom-4 left-4">
        <p className="text-gray-600">
          Expires on {new Date(expiryDate).toLocaleDateString()}
        </p>
      </div>

      {/* Bottom Right: Days Until Expiry */}
      <div className="absolute bottom-4 right-4">
        <p className="text-gray-600">
          Expires in {daysUntilExpiry} {daysUntilExpiry > 1 ? "days" : "day"}
        </p>
      </div>
    </div>
  );
};

export default UsedDataCard;
