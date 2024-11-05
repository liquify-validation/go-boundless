import { useMutation } from "@tanstack/react-query";
import { sendEnquiry } from "../services/apiStore";

export const useSendEnquiry = () => {
  const mutation = useMutation({
    mutationFn: sendEnquiry,
  });

  return mutation;
};
