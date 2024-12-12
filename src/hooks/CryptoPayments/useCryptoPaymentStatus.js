import { useQuery } from "@tanstack/react-query";
import { getCryptoPaymentStatus } from "../../services/apiStore";

export const useCryptoPaymentStatus = (paymentId) => {
  return useQuery({
    queryKey: ["cryptoPaymentStatus", paymentId],
    queryFn: () => getCryptoPaymentStatus(paymentId),
    enabled: !!paymentId,
    refetchInterval: 15000,
    retry: false,
  });
};
