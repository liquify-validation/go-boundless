import { useMutation } from "@tanstack/react-query";
import { createCryptoPayment } from "../../services/apiStore";

export const useCreateCryptoPayment = () => {
  return useMutation(createCryptoPayment);
};
