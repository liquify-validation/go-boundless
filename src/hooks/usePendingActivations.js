import { useQuery } from "@tanstack/react-query";
import { getPendingActivations } from "../services/apiStore";

export const usePendingActivations = () => {
  return useQuery({
    queryKey: ["pendingActivations"],
    queryFn: getPendingActivations,
  });
};
