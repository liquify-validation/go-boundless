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

// Crypto Payment Provider Status
export const fetchCryptoProviderStatus = async () => {
  const response = await fetch(`${ApiUrl}/store/payment_provider_status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Error: Crypto Payments not available");
  }

  return data;
};

// Available Cryptocurrencies
export const fetchAvailableCryptos = async () => {
  const response = await fetch(`${ApiUrl}/store/available_currencies`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch available cryptocurrencies"
    );
  }

  return data;
};

// Fetch Minimum Payment Amount
export const fetchMinimumPaymentAmount = async (
  currency_from,
  currency_to = "usd"
) => {
  const response = await fetch(`${ApiUrl}/store/minimum-payment-amount`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currency_from, currency_to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch minimum payment amount");
  }
  return data;
};

// Fetch Estimated Price
export const fetchEstimatedPrice = async (
  amount,
  currency_from = "usd",
  currency_to
) => {
  const response = await fetch(`${ApiUrl}/store/estimated-price`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount, currency_from, currency_to }),
  });
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch estimated price");
  }
  return data;
};

// Create Crypto Payment
export const createCryptoPayment = async (paymentData) => {
  const response = await fetch(`${ApiUrl}/store/create-crypto-payment`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to create crypto payment");
  }

  return data;
};

// Get Crypto Payment Status
export const getCryptoPaymentStatus = async (paymentId) => {
  const response = await fetch(
    `${ApiUrl}/store/get-payment-status/${paymentId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to get payment status");
  }
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

export const getPendingActivations = async () => {
  const url = `${ApiUrl}/store/pending-activations`;
  return await fetchWithAuth(url, { method: "POST" }, "userAccessToken");
};

export const createInvoice = async (paymentData) => {
  const response = await fetch(`${ApiUrl}/store/create-invoice`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(paymentData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Error creating invoice");
  }

  return data;
};
