import React from "react";
import { LoginForm } from "../components";
import { WorldMapBg } from "../assets";
import { Helmet } from "react-helmet-async";

function Login() {
  return (
    <section
      className="relative bg-cover bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Login to Your Account</title>
        <meta
          name="description"
          content="Log in to your account to manage your eSIM data packages, view order history, and stay connected around the globe."
        />

        <meta
          property="og:title"
          content="Go Boundless Now | Login to Your Account"
        />
        <meta
          property="og:description"
          content="Log in to your account to manage your eSIM data packages, view order history, and stay connected around the globe."
        />
        <meta property="og:url" content="https://goboundlessnow.com/login" />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Login to Your Account | International eSIM"
        />
        <meta
          name="twitter:description"
          content="Log in to your account to manage your eSIM data packages, view order history, and stay connected around the globe."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link rel="canonical" href="https://goboundlessnow.com/login" />
      </Helmet>
      <div>
        <LoginForm />
      </div>
    </section>
  );
}

export default Login;
