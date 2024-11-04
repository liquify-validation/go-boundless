import React from "react";
import { TickIcon, WorldMapBg } from "../assets";

const PaymentSuccess = () => {
  return (
    <section
      className="relative bg-contain bg-no-repeat bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="payment-success-container endpoint-card p-6 max-w-lg mx-auto mt-16 ">
        <img
          src={TickIcon}
          alt="tick-icon"
          className="h-24 w-24 mx-auto mb-4"
        />
        <h1 className="text-xl font-bold text-center mb-8">
          Thank You for Your Purchase!
        </h1>
        <p className="text-sm">
          Your payment was successful and an email with your eSIM activation
          code has been sent to your email address.
        </p>

        <p className="mt-4 text-sm mb-4">
          Please follow the instructions in the email to activate your SIM.
        </p>
      </div>
    </section>
  );
};

export default PaymentSuccess;
