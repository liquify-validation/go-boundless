import React, { useEffect } from "react";
import { usePendingActivations } from "../hooks/usePendingActivations";
import LoadingSpinner from "./LoadingSpinner";

const PendingActivationsTable = () => {
  const { data, isLoading, isError, error } = usePendingActivations();

  useEffect(() => {
    if (isError) {
      console.error("Error fetching pending activations:", error);
    }
  }, [isError, error]);

  if (isLoading) {
    return (
      <div className="relative">
        <LoadingSpinner text="Loading pending activations..." />
      </div>
    );
  }

  const pendingActivations = data || [];

  if (pendingActivations.length === 0) {
    return (
      <div className="text-center py-12">
        <p>You have no pending activations.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-12 px-8 shadow-lg mb-32 mt-16 endpoint-card">
      <h2 className="text-4xl font-bold mb-6 text-center">
        Pending Activations
      </h2>
      <table className="min-w-full endpoint-table">
        <thead className="border-b">
          <tr>
            <th className="py-3 px-6 text-left">Activation Code</th>
            <th className="py-3 px-6 text-left">Installation URL</th>
            <th className="py-3 px-6 text-left">Created At</th>
          </tr>
        </thead>
        <tbody>
          {pendingActivations.map((activation) => (
            <tr key={activation.id}>
              <td className="py-3 px-6">{activation.activation_code}</td>
              <td className="py-3 px-6">
                <a
                  href={activation.installation_url}
                  className="text-primary hover:underline"
                >
                  {activation.installation_url}
                </a>
              </td>
              <td className="py-3 px-6">
                {new Date(activation.created_at).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PendingActivationsTable;
