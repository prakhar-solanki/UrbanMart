import "../styles/globals.css";
import Layout from "../components/Layout";
import { CartProvider } from "../context/CartContext";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function MyApp({ Component, pageProps }) {
  return (
    
    <AuthProvider>
      <CartProvider>
        <Navbar />
        <Component {...pageProps} />
        <Toaster position="top-right" />
        <Footer />
      </CartProvider>
    </AuthProvider>
  );
}
