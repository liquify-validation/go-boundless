import { useQuery } from "@tanstack/react-query";
import { fetchCountries } from "../services/apiStore";
import { useAuth } from "../context/AuthContext";
import countries from "i18n-iso-countries";
import enLocale from "i18n-iso-countries/langs/en.json";
import { useMemo } from "react";

countries.registerLocale(enLocale);

export const useCountries = () => {
  const { authData, isLoading: authLoading, error: authError } = useAuth();

  const { data, error, isLoading, isError } = useQuery({
    queryKey: ["countries"],
    queryFn: () => fetchCountries(),
    enabled: !!authData?.storeAccessToken && !authLoading && !authError,
    staleTime: 1000 * 60 * 24,
    cacheTime: 1000 * 60 * 24,
    retry: false,
  });

  const transformedData = useMemo(() => {
    if (!data || !data.length) return [];

    return data.map((country) => ({
      ...country,
      fullName:
        countries.getName(country.code, "en", { select: "official" }) ||
        "Unknown Country",
    }));
  }, [data]);

  return { data: transformedData, error, isLoading, isError };
};
