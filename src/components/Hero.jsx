import React from "react";
import Gallery from "./Gallery";

const Hero = () => {
  return (
    <div className="relative mx-auto py-10 ">
      {/* Grid Layout */}
      <div className="grid lg:grid-cols-7 lg:gap-x-8 xl:gap-x-12 ">
        {/* Left Side: Text Content */}
        <div className="lg:col-span-3 ">
          <h2 className="text-lg text-primary mb-2 pt-8">
            Lorem Ipsum Neque porro qui dolorem{" "}
          </h2>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mt-4">
            Lorem Ipsum Neque porro qui dolorem
          </h1>
          <p className="text-lg text-neutral-400 mt-8">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation.
          </p>
          <div className="mt-5 lg:mt-12">
            <button className="px-6 py-3 text-lg font-medium text-white bg-primary rounded-lg hover:bg-primary-dark">
              Request Demo
            </button>
          </div>
        </div>

        {/* Right Side: Gallery (1/4 off-screen) */}
        <div className="lg:col-span-4 relative mt-10 lg:mt-0">
          {/* The Gallery component will be offset 1/4 off-screen */}
          <div className="relative lg:absolute lg:right-[-85%] w-full lg:w-[150%]">
            <Gallery />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
