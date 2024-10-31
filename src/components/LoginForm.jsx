import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";
import { GoBoundlessLogoGreen } from "../assets";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectTo, packageData } = location.state || {};
  const { loginUser, loginError, loginLoading, authData } = useAuth();

  const onSubmit = (data) => {
    loginUser(data);
  };

  useEffect(() => {
    if (authData.userAccessToken) {
      navigate(redirectTo || "/", { state: { packageData } });
    }
  }, [authData.userAccessToken, navigate, redirectTo, packageData]);

  return (
    <div className="max-w-xl mx-auto py-8 px-8 bg-white rounded-xl shadow-lg endpoint-card">
      <img className="mx-auto mb-8" src={GoBoundlessLogoGreen} />
      <h2 className="text-4xl font-bold mb-4 text-center">Welcome Back</h2>
      <p className="text-center mb-14">It's great to see you again!</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
            className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
            placeholder=" "
            required
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Email
          </label>
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <input
            type="password"
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
            placeholder=" "
            required
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Password
          </label>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Forgot Password */}
        <div className="text-right">
          <a href="/forgot-password" className="text-sm  hover:underline">
            Forgot password?
          </a>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-4">
          {loginError && (
            <p className="text-red-500 text-sm mt-1">{loginError}</p>
          )}

          {/* Submit Button */}
          <div className="flex justify-center pt-4">
            <CustomButton
              fullWidth={true}
              text={loginLoading ? "Logging in..." : "Login"}
              disabled={loginLoading}
            />
          </div>
        </div>
      </form>

      {/* Sign-up Prompt */}
      <div className="text-center mt-6">
        <p className="text-sm">
          Don’t have an account?{" "}
          <a href="/signup" className=" hover:underline">
            Sign up
          </a>
        </p>
      </div>

      {/* Terms and Conditions */}
      <div className="text-center mt-8 text-xs text-gray-500">
        By continuing, you accept our{" "}
        <a href="/terms" className=" hover:underline">
          Terms and Conditions
        </a>{" "}
        and the{" "}
        <a href="/privacy" className=" hover:underline">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  );
};

export default LoginForm;
