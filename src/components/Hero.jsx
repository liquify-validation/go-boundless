import React from "react";
import Gallery from "./Gallery";

const Hero = () => {
  return (
    <div className="relative mx-auto py-10 ">
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-10 ">
        <div className="lg:col-span-3 ">
          <h2 className="text-lg text-primary mb-2 pt-8">
            Privacy-First Global Connectivity
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-5xl font-bold text-white mt-4">
            Limitless Connectivity, Uncompromised Privacy
          </h1>
          <p className="text-lg text-gray-50 mt-8">
            Unlock boundless global connectivity while keeping your personal
            data secure. Our e-SIMs provide robust and reliable internet access
            across continents, ensuring you remain connected no matter where
            life takes you. Embrace financial freedom with the option to
            purchase SIMs using cryptocurrencies, making transactions swift and
            secure. At Go Boundless, we blend cutting-edge technology with a
            commitment to your privacy, offering a mobile experience that’s both
            expansive and safeguarded.
          </p>
          <div className="mt-5 lg:mt-12">
            <button className="px-6 py-3 text-lg font-medium text-black bg-primary rounded-lg hover:bg-primary-dark">
              See Plans
            </button>
          </div>
        </div>

        <div className="lg:col-span-4 relative mt-10 lg:mt-0">
          <div className="relative lg:absolute lg:right-[-85%] w-full lg:w-[150%]">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
