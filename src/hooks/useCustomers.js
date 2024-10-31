import { useQuery } from "@tanstack/react-query";
import { fetchCustomers } from "../services/apiCustomers";
import { useAuth } from "./useAuth";

export const useCustomers = (pageSize, pageIndex) => {
  const { authData, isLoading: authLoading, isError: authError } = useAuth();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["customers", pageSize, pageIndex],
    queryFn: () => fetchCustomers(authData.accessToken, pageSize, pageIndex),
    enabled: !!authData?.accessToken && !authLoading && !authError,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });

  return { data, error, isLoading, isError };
};
