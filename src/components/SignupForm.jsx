import { useForm, Controller } from "react-hook-form";
import CustomButton from "../ui/CustomButton";
import { useRegister } from "../hooks/Auth/useRegister";
import { useNavigate, useLocation, Link } from "react-router-dom";
import ReactFlagsSelect from "react-flags-select";
import { GoBoundlessLogoGreen } from "../assets";
import { useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import LoadingSpinner from "./LoadingSpinner";

// TO DO - Style date of birth make it more DOB friendly

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setError,
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const { redirectTo, packageData } = location.state || {};
  const [userEmail, setUserEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const {
    mutate: registerUserMutation,
    isLoading,
    isError,
    error,
    isSuccess,
  } = useRegister();

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    const userData = {
      first_name: data.firstName,
      last_name: data.lastName,
      email: data.email,
      password: data.password,
      country: data.country,
      birthdate: data.birthdate,
      marketing_emails: data.marketingEmails,
    };

    setUserEmail(data.email);
    registerUserMutation(userData);
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/verify-email", {
        state: { email: userEmail, redirectTo, packageData },
      });
    }
  }, [isSuccess, navigate, userEmail, redirectTo, packageData]);

  useEffect(() => {
    if (isError) {
      const errorMessage =
        error.response?.data?.message ||
        "An error occurred during registration.";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <div className="max-w-2xl mx-auto py-12 px-8 bg-white rounded-xl shadow-lg endpoint-card mb-32 mt-16">
      {isLoading && <LoadingSpinner text="Registering..." />}
      <img className="mx-auto mb-4" src={GoBoundlessLogoGreen} alt="Logo" />
      <h2 className="text-4xl font-bold mb-3 text-center">Register</h2>
      <p className="text-gray-50 text-sm text-center mb-14">
        Sign up with us and go boundless.
      </p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <div className="relative">
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
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
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
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
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
            autoComplete="off"
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
            type={showPassword ? "text" : "password"}
            {...register("password", { required: "Password is required" })}
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
            autoComplete="new-password"
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Password
          </label>
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute right-4 top-4 text-gray-50 hover:text-gray-50 focus:outline-none"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <input
            type={showConfirmPassword ? "text" : "password"}
            {...register("confirmPassword", {
              required: "Please confirm your password",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Confirm Password
          </label>
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute right-4 top-4 text-gray-50 hover:text-gray-50 focus:outline-none"
            aria-label={
              showConfirmPassword
                ? "Hide confirm password"
                : "Show confirm password"
            }
          >
            {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Date of Birth */}
        <div className="relative">
          <input
            type="date"
            {...register("birthdate")}
            className="w-full p-3 mb-4 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary peer rounded-md"
            max={new Date().toISOString().split("T")[0]} // Prevent selecting future dates
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Date of Birth (Optional)
          </label>
          {errors.birthdate && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthdate.message}
            </p>
          )}
        </div>

        {/* Country of Residence */}
        <div className="relative">
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transform -translate-y-6 scale-75 origin-left">
            Country of Residence
          </label>
          <Controller
            name="country"
            control={control}
            rules={{ required: "Country of residence is required" }}
            render={({ field }) => (
              <ReactFlagsSelect
                selected={field.value}
                onSelect={field.onChange}
                className="w-full menu-flag "
                selectButtonClassName="w-full p-3 contact-form-field bg-transparent border border-gray-300 focus:outline-none focus:border-primary rounded-md mt-6"
                placeholder="Select Country"
                searchable
              />
            )}
          />
          {errors.country && (
            <p className="text-red-500 text-sm mt-1">
              {errors.country.message}
            </p>
          )}
        </div>

        {/* Marketing Preferences */}
        <div className="flex items-center mb-4 ml-2 pt-1 ">
          <input
            type="checkbox"
            id="marketingEmails"
            {...register("marketingEmails")}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="marketingEmails"
            className="ml-2 block text-sm text-gray-50"
          >
            Select this box to receive updates and marketing. You can change
            your preferences at any time as per our Privacy Policy.
          </label>
        </div>

        <div className="flex items-center mb-4 ml-2 pt-1">
          <input
            type="checkbox"
            id="termsAndConditions"
            {...register("termsAndConditions", {
              required:
                "You must agree to the Terms of Service and Privacy Policy",
            })}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor="termsAndConditions"
            className="ml-2 block text-sm text-gray-50"
          >
            By creating an account, I agree to the{" "}
            <Link to="/terms-of-use" className="text-primary hover:underline">
              Terms of Service
            </Link>{" "}
            and{" "}
            <Link to="/privacy-policy" className="text-primary hover:underline">
              Privacy Policy
            </Link>
            . I may unsubscribe at any time.
          </label>
        </div>

        {/* Error Message */}
        {isError && (
          <p className="text-red-500 text-sm mt-1">
            {error.response?.data?.message ||
              "An error occurred during registration."}
          </p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <CustomButton
            fullWidth={true}
            type="submit"
            text={isLoading ? "Registering..." : "Register"}
            px="px-10"
            disabled={isLoading}
          />
        </div>
        <div className="text-center mt-6">
          <p className="text-sm">
            Already have an account?
            <div className="mt-2">
              <a href="/login" className="hover:underline">
                Go to Login
              </a>
            </div>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignupForm;
