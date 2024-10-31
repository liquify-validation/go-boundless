import React from "react";
import { SignupForm } from "../components";
import { WorldMapBg } from "../assets";

const Signup = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
