// pages/thank-you.js
import { useRouter } from "next/router";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function ThankYouPage() {
  const router = useRouter();
  const { orderId } = router.query; // get orderId from URL
  const [orderDetails, setOrderDetails] = useState(null);

  useEffect(() => {
    // Load stored order from localStorage (set in checkout)
    const savedOrder = localStorage.getItem("lastOrder");
    if (savedOrder) {
      setOrderDetails(JSON.parse(savedOrder));
    }
  }, []);

  if (!orderDetails) {
    return (
      <div className="container mx-auto px-6 py-10 text-center">
        <h1 className="text-2xl font-bold text-red-500">⚠ No Order Found</h1>
        <Link href="/products">
          <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
            Back to Shop
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 text-center">
      <h1 className="text-4xl font-bold text-green-600">🎉 Thank You!</h1>
      <p className="mt-4 text-lg text-gray-700">
        Your order <span className="font-bold">#{orderId}</span> has been placed successfully.
      </p>

      {/* Order Summary */}
      <div className="mt-8 bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
        <p><strong>Name:</strong> {orderDetails.name}</p>
        <p><strong>Email:</strong> {orderDetails.email}</p>
        <p><strong>Address:</strong> {orderDetails.address}</p>
        <p><strong>Payment:</strong> {orderDetails.payment}</p>

        <ul className="mt-4 text-left">
          {orderDetails.cart.map((item) => (
            <li key={item.id} className="flex justify-between border-b py-2">
              <span>{item.title} x {item.qty}</span>
              <span>${(item.price * item.qty).toFixed(2)}</span>
            </li>
          ))}
        </ul>

        <p className="mt-4 text-lg font-bold">
          Total: ${orderDetails.subtotal.toFixed(2)}
        </p>
      </div>

      <Link href="/products">
        <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Continue Shopping
        </button>
      </Link>
    </div>
  );
}
