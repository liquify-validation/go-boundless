import React, { useState, useMemo } from "react";
import {
  SearchBar,
  VendorTabs,
  DeviceList,
  SupportedHero,
} from "../components";
import { useDevices } from "../hooks/useDevices";
import { IphoneImage } from "../assets";

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

  if (isLoading) return <div>Loading Supported Devices...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  console.log("devices", data);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleSelectVendor = (vendor) => {
    setSelectedVendor(vendor);
  };

  return (
    <div className="container mx-auto px-4 py-8">
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
