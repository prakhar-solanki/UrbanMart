import Navbar from "./Navbar";
import Footer from "./Footer";
import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar at top */}
       <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <Link href="/" className="text-2xl font-bold">
          UrbanMart
        </Link>
        <div className="space-x-6">
          <Link href="/">Home</Link>
          <Link href="/products">Products</Link>
          <Link href="/cart">Cart</Link>
          <Link href="/login">Login</Link>
        </div>
      </nav>

      {/* Page Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer at bottom */}
       <footer className="bg-gray-800 text-white text-center p-4">
        © {new Date().getFullYear()}UrbanMart . All rights reserved.
      </footer>
    </div>
  );
}
