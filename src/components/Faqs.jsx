import React, { useState } from "react";
import { WorldMapBg } from "../assets";

const Faqs = ({ title, subtext, faqs }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleFaq = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section
      className="relative bg-cover bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        <div className="mx-auto flex max-w-xl flex-col items-center justify-center px-6 text-center lg:max-w-3xl lg:px-10">
          <h2 className="mx-auto text-center font-bold text-gray-50 text-3xl lg:text-5xl">
            {title}
          </h2>
          <p className="font-inter mt-4 max-w-xl px-5 text-center text-base font-light text-gray-150 lg:max-w-lg">
            {subtext}
          </p>
        </div>
        {/* FAQs */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {" "}
          {/* Two columns on medium screens and above */}
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="relative my-3 w-full rounded-md border border-gray-300 px-8 py-6"
            >
              {" "}
              {/* Adjusted padding for larger box sizes */}
              <h2
                className="font-bold text-gray-50 text-xl cursor-pointer flex justify-between items-center"
                onClick={() => toggleFaq(index)}
              >
                {faq.question}
                <span className="ml-2">
                  {expandedIndex === index ? (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.05078 12H16.9508"
                        stroke="#B3FF4A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  ) : (
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.05078 12H16.9508"
                        stroke="#B3FF4A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                      <path
                        d="M12 7.05005V16.95"
                        stroke="#B3FF4A"
                        strokeWidth="3"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  )}
                </span>
              </h2>
              {expandedIndex === index && (
                <p className="font-inter mt-4 text-base font-light text-gray-150">
                  {faq.answer}
                </p>
              )}
            </div>
          ))}
        </div>
        {/* Footer */}
        <p className="font-inter mx-auto mt-12 text-center text-base text-gray-150">
          Can’t find the answer you’re looking for? Reach out to our{" "}
          <a href="/contact-us" className="text-[#B3FF4A] font-bold">
            customer support team.
          </a>
        </p>
      </div>
    </section>
  );
};

export default Faqs;
