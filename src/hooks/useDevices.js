import { useQuery } from "@tanstack/react-query";
import { fetchDevices } from "../services/apiStore";
import { useAuth } from "../context/AuthContext";
import { useMemo } from "react";

export const useDevices = () => {
  const { authData, isLoading: authLoading, error: authError } = useAuth();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["devices"],
    queryFn: () => fetchDevices(),
    enabled: !!authData?.storeAccessToken && !authLoading && !authError,
    staleTime: 1000 * 60 * 24,
    cacheTime: 1000 * 60 * 24,
    retry: false,
  });

  const transformedData = useMemo(() => {
    if (!data || !data.length) return [];

    return data.map((device, index) => ({
      id: `${device.name}-${device.vendor}-${index}`,
      ...device,
    }));
  }, [data]);

  return { data: transformedData, error, isLoading, isError };
};
