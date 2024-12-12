import React, { useRef, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { FaStar, FaRegStar, FaCircle, FaChevronRight } from "react-icons/fa";
import {
  WifiIconWhite,
  FastIconWhite,
  NoRoamingIconWhite,
  HelpCenterIcon,
} from "../assets";

const ProductCard = ({ packageData }) => {
  const [activeTab, setActiveTab] = useState("Features");
  const contentRef = useRef(null);
  const [maxContentHeight, setMaxContentHeight] = useState(0);

  const tabContainerRef = useRef(null);
  const [isScrollable, setIsScrollable] = useState(false);

  const dataPackage = packageData || {
    price: "loading..",
    size: "1",
    sizeUnit: "GB",
    expiry: "loading..",
    expiryUnit: "loading..",
  };

  const subtitle = "Global Data eSim";
  const title = "Data Package";
  const amountOfReviews = 133;
  const reviewScore = 5;

  const features = [
    {
      icon: WifiIconWhite,
      text: `Choose from a variety of data packages`,
    },
    { icon: FastIconWhite, text: "Fast & reliable internet" },
    { icon: NoRoamingIconWhite, text: "No more roaming charges" },
    { icon: HelpCenterIcon, text: "Customer Support" },
  ];

  const description = [
    `Buy an international eSIM and never pay for roaming again. Connect to the internet for less and stay in touch with your family and friends.`,
    `It's easy to start using our services. After your purchase, you will receive a QR code in your email. Scan it with your smartphone camera, install, and enjoy a fast and stable Internet connection.`,
  ];

  const technicalSpecs = [
    {
      title: "Installation",
      text: "You will be sent a QR code and link for activation",
    },
    { title: "Countries", text: "Stay connected in multiple countries" },
    {
      title: "Compatibility",
      text: "Check your device is compatible here.",
    },
  ];

  const renderStars = (score) => {
    const stars = [];
    const fullStars = Math.floor(score);
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

  useEffect(() => {
    const heights = [];

    ["Features", "Description", "Technical Specs"].forEach((tab) => {
      setActiveTab(tab);
      const contentHeight = contentRef.current.offsetHeight;
      heights.push(contentHeight);
    });

    setMaxContentHeight(Math.max(...heights));

    setActiveTab("Features");
  }, []);

  useEffect(() => {
    const tabContainer = tabContainerRef.current;

    const checkScrollable = () => {
      if (tabContainer) {
        const isOverflowing =
          tabContainer.scrollWidth > tabContainer.clientWidth;
        setIsScrollable(isOverflowing);
      }
    };

    checkScrollable();

    window.addEventListener("resize", checkScrollable);

    return () => {
      window.removeEventListener("resize", checkScrollable);
    };
  }, []);

  return (
    <div className="max-w-xl bg-opacity-10 shadow-md rounded-lg p-6 endpoint-card h-full flex flex-col">
      {/* Top Section */}
      <div className="flex justify-between items-center mb-4">
        {/* Left: Subtitle and Title */}
        <div>
          <p className="text-[0.625rem] text-primary">{subtitle}</p>
          <h2 className="text-xl font-semibold text-gray-50 mt-2">{title}</h2>
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
      <div className="relative mb-4">
        <div
          ref={tabContainerRef}
          className="flex space-x-2 bg-slate-400 bg-opacity-20 px-6 py-3 rounded-xl gap-6 overflow-x-auto whitespace-nowrap"
        >
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
        {isScrollable && (
          <div className="absolute top-0 right-0 h-full w-8 bg-gradient-to-l from-slate-400 to-transparent pointer-events-none flex items-center justify-end">
            <FaChevronRight className="text-gray-50 mr-2" />
          </div>
        )}
      </div>

      {/* Content Area */}
      <div
        className="pt-2 pb-2 flex-grow"
        style={{ minHeight: `${maxContentHeight}px` }}
        ref={contentRef}
      >
        {activeTab === "Features" && (
          <ul className="space-y-2">
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
                <div>
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
  packageData: PropTypes.shape({
    price: PropTypes.string,
    size: PropTypes.number,
    sizeUnit: PropTypes.string,
    expiry: PropTypes.number,
    expiryUnit: PropTypes.string,
  }),
};

export default ProductCard;
