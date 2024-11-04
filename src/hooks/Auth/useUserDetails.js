import { useQuery } from "@tanstack/react-query";
import { getUserDetails } from "../../services/apiAuth";

export const useUserDetails = () => {
  return useQuery({
    queryKey: ["userDetails"],
    queryFn: getUserDetails,
  });
};
