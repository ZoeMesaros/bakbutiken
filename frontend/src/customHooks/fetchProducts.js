// useProductFetch.js

import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch products
const useProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
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
      setLoading(false); // Set loading to false when the request is completed
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryClickHook = (category) => {
    setSelectedCategory(category);
  };

  return {
    products,
    currentPage,
    selectedCategory,
    loading,
    fetchProducts,
    handlePageChange,
    handleCategoryClickHook,
  };
};

export default useProductFetch;
