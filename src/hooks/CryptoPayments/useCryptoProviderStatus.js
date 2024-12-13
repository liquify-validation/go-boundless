import { useQuery } from "@tanstack/react-query";
import { fetchCryptoProviderStatus } from "../../services/apiStore";

export const useCryptoProviderStatus = () => {
  const queryResult = useQuery({
    queryKey: ["cryptoStatus"],
    queryFn: fetchCryptoProviderStatus,
  });

  return queryResult;
};
