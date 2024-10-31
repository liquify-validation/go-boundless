import React, { useState } from "react";

const OrderSummary = () => {
  // Placeholder order items TO DO - REPLACE
  const [orderItems, setOrderItems] = useState([
    {
      id: 1,
      name: "Premium Data Plan",
      price: 49.99,
      quantity: 1,
    },
  ]);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const handleQuantityChange = (id, newQuantity) => {
    setOrderItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  //   const handleApplyPromo = () => {
  //     // Placeholder logic for applying promo code
  //     if (promoCode === "SAVE10") {
  //       setDiscount(10); // $10 discount
  //     } else {
  //       setDiscount(0);
  //       alert("Invalid promo code");
  //     }
  //   };

  const subtotal = orderItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const total = subtotal - discount;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
      {orderItems.map((item) => (
        <div key={item.id} className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg">{item.name}</h3>
            <div className="flex items-center mt-1">
              <span>Quantity: </span>
              <input
                type="number"
                min="1"
                value={item.quantity}
                onChange={(e) =>
                  handleQuantityChange(item.id, parseInt(e.target.value))
                }
                className="ml-2 w-16 border rounded text-center"
              />
            </div>
          </div>
          <p>${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      ))}

      {/* Promo Code Field */}
      <div className="mt-4">
        <input
          type="text"
          placeholder="Promo code"
          value={promoCode}
          onChange={(e) => setPromoCode(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
        <button
          onClick={handleApplyPromo}
          className="mt-2 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          Apply Promo Code
        </button>
      </div>

      {/* Total */}
      <div className="mt-6 border-t pt-4">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
        {discount > 0 && (
          <div className="flex justify-between text-green-600">
            <span>Discount</span>
            <span>- ${discount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between font-bold text-xl mt-2">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
