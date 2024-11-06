import { useQuery } from "@tanstack/react-query";
import { getCustomerActivations } from "../services/apiStore";

export const useCustomerActivations = () => {
  return useQuery({
    queryKey: ["customerActivations"],
    queryFn: getCustomerActivations,
    staleTime: 0,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });
};
