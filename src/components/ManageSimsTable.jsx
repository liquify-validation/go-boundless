import React, { useEffect } from "react";
import { useCustomerActivations } from "../hooks/useCustomerActivations";
import WarningCard from "./WarningCard";
import { Link } from "react-router-dom";
import { WorldMapBg } from "../assets";
import LoadingSpinner from "./LoadingSpinner";
import { toast } from "react-toastify";

const ManageSimsTable = () => {
  const { data, isLoading, isError, error } = useCustomerActivations();

  useEffect(() => {
    if (isError) {
      const errorMessage = error.data?.error || error.message;
      toast.error(`Error loading activated items: ${errorMessage}`);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading activated items..." />
      </div>
    );
  }

  const activatedItems = data?.activatedItems?.activatedItems || [];

  if (activatedItems.length === 0) {
    return (
      <WarningCard
        title="No Activated Items"
        message="You currently have no activated items."
        buttonText="Add a Product"
        buttonLink="/data-packages"
      />
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-8  shadow-lg mb-32 mt-16 endpoint-card">
      <h2 className="text-4xl font-bold mb-6 text-center">Your Plans</h2>
      <table className="min-w-full endpoint-table">
        <thead className="border-b">
          <tr>
            <th className="py-3 px-6 text-left">Plan Name</th>
            <th className="py-3 px-6 text-left">Activated At</th>
            <th className="py-3 px-6 text-left">Expires At</th>
            <th className="py-3 px-6 text-left">Available Balance</th>
            <th className="py-3 px-6 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {activatedItems.map((item) => (
            <tr key={item.uid} className="">
              <td className="py-3 px-6">{item.balance.name}</td>
              <td className="py-3 px-6">
                {new Date(item.balance.activatedAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                {new Date(item.balance.expiresAt).toLocaleDateString()}
              </td>
              <td className="py-3 px-6">
                {item.balance.availableBalance.sizeValue}{" "}
                {item.balance.availableBalance.sizeUnit}
              </td>
              <td className="py-3 px-6">
                <Link
                  to={`/manage-plan/${item.uid}`}
                  className="text-primary hover:underline"
                >
                  Manage Plan
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageSimsTable;
