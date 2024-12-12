import React from "react";
import { SignupForm } from "../components";
import { WorldMapBg } from "../assets";
import { Helmet } from "react-helmet-async";

const Signup = () => {
  return (
    <section
      className="relative bg-cover bg-center"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Create an Account</title>
        <meta
          name="description"
          content="Join us and enjoy global connectivity with our international eSIM solutions. Sign up now and go boundless wherever you travel."
        />

        <meta
          property="og:title"
          content="Go Boundless Now | Create an Account"
        />
        <meta
          property="og:description"
          content="Join us and enjoy global connectivity with our international eSIM solutions. Sign up now and go boundless wherever you travel."
        />
        <meta property="og:url" content="https://goboundlessnow.com/signup" />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Create an Account | International eSIM Sign-Up"
        />
        <meta
          name="twitter:description"
          content="Join us and enjoy global connectivity with our international eSIM solutions. Sign up now and go boundless wherever you travel."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link rel="canonical" href="https://goboundlessnow.com/signup" />
      </Helmet>
      <div>
        <SignupForm />
      </div>
    </section>
  );
};

export default Signup;
