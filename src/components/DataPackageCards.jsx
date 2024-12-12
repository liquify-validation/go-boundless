import React, { useState } from "react";
import { Link } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import { GoBoundlessLogo, WifiIcon, DeliveryIcon, ExpiryIcon } from "../assets";
import { useCountries } from "../hooks/useCountries";
import { useDevices } from "../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DataPackageCards = ({
  id,
  name,
  countries,
  price,
  size,
  sizeUnit,
  expiry,
  expiryUnit,
}) => {
  const navigate = useNavigate();
  const { authData } = useAuth();
  const handleActivatePlan = () => {
    const packageData = {
      id,
      name,
      price,
      size,
      sizeUnit,
      expiry,
      expiryUnit,
    };

    if (authData.userAccessToken) {
      navigate("/checkout", { state: { packageData } });
    } else {
      navigate("/login", {
        state: {
          redirectTo: "/checkout",
          packageData,
        },
      });
    }
  };
  const {
    data: countryData,
    error: countryError,
    isLoading: countryLoading,
  } = useCountries();
  const {
    data: deviceData,
    error: deviceError,
    isLoading: deviceLoading,
  } = useDevices();

  const numOfCountries = countryData ? countryData.length : 0;
  const numOfDevices = deviceData ? deviceData.length : 0;

  return (
    <div className="w-full max-w-sm rounded-[25px] shadow-md overflow-hidden endpoint-card">
      {/* Top section (1/5 of the card) */}
      <div
        className="bg-white pr-4 pl-1 flex justify-between items-center"
        style={{ height: "25%" }}
      >
        {/* Icon and country */}
        <div className="flex flex-col items-start mb-0">
          <div>
            <img src={GoBoundlessLogo} alt="Country Icon" className="" />
          </div>
          {/* Link to Supported Countries */}
          <Link
            to="/supported-countries"
            className="text-gray-600 text-xs ml-4 mb-2"
          >
            {countries} and {numOfCountries - 2} more....
          </Link>
        </div>
        {/* Price */}
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{price}</p>
        </div>
      </div>

      <div className="p-6 text-center space-y-2">
        <p className="text-3xl font-bold mb-8 mt-6">
          {size} {sizeUnit}
        </p>

        <div className="flex items-center justify-center space-x-2">
          <img src={ExpiryIcon} alt="Expiry Icon" className="w-4 h-4" />
          <span className="text-gray-50 text-sm">
            Expires in {expiry} {expiryUnit}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <img src={DeliveryIcon} alt="Delivery Icon" className="w-4 h-4" />
          <span className="text-gray-50 text-sm">
            Instant delivery via email
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <img src={WifiIcon} alt="Wifi Icon" className="w-4 h-4" />
          <span className="text-gray-50 text-sm">5G where available</span>
        </div>

        <div className="pt-8 pb-6">
          <CustomButton
            text="Activate Plan"
            onClick={handleActivatePlan}
            px="px-10"
          />
        </div>
        <div className="pb-4 text-sm">
          <Link to="/supported-devices" className="text-gray-300 text-xs">
            Supported by {numOfDevices} Devices
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DataPackageCards;
