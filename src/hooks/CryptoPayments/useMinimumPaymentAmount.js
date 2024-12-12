import { useQuery } from "@tanstack/react-query";
import { fetchMinimumPaymentAmount } from "../../services/apiStore";

export const useMinimumPaymentAmount = (
  currency_from,
  currency_to = "usd",
  options = {}
) => {
  return useQuery({
    queryKey: ["minimumPaymentAmount", currency_from, currency_to],
    queryFn: () => fetchMinimumPaymentAmount(currency_from, currency_to),
    enabled: !!currency_from && !!currency_to && options.enabled !== false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
    ...options,
  });
};
