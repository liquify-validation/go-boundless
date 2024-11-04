import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";
import { useUserDetails } from "../hooks/useUserDetails";
import { useUpdateUserDetails } from "../hooks/Auth/useUpdateUserDetails";

// TO DO - ADD proper success message

const ProfileForm = () => {
  const { data: user, isLoading, isError, error } = useUserDetails();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const [formError, setFormError] = useState("");

  const {
    mutate: updateUserMutation,
    isLoading: isUpdating,
    isError: isUpdateError,
    error: updateError,
    isSuccess: isUpdateSuccess,
  } = useUpdateUserDetails();

  const onSubmit = (data) => {
    setFormError("");
    updateUserMutation(data, {
      onSuccess: () => {
        alert("Profile updated successfully.");
      },
      onError: (error) => {
        setFormError(
          error.response?.data?.message || "Failed to update profile."
        );
      },
    });
  };

  useEffect(() => {
    if (user) {
      setValue("firstName", user.first_name);
      setValue("lastName", user.last_name);
      setValue("birthday", user.birthdate ? user.birthdate.split("T")[0] : "");
      setValue("currency", user.currency || "USD");
      setValue("language", user.language || "English");
      setValue("marketingEmails", user.marketing_emails || false);
    }
  }, [user, setValue]);

  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-8 bg-white rounded-xl shadow-lg endpoint-card mb-32 mt-16">
        <p className="text-center">Loading...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-8 bg-white rounded-xl shadow-lg endpoint-card mb-32 mt-16">
        <p className="text-center text-red-500">
          Error loading user data: {error.message}
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-8 bg-white rounded-xl shadow-lg endpoint-card mb-32 mt-16">
      <h2 className="text-4xl font-bold mb-6 text-center">Profile</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* First Name */}
        <div className="relative">
          <input
            type="text"
            {...register("firstName", { required: "First name is required" })}
            className={`w-full p-3 mb-4 contact-form-field bg-transparent border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-primary peer rounded-md`}
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            First Name<span className="text-red-500">*</span>
          </label>
          {errors.firstName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Surname */}
        <div className="relative">
          <input
            type="text"
            {...register("lastName", { required: "Surname is required" })}
            className={`w-full p-3 mb-4 contact-form-field bg-transparent border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-primary peer rounded-md`}
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Surname<span className="text-red-500">*</span>
          </label>
          {errors.lastName && (
            <p className="text-red-500 text-sm mt-1">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Birthday */}
        <div className="relative">
          <input
            type="date"
            {...register("birthday", {
              validate: (value) => {
                if (value) {
                  const today = new Date();
                  const birthDate = new Date(value);
                  if (birthDate > today) {
                    return "Birthday cannot be in the future.";
                  }
                }
                return true;
              },
            })}
            className={`w-full p-3 mb-4 contact-form-field bg-transparent border ${
              errors.birthday ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-primary peer rounded-md`}
          />
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Birthday
          </label>
          {errors.birthday && (
            <p className="text-red-500 text-sm mt-1">
              {errors.birthday.message}
            </p>
          )}
        </div>

        {/* Currency */}
        <div className="relative">
          <select
            {...register("currency", { required: "Currency is required" })}
            className={`w-full p-3 mb-4 contact-form-field bg-transparent border ${
              errors.currency ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-primary peer rounded-md`}
          >
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
          </select>
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Currency<span className="text-red-500">*</span>
          </label>
          {errors.currency && (
            <p className="text-red-500 text-sm mt-1">
              {errors.currency.message}
            </p>
          )}
        </div>

        {/* Language */}
        <div className="relative">
          <select
            {...register("language", { required: "Language is required" })}
            className={`w-full p-3 mb-4 contact-form-field bg-transparent border ${
              errors.language ? "border-red-500" : "border-gray-300"
            } focus:outline-none focus:border-primary peer rounded-md`}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
          <label className="absolute left-4 top-0 text-gray-400 text-sm pointer-events-none transition-all duration-300 transform -translate-y-6 scale-75 origin-left">
            Language<span className="text-red-500">*</span>
          </label>
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">
              {errors.language.message}
            </p>
          )}
        </div>

        {/* Marketing Emails */}
        <div className="form-group form-check">
          <input
            id="marketingEmails"
            type="checkbox"
            {...register("marketingEmails")}
            className="form-check-input h-4 w-4 text-primary bg-gray-100 border-gray-300 rounded focus:ring-primary"
          />
          <label htmlFor="marketingEmails" className="form-check-label ml-2">
            I agree to receive marketing emails
          </label>
        </div>

        {/* Form Error */}
        {formError && (
          <p className="text-red-500 text-sm mt-1 text-center">{formError}</p>
        )}

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <CustomButton
            type="submit"
            text={isSubmitting || isUpdating ? "Saving..." : "Save"}
            px="px-10"
            disabled={isSubmitting || isUpdating}
          />
        </div>
      </form>
    </div>
  );
};

export default ProfileForm;
