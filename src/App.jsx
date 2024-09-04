import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Data from "./pages/Data";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Manage from "./pages/Manage";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import GoPoints from "./pages//GoPoints";
import Promos from "./pages/Promos";
import OrderHistory from "./pages/OrderHistory";

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/data" element={<Data />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/manage" element={<Manage />} />
          <Route path="/contact-us" element={<Contact />} />

          {/* Nested routes for profile */}
          <Route path="/profile/settings" element={<Settings />} />
          <Route path="/profile/go-points" element={<GoPoints />} />
          <Route path="/profile/promos" element={<Promos />} />
          <Route path="/profile/order-history" element={<OrderHistory />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
