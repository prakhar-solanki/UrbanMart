import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { cart } = useCart();
  const { user, logout } = useAuth();

  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);

  return (
    <nav className="bg-blue-600 p-4 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">MyStore</Link>
      <div className="space-x-6 flex items-center">
        <Link href="/products">Products</Link>
        <Link href="/cart" className="relative">
          Cart 🛒
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
              {totalItems}
            </span>
          )}
        </Link>
        {user ? (
          <>
            <span>Hi, {user.username}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
            <Link href="/orders">My Orders</Link>

          </>
        )}
      </div>
    </nav>
  );
}
