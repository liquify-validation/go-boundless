import { useMutation } from "@tanstack/react-query";
import { updateUserDetails } from "../../services/apiAuth";

export const useUpdateUserDetails = () => {
  return useMutation({
    mutationFn: updateUserDetails,
  });
};
