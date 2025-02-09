import React, { useState, useMemo, useEffect } from "react";
import {
  SearchBar,
  VendorTabs,
  DeviceList,
  SupportedHero,
} from "../components";
import { useDevices } from "../hooks/useDevices";
import { IphoneImage } from "../assets";
import LoadingSpinner from "../components/LoadingSpinner";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";

const SupportedDevices = () => {
  const { data, error, isLoading, isError } = useDevices();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedVendor, setSelectedVendor] = useState("All");

  const vendors = useMemo(() => {
    if (!data) return [];
    const vendorSet = new Set(data.map((device) => device.vendor));
    return Array.from(vendorSet);
  }, [data]);

  const filteredDevices = useMemo(() => {
    if (!data || !data.length) return [];

    return data.filter((device) => {
      const matchesSearch =
        device.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.platform.toLowerCase().includes(searchTerm.toLowerCase()) ||
        device.vendor.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesVendor =
        selectedVendor === "All" ||
        device.vendor.toLowerCase() === selectedVendor.toLowerCase();

      return matchesSearch && matchesVendor;
    });
  }, [data, searchTerm, selectedVendor]);

  useEffect(() => {
    if (error) {
      toast.error(`Error loading supported devices: ${error.message}`);
    }
  }, [error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading Supported Devices..." />
      </div>
    );
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Helmet>
        <title>Go Boundless Now | Supported Devices</title>
        <meta
          name="description"
          content="Find out which devices are compatible with our international eSIM services. Search by vendor or device name to ensure seamless connectivity."
        />
        <meta
          property="og:title"
          content="Go Boundless Now | Supported Devices"
        />
        <meta
          property="og:description"
          content="Find out which devices are compatible with our international eSIM services. Search by vendor or device name."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/supported-devices"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Supported Devices | eSIM Compatibility"
        />
        <meta
          name="twitter:description"
          content="Find out which devices are compatible with our international eSIM services. Search by vendor or device name."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />
        <link
          rel="canonical"
          href="https://goboundlessnow.com/supported-devices"
        />
      </Helmet>
      <div className="flex flex-col lg:flex-row lg:space-x-8">
        {/* Left Column: Hero Section */}
        <div className="lg:w-1/3 mb-8 lg:mb-0">
          <SupportedHero
            title="Supported Devices"
            subtitle="Explore the devices compatible with our eSIM services."
            image={IphoneImage}
          />
        </div>

        {/* Right Column: Vendor Tabs, Search, and Device List */}
        <div className="lg:w-2/3">
          {/* Vendor Tabs */}
          <VendorTabs
            vendors={vendors}
            selectedVendor={selectedVendor}
            onSelectVendor={handleSelectVendor}
          />

          {/* Search Component */}
          <SearchBar
            onSearch={handleSearch}
            placeholder="Search for a device..."
          />

          {/* Device List */}
          <DeviceList devices={filteredDevices} searchTerm={searchTerm} />
        </div>
      </div>
    </div>
  );
};

export default SupportedDevices;
