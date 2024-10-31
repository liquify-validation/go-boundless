import React from "react";
import { useLocation } from "react-router-dom";

const PaymentSuccess = () => {
  const location = useLocation();
  const { activationCode } = location.state || {};

  return (
    <div className="payment-success-container">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your payment was successful.</p>
      <p>Please scan the QR code below to activate your SIM:</p>
      {activationCode ? (
        <img
          src={`data:image/png;base64,${activationCode}`}
          alt="SIM Activation QR Code"
        />
      ) : (
        <p>Loading QR Code...</p>
      )}
      <p>Follow the instructions to complete the activation process.</p>
    </div>
  );
};

export default PaymentSuccess;
