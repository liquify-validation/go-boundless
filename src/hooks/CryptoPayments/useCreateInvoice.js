import { useMutation } from "@tanstack/react-query";
import { createInvoice } from "../../services/apiStore";

export const useCreateInvoice = () => {
  const mutation = useMutation({
    mutationFn: createInvoice,
    onSuccess: (data) => {
      if (data?.invoice_url) {
        window.location.href = data.invoice_url;
      }
    },
    onError: (error) => {
      console.error("Error creating invoice:", error);
    },
  });

  return mutation;
};
