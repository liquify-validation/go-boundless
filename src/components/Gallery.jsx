import React, { useState } from "react";
import {
  SingaporeImage,
  PhilippinesImage,
  ThailandImage,
  VietnamImage,
  ArrowLeft,
  ArrowRight,
} from "../assets";

const images = [PhilippinesImage, SingaporeImage, ThailandImage, VietnamImage];

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  return (
    <div
      id="gallery"
      className="relative w-full h-128 overflow-hidden rounded-xl"
    >
      {/* Carousel wrapper */}
      <div className="relative w-full h-full">
        {/* Display the active image */}
        <img
          src={images[activeIndex]}
          className="w-full h-full  object-center"
          alt={`Image ${activeIndex + 1}`}
        />
      </div>

      {/* Slider controls (positioned at the bottom center) */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white"
          onClick={handlePrev}
        >
          <img src={ArrowLeft} className="w-6 h-6" alt="Previous" />
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white"
          onClick={handleNext}
        >
          <img src={ArrowRight} className="w-6 h-6" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
