import { useMutation } from "@tanstack/react-query";
import { sendEnquiry } from "../services/apiSupport";

export const useSendEnquiry = () => {
  const mutation = useMutation({
    mutationFn: sendEnquiry,
  });

  return mutation;
};
