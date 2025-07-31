import { Link } from "react-router-dom";
import CustomButton from "../ui/CustomButton";
import { GoBoundlessLogo, WifiIcon, DeliveryIcon, ExpiryIcon } from "../assets";
import { useDevices } from "../hooks/useDevices";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const DataPackageCards = ({
  id,
  plan,
  sizeLabel,
  countriesPreview,
  includedCountries,
  price,
  size,
  sizeUnit,
  expiry,
  expiryUnit,
}) => {
  const navigate = useNavigate();
  const { authData } = useAuth();

  const displayPlan = plan
    .replace(/\blite\b/gi, "")
    .replace(/\s{2,}/g, " ")
    .trim();

  const handleActivatePlan = () => {
    const packageData = {
      id,
      name: `${displayPlan} - ${sizeLabel}`,
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
        state: { redirectTo: "/checkout", packageData },
      });
    }
  };

  const {
    data: deviceData,
    error: deviceError,
    isLoading: deviceLoading,
  } = useDevices();

  const numOfCountries = includedCountries.length;
  const numOfDevices = deviceData ? deviceData.length : 0;

  return (
    <div className="w-full max-w-sm rounded-[25px] shadow-md overflow-hidden endpoint-card">
      <div className="bg-white px-4 py-2 flex justify-between items-center">
        <img
          src={GoBoundlessLogo}
          alt="Go Boundless"
          className="w-24 h-24 flex-shrink-0"
        />

        <p className="text-2xl font-bold text-gray-800 flex-shrink-0">
          {price}
        </p>
      </div>

      <div className="p-6 text-center space-y-2">
        <p className="text-3xl font-bold mb-8 mt-6">
          {(displayPlan || plan).trim()}
          <br />
          {sizeLabel}
        </p>
        <div className="flex items-center justify-center space-x-2">
          <img src={ExpiryIcon} alt="Expiry" className="w-4 h-4" />
          <span className="text-sm">
            Expires in {expiry} {expiryUnit}
          </span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <img src={DeliveryIcon} alt="Delivery" className="w-4 h-4" />
          <span className="text-sm">Instant delivery via email</span>
        </div>

        <div className="flex items-center justify-center space-x-2">
          <img src={WifiIcon} alt="5G" className="w-4 h-4" />
          <span className="text-sm">5G where available</span>
        </div>

        <div className="pt-8 pb-6">
          <CustomButton
            text="Activate Plan"
            onClick={handleActivatePlan}
            px="px-10"
          />
        </div>

        <div className="text-xs flex flex-col items-center space-y-1">
          <Link to="/supported-devices" className="text-gray-300">
            Supported by {numOfDevices} devices
          </Link>

          {countriesPreview && (
            <Link
              to="/supported-countries"
              state={{ includedCountries, packageName: displayPlan }}
              className="text-gray-300"
            >
              Use in {countriesPreview}
              {numOfCountries > 2 && ` and ${numOfCountries - 2} more`}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataPackageCards;
