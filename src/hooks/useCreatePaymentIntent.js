import { useMutation } from "@tanstack/react-query";
import { createPaymentIntent } from "../services/apiStore";

export const useCreatePaymentIntent = () => {
  const mutation = useMutation({
    mutationFn: createPaymentIntent,
  });

  return mutation;
};
