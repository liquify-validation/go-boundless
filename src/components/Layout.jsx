import React from "react";
import Navbar from "../global/Navbar";
import Footer from "../global/Footer";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <header>
        <Navbar />
      </header>
      <main className="flex-grow container mx-auto p-4">{children}</main>
      <footer>
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
