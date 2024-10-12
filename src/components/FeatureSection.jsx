// components/FeatureSection.js
import React from "react";
import FeatureCard from "./FeatureCard";

const FeatureSection = ({ title, subtext, features }) => {
  return (
    <section className="py-8 text-gray-50 mb-20">
      <div className=" p-4 my-6 space-y-2 text-center mb-28">
        <h2 className="text-5xl font-bold mx-auto max-w-[60%] mb-12">
          {title}
        </h2>
        <p className="text-gray-100 mx-auto max-w-[50%]">{subtext}</p>
      </div>
      <div className="   grid justify-center gap-32 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            details={feature.details}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureSection;
