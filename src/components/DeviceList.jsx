import React from "react";

const DeviceList = ({ devices, searchTerm }) => {
  if (!devices || devices.length === 0) {
    return <div>No devices available.</div>;
  }

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const regex = new RegExp(`(${highlight})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-[#b3ff4a]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <ul className="divide-y">
      {devices.map((device) => (
        <li
          key={device.id}
          className="flex items-center space-x-4 py-4 hover:bg-gray-100 transition-colors duration-200"
        >
          {/* Device Name with fixed width */}
          <span className="font-semibold w-40 flex-none">{device.name}</span>
          {/* Platform with fixed width */}
          <span className="w-24 flex-none">{device.platform}</span>
          {/* Vendor with flexible width */}
          <span className="text-xl flex-grow">
            {highlightText(device.vendor, searchTerm)}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default DeviceList;
