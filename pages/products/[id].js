import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useCart } from "../../context/CartContext"; // ✅ Import Cart Context
import LoadingSpinner from "../../components/LoadingSpinner";

export default function ProductDetails() {
  const router = useRouter();
  const { id } = router.query; 
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart(); // ✅ Hook into cart context
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://fakestoreapi.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          setLoading(false);
        })
        .catch((error) => console.error("Error fetching product:", error));
    }
  }, [id]);

  if (loading) return <LoadingSpinner />;

  if (!product) {
    return <p className="text-center mt-10">Loading product...</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="rounded-lg shadow-md w-full h-80 object-contain"
        />

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.title}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>
          <p className="text-blue-600 font-bold text-xl mb-6">
            ${product.price}
          </p>
          <button
            onClick={() => addToCart(product)} // ✅ Add to cart works now
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
          >
            Add to Cart 🛒
          </button>
        </div>
      </div>
    </div>
  );
}
