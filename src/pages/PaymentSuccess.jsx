import React from "react";
import { TickIcon, WorldMapBg } from "../assets";
import LoadingSpinner from "../components/LoadingSpinner";
import { QRCode } from "react-qrcode-logo";
import { usePendingActivations } from "../hooks/usePendingActivations";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();

  const {
    data: activationData,
    isLoading,
    isError,
    error,
  } = usePendingActivations();

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Preparing your QR code..." />
      </div>
    );
  }

  if (isError) {
    if (error.status === 401 || error.status === 403) {
      navigate("/login");
      return null;
    }

    return (
      <section
        className="relative bg-contain bg-no-repeat bg-center py-36"
        style={{ backgroundImage: `url(${WorldMapBg})` }}
      >
        <div className="payment-success-container endpoint-card p-6 max-w-lg mx-auto mt-16 ">
          <h1 className="text-xl font-bold text-center mb-8">
            Error fetching activation data.
          </h1>
          <p className="text-sm">
            Please check your email for activation instructions or contact
            support.
          </p>
        </div>
      </section>
    );
  }

  if (!activationData) {
    return (
      <section
        className="relative bg-contain bg-no-repeat bg-center py-36"
        style={{ backgroundImage: `url(${WorldMapBg})` }}
      >
        <div className="payment-success-container endpoint-card p-6 max-w-lg mx-auto mt-16 ">
          <h1 className="text-xl font-bold text-center mb-8">
            No activation data found.
          </h1>
          <p className="text-sm">
            Please check your email for activation instructions or contact
            support.
          </p>
        </div>
      </section>
    );
  }

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
          Your payment was successful. Please scan the QR code below to activate
          your eSIM.
        </p>

        <div className="mt-8 flex justify-center">
          <QRCode value={activationData.activation_code} size={200} />
        </div>

        <p className="mt-8 text-sm mb-4">
          The QR code has also been sent to your email address.
        </p>
      </div>
    </section>
  );
};

export default PaymentSuccess;
