import React from "react";

const VendorTabs = ({ vendors, selectedVendor, onSelectVendor }) => {
  return (
    <div
      className="flex flex-wrap space-x-2 mb-6"
      role="tablist"
      aria-label="Vendor Tabs"
    >
      {/* "All" Tab */}
      <button
        role="tab"
        aria-selected={selectedVendor === "All"}
        className={`px-4 rounded-full border ${
          selectedVendor === "All"
            ? "bg-primary-500 text-white mb-4"
            : "bg-white text-gray-700 hover:bg-gray-200 mb-4"
        }`}
        onClick={() => onSelectVendor("All")}
      >
        All
      </button>
      {/* Dynamic Vendor Tabs */}
      {vendors.map((vendor) => (
        <button
          key={vendor.name}
          role="tab"
          aria-selected={selectedVendor === vendor}
          className={`px-4 py-2 mb-4 rounded-full border ${
            selectedVendor === vendor
              ? "bg-primary-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
          onClick={() => onSelectVendor(vendor)}
        >
          {vendor}
        </button>
      ))}
    </div>
  );
};

export default VendorTabs;
