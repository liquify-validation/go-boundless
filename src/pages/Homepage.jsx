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

function Homepage() {
  const { data, error, isLoading } = useInventory();

  useEffect(() => {
    if (error) {
      toast.error(`Error loading plan details: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading inventory..." />
      </div>
    );
  }

  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="w-full pt-48">
        <FeatureSection
          title="Enjoy reliable and affordable internet on your trips. We've got you covered."
          subtext="Stay connected seamlessly across the globe with our hassle-free international eSIMs—no roaming fees, just instant access wherever you are."
          features={featuresData}
        />
      </div>
      {/* <div className="w-full pt-24">
        <CountrySection />
      </div> */}
      <div className="pb-24 pt-24">
        <HowItWorks />
      </div>
      <div className="pb-24 pt-24">
        <DataPackagesSection />
      </div>
      <div className="py-8 w-full">
        <CtaBanner />
      </div>
      <div className="py-16">
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
