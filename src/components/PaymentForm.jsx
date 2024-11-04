import React, { useState, useEffect } from "react";
import CustomButton from "../ui/CustomButton";
import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import {
  FaCcVisa,
  FaCcMastercard,
  FaCcAmex,
  FaCcDiscover,
  FaCcJcb,
} from "react-icons/fa";
import { useCreatePaymentIntent } from "../hooks/useCreatePaymentIntent";
import { useAuth } from "../context/AuthContext";
import { useUserDetails } from "../hooks/Auth/useUserDetails";
import LoadingSpinner from "./LoadingSpinner";
import { CardIcon, EmailIcon, LockIcon } from "../assets";
import { parsePrice } from "../utilities/helpers";

// TO DO - Card Icon in input visible
// TO DO - mastercard visa etc in line with payment information
// TO DO - add in digital payments
// TO DO - add crypto payments in
// TO DO - Add loading spinner

const PaymentForm = () => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const { packageData } = location.state || {};
  const { data: userDetails, isLoading, isError } = useUserDetails();

  const [selectedPayment, setSelectedPayment] = useState("creditCard");
  const [amount, setAmount] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState("");

  const stripe = useStripe();
  const elements = useElements();
  const { authData } = useAuth();
  const userEmail = authData?.user?.email;
  const dentUid = authData?.user?.dent_uid;

  const [userIp, setUserIp] = useState("");
  const [userCountry, setUserCountry] = useState("");

  const email = watch("email");

  useEffect(() => {
    if (userDetails) {
      setValue("firstName", userDetails.first_name);
      setValue("lastName", userDetails.last_name);
      setValue("email", userDetails.email);
      setValue("confirmEmail", userDetails.email);
    }
  }, [userDetails, setValue]);

  useEffect(() => {
    if (packageData) {
      setAmount(parsePrice(packageData.price) * 100);
      setSelectedPackageId(packageData.id);
    }

    const fetchUserLocation = async () => {
      try {
        const response = await fetch("https://ipapi.co/json/");
        const data = await response.json();
        console.log("ip fetched?", data);
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
    isLoading: isPaymentLoading,
    isError: isPaymentError,
    error: paymentError,
  } = useCreatePaymentIntent();

  const handleCheckout = async (data) => {
    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error: paymentMethodError, paymentMethod } =
      await stripe.createPaymentMethod({
        type: "card",
        card: cardElement,
        billing_details: {
          name: `${data.firstName} ${data.lastName}`,
          email: data.email,
        },
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
      customerEmail: data.email,
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
    <form
      onSubmit={handleSubmit(handleCheckout)}
      className="payment-form flex flex-col h-full"
    >
      {/* Back Button */}
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="text-gray-50 hover:underline text-start ml-4 text-xs mb-4"
      >
        &larr; Back
      </button>

      {/* Main Content */}
      <div className="flex-grow">
        {/* Contact Info Section */}
        <div className="contact-info-section mb-8 mt-8">
          <h2 className="section-title flex items-center text-lg font-semibold mb-4 ml-4 gap-3">
            <img src={EmailIcon} alt="email-icon" /> Contact Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12">
            {/* First Name */}
            <div className="relative">
              <input
                type="text"
                {...register("firstName", {
                  required: "First name is required",
                })}
                className="w-full pl-4 p-2 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
                placeholder=" "
              />
              <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
                First Name
              </label>
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.firstName.message}
                </p>
              )}
            </div>

            {/* Last Name */}
            <div className="relative">
              <input
                type="text"
                {...register("lastName", { required: "Last name is required" })}
                className="w-full pl-4 p-2 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
                placeholder=" "
              />
              <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
                Last Name
              </label>
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.lastName.message}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="relative">
              <input
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                className="w-full pl-4 p-2 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
                placeholder=" "
              />
              <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
                Email
              </label>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Confirm Email */}
            <div className="relative">
              <input
                type="email"
                {...register("confirmEmail", {
                  required: "Please confirm your email",
                  validate: (value) => value === email || "Emails do not match",
                })}
                className="w-full pl-4 p-2 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
                placeholder=" "
              />
              <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
                Confirm Email
              </label>
              {errors.confirmEmail && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmEmail.message}
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="border-gray-300 my-4" />

        {/* Payment Section */}
        <div className="p-4 rounded-lg">
          <div className="payment-section mb-8">
            <h2 className="section-title flex items-center text-xl font-semibold mb-2 gap-3">
              <img src={CardIcon} alt="card-icon" /> Payment Information
            </h2>
            <p className="text-sm text-gray-50 mb-4 flex items-center gap-2">
              <img src={LockIcon} alt="lock-icon" className="w-4 h-4" />
              Secure payment processing.
            </p>

            {/* Bank Card Icons */}
            <div className="flex space-x-4 mb-4">
              <FaCcVisa size={24} color="#fff" />
              <FaCcMastercard size={24} color="#fff" />
              <FaCcAmex size={24} color="#fff" />
              <FaCcDiscover size={24} color="#fff" />
              <FaCcJcb size={24} color="#fff" />
            </div>

            {/* Credit Card Input */}
            <div className="relative">
              <CardElement
                className="w-full pl-4 p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4 text-gray-50"
                options={{
                  style: {
                    base: {
                      fontSize: "16px",
                      color: "#ffffff",
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
              {errors.card && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.card.message}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Checkout Button and Small Print */}
      <div className="mt-auto">
        <CustomButton
          text="Checkout"
          type="submit"
          fullWidth
          textSize="text-lg"
        />
        <p className="text-xs text-gray-50 mt-4 ml-1 mb-2">
          *By clicking on Checkout you automatically agree to the 
          <a href="/terms" className="underline">
            {" "}
            Terms & Conditions{" "}
          </a>
          and confirm that your smartphone supports eSIM.
        </p>
      </div>
    </form>
  );
};

export default PaymentForm;
