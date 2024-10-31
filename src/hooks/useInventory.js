import { useQuery } from "@tanstack/react-query";
import { fetchInventory } from "../services/apiStore";
import { useAuth } from "../context/AuthContext";

export const useInventory = () => {
  const { authData, isLoading: authLoading, error: authError } = useAuth();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["inventory"],
    queryFn: () => fetchInventory(),
    enabled: !!authData?.storeAccessToken && !authLoading && !authError,
    staleTime: 1000 * 60 * 24,
    cacheTime: 1000 * 60 * 24,
    retry: false,
  });

  return { data, error, isLoading, isError };
};
