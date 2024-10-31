import React, { useState } from "react";
import { useForgotPassword } from "../hooks/Auth/useForgetPassword";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";
import { GoBoundlessLogoGreen } from "../assets";

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const {
    mutate: requestPasswordReset,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useForgotPassword();

  const onSubmit = (data) => {
    requestPasswordReset(data.email);
  };

  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl px-5 pb-24 pt-24">
      <div className="w-full p-10 endpoint-card shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          <img
            src={GoBoundlessLogoGreen}
            alt="Pocket Icon"
            className="w-auto h-auto"
          />
          <h1 className="mt-8 text-3xl font-bold text-center">
            Forgot your password?
          </h1>
        </div>
        {isSuccess ? (
          <div className="mt-4">
            <p className="text-lg text-gray-700 mb-4">
              Instructions to reset your password have been sent to your email.
              If you did not receive the email, please check your spam folder.
            </p>
            <div className="mt-5 flex justify-center">
              <a
                href="/login"
                className="px-4 py-2 text-blue-500 hover:underline"
              >
                Back to Login
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <p className="text-sm text-gray-700 text-center max-w-lg mb-8">
              Enter your email address and we will send you instructions to
              reset your password.
            </p>
            {/* Email Input Field */}
            <div className="relative">
              <input
                type="email"
                required
                {...register("email", { required: "Email is required" })}
                placeholder="Email Address"
                className="w-full p-3 mb-4 bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* Error Message */}
            {isError && (
              <p className="text-red-500 text-sm mt-1">
                {error.response?.data?.message ||
                  "An error occurred. Please try again."}
              </p>
            )}
            {/* Continue Button */}
            <div className="mt-4 flex justify-center">
              <CustomButton
                type="submit"
                fullWidth={true}
                text={isLoading ? "Sending..." : "Send Email"}
                disabled={isLoading}
              />
            </div>
            {/* Back to Login Link */}
            <div className="mt-6 text-center">
              <a href="/login" className="hover:underline">
                Back to Login
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
