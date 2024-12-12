import { useQuery } from "@tanstack/react-query";
import { fetchEstimatedPrice } from "../../services/apiStore";

export const useEstimatedPrice = (
  amount,
  currency_from = "usd",
  currency_to,
  options = {}
) => {
  return useQuery({
    queryKey: ["estimatedPrice", amount, currency_from, currency_to],
    queryFn: () => fetchEstimatedPrice(amount, currency_from, currency_to),
    enabled:
      !!amount && !!currency_from && !!currency_to && options.enabled !== false,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
    ...options,
  });
};
