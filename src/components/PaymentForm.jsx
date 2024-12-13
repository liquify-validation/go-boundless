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
import { useCryptoProviderStatus } from "../hooks/CryptoPayments/useCryptoProviderStatus";
import { PaymentRequestButtonElement } from "@stripe/react-stripe-js";
import { useAuth } from "../context/AuthContext";
import { useUserDetails } from "../hooks/Auth/useUserDetails";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";
import { CardIcon, EmailIcon, LockIcon } from "../assets";
import { parsePrice } from "../utilities/helpers";
import { useCreateInvoice } from "../hooks/CryptoPayments/useCreateInvoice";

const ApiUrl = import.meta.env.VITE_API_URL;
const FrontendUrl = import.meta.env.VITE_FRONTEND_URL;

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
  const {
    data: cryptoProviderStatus,
    isLoading: isCryptoStatusLoading,
    error: cryptoProviderStatusError,
  } = useCryptoProviderStatus();

  const [selectedPayment, setSelectedPayment] = useState("creditCard");
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [amount, setAmount] = useState(0);
  const [selectedPackageId, setSelectedPackageId] = useState("");
  const [isCryptoOptionAvailable, setIsCryptoOptionAvailable] = useState(false);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const {
    mutate: createInvoice,
    isLoading: isInvoiceLoading,
    isError: isInvoiceError,
  } = useCreateInvoice();

  const stripe = useStripe();
  const elements = useElements();
  const { authData } = useAuth();
  const userEmail = authData?.user?.email;
  const dentUid = authData?.user?.dent_uid;

  const [userIp, setUserIp] = useState("");
  const [userCountry, setUserCountry] = useState("");

  const email = watch("email");

  useEffect(() => {
    if (
      amount >= 2000 &&
      !isCryptoStatusLoading &&
      cryptoProviderStatus?.message === "OK"
    ) {
      setIsCryptoOptionAvailable(true);
    } else {
      setIsCryptoOptionAvailable(false);
    }

    if (cryptoProviderStatusError) {
      console.error(
        "Error fetching crypto provider status:",
        cryptoProviderStatusError
      );
    }
  }, [
    amount,
    isCryptoStatusLoading,
    cryptoProviderStatus,
    cryptoProviderStatusError,
  ]);

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

  useEffect(() => {
    if (stripe && amount > 0) {
      const pr = stripe.paymentRequest({
        country: "US",
        currency: "usd",
        total: {
          label: "Total",
          amount: amount,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      pr.canMakePayment().then((result) => {
        if (result) {
          setPaymentRequest(pr);
        } else {
          setPaymentRequest(null);
        }
      });

      pr.on("paymentmethod", async (ev) => {
        try {
          const paymentData = {
            payment_method_id: ev.paymentMethod.id,
            amount: amount,
            currency: "usd",
            inventoryItemId: selectedPackageId,
            customerEmail: ev.payerEmail || email,
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
                await stripe.confirmCardPayment(clientSecret, {
                  payment_method: ev.paymentMethod.id,
                });

              if (confirmError) {
                ev.complete("fail");
                toast.error(confirmError.message);
              } else if (paymentIntent.status === "succeeded") {
                ev.complete("success");
                navigate("/payment-success");
              } else {
                ev.complete("fail");
                toast.error("Payment was not successful. Please try again.");
              }
            },
            onError: (error) => {
              console.error("Payment failed:", error);
              toast.error("Payment failed. Please try again.");
              ev.complete("fail");
            },
          });
        } catch (error) {
          console.error("Payment Request error:", error);
          ev.complete("fail");
        }
      });
    }
  }, [
    stripe,
    amount,
    createPaymentIntent,
    selectedPackageId,
    userIp,
    userCountry,
    dentUid,
    email,
  ]);

  useEffect(() => {
    if (isPaymentError) {
      const errorMessage =
        paymentError?.response?.data?.message ||
        "Payment failed. Please try again.";
      toast.error(errorMessage);
    }
  }, [isPaymentError, paymentError]);

  const handleCheckout = async (data) => {
    if (selectedPayment === "crypto") {
      const paymentData = {
        price_amount: amount / 100,
        price_currency: "usd",
        ipn_callback_url: `${ApiUrl}/store/ipn-callback`,
        success_url: `${FrontendUrl}/payment-success`,
        cancel_url: `${FrontendUrl}/payment-cancelled`,
      };

      createInvoice(paymentData);
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

    setIsPaymentProcessing(true);

    createPaymentIntent(paymentData, {
      onSuccess: async (data) => {
        const clientSecret = data.client_secret;

        const { error: confirmError, paymentIntent } =
          await stripe.confirmCardPayment(clientSecret);

        if (confirmError) {
          console.error(confirmError);
          toast.error(confirmError.message);
          setIsPaymentProcessing(false);
          return;
        }

        if (paymentIntent.status === "succeeded") {
          setIsPaymentProcessing(false);
          navigate("/payment-success");
        } else {
          setIsPaymentProcessing(false);
          toast.error("Payment was not successful. Please try again.");
        }
      },
      onError: (error) => {
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
        setIsPaymentProcessing(false);
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleCheckout)}
      className="payment-form flex flex-col h-full "
    >
      {(isPaymentLoading || isPaymentProcessing) && (
        <LoadingSpinner text="Processing payment..." />
      )}
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
        <div className="payment-section mb-8">
          <h2 className="section-title text-xl font-semibold mb-4 flex items-center gap-3">
            <img src={CardIcon} alt="card-icon" /> Payment Information
          </h2>
          <p className="text-sm text-gray-50 mb-4 flex items-center gap-2">
            <img src={LockIcon} alt="lock-icon" className="w-4 h-4" />
            Secure payment processing.
          </p>

          {/* Payment Method Selection */}
          <hr className="border-gray-400" />
          <div className="payment-method-selection mb-6">
            {/* Credit Card Option */}
            <div className="rounded-md mb-4">
              <label
                className="flex items-center p-4 cursor-pointer"
                onClick={() => setSelectedPayment("creditCard")}
              >
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    value="creditCard"
                    checked={selectedPayment === "creditCard"}
                    onChange={() => setSelectedPayment("creditCard")}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-[#8ddc3a] checked:border-[#8ddc3a] transition-all"
                  />
                  <span className="absolute bg-[#8ddc3a] w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </div>
                <span className="ml-4 text-md font-semibold flex-1">
                  Credit Card
                </span>
                {/* Bank Card Icons */}
                <div className="flex space-x-2">
                  <FaCcVisa size={24} color="#fff" />
                  <FaCcMastercard size={24} color="#fff" />
                  <FaCcAmex size={24} color="#fff" />
                  <FaCcDiscover size={24} color="#fff" />
                  <FaCcJcb size={24} color="#fff" />
                </div>
              </label>
              {selectedPayment === "creditCard" && (
                <>
                  <div className="p-4">
                    {/* Credit Card Input */}
                    <div className="relative">
                      <CardElement
                        className="w-full contact-form-field p-3 bg-transparent focus:outline-none focus:border-primary text-gray-50"
                        options={{
                          style: {
                            base: {
                              fontSize: "16px",
                              color: "#ffffff",
                              "::placeholder": {
                                color: "#ffff",
                              },
                              iconColor: "#ffffff",
                            },
                            invalid: {
                              color: "#9e2146",
                              iconColor: "#9e2146",
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
                </>
              )}
            </div>
            <hr className="border-gray-400" />
            <div className="rounded-md mt-6">
              <label className="flex items-center p-4 cursor-pointer">
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    value="crypto"
                    checked={selectedPayment === "crypto"}
                    disabled={!isCryptoOptionAvailable}
                    onChange={() => {
                      if (isCryptoOptionAvailable) {
                        setSelectedPayment("crypto");
                      }
                    }}
                    className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-[#8ddc3a] checked:border-[#8ddc3a] transition-all disabled:opacity-50"
                  />
                  <span className="absolute bg-[#8ddc3a] w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                </div>
                <span className="ml-4 text-md font-semibold flex-1">
                  Crypto
                </span>
              </label>

              {!isCryptoOptionAvailable && (
                <div className="p-4">
                  <p className="text-red-500 text-sm">
                    Crypto payments are only available on products over $20.
                  </p>
                </div>
              )}

              {/* Only show instructions if crypto is selected and available */}
              {selectedPayment === "crypto" && isCryptoOptionAvailable && (
                <div className="p-4">
                  <p>Proceed to pay with cryptocurrency.</p>
                </div>
              )}
              <hr className="border-gray-400 mt-4" />
            </div>
          </div>
          {paymentRequest && (
            <>
              <div className="rounded-md mt-6">
                <label
                  className="flex items-center p-4 cursor-pointer"
                  onClick={() => setSelectedPayment("digitalWallet")}
                >
                  <div className="relative flex items-center">
                    <input
                      type="radio"
                      value="digitalWallet"
                      checked={selectedPayment === "digitalWallet"}
                      onChange={() => setSelectedPayment("digitalWallet")}
                      className="peer h-4 w-4 cursor-pointer appearance-none rounded-full border border-[#8ddc3a] checked:border-[#8ddc3a] transition-all"
                    />
                    <span className="absolute bg-[#8ddc3a] w-2 h-2 rounded-full opacity-0 peer-checked:opacity-100 transition-opacity duration-200 left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"></span>
                  </div>
                  <span className="ml-4 text-md font-semibold flex-1">
                    Apple Pay / Google Pay
                  </span>
                </label>
                {selectedPayment === "digitalWallet" && (
                  <div className="p-4">
                    <PaymentRequestButtonElement
                      options={{ paymentRequest }}
                      className="payment-request-button"
                    />
                  </div>
                )}
                <hr className="border-gray-400 mt-4" />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Checkout Button and Small Print */}
      <div className="mt-auto">
        <CustomButton
          text={
            selectedPayment === "creditCard"
              ? "Checkout"
              : selectedPayment === "crypto"
              ? "Pay with Crypto"
              : "Checkout"
          }
          type={selectedPayment === "creditCard" ? "submit" : "button"}
          onClick={
            selectedPayment === "crypto"
              ? () => handleSubmit(handleCheckout)()
              : null
          }
          fullWidth
          textSize="text-lg"
          disabled={selectedPayment === "digitalWallet"}
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
