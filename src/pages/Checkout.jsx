import React from "react";
import {
  PaymentForm,
  CheckoutDataPackage,
  OrderSummary,
  ProductCard,
} from "../components";
import { useLocation } from "react-router-dom";
import { GradientDot } from "../assets";

const Checkout = () => {
  const location = useLocation();
  const { packageData } = location.state || {};

  return (
    <div className="relative">
      {/* Gradient Dots */}
      <img
        src={GradientDot}
        alt=""
        className="absolute opacity-20 pointer-events-none"
        style={{ top: "25%", right: "10%", transform: "translateY(-50%)" }}
        aria-hidden="true"
      />
      <img
        src={GradientDot}
        alt=""
        className="absolute opacity-20 pointer-events-none"
        style={{ top: "85%", right: "10%", transform: "translateY(-70%)" }}
        aria-hidden="true"
      />

      <div className="container mx-auto mb-16 mt-16 p-6 flex flex-col lg:flex-row glowing-endpoint-card max-w-7xl">
        {/* Left Side - Payment Section */}
        <div className="w-full lg:w-1/2 lg:pr-6">
          <PaymentForm packageData={packageData} />
        </div>

        {/* Right Side - Data Package and Order Summary */}
        <div className="w-full lg:w-1/2 lg:pl-6 mt-8 lg:mt-0 flex flex-col gap-6">
          <ProductCard packageData={packageData} />
          <OrderSummary packageData={packageData} />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
