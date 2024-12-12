import React from "react";
import { DataPackagesSection } from "../components";
import ProductCard from "../components/ProductCard";
import {
  HelpCenterIcon,
  NoRoamingIconWhite,
  WifiIconWhite,
  FastIconWhite,
} from "../assets";
import { GradientDot, ThailandImage } from "../assets";
import { Helmet } from "react-helmet-async";

function DataPackages() {
  const sampleProduct = {
    subtitle: "Global Data eSim",
    title: "Thailand",
    amountOfReviews: 133,
    reviewScore: 5,
    features: [
      { icon: WifiIconWhite, text: "Choose your data package" },
      { icon: FastIconWhite, text: "Fast & reliable internet" },
      { icon: NoRoamingIconWhite, text: "No more roaming charges" },
      { icon: HelpCenterIcon, text: "Customer Support" },
    ],
    description: [
      "Buy an international eSIM for Singapore and never pay for roaming again. Connect to unlimited Internet at 4G/LTE/5G speed in minutes and stay in touch with your family and friends.",
      "It's easy to start using our services. After your purchase, you will receive a QR code in your email, scan it with your smartphone camera, install and enjoy a fast and stable Internet connection in Singapore.",
    ],
    technicalSpecs: [
      {
        title: "Installation",
        text: "You will be sent a QR code and link for activation",
      },
      { title: "Countries", text: "Stay connected in Thailand" },
      {
        title: "Compatibility",
        text: "Check your device is compatible here.",
      },
    ],
  };

  return (
    <>
      <Helmet>
        <title>
          Go Boundless Now | Global Data Packages | Affordable International
          eSIM Plans
        </title>
        <meta
          name="description"
          content="Choose from a range of international data packages for your eSIM. Enjoy seamless connectivity, no roaming fees, and instant activation for your travels."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Go Boundless Now | Global Data Packages | Affordable International eSIM Plans"
        />
        <meta
          property="og:description"
          content="Choose from a range of international data packages for your eSIM. Enjoy seamless connectivity, no roaming fees, and instant activation for your travels."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/data-packages"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Global Data Packages | Affordable International eSIM Plans"
        />
        <meta
          name="twitter:description"
          content="Choose from a range of international data packages for your eSIM. Enjoy seamless connectivity, no roaming fees, and instant activation for your travels."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link rel="canonical" href="https://goboundlessnow.com/data-packages" />
      </Helmet>
      {/* Subtitle Above Title */}
      <div className="text-center text-md text-primary mb-2 mt-8">
        Explore Our Plans
      </div>

      {/* Title */}
      <div className="text-center text-4xl font-bold mb-8 mt-8">
        Data Packages
      </div>

      {/* Paragraph Below Title */}
      <div className="text-center text-gray-50 mb-8 px-4">
        GoBoundless offers the best prepaid eSIM for your journey around the
        world. Stay connected to family, friends, and apps 24/7 with no worries
        and enjoy being boundless anywhere around the globe
      </div>

      {/* Two-Column Layout */}
      <div className="flex flex-col lg:flex-row items-stretch justify-center gap-8 px-4 mt-16">
        {/* Left Column: Image */}
        <div className="w-full lg:w-3/5">
          <img
            src={ThailandImage}
            alt="Data Package Illustration"
            className="w-full h-full object-cover rounded-lg shadow-lg"
            loading="lazy"
          />
        </div>

        {/* Right Column: ProductCard with Gradient Dot Background */}
        <div className="w-full lg:w-2/5 relative">
          {/* Gradient Dot Background */}
          <img
            src={GradientDot}
            alt=""
            className="absolute -right-4 -top-4  opacity-20 pointer-events-none"
            aria-hidden="true"
          />

          {/* ProductCard */}
          <div className="relative h-full">
            <ProductCard
              subtitle={sampleProduct.subtitle}
              title={sampleProduct.title}
              amountOfReviews={sampleProduct.amountOfReviews}
              reviewScore={sampleProduct.reviewScore}
              features={sampleProduct.features}
              description={sampleProduct.description}
              technicalSpecs={sampleProduct.technicalSpecs}
            />
          </div>
        </div>
      </div>

      {/* DataPackagesSection */}
      <div className="mt-16 mb-16">
        <DataPackagesSection />
      </div>
    </>
  );
}

export default DataPackages;
