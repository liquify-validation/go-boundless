import { useQuery } from "@tanstack/react-query";
import { fetchAvailableCryptos } from "../../services/apiStore";

export const useAvailableCryptos = () => {
  return useQuery({
    queryKey: ["availableCryptos"],
    queryFn: fetchAvailableCryptos,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: false,
  });
};
