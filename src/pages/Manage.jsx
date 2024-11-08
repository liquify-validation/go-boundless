import React, { useState } from "react";
import { ManageSimsTable, PendingActivationsTable } from "../components";
import { WorldMapBg } from "../assets";

function Manage() {
  return (
    <section
      className="relative py-40 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="max-w-7xl mx-auto px-4">
        <ManageSimsTable />
      </div>
    </section>
  );
}

export default Manage;
