import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPassword } from "../hooks/Auth/useResetPassword";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";

const ResetPassword = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const {
    mutate: resetPassword,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useResetPassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    resetPassword({ password: data.password, token });
  };

  if (isSuccess) {
    navigate("/login");
  }

  return (
    <div className="flex flex-col items-center mx-auto max-w-2xl px-5 pb-24 pt-24">
      <div className="w-full p-10 endpoint-card shadow-lg rounded-lg">
        <div className="flex flex-col items-center">
          {/* Add your logo or title here */}
          <h1 className="mt-8 text-3xl font-bold text-center">
            Reset your password
          </h1>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <p className="text-sm text-gray-700 text-center max-w-lg mb-8">
            Enter your new password below.
          </p>
          {/* Password Input Field */}
          <div className="relative">
            <input
              type="password"
              required
              {...register("password", { required: "Password is required" })}
              placeholder="New Password"
              className="w-full p-3 mb-4 bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
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
          {/* Submit Button */}
          <div className="mt-4 flex justify-center">
            <CustomButton
              type="submit"
              fullWidth={true}
              text={isLoading ? "Resetting..." : "Reset Password"}
              disabled={isLoading}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
