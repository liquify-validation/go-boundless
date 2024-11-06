import React, { useState, useMemo, useEffect } from "react";
import { SearchBar, CountryList, SupportedHero } from "../components";
import { useCountries } from "../hooks/useCountries";
import { WorldMapBg } from "../assets";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";

const SupportedCountries = () => {
  const { data, error, isLoading } = useCountries();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredCountries = useMemo(() => {
    if (!data || !data.length) return [];

    return data.filter(
      (country) =>
        country.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [data, searchTerm]);

  useEffect(() => {
    if (error) {
      toast.error(`Error loading supported countries: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading Supported Countries..." />
      </div>
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };
  return (
    <section
      className="relative bg-contain bg-no-repeat "
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          {/* Left Column: Hero Section */}
          <div className="lg:w-1/3">
            <SupportedHero
              title="Supported Countries"
              subtitle="Explore the countries where you can use our eSIM services."
            />
          </div>

          {/* Right Column: Search and Country List */}
          <div className="lg:w-2/3">
            {/* Search Component */}
            <SearchBar
              onSearch={handleSearch}
              placeholder="Search Countries..."
            />

            {/* Country List with searchTerm prop */}
            <CountryList
              countries={filteredCountries}
              searchTerm={searchTerm}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportedCountries;
