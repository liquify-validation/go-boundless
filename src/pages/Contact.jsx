import React from "react";
import ContactForm from "../components/ContactForm";
import { WorldMapBg } from "../assets";

const Contact = () => {
  return (
    <section
      className="relative bg-cover bg-center py-36"
      style={{ backgroundImage: `url(${WorldMapBg})` }}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-10 md:px-10 md:py-16">
        {/* Contact Form */}
        <ContactForm />
      </div>
    </section>
  );
};

export default Contact;
