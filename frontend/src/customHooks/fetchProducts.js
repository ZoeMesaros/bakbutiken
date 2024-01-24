// useProductFetch.js

import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch products
const useProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [latestProducts, setLatestProducts] = useState([]);

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
    }
  };

  const fetchLatestProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/latest?limit=5"
      );
      setLatestProducts(response.data);
    } catch (error) {
      console.error("Error fetching latest products:", error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchLatestProducts();
  }, [selectedCategory, currentPage, fetchLatestProducts]);

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
    latestProducts,
    fetchProducts,
    fetchLatestProducts,
    handlePageChange,
    handleCategoryClickHook,
  };
};

export default useProductFetch;
