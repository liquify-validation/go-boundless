import React from "react";
import { PaymentForm, CheckoutDataPackage, OrderSummary } from "../components";
import { useLocation } from "react-router-dom";

const Checkout = () => {
  const location = useLocation();
  const { packageData } = location.state || {};
  return (
    <div className="container mx-auto p-6 flex flex-col lg:flex-row">
      {/* Left Side - Payment Section */}
      <div className="w-full lg:w-1/2 lg:pr-6">
        <PaymentForm packageData={packageData} />
      </div>

      {/* Right Side - Data Package and Order Summary */}
      <div className="w-full lg:w-1/2 lg:pl-6 mt-8 lg:mt-0">
        <CheckoutDataPackage packageData={packageData} />
        <OrderSummary packageData={packageData} />
      </div>
    </div>
  );
};

export default Checkout;
