import React from "react";
import { Helmet } from "react-helmet-async";
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

  let title = "Payment Success | Activate Your eSIM";
  let description =
    "Your payment was successful. Scan the QR code to instantly activate your eSIM and enjoy global connectivity.";
  let image = "https://goboundlessnow.com/og_image.png";
  let canonicalUrl = "https://goboundlessnow.com/payment-success";

  if (isLoading) {
    title = "Payment Success | Activating Your eSIM";
    description =
      "Your payment was successful. We're preparing your eSIM activation details and QR code. Please wait a moment.";
    image = "https://goboundlessnow.com/og_image.png";
  } else if (isError) {
    if (error.status === 401 || error.status === 403) {
      navigate("/login");
      return null;
    }

    title = "Error | Activation Data Unavailable";
    description =
      "There was an error fetching your activation data. Please check your email or contact support.";
    image = "https://goboundlessnow.com/og_image.png";
  } else if (!activationData) {
    title = "No Activation Data Found | Check Email";
    description =
      "No activation data found. Please check your email or contact support for assistance.";
    image = "https://goboundlessnow.com/og_image.png";
  }

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={image} />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />

        <link rel="canonical" href={canonicalUrl} />
      </Helmet>

      {isLoading && (
        <div className="relative">
          <LoadingSpinner text="Preparing your QR code..." />
        </div>
      )}

      {!isLoading && isError && (
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
      )}

      {!isLoading && !isError && !activationData && (
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
      )}

      {!isLoading && !isError && activationData && (
        <section
          className="relative bg-contain bg-no-repeat bg-center py-20"
          style={{ backgroundImage: `url(${WorldMapBg})` }}
        >
          <div className="payment-success-container endpoint-card p-6 max-w-lg mx-auto mt-2 ">
            <img
              src={TickIcon}
              alt="tick-icon"
              className="h-16 w-16 mx-auto mb-4"
            />
            <h1 className="text-2xl font-bold text-center mb-8">
              Thank You for Your Purchase!
            </h1>
            <p className="text-sm">
              Your payment was successful. Please scan the QR code below to
              activate your eSIM.
            </p>

            <div className="mt-8 flex justify-center">
              <QRCode value={activationData.activation_code} size={200} />
            </div>

            <p className="mt-8 text-sm mb-4">
              The QR code has also been sent to your email address.
            </p>
          </div>
        </section>
      )}
    </>
  );
};

export default PaymentSuccess;
