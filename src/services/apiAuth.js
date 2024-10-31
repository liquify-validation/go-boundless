import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5005/auth",

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
