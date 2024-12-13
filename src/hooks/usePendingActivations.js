import { useQuery } from "@tanstack/react-query";
import { getPendingActivations } from "../services/apiStore";

export const usePendingActivations = () => {
  return useQuery({
    queryKey: ["pendingActivations"],
    queryFn: getPendingActivations,
    retry: 5,
    retryDelay: 2000,
  });
};
