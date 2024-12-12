import React from "react";
import ContactForm from "../components/ContactForm";
import { WorldMapBg } from "../assets";
import { Helmet } from "react-helmet-async";

const Contact = () => {
  return (
    <section
      className="relative bg-cover bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <Helmet>
        <title>Go Boundless Now | Contact Us</title>
        <meta
          name="description"
          content="Have questions or need support? Get in touch with our team and receive assistance with your international eSIM, data packages, and account."
        />

        <meta property="og:title" content="Go Boundless Now | Contact Us" />
        <meta
          property="og:description"
          content="Have questions or need support? Get in touch with our team and receive assistance with your international eSIM, data packages, and account."
        />
        <meta
          property="og:url"
          content="https://goboundlessnow.com/contact-us"
        />
        <meta
          property="og:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Us | Get in Touch" />
        <meta
          name="twitter:description"
          content="Have questions or need support? Get in touch with our team and receive assistance with your international eSIM, data packages, and account."
        />
        <meta
          name="twitter:image"
          content="https://goboundlessnow.com/og_image.png"
        />

        <link rel="canonical" href="https://goboundlessnow.com/contact-us" />
      </Helmet>
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
