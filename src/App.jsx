import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Profile from "./pages/Profile";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Manage from "./pages/Manage";
import Contact from "./pages/Contact";
import Settings from "./pages/Settings";
import GoPoints from "./pages/GoPoints";
import Promos from "./pages/Promos";
import OrderHistory from "./pages/OrderHistory";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import Checkout from "./pages/Checkout";
import SupportedCountries from "./pages/SupportedCountries";
import SupportedDevices from "./pages/SupportedDevices";
import Verification from "./pages/Verification";
import ProtectedRoute from "./components/ProtectedRoute";
import PaymentSuccess from "./pages/PaymentSuccess";
import DataPackages from "./pages/DataPackages";

import TermsOfUse from "./pages/TermsOfUse";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import ManagePlan from "./pages/ManagePlan";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const App = () => {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/data-packages" element={<DataPackages />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/sign-up" element={<Signup />} />

            <Route path="/contact-us" element={<Contact />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/payment-success" element={<PaymentSuccess />} />

            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-use" element={<TermsOfUse />} />

            <Route path="/supported-devices" element={<SupportedDevices />} />
            <Route
              path="/supported-countries"
              element={<SupportedCountries />}
            />
            <Route path="/verify-email" element={<Verification />} />

            <Route
              path="/profile/*"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage"
              element={
                <ProtectedRoute>
                  <Manage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/manage/:itemId"
              element={
                <ProtectedRoute>
                  <ManagePlan />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />

            {/* Nested routes for profile */}
            <Route
              path="/profile/settings"
              element={
                <ProtectedRoute>
                  <Settings />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/go-points"
              element={
                <ProtectedRoute>
                  <GoPoints />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/promos"
              element={
                <ProtectedRoute>
                  <Promos />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile/order-history"
              element={
                <ProtectedRoute>
                  <OrderHistory />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </Elements>
  );
};

export default App;
