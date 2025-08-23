// pages/index.js
import ProductCard from "../components/ProductCard";
import SEO from "../components/SEO";

export default function Home() {
  const products = [
    {
      id: 1,
      title: "Stylish Shoes",
      description: "Comfortable & trendy shoes for everyday use.",
      price: 59, // ✅ number
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 2,
      title: "Smart Watch",
      description: "Track fitness and stay connected on the go.",
      price: 129,
      image: "https://via.placeholder.com/300x200",
    },
    {
      id: 3,
      title: "Backpack",
      description: "Durable backpack with multiple compartments.",
      price: 39,
      image: "https://via.placeholder.com/300x200",
    },
  ];

  return (
    <>
      {/* ✅ SEO Meta */}
      <SEO title="Home" description="Welcome to MyStore - your one-stop shop for trendy products" />

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white text-center py-20">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">Welcome to MyStore</h1>
        <p className="text-lg md:text-xl mb-6">Your one-stop shop for trendy products</p>
        <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Shop Now
        </button>
      </section>

      {/* Featured Products */}
      <section className="py-12 px-6">
        <h2 className="text-2xl font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </>
  );
}
