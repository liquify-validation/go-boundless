import {
  CtaBanner,
  Faqs,
  FeatureSection,
  Hero,
  HowItWorks,
} from "../components";
import { faqData, featuresData } from "../data/constants";

function Homepage() {
  return (
    <>
      <div>
        <Hero />
      </div>
      <div className="w-full pt-80">
        <FeatureSection
          title="Enjoy reliable and affordable internet on your trips. We've got you covered."
          subtext="Stay connected seamlessly across the globe with our hassle-free international eSIMs—no roaming fees, just instant access wherever you are."
          features={featuresData}
        />
      </div>
      <div className="pb-24 pt-24">
        <HowItWorks />
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
