import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useVerifyCode } from "../hooks/Auth/useVerifyCode";
import { useResendVerificationCode } from "../hooks/Auth/useResendVerificationCode";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import CustomButton from "../ui/CustomButton";
import { setStoredToken } from "../utilities/helpers";

const VerificationForm = ({ email }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    setValue,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { redirectTo, packageData } = location.state || {};
  const { setAuthData } = useAuth();
  const [resendMessage, setResendMessage] = useState("");
  const [resendError, setResendError] = useState("");

  const [resendAttempts, setResendAttempts] = useState(0);
  const [resendTimer, setResendTimer] = useState(0);
  const [isResendDisabled, setIsResendDisabled] = useState(false);
  const [supportMessageShown, setSupportMessageShown] = useState(false);

  const code = watch(["code1", "code2", "code3", "code4", "code5", "code6"]);
  const combinedCode = code.join("");

  const onSubmit = (data) => {
    const verificationData = {
      email: email,
      code: combinedCode,
    };
    verifyCodeMutation(verificationData);
  };

  const inputRefs = useRef([]);

  const handleChange = (e, index, registerOnChange) => {
    const value = e.target.value.toUpperCase();
    setValue(`code${index + 1}`, value);
    registerOnChange({ target: { name: `code${index + 1}`, value } });

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
      setAuthData((prev) => ({
        ...prev,
        userAccessToken: data.access_token,
      }));

      setStoredToken(
        "userAccessToken",
        data.access_token,
        data.expires_in * 1000
      );

      if (redirectTo && packageData) {
        navigate(redirectTo, { state: { packageData } });
      } else {
        navigate("/");
      }
    },
    onError: (error) => {
      console.error("Verification Error Details:", error);
      setError("verification", {
        type: "manual",
        message: "Invalid verification code.",
      });
    },
  });

  const {
    mutate: resendCodeMutation,
    isLoading: isResendLoading,
    isError: isResendError,
    error: resendErrorData,
  } = useResendVerificationCode({
    onSuccess: (data) => {
      setResendMessage(data.message);
      setResendError("");
      setResendAttempts((prev) => prev + 1);
      startResendTimer();
    },
    onError: (error) => {
      setResendMessage("");
      setResendError(
        error.response?.data?.message || "Failed to resend verification code."
      );
    },
  });

  const startResendTimer = () => {
    setResendTimer(180);
    setIsResendDisabled(true);
    setSupportMessageShown(false);
  };

  useEffect(() => {
    let timerInterval;
    if (resendTimer > 0) {
      timerInterval = setInterval(() => {
        setResendTimer((prev) => {
          const newVal = prev - 1;
          if (newVal <= 0) {
            setIsResendDisabled(false);
            clearInterval(timerInterval);
          }
          return newVal;
        });
      }, 1000);
    }
    return () => {
      if (timerInterval) clearInterval(timerInterval);
    };
  }, [resendTimer]);

  const handleResendCode = () => {
    if (isResendDisabled) {
      if (resendAttempts >= 1 && !supportMessageShown) {
        setSupportMessageShown(true);
        setResendMessage("");
        setResendError(
          "If you have still not received a code, please contact support."
        );
      }
      return;
    }

    resendCodeMutation({ email });
  };

  return (
    <form
      className="endpoint-card max-w-xl mx-auto p-8 bg-white shadow-md rounded-md mt-24"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2 className="text-3xl font-semibold mb-4 text-center">
        Verify your email
      </h2>
      <p className="mb-6 text-center text-gray-50">
        Please enter the verification code sent to your email.
      </p>

      <div className="flex justify-center mb-10 pt-6">
        {[1, 2, 3, 4, 5, 6].map((num, index) => {
          const {
            ref: registerRef,
            onChange: registerOnChange,
            ...rest
          } = register(`code${num}`, {
            required: "This field is required",
            pattern: {
              value: /^[0-9A-Z]$/,
              message: "Only uppercase alphanumeric characters are allowed",
            },
          });

          return (
            <input
              key={num}
              type="text"
              inputMode="text"
              autoComplete="one-time-code"
              maxLength="1"
              {...rest}
              ref={(el) => {
                registerRef(el);
                inputRefs.current[index] = el;
              }}
              onChange={(e) => {
                handleChange(e, index, registerOnChange);
              }}
              onKeyDown={(e) => handleKeyDown(e, index)}
              className={`w-14 h-12 text-center border-b-2 uppercase text-black border-gray-300 focus:border-blue-500 focus:outline-none mx-3 text-lg ${
                errors[`code${num}`] ? "border-red-500" : "border-gray-300"
              }`}
            />
          );
        })}
      </div>
      {(errors.code1 ||
        errors.code2 ||
        errors.code3 ||
        errors.code4 ||
        errors.code5 ||
        errors.code6) && (
        <p className="text-red-500 text-sm text-center mb-4">
          Please enter a valid verification code.
        </p>
      )}

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

      {/* Resend Code Section */}
      <div className="text-center mt-6">
        <p className="text-gray-50 text-sm">
          Didn&apos;t receive a code?{" "}
          <button
            type="button"
            onClick={handleResendCode}
            disabled={isResendLoading || isResendDisabled}
            className="text-primary hover:underline disabled:opacity-50"
          >
            Resend Code
          </button>
        </p>
        {isResendLoading && (
          <p className="text-gray-50 mt-2">Resending code...</p>
        )}
        {resendMessage && (
          <p className="text-green-500 mt-2">{resendMessage}</p>
        )}
        {resendError && <p className="text-red-500 mt-2">{resendError}</p>}

        {/* Show timer if running */}
        {resendTimer > 0 && isResendDisabled && (
          <p className="text-gray-50 mt-2">
            You can request another code in {Math.floor(resendTimer / 60)}:
            {("0" + (resendTimer % 60)).slice(-2)} minutes.
          </p>
        )}
      </div>
    </form>
  );
};

export default VerificationForm;
