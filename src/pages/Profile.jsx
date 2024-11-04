import React from "react";
import { ProfileForm } from "../components";
import { WorldMapBg } from "../assets";

const Signup = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <ProfileForm />
      </div>
    </section>
  );
};

export default Signup;
