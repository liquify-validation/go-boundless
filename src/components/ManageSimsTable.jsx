import React from "react";
import { useCustomerActivations } from "../hooks/useCustomerActivations";
import { Link } from "react-router-dom";

const ManageSimsTable = () => {
  const { data, isLoading, isError, error } = useCustomerActivations();

  if (isLoading) {
    return <p className="text-center">Loading activated items...</p>;
  }

  if (isError) {
    return (
      <p className="text-center text-red-500">
        Error loading activated items: {error.message}
      </p>
    );
  }

  const activatedItems = data?.activatedItems || [];

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 bg-white rounded-xl shadow-lg mb-32 mt-16">
      <h2 className="text-4xl font-bold mb-6 text-center">Your Plans</h2>
      <table className="min-w-full bg-white border">
        <thead className="bg-gray-200">
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
            <tr key={item.uid} className="border-b">
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
