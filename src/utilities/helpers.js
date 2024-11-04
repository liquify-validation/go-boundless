export const getStoredToken = (tokenKey = "accessToken") => {
  const token = localStorage.getItem(tokenKey);
  const expiresAt = localStorage.getItem(`${tokenKey}ExpiresAt`);

  if (!token || !expiresAt) return null;

  if (Date.now() > Number(expiresAt)) {
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(`${tokenKey}ExpiresAt`);
    return null;
  }

  return token;
};

export const setStoredToken = (tokenKey = "accessToken", token, expiresIn) => {
  const expiresAt = Date.now() + expiresIn * 1000;
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(`${tokenKey}ExpiresAt`, expiresAt);
};

export const validateEmail = (email) => {
  const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,7}$/;
  return pattern.test(email);
};

export const parsePrice = (priceString) => {
  if (typeof priceString === "string") {
    const sanitizedPriceString = priceString.replace(/[^0-9.]/g, "");
    return parseFloat(sanitizedPriceString);
  }
  return parseFloat(priceString);
};
