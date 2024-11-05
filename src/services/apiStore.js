import { fetchWithAuth } from "../utilities/fetchWithAuth";

const ApiUrl = import.meta.env.VITE_API_URL;

// TO DO - Convert to axios

// Authenticate Store
export const authenticate = async () => {
  const response = await fetch(`${ApiUrl}/store/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({}),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Authentication failed");
  }

  const expiresAt = Date.now() + data.expiresIn * 1000;

  localStorage.setItem("accessToken", data.accessToken);
  localStorage.setItem("expiresAt", expiresAt);

  return data;
};

// Fetch Inventory
export const fetchInventory = async () => {
  const url = `${ApiUrl}/store/inventory`;
  return await fetchWithAuth(url, { method: "GET" }, "storeAccessToken");
};

// Fetch Customers
export const fetchCustomers = async (pageSize, pageIndex) => {
  const url = `${ApiUrl}/store/customers?page_size=${pageSize}&page_index=${pageIndex}`;
  return await fetchWithAuth(url, { method: "GET" }, "storeAccessToken");
};

// Fetch Single Customer
export const fetchCustomer = async (customerUid) => {
  const url = `${ApiUrl}/store/customer/${customerUid}`;
  return await fetchWithAuth(url, { method: "GET" }, "storeAccessToken");
};

// Fetch Countries
export const fetchCountries = async () => {
  const url = `${ApiUrl}/store/countries`;
  return await fetchWithAuth(url, { method: "GET" }, "storeAccessToken");
};

// Fetch Inventory
export const fetchDevices = async () => {
  const url = `${ApiUrl}/store/devices`;
  return await fetchWithAuth(url, { method: "GET" }, "storeAccessToken");
};

// Create Payment Intent
export const createPaymentIntent = async (paymentData) => {
  const url = `${ApiUrl}/store/create-payment-intent`;
  return await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(paymentData),
  });
};

// Get users sims
export const getCustomerActivations = async () => {
  const url = `${ApiUrl}/store/customer-activations`;
  return await fetchWithAuth(url, { method: "POST" }, "userAccessToken");
};

// Get users sim
export const getActivatedItem = async (itemUid) => {
  const url = `${ApiUrl}/store/activated-items/${itemUid}`;
  return await fetchWithAuth(url, { method: "POST" }, "storeAccessToken");
};

export const sendEnquiry = async (enquiryData) => {
  const url = `${ApiUrl}/enquiries/enquiry`;
  return await fetchWithAuth(url, {
    method: "POST",
    body: JSON.stringify(enquiryData),
  });
};
