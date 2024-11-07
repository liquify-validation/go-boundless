import { fetchWithAuth } from "../utilities/fetchWithAuth";

const ApiUrl = import.meta.env.VITE_API_URL;

export const sendEnquiry = async (enquiryData) => {
  const url = `${ApiUrl}/enquiries/enquiry`;
  return await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(enquiryData),
  });
};
