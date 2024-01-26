import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch products
const useProductFetch = (selectedCategory, currentPage) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      let url = `/api/products?page=${currentPage}&limit=12`;

      if (selectedCategory) {
        url = `/api/products/category/${selectedCategory}?page=${currentPage}&limit=12`;
      }

      const response = await axios.get(url);
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  return { products, loading };
};

export default useProductFetch;
