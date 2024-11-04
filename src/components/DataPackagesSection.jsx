import React from "react";
import DataPackageCards from "./DataPackageCards";
import { GradientDot } from "../assets";
import { useInventory } from "../hooks/useInventory";

const DataPackagesSection = () => {
  const { data, error, isLoading } = useInventory();

  if (isLoading) {
    return <div>Loading Data Packages...</div>;
  }

  if (error) {
    return <div>Error loading data packages: {error.message}</div>;
  }

  const getCountries = (countrySet) => {
    if (countrySet === "WWW") {
      return "USA, Canada";
    }

    return data.items
      .filter((item) => item.countrySet !== "WWW")
      .map((item) => item.includedCountries)
      .join(", ");
  };

  console.log("inventory data", data);

  const packages =
    data?.items
      .filter((item) => item.active)
      .map((item) => ({
        id: item.id,
        name: item.name,
        countries: getCountries(item.countrySet),
        price: item.retailPrices?.[0]
          ? `$${item.retailPrices[0].priceValue.toFixed(2)}`
          : "$0.00",
        size: item.sizeValue,
        sizeUnit: item.sizeUnit,
        expiry: item.validitySize,
        expiryUnit: item.validityUnit,
      })) || [];

  return (
    <section
      className="relative bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${GradientDot})` }}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {packages.length > 0 ? (
          packages.map((pkg, index) => (
            <DataPackageCards
              id={pkg.id}
              name={pkg.name}
              key={index}
              countries={pkg.countries}
              price={pkg.price}
              size={pkg.size}
              sizeUnit={pkg.sizeUnit}
              expiry={pkg.expiry}
              expiryUnit={pkg.expiryUnit}
            />
          ))
        ) : (
          <div>No Data Packages Available</div>
        )}
      </div>
    </section>
  );
};

export default DataPackagesSection;
