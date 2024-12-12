import { Helmet } from "react-helmet-async";
import { WorldMapBg } from "../assets";
import { ResetPasswordForm } from "../components";

function ResetPassword() {
  return (
    <section
      className="relative bg-cover bg-center py-8"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Reset Your Password</title>
        <meta
          name="description"
          content="Reset your password securely to continue enjoying seamless global connectivity with our international eSIM services."
        />

        <meta
          property="og:title"
          content="Go Boundless Now | Reset Your Password"
        />
        <meta
          property="og:description"
          content="Reset your password securely to continue enjoying seamless global connectivity with our international eSIM services."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/reset-password"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Reset Your Password | Secure Account Recovery"
        />
        <meta
          name="twitter:description"
          content="Reset your password securely to continue enjoying seamless global connectivity with our international eSIM services."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link
          rel="canonical"
          href="https://goboundlessnow.com/reset-password"
        />
      </Helmet>
      <div>
        <ResetPasswordForm />
      </div>
    </section>
  );
}

export default ResetPassword;
