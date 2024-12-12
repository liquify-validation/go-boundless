import { Helmet } from "react-helmet-async";
import { TickIcon, WorldMapBg } from "../assets";

const PaymentCancelled = () => {
  return (
    <section
      className="relative bg-contain bg-no-repeat bg-center py-20"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Payment Cancelled</title>
        <meta
          name="description"
          content="Your purchase was cancelled or an error occurred. Please try again or contact support for assistance."
        />
        <meta
          property="og:title"
          content="Go Boundless Now | Payment Cancelled"
        />
        <meta
          property="og:description"
          content="Your purchase was cancelled or an error occurred. Please try again or contact support for assistance."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/payment-cancelled"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Payment Cancelled | Please Try Again"
        />
        <meta
          name="twitter:description"
          content="Your purchase was cancelled or an error occurred. Please try again or contact support for assistance."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <link
          rel="canonical"
          href="https://goboundlessnow.com/payment-cancelled"
        />
      </Helmet>

      <div className="payment-success-container endpoint-card p-6 max-w-lg mx-auto mt-2 ">
        <img
          src={TickIcon}
          alt="tick-icon"
          className="h-16 w-16 mx-auto mb-4"
        />
        <h1 className="text-2xl font-bold text-center mb-8">
          Your purchase was cancelled.
        </h1>
        <p className="text-sm">
          You cancelled your payment or something went wrong. Please try again.
        </p>
      </div>
    </section>
  );
};

export default PaymentCancelled;
