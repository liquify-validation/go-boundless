import React from "react";
import VerificationForm from "../components/VerificationForm";
import { useLocation, Navigate } from "react-router-dom";

const VerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email;

  if (!email) {
    return <Navigate to="/signup" />;
  }

  return (
    <section className="mb-16">
      <VerificationForm email={email} />
    </section>
  );
};

export default VerificationPage;
