import React from "react";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const PasswordStrengthChecker = ({ password }) => {
  const minLength = 10;
  const hasMinLength = password.length >= minLength;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const requirements = [
    { label: `At least ${minLength} characters`, isMet: hasMinLength },
    { label: "Contains an uppercase letter", isMet: hasUppercase },
    { label: "Contains a lowercase letter", isMet: hasLowercase },
    { label: "Contains a number", isMet: hasNumber },
    { label: "Contains a special character", isMet: hasSpecialChar },
  ];

  return (
    <div className="mt-2">
      <p className="text-sm mb-2 font-medium text-gray-700">
        Password Requirements:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
        {requirements.map((req, index) => (
          <div key={index} className="flex items-center space-x-2 text-sm">
            {req.isMet ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-gray-400" />
            )}
            <span className={req.isMet ? "text-green-600" : "text-gray-500"}>
              {req.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthChecker;
