import React, { useState } from "react";
import PropTypes from "prop-types";
import { FaStar, FaRegStar, FaCircle } from "react-icons/fa";

// TO DO - MAKE FUNCTIONAL TO ADD ID PRICE ETC THAT WE CAN PASS AND IT CAN ACT AS A FEATURED PRODUCT
// TO DO - ADD BUY NOW
// TO DO - MAKE IT EASIER TO SET A FEATURED PRODUCT FROM INVENTORY
// TO DO - MAKE SURE RESPONSIVE

const ProductCard = ({
  subtitle,
  title,
  amountOfReviews,
  reviewScore,
  features,
  description,
  technicalSpecs,
}) => {
  const [activeTab, setActiveTab] = useState("Features");

  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
    const hasHalfStar = score - fullStars >= 0.5;
    const totalStars = 5;

    for (let i = 1; i <= totalStars; i++) {
      if (i <= fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }

    return stars;
  };

  return (
    <div className="max-w-xl  bg-opacity-10 shadow-md rounded-lg p-6 endpoint-card">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Left: Subtitle and Title */}
        <div>
          <p className="text-[0.625rem] text-primary">{subtitle}</p>
          <h2 className="text-xl font-semibold text-gray-50 mt-2 ">{title}</h2>
        </div>
        {/* Middle: Amount of Reviews */}
        <div>
          <p className="text-xs text-gray-50 pt-7">
            {amountOfReviews} Customer Reviews
          </p>
        </div>
        {/* Right: Star Ratings */}
        <div className="flex pt-6">{renderStars(reviewScore)}</div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 mb-4 bg-slate-400 bg-opacity-20 px-6 py-3 rounded-xl gap-6">
        {["Features", "Description", "Technical Specs"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-full text-sm focus:outline-none ${
              activeTab === tab
                ? "bg-primary text-black font-semibold"
                : "bg-transparent text-gray-50 hover:bg-zinc-800"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="pt-2 pb-2">
        {activeTab === "Features" && (
          <ul className="space-y-2 ">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start">
                <img
                  src={feature.icon}
                  alt={`Feature ${index + 1}`}
                  className="w-8 h-8 mr-4"
                />
                <span className="text-gray-50 text-sm mt-1.5">
                  {feature.text}
                </span>
              </li>
            ))}
          </ul>
        )}

        {activeTab === "Description" && (
          <div className="space-y-4">
            {description.map((para, idx) => (
              <p key={idx} className="text-gray-50 text-xs max-w-[95%] mx-auto">
                {para}
              </p>
            ))}
          </div>
        )}

        {activeTab === "Technical Specs" && (
          <ul className="space-y-2">
            {technicalSpecs.map((spec, index) => (
              <li key={index} className="flex items-start">
                <FaCircle className="text-gray-50 mt-2.5 w-2 h-2 mr-2" />
                <div className="">
                  <span className="text-sm text-gray-50 font-bold">
                    {spec.title}:
                  </span>{" "}
                  <span className="text-gray-50 text-sm">{spec.text}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  amountOfReviews: PropTypes.number.isRequired,
  reviewScore: PropTypes.number.isRequired,
  features: PropTypes.arrayOf(
    PropTypes.shape({
      icon: PropTypes.element.isRequired,
      text: PropTypes.string.isRequired,
    })
  ).isRequired,
  description: PropTypes.arrayOf(PropTypes.string).isRequired,
  technicalSpecs: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      text: PropTypes.string,
    })
  ).isRequired,
};

export default ProductCard;
