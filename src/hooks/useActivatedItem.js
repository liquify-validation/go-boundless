import { useQuery } from "@tanstack/react-query";
import { getActivatedItem } from "../services/apiActivations";
import { useAuth } from "../context/AuthContext";

export const useActivatedItem = (itemUid) => {
  const { authData, isLoading: authLoading, error: authError } = useAuth();

  return useQuery({
    queryKey: ["activatedItem", itemUid],
    queryFn: () => getActivatedItem(itemUid),
    enabled:
      !!authData?.storeAccessToken && !authLoading && !authError && !!itemUid,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });
};
