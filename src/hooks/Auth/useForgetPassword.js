import { useMutation } from "@tanstack/react-query";
import { forgotPassword } from "../../services/apiAuth";

export const useForgotPassword = () => {
  const mutation = useMutation({
    mutationFn: forgotPassword,
  });

  return mutation;
};
