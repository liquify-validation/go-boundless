import axios from "axios";
import { getStoredToken, setStoredToken } from "../utilities/helpers";

const apiClient = axios.create({
  baseURL: "http://backend.goboundlessnow.com/auth",

  headers: {
    "Content-Type": "application/json",
  },
});

export const registerUser = async (userData) => {
  const response = await apiClient.post("/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await apiClient.post("/login", credentials);
  return response.data;
};

export const refreshAccessToken = async () => {
  const refreshToken = getStoredToken("refreshToken");
  if (!refreshToken) return null;

  try {
    const response = await apiClient.post("/refresh", null, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${refreshToken}`,
      },
    });
    const newAccessToken = response.data.access_token;
    setStoredToken("userAccessToken", newAccessToken, 900); // Use the correct expiresIn value
    return newAccessToken;
  } catch (error) {
    console.error("Failed to refresh access token:", error);
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userAccessTokenExpiresAt");
    localStorage.removeItem("refreshToken");
    return null;
  }
};

export const forgotPassword = async (email) => {
  const response = await apiClient.post("/forgot-password", { email });
  return response.data;
};

export const resetPassword = async (password, token) => {
  const response = await apiClient.post(`/reset-password/${token}`, {
    password,
  });
  return response.data;
};

export const verifyCode = async (verificationData) => {
  const response = await apiClient.post("/verify-code", verificationData);
  return response.data;
};

export const resendVerificationCode = async (emailData) => {
  const response = await apiClient.post("/resend-verification-code", emailData);
  return response.data;
};

export const getUserDetails = async () => {
  const accessToken = getStoredToken("userAccessToken");
  const userId = getStoredToken("userId");
  const response = await apiClient.post(
    "/user",
    { user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};

export const updateUserDetails = async (updatedData) => {
  const accessToken = getStoredToken("userAccessToken");
  const userId = getStoredToken("userId");
  const response = await apiClient.post(
    "/edit-user",
    { ...updatedData, user_id: userId },
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );
  return response.data;
};
