import { useMutation } from "@tanstack/react-query";
import { resetPassword } from "../../services/apiAuth";

export const useResetPassword = () => {
  const mutation = useMutation({
    mutationFn: ({ password, token }) => resetPassword(password, token),
  });

  return mutation;
};
