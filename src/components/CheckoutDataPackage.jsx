import React from "react";

const CheckoutDataPackage = ({ packageData }) => {
  const dataPackage = packageData || {
    name: "Plan Loading...",
    description: "Plan Loading...",
    price: "Price Loading...",
  };

  return (
    <div className=" p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-semibold mb-2">{dataPackage.name}</h2>
      <p className="text-gray-600">{dataPackage.description}</p>
      <p className="text-xl font-bold mt-4">
        ${parseFloat(dataPackage.price).toFixed(2)}
      </p>
    </div>
  );
};

export default CheckoutDataPackage;
