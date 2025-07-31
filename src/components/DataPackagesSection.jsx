import React, { useEffect, useMemo } from "react";
import DataPackageCards from "./DataPackageCards";
import { GradientDot } from "../assets";
import { useInventory } from "../hooks/useInventory";
import { useCountries } from "../hooks/useCountries";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { splitPackageName } from "../utilities/helpers";

const DataPackagesSection = () => {
  const { data, error, isLoading } = useInventory();
  const { data: allCountries } = useCountries();

  const nameByCode = useMemo(() => {
    if (!allCountries) return {};
    return Object.fromEntries(allCountries.map((c) => [c.code, c.fullName]));
  }, [allCountries]);

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

  // const getCountries = (countrySet) => {
  //   if (countrySet === "WWL") {
  //     return "USA, Canada";
  //   }

  //   return data.items
  //     .filter((item) => item.countrySet !== "WWW")
  //     .map((item) => item.includedCountries)
  //     .join(", ");
  // };

  const packages =
    data?.items
      .filter((item) => item.active)
      .map((item) => {
        const countryNames = item.includedCountries
          .map((iso) => nameByCode[iso] || iso)
          .sort();

        const preview =
          countryNames.length > 2
            ? `${countryNames[0]}, ${countryNames[1]}`
            : countryNames.join(", ");

        return {
          id: item.id,
          rawName: item.name,
          ...splitPackageName(item.name),
          includedCountries: item.includedCountries,
          countriesPreview: preview,
          price: item.retailPrices?.[0]
            ? `$${item.retailPrices[0].priceValue.toFixed(2)}`
            : "$0.00",
          size: item.sizeValue,
          sizeUnit: item.sizeUnit,
          expiry: item.validitySize,
          expiryUnit: item.validityUnit,
        };
      })
      .sort((a, b) => a.plan.localeCompare(b.plan)) || [];

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
              plan={pkg.plan}
              sizeLabel={pkg.sizeLabel}
              rawName={pkg.rawName}
              key={index}
              countriesPreview={pkg.countriesPreview}
              includedCountries={pkg.includedCountries}
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
