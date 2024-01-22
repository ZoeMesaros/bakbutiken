import { useState, useEffect } from "react";
import axios from "axios";

//Custom hook to fetch products
const useProductFetch = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  useEffect(() => {
    fetchProducts();
  }, [currentPage, selectedCategory]);

  return {
    products,
    currentPage,
    selectedCategory,
    handlePageChange,
    handleCategoryClick,
  };
};

export default useProductFetch;
