import React from "react";
import { LoginForm } from "../components";
import { WorldMapBg } from "../assets";

function Login() {
  return (
    <section
      className="relative bg-cover bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div>
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
