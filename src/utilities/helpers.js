export const getStoredToken = (tokenKey = "accessToken") => {
  const token = localStorage.getItem(tokenKey);
  if (!token) return null;

  if (tokenKey !== "refreshToken") {
    const expiresAt = localStorage.getItem(`${tokenKey}ExpiresAt`);
    if (!expiresAt) return null;

    if (Date.now() > Number(expiresAt)) {
      localStorage.removeItem(tokenKey);
      localStorage.removeItem(`${tokenKey}ExpiresAt`);
      return null;
    }
  }

  return token;
};

export const setStoredToken = (tokenKey = "accessToken", token, expiresIn) => {
  localStorage.setItem(tokenKey, token);
  if (expiresIn) {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(`${tokenKey}ExpiresAt`, expiresAt);
  }
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

// OLD WAY
// export function getCryptoPaymentLink(amountInDollars) {
//   let paymentLink = "";

//   if (amountInDollars === 20) {
//     paymentLink = "https://nowpayments.io/payment?iid=5868961302";
//   } else if (amountInDollars === 25) {
//     paymentLink = "https://nowpayments.io/payment?iid=1234567890";
//   } else {
//     paymentLink = "https://nowpayments.io/payment?iid=5868961302";
//   }

//   return paymentLink;
// }
