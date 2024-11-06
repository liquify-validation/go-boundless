import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useCountries } from "../hooks/useCountries";

const DataPlanCard = ({
  planSize,
  sizeUnit,
  expiryDate,
  dataPurchased,
  countrySet,
}) => {
  const { data: countryData, isLoading: countryLoading } = useCountries();

  const renderCountryInfo = () => {
    if (countrySet === "WWW") {
      const numOfCountries = countryData ? countryData.length : 0;
      const displayCount =
        numOfCountries > 2 ? `${numOfCountries - 2} more...` : "";
      return (
        <Link
          to="/supported-countries"
          className="text-gray-50 mt-5 text-xs ml-4 mb-2 hover:underline"
        >
          {countryData && countryData.length > 2
            ? `${countryData[0].name}, ${countryData[1].name}, and ${displayCount}`
            : countryData
            ? countryData.map((country) => country.name).join(", ")
            : "Worldwide"}
        </Link>
      );
    } else {
      return <p className="text-gray-50 text-xs ml-4 mb-2">{countrySet}</p>;
    }
  };

  if (countryLoading) {
    return (
      <div className="w-full max-w-sm rounded-[25px] shadow-md overflow-hidden endpoint-card p-6 flex flex-col justify-center items-center">
        <p>Loading country information...</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm rounded-[25px] shadow-md overflow-hidden endpoint-card relative flex flex-col">
      <div className="pr-4 pl-4 flex justify-between items-center py-2">
        {/* Title */}
        <h3 className="text-xl font-bold mt-2">Data Plan</h3>
        {/* Country Info */}
        {renderCountryInfo()}
      </div>

      <div className="p-8 flex flex-col items-center">
        <div className="w-48 h-48 mb-4">
          <CircularProgressbar
            value={100}
            text={`${planSize} ${sizeUnit}`}
            styles={buildStyles({
              textSize: "1rem",
              pathColor: "#b3ff4a",
              textColor: "#fff",
              trailColor: "#fff",
            })}
          />
        </div>
      </div>

      <div className="border-t-2 mx-3 border-gray-300"></div>

      <div className="p-4">
        <p className="text-left text-gray-50 text-sm">
          Purchased on: {new Date(dataPurchased).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

DataPlanCard.propTypes = {
  planSize: PropTypes.string.isRequired,
  sizeUnit: PropTypes.string.isRequired,
  expiryDate: PropTypes.number.isRequired,
  dataPurchased: PropTypes.string.isRequired,
  countrySet: PropTypes.string.isRequired,
};

export default DataPlanCard;
