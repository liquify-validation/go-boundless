import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "../../services/apiAuth";

export const useVerifyCode = (options = {}) => {
  const mutation = useMutation({
    mutationFn: verifyCode,
    ...options,
  });

  return mutation;
};
