import React, { useState } from "react";
import { BasketIcon, GoBoundlessRoundedIcon } from "../assets";
import CustomButton from "../ui/CustomButton";
import { parsePrice } from "../utilities/helpers";

// TO DO Add margin inside promo code

const OrderSummary = ({ packageData }) => {
  const defaultPackage = {
    id: "Error: Missing",
    name: "Premium Data Plan",
    price: "Error: Missing",
    quantity: 1,
  };

  const [orderItems, setOrderItems] = useState([
    {
      id: packageData?.id || defaultPackage.id,
      name: packageData?.name || defaultPackage.name,
      price: parsePrice(packageData?.price || defaultPackage.price),
      quantity: 1,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // const handleQuantityChange = (id, newQuantity) => {
  //   setOrderItems((prevItems) =>
  //     prevItems.map((item) =>
  //       item.id === id ? { ...item, quantity: newQuantity } : item
  //     )
  //   );
  // };

  //TO DO - Replace with better logic
  const handleApplyPromo = () => {
    if (promoCode === "SAVE10") {
      setDiscount(10); // $10 discount
    } else {
      setDiscount(0);
      alert("Invalid promo code");
    }
  };

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal - discount;

  return (
    <div className="endpoint-card p-6 rounded-lg shadow-md max-w-xl">
      {/* Header with Basket Icon and Order Summary */}
      <div className="flex items-center mb-4">
        <img src={BasketIcon} alt="Basket Icon" className="w-6 h-6 mr-2" />
        <h2 className="text-xl ml-2 font-semibold">Order Summary</h2>
      </div>

      {/* Headers: Product and Price */}
      <div className="flex justify-between items-center mb-2 pt-2">
        <span className="text-sm text-gray-50">Product</span>
        <span className="text-sm text-gray-50">Price</span>
      </div>
      <hr className="border-gray-300 mb-4" />

      {/* Order Items */}
      {orderItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div className="flex items-start">
            <img
              src={GoBoundlessRoundedIcon}
              alt="Product Icon"
              className="w-16 h-16 mr-2"
            />
            <div>
              <span className="text-xs text-primary">eSIM</span>
              <h3 className="text-sm font-medium">{item.name}</h3>
            </div>
          </div>
          <p className="text-sm font-semibold">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
      ))}

      {/* Divider */}
      <hr className="border-gray-300 my-4" />

      {/* Promo Code Field */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full p-2 contact-form-field bg-transparent border-b-2 border-gray-300 focus:outline-none focus:border-primary peer mb-4"
        />
        <CustomButton
          text="Apply Promo Code"
          onClick={handleApplyPromo}
          fullWidth
        />
      </div>

      {/* Total */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-sm mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
