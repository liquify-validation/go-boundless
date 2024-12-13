import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { useAvailableCryptos } from "../hooks/CryptoPayments/useAvailableCryptos";
import { useMinimumPaymentAmount } from "../hooks/CryptoPayments/useMinimumPaymentAmount";
import { useEstimatedPrice } from "../hooks/CryptoPayments/useEstimatedPrice";
import { useCreateCryptoPayment } from "../hooks/CryptoPayments/useCreateCryptoPayment";
import { useCryptoPaymentStatus } from "../hooks/CryptoPayments/useCryptoPaymentStatus";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";
import { QRCode } from "react-qrcode-logo";

const CryptoModal = ({
  isOpen,
  onClose,
  amountUSD,
  email,
  orderId,
  orderDescription,
  inventoryItemId,
  userIp,
  userCountry,
  expectedPrice,
  customerUid,
}) => {
  const [step, setStep] = useState(1);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [cryptoPaymentDetails, setCryptoPaymentDetails] = useState(null);
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false);
  const [estimatedAmount, setEstimatedAmount] = useState(null);
  const [minAmount, setMinAmount] = useState(null);

  const navigate = useNavigate();

  const {
    data: availableCryptosData,
    isLoading: isCryptosLoading,
    isError: isCryptosError,
    error: cryptosError,
  } = useAvailableCryptos();

  const {
    data: minAmountData,
    refetch: refetchMinAmount,
    isLoading: isMinAmountLoading,
  } = useMinimumPaymentAmount(selectedCrypto, "usd", { enabled: false });

  const {
    data: estimatedPriceData,
    refetch: refetchEstimatedPrice,
    isLoading: isEstimatedPriceLoading,
  } = useEstimatedPrice(amountUSD, "usd", selectedCrypto, { enabled: false });

  useEffect(() => {
    if (step === 2 && selectedCrypto) {
      refetchMinAmount();
      refetchEstimatedPrice();
    }
  }, [step, selectedCrypto, refetchMinAmount, refetchEstimatedPrice]);

  useEffect(() => {
    let interval;
    if (step === 2 && selectedCrypto) {
      interval = setInterval(() => {
        refetchMinAmount();
        refetchEstimatedPrice();
      }, 30000);

      return () => clearInterval(interval);
    }
  }, [step, selectedCrypto, refetchMinAmount, refetchEstimatedPrice]);

  useEffect(() => {
    if (minAmountData) {
      setMinAmount(parseFloat(minAmountData.min_amount));
    }
    if (estimatedPriceData) {
      setEstimatedAmount(parseFloat(estimatedPriceData.estimated_amount));
    }
  }, [minAmountData, estimatedPriceData]);

  const {
    mutate: createCryptoPayment,
    data: cryptoPaymentResponse,
    isLoading: isCreateCryptoPaymentLoading,
    isError: isCreateCryptoPaymentError,
    error: createCryptoPaymentError,
  } = useCreateCryptoPayment();

  const handleBuyNow = () => {
    if (!estimatedAmount || !minAmount) {
      toast.error("Fetching payment details. Please wait...");
      return;
    }

    if (estimatedAmount < minAmount) {
      toast.error(
        "Estimated amount is less than the minimum allowed for this cryptocurrency."
      );
      return;
    }

    const paymentData = {
      amount: amountUSD,
      pay_currency: selectedCrypto,
      customerEmail: email,
      order_id: orderId,
      order_description: orderDescription,
      inventoryItemId: inventoryItemId,
      userIp: userIp,
      userCountry: userCountry,
      expectedPrice: expectedPrice,
      customerUid: customerUid,
    };

    setIsPaymentProcessing(true);
    createCryptoPayment(paymentData);
  };

  useEffect(() => {
    if (cryptoPaymentResponse) {
      setCryptoPaymentDetails(cryptoPaymentResponse);
      setIsPaymentProcessing(false);
    }
  }, [cryptoPaymentResponse]);

  useEffect(() => {
    if (isCreateCryptoPaymentError) {
      console.error("Crypto payment failed:", createCryptoPaymentError);
      toast.error(
        createCryptoPaymentError.message || "Failed to create crypto payment."
      );
      setIsPaymentProcessing(false);
    }
  }, [isCreateCryptoPaymentError, createCryptoPaymentError]);

  const { data: paymentStatusData } = useCryptoPaymentStatus(
    cryptoPaymentDetails?.payment_id
  );

  useEffect(() => {
    if (paymentStatusData) {
      const status = paymentStatusData.payment_status;
      if (status === "finished") {
        navigate("/payment-success");
      } else if (status === "failed") {
        toast.error("Crypto payment failed.");
        setIsPaymentProcessing(false);
      }
    }
  }, [paymentStatusData, navigate]);

  if (!isOpen) return null;

  const renderContent = () => {
    if (isPaymentProcessing || isCreateCryptoPaymentLoading) {
      return <LoadingSpinner text="Processing payment..." />;
    }

    if (cryptoPaymentDetails) {
      return (
        <div>
          <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
          <p className="mb-2">
            Please send exactly{" "}
            <strong>
              {cryptoPaymentDetails.pay_amount}{" "}
              {cryptoPaymentDetails.pay_currency.toUpperCase()}
            </strong>{" "}
            to the following address:
          </p>
          <p className="font-mono break-all mb-4">
            {cryptoPaymentDetails.pay_address}
          </p>
          {/* Display QR code */}
          <div className="flex justify-center mb-4">
            <QRCode value={cryptoPaymentDetails.pay_address} size={200} />
          </div>
          <p className="mt-2">Waiting for payment confirmation...</p>
          <div className="flex justify-end mt-4">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      );
    }

    if (step === 1) {
      if (isCryptosLoading) {
        return <p>Loading available cryptocurrencies...</p>;
      }

      if (isCryptosError) {
        return <p>Error fetching cryptocurrencies: {cryptosError.message}</p>;
      }

      const availableCryptos = availableCryptosData?.currencies || [];

      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Select Cryptocurrency</h2>
          <select
            value={selectedCrypto || ""}
            onChange={(e) => setSelectedCrypto(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="" disabled>
              -- Select a Cryptocurrency --
            </option>
            {availableCryptos.map((crypto, index) => (
              <option key={crypto.currency || index} value={crypto.currency}>
                {crypto.currency.toUpperCase()}
              </option>
            ))}
          </select>
          <div className="flex justify-end mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md mr-2"
            >
              Cancel
            </button>
            <button
              onClick={() => (selectedCrypto ? setStep(2) : null)}
              disabled={!selectedCrypto}
              className={`px-4 py-2 rounded-md text-white ${
                selectedCrypto
                  ? "bg-blue-500 hover:bg-blue-600"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      );
    } else if (step === 2) {
      return (
        <div>
          <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
          <p className="mb-2">
            Estimated Amount:{" "}
            {estimatedAmount
              ? `${estimatedAmount} ${selectedCrypto.toUpperCase()}`
              : "Loading..."}
          </p>
          <p className="mb-4">
            Minimum Amount:{" "}
            {minAmount
              ? `${minAmount} ${selectedCrypto.toUpperCase()}`
              : "Loading..."}
          </p>
          <p className="text-sm text-gray-400 mb-6">
            Note: These values update every 30 seconds.
          </p>
          <div className="flex justify-between">
            <button
              onClick={() => setStep(1)}
              className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md"
            >
              Back
            </button>
            <button
              onClick={handleBuyNow}
              disabled={
                !estimatedAmount ||
                !minAmount ||
                isEstimatedPriceLoading ||
                isMinAmountLoading
              }
              className={`px-4 py-2 rounded-md text-white ${
                !estimatedAmount ||
                !minAmount ||
                isEstimatedPriceLoading ||
                isMinAmountLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-500 hover:bg-green-600"
              }`}
            >
              Buy Now
            </button>
          </div>
        </div>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {renderContent()}
    </Modal>
  );
};

export default CryptoModal;
