import React, { useState, useEffect } from "react";
import {
  SingaporeImage,
  PhilippinesImage,
  ThailandImage,
  VietnamImage,
  ArrowLeft,
  ArrowRight,
} from "../assets";

const images = [PhilippinesImage, SingaporeImage, ThailandImage, VietnamImage];

//TODO - Network tab - images are contsantly reloaded - fix this

const Gallery = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const [loadedCount, setLoadedCount] = useState(0);

  useEffect(() => {
    let isMounted = true;
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        if (isMounted) {
          setLoadedCount((prev) => prev + 1);
        }
      };
    });
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (loadedCount === images.length) {
      setInitialLoading(false);
    }
  }, [loadedCount]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

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
      {initialLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-200 animate-pulse z-10">
          <div className="w-1/2 h-1/2 bg-gray-300"></div>
        </div>
      )}

      <div className="relative w-full h-full">
        <img
          src={images[activeIndex]}
          alt={`Image ${activeIndex + 1}`}
          className={`w-full h-full object-center transition-opacity duration-500 ${
            initialLoading ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-30 flex items-center space-x-4">
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white"
          onClick={handlePrev}
          disabled={initialLoading}
        >
          <img src={ArrowLeft} className="w-6 h-6" alt="Previous" />
        </button>
        <button
          type="button"
          className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 hover:bg-white/50 focus:ring-4 focus:ring-white"
          onClick={handleNext}
          disabled={initialLoading}
        >
          <img src={ArrowRight} className="w-6 h-6" alt="Next" />
        </button>
      </div>
    </div>
  );
};

export default Gallery;
