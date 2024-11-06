import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const UsedDataCard = ({
  availableBalance,
  totalData,
  sizeUnit,
  expiryDate,
  daysUntilExpiry,
}) => {
  const percentageAvailable =
    totalData > 0 ? (availableBalance / totalData) * 100 : 0;

  const formatDataValue = (value) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
  };

  return (
    <div className="w-full max-w-sm rounded-[25px] shadow-md overflow-hidden endpoint-card relative flex flex-col">
      {/* Title and Positioning */}
      <div className="pr-4 pl-4 flex justify-between items-center py-2">
        <h3 className="text-xl font-bold mt-2">Data Usage</h3>
      </div>

      {/* Circular Progress */}
      <div className="p-8 flex flex-col items-center">
        <div className="w-48 h-48 mb-4">
          <CircularProgressbar
            value={percentageAvailable}
            text={`${formatDataValue(availableBalance)} ${sizeUnit}`}
            styles={buildStyles({
              textSize: "1rem",
              pathColor: "#b3ff4a",
              textColor: "#fff",
              trailColor: "#fff",
            })}
          />
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 mx-3 border-gray-300"></div>

      {/* Expiry Information */}
      <div className="p-4 w-full flex justify-between">
        <p className="text-left text-gray-50 text-sm">
          Expires on: {new Date(expiryDate).toLocaleDateString()}
        </p>
        <p className="text-right text-red-500 font-bold text-sm">
          Expires in: {daysUntilExpiry} days
        </p>
      </div>
    </div>
  );
};

export default UsedDataCard;
