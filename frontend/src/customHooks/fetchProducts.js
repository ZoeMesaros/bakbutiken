import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch products based on selected category and current page
const useProductFetch = (selectedCategory, currentPage) => {
  // State to store the fetched products
  const [products, setProducts] = useState([]);

  // State to control the visibility of the loading spinner
  const [loading, setLoading] = useState(true);

  //Function to fetch all products from the backend endpoint
  const fetchProducts = async () => {
    try {
      // Construct URL based on whether a category is selected or not
      let url = `/api/products?page=${currentPage}&limit=12`;

      if (selectedCategory) {
        // If a category is selected, fetch products based on category with pagination
        url = `/api/products/category/${selectedCategory}?page=${currentPage}&limit=12`;
      }

      // Try to fetch products from the backend endpoint
      const response = await axios.get(url);
      setProducts(response.data);
      // Log an error if fetching products fails
    } catch (error) {
      console.error("Error fetching products:", error);
      // Set loading to false regardless of success or failure
    } finally {
      setLoading(false);
    }
  };

  //UseEffect to call fetchProducts to track which page and category has been chosen
  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, currentPage]);

  //Return the products and the loader
  return { products, loading };
};

export default useProductFetch;
