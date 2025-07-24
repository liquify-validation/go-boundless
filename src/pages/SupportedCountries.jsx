import React, { useState, useMemo, useEffect } from "react";
import { SearchBar, CountryList, SupportedHero } from "../components";
import { useCountries } from "../hooks/useCountries";
import { WorldMapBg } from "../assets";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SupportedCountries = () => {
  const { data: allCountries, error, isLoading } = useCountries();
  const { state } = useLocation();
  const packageCodes = state?.includedCountries || [];
  const [searchTerm, setSearchTerm] = useState("");

  const baseline = useMemo(() => {
    if (!allCountries) return [];
    return packageCodes.length
      ? allCountries.filter((c) => packageCodes.includes(c.code))
      : allCountries;
  }, [allCountries, packageCodes]);

  const filteredCountries = useMemo(() => {
    return baseline.filter(
      (country) =>
        country.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        country.code.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [baseline, searchTerm]);

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
      <Helmet>
        <title>Go Boundless Now | Supported Countries</title>
        <meta
          name="description"
          content="Explore the countries where our international eSIM provides coverage. Search by country and stay connected worldwide."
        />
        <meta
          property="og:title"
          content="Go Boundless Now | Supported Countries"
        />
        <meta
          property="og:description"
          content="Explore the countries where our international eSIM provides coverage. Search and stay connected worldwide."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/supported-countries"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Supported Countries | Global eSIM Coverage"
        />
        <meta
          name="twitter:description"
          content="Explore the countries where our international eSIM provides coverage. Search and stay connected worldwide."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <link
          rel="canonical"
          href="https://goboundlessnow.com/supported-countries"
        />
      </Helmet>
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
