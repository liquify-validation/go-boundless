import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../services/apiAuth";

export const useRegister = () => {
  const mutation = useMutation({
    mutationFn: registerUser,
  });

  return mutation;
};
