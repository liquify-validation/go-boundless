import React, { useEffect } from "react";
import { useCustomerActivations } from "../hooks/useCustomerActivations";
import LoadingSpinner from "./LoadingSpinner";
import WarningCard from "./WarningCard";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { QRCode } from "react-qrcode-logo";
import Modal from "react-modal";

const ManageSimsTable = () => {
  const {
    data: customerActivationsData,
    isLoading: isCustomerActivationsLoading,
    isError: isCustomerActivationsError,
    error: customerActivationsError,
  } = useCustomerActivations();

  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const [qrCodeValue, setQrCodeValue] = React.useState("");

  useEffect(() => {
    if (isCustomerActivationsError) {
      const statusCode = customerActivationsError?.response?.status;
      const defaultErrorMessage =
        customerActivationsError.data?.error ||
        customerActivationsError.message;

      if (statusCode === 404) {
        toast.error("No data found for your account.");
      } else {
        toast.error(`Error loading activated items: ${defaultErrorMessage}`);
      }
    }
  }, [isCustomerActivationsError, customerActivationsError]);

  if (isCustomerActivationsLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading your plans..." />
      </div>
    );
  }

  const activatedItems =
    customerActivationsData?.activatedItems?.activatedItems || [];
  const relatedEsims =
    customerActivationsData?.activatedItems?.relatedEsims || [];

  if (
    isCustomerActivationsError &&
    customerActivationsError?.response?.status === 404
  ) {
    return (
      <WarningCard
        title="No Plans Found"
        message="You currently have no plans."
        buttonText="Add a Product"
        buttonLink="/data-packages"
      />
    );
  }

  const combinedData = activatedItems.map((item, index) => {
    const esim = relatedEsims[index];

    const isPending = !esim.activatedAt;

    return {
      id: item.uid,
      planName: item.balance.name,
      activatedAt: item.balance.activatedAt
        ? new Date(item.balance.activatedAt).toLocaleDateString()
        : "-",
      expiresAt: item.balance.expiresAt
        ? new Date(item.balance.expiresAt).toLocaleDateString()
        : "-",
      availableBalance: item.balance.availableBalance
        ? `${item.balance.availableBalance.sizeValue} ${item.balance.availableBalance.sizeUnit}`
        : "-",
      activationCode: isPending ? esim.activationCode : null,
      isPending,
      managePlanLink: `/manage-plan/${item.uid}`,
    };
  });

  const openModal = (activationCode) => {
    setQrCodeValue(activationCode);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setQrCodeValue("");
  };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 shadow-lg mb-32 mt-16 endpoint-card">
      <h2 className="text-4xl font-bold mb-6 text-center">Your Plans</h2>
      <table className="min-w-full endpoint-table">
        <thead className="border-b">
          <tr>
            <th className="py-3 px-6 text-left">Plan Name</th>
            <th className="py-3 px-6 text-left">Activated At</th>
            <th className="py-3 px-6 text-left">Expires At</th>
            <th className="py-3 px-6 text-left">Available Balance</th>
            <th className="py-3 px-6 text-left">Activation Code</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {combinedData.map((item) => (
            <tr key={item.id}>
              <td className="py-3 px-6">{item.planName}</td>
              <td className="py-3 px-6">{item.activatedAt}</td>
              <td className="py-3 px-6">{item.expiresAt}</td>
              <td className="py-3 px-6">{item.availableBalance}</td>
              <td className="py-3 px-6">
                {item.activationCode ? (
                  <button
                    className="text-primary hover:underline"
                    onClick={() => openModal(item.activationCode)}
                  >
                    View Activation Code
                  </button>
                ) : (
                  "-"
                )}
              </td>
              <td className="py-3 px-6">
                {item.isPending ? (
                  "-"
                ) : (
                  <Link
                    to={item.managePlanLink}
                    className="text-primary hover:underline"
                  >
                    Manage Plan
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for displaying QR code */}
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Activation Code QR"
        style={{
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            transform: "translate(-50%, -50%)",
            color: "black",
            maxWidth: "90%",
            maxHeight: "90%",
            overflowY: "auto",
            padding: "2rem",
            borderRadius: "4px",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
        }}
        ariaHideApp={false}
      >
        <h2 className="text-xl font-bold mb-4">Activation Code</h2>
        <div className="flex justify-center">
          <QRCode value={qrCodeValue} size={200} />
        </div>
        <p className="mt-4 text-sm break-all">{qrCodeValue}</p>
        <button
          className="mt-8 px-4 py-2 bg-primary text-black font-semibold rounded"
          onClick={closeModal}
        >
          Close
        </button>
      </Modal>
    </div>
  );
};

export default ManageSimsTable;
