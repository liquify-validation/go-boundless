import React, { useEffect } from "react";
import DataPackageCards from "./DataPackageCards";
import { GradientDot } from "../assets";
import { useInventory } from "../hooks/useInventory";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const DataPackagesSection = () => {
  const { data, error, isLoading } = useInventory();

  useEffect(() => {
    if (error) {
      toast.error(`Error loading data packages: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading Data Packages..." />
      </div>
    );
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
