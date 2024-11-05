import { authenticate } from "../services/apiStore";
import { getStoredToken, setStoredToken } from "./helpers";
import { refreshAccessToken } from "../services/apiAuth";

export const fetchWithAuth = async (
  url,
  options = {},
  tokenKey = "accessToken"
) => {
  let accessToken = getStoredToken(tokenKey);

  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  };

  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  try {
    let response = await fetch(url, { ...options, headers });

    if (response.status === 401) {
      if (tokenKey === "storeAccessToken") {
        const authResponse = await authenticate();
        const newAccessToken = authResponse.accessToken;
        setStoredToken(
          "storeAccessToken",
          newAccessToken,
          authResponse.expiresIn
        );
        headers["Authorization"] = `Bearer ${newAccessToken}`;
        response = await fetch(url, { ...options, headers });
      } else if (tokenKey === "userAccessToken") {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          headers["Authorization"] = `Bearer ${newAccessToken}`;
          response = await fetch(url, { ...options, headers });
        } else {
          throw new Error("User session expired. Please log in again.");
        }
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      const error = new Error(
        errorData.error || errorData.message || "API request failed"
      );
      error.status = response.status;
      error.data = errorData;
      throw error;
    }

    return response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
};
