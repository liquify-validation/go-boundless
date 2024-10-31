import React from "react";

const CheckoutDataPackage = ({ packageInfo }) => {
  // TO DO REPLACE MOCK DATA WITH REAL DATA
  const dataPackage = packageInfo || {
    name: "Premium Data Plan",
    description: "Unlimited data for 30 days",
    price: 49.99,
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">{dataPackage.name}</h2>
      <p className="text-gray-600">{dataPackage.description}</p>
      <p className="text-xl font-bold mt-4">${dataPackage.price.toFixed(2)}</p>
    </div>
  );
};

export default CheckoutDataPackage;
