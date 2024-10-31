import { useMutation } from "@tanstack/react-query";
import { verifyCode } from "../../services/apiAuth";

export const useVerifyCode = (options = {}) => {
  const mutation = useMutation(verifyCode, options);

  return mutation;
};
