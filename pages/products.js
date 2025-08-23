// pages/products.js
import { useEffect, useState } from "react";
import Link from "next/link";
import LoadingSpinner from "../components/LoadingSpinner";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortOption, setSortOption] = useState("none");
  const [loading, setLoading] = useState(true);

  // 1) Fetch products & categories once
  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [prodRes, catRes] = await Promise.all([
          fetch("https://fakestoreapi.com/products"),
          fetch("https://fakestoreapi.com/products/categories"),
        ]);
        const [prodData, catData] = await Promise.all([
          prodRes.json(),
          catRes.json(),
        ]);

        if (cancelled) return;

        setProducts(prodData);
        setFilteredProducts(prodData);
        setCategories(catData);

        // auto set max price based on fetched data
        const highest = Math.max(...prodData.map((p) => p.price));
        setMaxPrice(Number.isFinite(highest) ? highest : 1000);
      } catch (e) {
        console.error("Failed to fetch products:", e);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  // 2) Apply filters + sorting whenever dependencies change
  useEffect(() => {
    let result = products;

    // category
    if (selectedCategory !== "all") {
      result = result.filter((p) => p.category === selectedCategory);
    }

    // search (title)
    const query = search.trim().toLowerCase();
    if (query) {
      result = result.filter((p) => p.title.toLowerCase().includes(query));
    }

    // price range
    result = result.filter((p) => p.price >= minPrice && p.price <= maxPrice);

    // sorting
    if (sortOption === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "a-z") {
      result = [...result].sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "z-a") {
      result = [...result].sort((a, b) => b.title.localeCompare(a.title));
    }

    setFilteredProducts(result);
  }, [search, selectedCategory, minPrice, maxPrice, sortOption, products]);
  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>

      {/* Filters */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center mb-6">
        {/* Search */}
        <input
          type="text"
          placeholder="Search products…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/3"
        />

        {/* Category */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>

        {/* Price range */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700">Price:</span>
          <input
            type="number"
            value={minPrice}
            onChange={(e) => setMinPrice(Number(e.target.value))}
            className="border px-2 py-1 w-24 rounded"
            min="0"
          />
          <span>-</span>
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="border px-2 py-1 w-24 rounded"
            min="0"
          />
        </div>

        {/* Sort */}
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="border px-3 py-2 rounded w-full md:w-1/4"
        >
          <option value="none">Sort By</option>
          <option value="low-high">Price: Low → High</option>
          <option value="high-low">Price: High → Low</option>
          <option value="a-z">Name: A → Z</option>
          <option value="z-a">Name: Z → A</option>
        </select>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border p-4 rounded shadow hover:shadow-lg transition"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-40 object-contain mb-4"
              />
              <h2 className="text-lg font-semibold mb-2 line-clamp-2">
                {product.title}
              </h2>
              <p className="text-blue-600 font-bold mb-3">${product.price}</p>

              <Link
                href={`/products/${product.id}`}
                className="inline-block bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View Details
              </Link>
            </div>
          ))
        ) : (
          <p className="text-gray-600">No products found.</p>
        )}
      </div>
    </div>
  );
}
