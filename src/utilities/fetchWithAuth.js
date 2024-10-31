import { authenticate } from "../services/apiStore";
import { getStoredToken, setStoredToken } from "./helpers";

export const fetchWithAuth = async (
  url,
  options = {},
  tokenKey = "accessToken"
) => {
  let accessToken = getStoredToken(tokenKey);

  console.log("Fetching URL:", url);
  console.log("Using token:", accessToken);

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
        throw new Error("User session expired. Please log in again.");
      }
    }

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "API request failed");
    }

    return response.json();
  } catch (error) {
    console.error("API Call Error:", error);
    throw error;
  }
};
