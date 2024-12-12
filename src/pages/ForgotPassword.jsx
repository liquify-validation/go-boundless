import { Helmet } from "react-helmet-async";
import { WorldMapBg } from "../assets";
import { ForgotPasswordForm } from "../components";

function ForgotPassword() {
  return (
    <section
      className="relative bg-cover bg-center py-8"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Forgot Password?</title>
        <meta
          name="description"
          content="Lost access to your account? Reset your password securely and regain access to your international eSIM services."
        />

        <meta
          property="og:title"
          content="Go Boundless Now | Forgot Password?"
        />
        <meta
          property="og:description"
          content="Lost access to your account? Reset your password securely and regain access to your international eSIM services."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/forgot-password"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Forgot Password | Recover Your Account"
        />
        <meta
          name="twitter:description"
          content="Lost access to your account? Reset your password securely and regain access to your international eSIM services."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link
          rel="canonical"
          href="https://goboundlessnow.com/forgot-password"
        />
      </Helmet>
      <div>
        <ForgotPasswordForm />
      </div>
    </section>
  );
}

export default ForgotPassword;
