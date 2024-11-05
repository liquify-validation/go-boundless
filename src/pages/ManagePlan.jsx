import React, { useEffect } from "react";
import DataPlanCard from "../components/DataPlanCard";
import UsedDataCard from "../components/UsedDataCard";
import TopUpCard from "../components/TopUpCard";
import { useUserDetails } from "../hooks/Auth/useUserDetails";
import { useCustomerActivations } from "../hooks/useCustomerActivations";

const ManagePlan = () => {
  const { data: user } = useUserDetails();
  const { data: activations } = useCustomerActivations();

  console.log("activations", activations);

  const activatedItem = activations?.activatedItems?.[0];

  const planSize = activatedItem?.balance?.size?.sizeValue || 0;
  const sizeUnit = activatedItem?.balance?.size?.sizeUnit || "GB";
  const expiryDate = activatedItem?.balance?.expiresAt || "";
  const activatedAt = activatedItem?.balance?.activatedAt || "";
  const availableBalance =
    activatedItem?.balance?.availableBalance?.sizeValue || 0;
  const totalData = planSize;
  const usedData = totalData - availableBalance;

  const daysUntilExpiry = Math.ceil(
    (new Date(expiryDate) - new Date()) / (1000 * 60 * 60 * 24)
  );

  const handleTopUp = () => {
    alert("Top-up functionality coming soon!");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">
      <h2 className="text-4xl font-bold mb-6 text-center">Manage Your Plan</h2>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
        {/* Data Plan Card */}
        <DataPlanCard
          planSize={planSize}
          sizeUnit={sizeUnit}
          expiryDate={daysUntilExpiry}
          dataPurchased={activatedAt}
        />

        {/* Used Data Card */}
        <UsedDataCard
          usedData={usedData}
          totalData={totalData}
          expiryDate={expiryDate}
          daysUntilExpiry={daysUntilExpiry}
        />

        {/* Top Up Card */}
        <TopUpCard onTopUp={handleTopUp} />
      </div>
    </div>
  );
};

export default ManagePlan;
