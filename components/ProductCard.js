import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      <Link href={`/products/${product.id}`}>
        <img
          src={product.image}
          alt={product.title}
          className="rounded-md mb-4 h-40 w-full object-contain cursor-pointer"
        />
        <h3 className="text-lg font-semibold">{product.title}</h3>
      </Link>
      <p className="text-gray-600 text-sm mb-2">{product.description}</p>
      <p className="text-blue-600 font-bold mt-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
