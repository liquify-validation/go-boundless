import React from "react";
import { useForm } from "react-hook-form";
import CustomButton from "../ui/CustomButton";

// TO DO - ADD CONTACT FORM API LOGIC

const ContactForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // API call logic will go here
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-8 bg-white rounded-xl shadow-lg endpoint-card">
      <h2 className="text-5xl font-bold mb-10 text-center">Contact Us</h2>
      <p className="text-gray-50 text-md text-center mx-auto max-w-[90%] pb-4">
        GoBoundless offers the best prepaid eSIM for your journey around the
        world. Stay connected to family, friends, and apps 24/7 with no worries
        and enjoy being boundless anywhere around the globe.
      </p>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-8">
        {/* First Name and Last Name */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              {...register("firstName", { required: "First name is required" })}
              className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-gray-400 transition-opacity duration-300 pointer-events-none
                            peer-placeholder-shown:opacity-100
                            peer-focus:opacity-0
                            peer-valid:opacity-0"
            >
              First Name
            </label>
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.firstName.message}
              </p>
            )}
          </div>

          <div className="relative">
            <input
              type="text"
              {...register("lastName", { required: "Last name is required" })}
              className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-gray-400 transition-opacity duration-300 pointer-events-none
                            peer-placeholder-shown:opacity-100
                            peer-focus:opacity-0
                            peer-valid:opacity-0"
            >
              Last Name
            </label>
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {errors.lastName.message}
              </p>
            )}
          </div>
        </div>

        {/* Subject and Email */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="relative">
            <input
              type="text"
              {...register("subject", { required: "Subject is required" })}
              className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-gray-400 transition-opacity duration-300 pointer-events-none
                            peer-placeholder-shown:opacity-100
                            peer-focus:opacity-0
                            peer-valid:opacity-0"
            >
              Subject
            </label>
            {errors.subject && (
              <p className="text-red-500 text-sm mt-1">
                {errors.subject.message}
              </p>
            )}
          </div>

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
              className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer"
              placeholder=" "
              required
            />
            <label
              className="absolute left-4 top-3 text-gray-400 transition-opacity duration-300 pointer-events-none
                            peer-placeholder-shown:opacity-100
                            peer-focus:opacity-0
                            peer-valid:opacity-0"
            >
              Email
            </label>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        {/* Message Box */}
        <div className="relative">
          <textarea
            {...register("message", { required: "Message is required" })}
            rows="5"
            className="w-full p-3 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer"
            placeholder=" "
            required
          />
          <label
            className="absolute  left-4 top-3 text-gray-400 transition-opacity duration-300 pointer-events-none
                          peer-placeholder-shown:opacity-100
                          peer-focus:opacity-0
                          peer-valid:opacity-0"
          >
            Message
          </label>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1">
              {errors.message.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center pt-6">
          <CustomButton text="Submit" px="px-10" />
        </div>
      </form>
    </div>
  );
};

export default ContactForm;
