import React from "react";
import { ManageSimsTable } from "../components";
import { WorldMapBg } from "../assets";

function Manage() {
  return (
    <section
      className="relative py-40 bg-contain bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <ManageSimsTable />
      </div>
    </section>
  );
}

export default Manage;
