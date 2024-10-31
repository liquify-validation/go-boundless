import { useQuery } from "@tanstack/react-query";
import { fetchCustomer } from "../services/apiCustomer";
import { useAuth } from "./useAuth";

export const useCustomer = (customerUid) => {
  const { authData, isLoading: authLoading, isError: authError } = useAuth();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["customer", customerUid],
    queryFn: () => fetchCustomer(authData.accessToken, customerUid),
    enabled:
      !!authData?.accessToken && !!customerUid && !authLoading && !authError,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });

  return { data, error, isLoading, isError };
};
