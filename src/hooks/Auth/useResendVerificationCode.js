import { useMutation } from "@tanstack/react-query";
import { resendVerificationCode } from "../../services/apiAuth";

export const useResendVerificationCode = (options = {}) => {
  return useMutation({
    mutationFn: resendVerificationCode,
    ...options,
  });
};
