import { toast } from "react-toastify";
import {
  CtaBanner,
  DataPackagesSection,
  Faqs,
  FeatureSection,
  Hero,
  HowItWorks,
  LoadingSpinner,
} from "../components";
import CountrySection from "../components/CountrySection";
import { faqData, featuresData } from "../data/constants";
import { useInventory } from "../hooks/useInventory";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

function Homepage() {
  const { data, error, isLoading } = useInventory();

  useEffect(() => {
    if (error) {
      toast.error(`Error loading plan details: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="relative h-48">
        <LoadingSpinner text="Loading..." />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Go Boundless Now | Global eSIM Provider</title>
        <meta
          name="description"
          content="Enjoy reliable, affordable, and instant international eSIM access for your travels. No roaming fees, just seamless connectivity around the globe."
        />

        {/* Open Graph */}
        <meta
          property="og:title"
          content="Go Boundless Now | Global eSIM Provider"
        />
        <meta
          property="og:description"
          content="Enjoy reliable, affordable, and instant international eSIM access for your travels. No roaming fees, just seamless connectivity around the globe."
        />
        <meta property="og:url" content="https://goboundlessnow.com/" />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <meta property="og:type" content="website" />

        {/* Twitter Cards */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Global eSIM Provider | Seamless International Connectivity"
        />
        <meta
          name="twitter:description"
          content="Enjoy reliable, affordable, and instant international eSIM access for your travels. No roaming fees, just seamless connectivity around the globe."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link rel="canonical" href="https://goboundlessnow.com/" />
      </Helmet>

      <div>
        <Hero />
      </div>
      <div className="w-full md:pt-48">
        <FeatureSection
          title="Enjoy reliable and affordable internet on your trips. We've got you covered."
          subtext="Stay connected seamlessly across the globe with our hassle-free international eSIMs—no roaming fees, just instant access wherever you are."
          features={featuresData}
        />
      </div>
      {/* <div className="w-full pt-24">
        <CountrySection />
      </div> */}
      <div className="md:pb-24 md:pt-24">
        <HowItWorks />
      </div>
      <div className="pb-24 pt-24">
        <DataPackagesSection />
      </div>
      <div className="py-8 w-full">
        <CtaBanner />
      </div>
      <div className="md:py-16">
        <Faqs
          title={faqData.title}
          subtext={faqData.subtext}
          faqs={faqData.faqs}
        />
      </div>
    </>
  );
}

export default Homepage;
