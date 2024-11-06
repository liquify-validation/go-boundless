import React, { useEffect } from "react";
import DataPlanCard from "../components/DataPlanCard";
import UsedDataCard from "../components/UsedDataCard";
import { useCustomerActivations } from "../hooks/useCustomerActivations";
import { useParams } from "react-router-dom";
import { WorldMapBg } from "../assets";
import Back from "../ui/Back";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const ManagePlan = () => {
  const {
    data: activations,
    isLoading,
    isError,
    error,
  } = useCustomerActivations();
  const { itemId } = useParams();

  useEffect(() => {
    if (isError) {
      toast.error(`Error loading plan details: ${error.message}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading plan details..." />
      </div>
    );
  }

  const activatedItems = activations?.activatedItems?.activatedItems || [];
  const activatedItem = activatedItems.find((item) => item.uid === itemId);

  if (!activatedItem) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">Plan Not Found</h2>
        <p className="text-center">
          The plan you are trying to access does not exist.
        </p>
      </div>
    );
  }

  let planSize = activatedItem?.balance?.size?.sizeValue || 0;
  let sizeUnit = activatedItem?.balance?.size?.sizeUnit || "MB";

  let availableBalance =
    activatedItem?.balance?.availableBalance?.sizeValue || 0;
  let availableUnit =
    activatedItem?.balance?.availableBalance?.sizeUnit || "MB";

  if (sizeUnit === "GB") {
    planSize *= 1000;
    sizeUnit = "MB";
  }

  if (availableUnit === "GB") {
    availableBalance *= 1000;
    availableUnit = "MB";
  }

  const totalData = planSize;
  const usedData = totalData - availableBalance;

  const expiryDate = activatedItem?.balance?.expiresAt || "";
  const activatedAt = activatedItem?.balance?.activatedAt || "";

  const daysUntilExpiry = Math.ceil(
    (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const countrySet = activatedItem?.balance?.countrySet || "WWW";

  const formatDataValue = (value) => {
    return value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
  };

  return (
    <section
      className="relative bg-contain bg-no-repeat bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Back />
      <div className="max-w-7xl mx-auto py-12 px-8">
        <h2 className="text-4xl font-bold mb-6 text-center">
          Manage Your Plan
        </h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6 mt-24">
          {/* Data Plan Card */}
          <DataPlanCard
            planSize={formatDataValue(planSize)}
            sizeUnit={sizeUnit}
            expiryDate={expiryDate}
            daysUntilExpiry={daysUntilExpiry}
            dataPurchased={activatedAt}
            countrySet={countrySet}
          />

          {/* Used Data Card */}
          <UsedDataCard
            availableBalance={availableBalance}
            totalData={totalData}
            sizeUnit={sizeUnit}
            expiryDate={expiryDate}
            daysUntilExpiry={daysUntilExpiry}
          />
        </div>
      </div>
    </section>
  );
};

export default ManagePlan;
