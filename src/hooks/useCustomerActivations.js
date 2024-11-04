import { useQuery } from "@tanstack/react-query";
import { getCustomerActivations } from "../services/apiActivations";
import { useAuth } from "../context/AuthContext";

export const useCustomerActivations = () => {
  const { authData, isLoading: authLoading, error: authError } = useAuth();

  return useQuery({
    queryKey: ["customerActivations"],
    queryFn: () => getCustomerActivations(),
    enabled: !!authData?.storeAccessToken && !authLoading && !authError,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });
};
