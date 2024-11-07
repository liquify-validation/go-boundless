import React, { useState } from "react";
import { ManageSimsTable, PendingActivationsTable } from "../components";
import { WorldMapBg } from "../assets";

function Manage() {
  const [activeTab, setActiveTab] = useState("activated");

  return (
    <section
      className="relative py-40 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center mb-6">
          <button
            className={`mx-2 px-4 py-2 rounded ${
              activeTab === "activated"
                ? "bg-primary text-white"
                : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("activated")}
          >
            Activated Items
          </button>
          <button
            className={`mx-2 px-4 py-2 rounded ${
              activeTab === "pending" ? "bg-primary text-white" : "bg-gray-200"
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending Activations
          </button>
        </div>
        {activeTab === "activated" && <ManageSimsTable />}
        {activeTab === "pending" && <PendingActivationsTable />}
      </div>
    </section>
  );
}

export default Manage;
