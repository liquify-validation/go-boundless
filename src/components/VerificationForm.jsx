import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useVerifyCode } from "../hooks/Auth/useVerifyCode";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CustomButton from "../ui/CustomButton";
import { setStoredToken } from "../utilities/helpers";

// TO DO - ADD RESEND LOGIC

const VerificationForm = ({ email }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectTo, packageData } = location.state || {};
  const { setAuthData } = useAuth();

  const code = watch(["code1", "code2", "code3", "code4", "code5", "code6"]);

  const combinedCode = code.join("");

  const onSubmit = (data) => {
    const verificationData = {
      email: email,
      code: combinedCode,
    };
    verifyCodeMutation.mutate(verificationData);
  };

  const inputRefs = useRef([]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1 && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const {
    mutate: verifyCodeMutation,
    isLoading,
    isError,
    error,
  } = useVerifyCode({
    onSuccess: (data) => {
      console.log("Verification Successful");

      setAuthData((prev) => ({
        ...prev,
        userAccessToken: data.access_token,
      }));

      setStoredToken(
        "userAccessToken",
        data.access_token,
        data.expires_in * 1000
      );

      if (packageData) {
        navigate("/checkout", { state: { packageData } });
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Verification Error Details:", error);
    },
  });

  return (
    <form
      className="endpoint-card max-w-xl mx-auto p-8 bg-white shadow-md rounded-md mt-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Verify Your Email
      </h2>
      <p className="mb-6 text-center text-gray-50">
        Please enter the verification code sent to your email.
      </p>

      <div className="flex justify-center mb-12 pt-6">
        {[1, 2, 3, 4, 5, 6].map((num, index) => {
          const {
            ref: registerRef,
            onChange: registerOnChange,
            ...rest
          } = register(`code${num}`, {
            required: "This field is required",
            pattern: {
              value: /^[0-9a-zA-Z]$/,
              message: "Only alphanumeric characters are allowed",
            },
          });

          return (
            <input
              key={num}
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength="1"
              {...rest}
              ref={(el) => {
                registerRef(el);
                inputRefs.current[index] = el;
              }}
              onChange={(e) => {
                registerOnChange(e);
                handleChange(e, index);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-12 text-center border-b-2 text-black border-gray-300 focus:border-blue-500 focus:outline-none mx-3 text-lg ${
                errors[`code${num}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
          );
        })}
      </div>
      {errors.code1 ||
      errors.code2 ||
      errors.code3 ||
      errors.code4 ||
      errors.code5 ||
      errors.code6 ? (
        <p className="text-red-500 text-sm text-center mb-4">
          Please enter a valid verification code.
        </p>
      ) : null}

      <div className="flex justify-center">
        <CustomButton
          text={isLoading ? "Verifying..." : "Verify"}
          type="submit"
          fullWidth
          textSize="text-lg"
          disabled={isLoading}
        />
      </div>

      {isError && (
        <p className="text-red-500 text-center mt-4">
          {error.response?.data?.message || "Verification failed"}
        </p>
      )}
    </form>
  );
};

export default VerificationForm;
