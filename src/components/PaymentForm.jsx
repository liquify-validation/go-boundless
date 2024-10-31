import React, { useState, useEffect } from "react";
import CustomButton from "../ui/CustomButton";
import { useNavigate, useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
} from "react-icons/fa";
import { FaApplePay, FaGooglePay, FaPaypal, FaBitcoin } from "react-icons/fa";
import { useCreatePaymentIntent } from "../hooks/useCreatePaymentIntent";
import { useAuth } from "../context/AuthContext";

const PaymentForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData } = location.state || {};

  const [selectedPayment, setSelectedPayment] = useState("creditCard");
  const [amount, setAmount] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState("");

  const handlePaymentSelect = (method) => {
    setSelectedPayment(method);
  };

  const stripe = useStripe();
  const elements = useElements();
  const { authData } = useAuth();
  const userEmail = authData?.user?.email;
  const dentUid = authData?.user?.dent_uid;

  const [userIp, setUserIp] = useState("");
  const [userCountry, setUserCountry] = useState("");

  useEffect(() => {
    if (packageData) {
      setAmount(parseFloat(packageData.price) * 100);
      setSelectedPackageId(packageData.id);
    }

    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        setUserIp(data.ip);
        setUserCountry(data.country_name);
      } catch (error) {
        console.error("Error fetching user location:", error);
      }
    };
    fetchUserLocation();
  }, [packageData]);

  const {
    mutate: createPaymentIntent,
    isLoading,
    isError,
    error,
  } = useCreatePaymentIntent();

  const handleCheckout = async () => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
      });

    if (paymentMethodError) {
      console.error(paymentMethodError);
      return;
    }

    const paymentData = {
      payment_method_id: paymentMethod.id,
      amount: amount,
      currency: "usd",
      inventoryItemId: selectedPackageId,
      customerEmail: userEmail,
      userIp: userIp,
      userCountry: userCountry,
      expectedPrice: {
        sortIndex: 1,
        priceValue: amount / 100,
        currencyCode: "USD",
      },
      customerUid: dentUid || "",
    };

    createPaymentIntent(paymentData, {
      onSuccess: async (data) => {
        const clientSecret = data.client_secret;

        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          console.error(confirmError);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          console.log("Payment succeeded!");
          navigate("/payment-success");
        }
      },
      onError: (error) => {
        console.error("Payment failed:", error);
      },
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-blue-500 hover:underline mb-4"
      >
        &larr; Back
      </button>

      {/* Payment Options */}
      <h2 className="text-2xl font-semibold mb-4">Payment Method</h2>
      <div className="space-y-4">
        {/* Credit Card Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === "creditCard"
              ? "border-blue-500"
              : "border-gray-300"
          }`}
          onClick={() => handlePaymentSelect("creditCard")}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedPayment === "creditCard"}
              onChange={() => handlePaymentSelect("creditCard")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-lg">Credit Card</span>
          </div>
          <div className="flex mt-2 space-x-2">
            <FaCcVisa size={36} />
            <FaCcMastercard size={36} />
            <FaCcAmex size={36} />
            <FaCcDiscover size={36} />
          </div>
          {selectedPayment === "creditCard" && (
            <div className="mt-4">
              {/* Stripe Card Element */}
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#424770",
                      "::placeholder": {
                        color: "#aab7c4",
                      },
                    },
                    invalid: {
                      color: "#9e2146",
                    },
                  },
                }}
              />
            </div>
          )}
        </div>

        {/* E-wallet Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === "eWallet"
              ? "border-blue-500"
              : "border-gray-300"
          }`}
          onClick={() => handlePaymentSelect("eWallet")}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedPayment === "eWallet"}
              onChange={() => handlePaymentSelect("eWallet")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-lg">E-Wallet</span>
          </div>
          <div className="flex mt-2 space-x-2">
            <FaApplePay size={36} />
            <FaGooglePay size={36} />
            <FaPaypal size={36} />
          </div>
        </div>

        {/* Crypto Payment Option */}
        <div
          className={`p-4 border rounded-lg cursor-pointer ${
            selectedPayment === "crypto" ? "border-blue-500" : "border-gray-300"
          }`}
          onClick={() => handlePaymentSelect("crypto")}
        >
          <div className="flex items-center">
            <input
              type="radio"
              name="paymentMethod"
              checked={selectedPayment === "crypto"}
              onChange={() => handlePaymentSelect("crypto")}
              className="form-radio h-5 w-5 text-blue-600"
            />
            <span className="ml-2 text-lg">Crypto Payment</span>
          </div>
          <div className="flex mt-2 space-x-2">
            <FaBitcoin size={36} />
            {/* Add other crypto icons as needed */}
          </div>
        </div>
      </div>

      {/* Small Print */}
      <p className="text-sm text-gray-600 mt-4">
        By clicking "Checkout", you agree to our Terms of Service and Privacy
        Policy.
      </p>

      {/* Checkout Button */}
      <div className="mt-6">
        <CustomButton text="Checkout" onClick={handleCheckout} fullWidth />
      </div>
    </div>
  );
};

export default PaymentForm;
