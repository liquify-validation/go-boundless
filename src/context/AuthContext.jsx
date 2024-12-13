import React, { createContext, useContext, useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authenticate } from "../services/apiStore";
import { loginUser, refreshAccessToken } from "../services/apiAuth";
import { getStoredToken, setStoredToken } from "../utilities/helpers";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storeToken = getStoredToken("storeAccessToken");
    const userToken = getStoredToken("userAccessToken");
    const refreshToken = getStoredToken("refreshToken");
    return {
      storeAccessToken: storeToken || null,
      userAccessToken: userToken || null,
      refreshToken: refreshToken || null,
    };
  });

  const [errorMessage, setErrorMessage] = useState(null);

  const authenticateStoreMutation = useMutation({
    mutationFn: authenticate,
    onSuccess: (data) => {
      setAuthData((prev) => ({
        ...prev,
        storeAccessToken: data.accessToken,
      }));
      setStoredToken("storeAccessToken", data.accessToken, data.expiresIn);
      setErrorMessage(null);
    },
    onError: (error) => {
      console.error("Store authentication error:", error.message);
      setErrorMessage(error.message);
    },
  });

  const triggerStoreAuth = () => {
    authenticateStoreMutation.mutate();
  };

  const loginUserMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setAuthData((prev) => ({
        ...prev,
        userAccessToken: data.access_token,
        refreshToken: data.refresh_token,
        userId: data.user_id,
      }));
      setStoredToken("userAccessToken", data.access_token, 900);
      setStoredToken("refreshToken", data.refresh_token);
      setStoredToken("userId", data.user_id);
      setErrorMessage(null);
    },
    onError: (error) => {
      console.error("User login error:", error.message);
      setErrorMessage(error.response?.data?.message || "Login failed");
    },
  });

  const loginUserFunction = (credentials) => {
    loginUserMutation.mutate(credentials);
  };

  const logoutUser = () => {
    setAuthData((prev) => ({
      ...prev,
      userAccessToken: null,
    }));
    localStorage.removeItem("userAccessToken");
    localStorage.removeItem("userAccessTokenExpiresAt");
  };

  useEffect(() => {
    const storeToken = getStoredToken("storeAccessToken");
    if (!storeToken) {
      triggerStoreAuth();
    } else {
      setAuthData((prev) => ({
        ...prev,
        storeAccessToken: storeToken,
      }));
    }

    const userToken = getStoredToken("userAccessToken");
    const refreshToken = getStoredToken("refreshToken");
    if (userToken) {
      setAuthData((prev) => ({
        ...prev,
        userAccessToken: userToken,
        refreshToken: refreshToken,
      }));
    }
  }, []);

  useEffect(() => {
    if (
      authData.userAccessToken &&
      localStorage.getItem("userAccessTokenExpiresAt")
    ) {
      const expiresAt = Number(
        localStorage.getItem("userAccessTokenExpiresAt")
      );
      const now = Date.now();
      const timeLeft = expiresAt - now;

      const refreshTime = timeLeft - 1000 * 60 * 2;

      if (refreshTime > 0) {
        const timeout = setTimeout(async () => {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            logoutUser();
          }
        }, refreshTime);

        return () => clearTimeout(timeout);
      } else {
        (async () => {
          const newAccessToken = await refreshAccessToken();
          if (!newAccessToken) {
            logoutUser();
          }
        })();
      }
    }
  }, [authData.userAccessToken]);

  useEffect(() => {
    if (
      authData.storeAccessToken &&
      localStorage.getItem("storeAccessTokenExpiresAt")
    ) {
      const expiresAt = Number(
        localStorage.getItem("storeAccessTokenExpiresAt")
      );
      const now = Date.now();
      const timeLeft = expiresAt - now;

      const timeout = setTimeout(() => {
        triggerStoreAuth();
      }, timeLeft - 1000 * 60 * 5);

      return () => clearTimeout(timeout);
    }
  }, [authData.storeAccessToken]);

  useEffect(() => {
    if (
      authData.userAccessToken &&
      localStorage.getItem("userAccessTokenExpiresAt")
    ) {
      const expiresAt = Number(
        localStorage.getItem("userAccessTokenExpiresAt")
      );
      const now = Date.now();
      const timeLeft = expiresAt - now;

      const timeout = setTimeout(() => {
        logoutUser();
      }, timeLeft);

      return () => clearTimeout(timeout);
    }
  }, [authData.userAccessToken]);

  return (
    <AuthContext.Provider
      value={{
        authData,
        setAuthData,
        loginUser: loginUserFunction,
        logoutUser,
        triggerStoreAuth,
        loginError: errorMessage,
        loginLoading: loginUserMutation.isLoading,
        storeAuthError: authenticateStoreMutation.isError ? errorMessage : null,
        storeAuthLoading: authenticateStoreMutation.isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
