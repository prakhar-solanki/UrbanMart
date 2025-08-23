// pages/checkout.js
import { useCart } from "../context/CartContext";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CheckoutPage() {
  const { cart, setCart } = useCart();
  const router = useRouter();

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    payment: "cash on delivery", // default: Cash on Delivery
  });
  useEffect(() => {
    // 🚨 Redirect if cart is empty
    if (cart.length === 0) {
      router.replace("/cart");
    }
  }, [cart, router]);
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const orderId = Date.now(); // mock order id
    const orderData = { ...formData, cart, subtotal, orderId };

    // Save order in localStorage so Thank You page can read it
    localStorage.setItem("lastOrder", JSON.stringify({ ...formData, cart, subtotal }));

    setCart([]); // Clear cart after order
    localStorage.removeItem("cart"); // Clear cart from localStorage

    toast.success("✅ Order placed successfully!");

    router.push("/thank-you");
  };


  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      {cart.length === 0 ? (
        <p className="text-gray-600">Your cart is empty 🛒</p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-6 bg-white shadow-lg p-6 rounded-lg"
        >
          {/* User Info */}
          <div>
            <label className="block text-gray-700">Full Name</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            />
          </div>

          <div>
            <label className="block text-gray-700">Address</label>
            <textarea
              name="address"
              required
              value={formData.address}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
              rows="3"
            />
          </div>

          {/* Payment */}
          <div>
            <label className="block text-gray-700">Payment Method</label>
            <select
              name="payment"
              value={formData.payment}
              onChange={handleChange}
              className="w-full border p-2 rounded mt-1"
            >
              <option value="cod">Cash on Delivery</option>
              <option value="card">Credit/Debit Card</option>
              <option value="upi">UPI</option>
            </select>
          </div>

          {/* Order Summary */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold">Order Summary</h2>
            <ul className="mt-2 space-y-1">
              {cart.map((item) => (
                <li key={item.id} className="flex justify-between">
                  <span>
                    {item.title} x {item.qty}
                  </span>
                  <span>${(item.price * item.qty).toFixed(2)}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-lg font-bold">
              Subtotal: ${subtotal.toFixed(2)}
            </p>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
          >
            Place Order
          </button>
        </form>
      )}
    </div>
  );
}
