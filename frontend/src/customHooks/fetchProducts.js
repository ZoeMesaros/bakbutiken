import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch products based on selected category and current page
const useProductFetch = (selectedCategory, currentPage) => {
  // State to store the fetched products
  const [products, setProducts] = useState([]);

  // State to control the visibility of the loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a cancel token source using Axios
    const source = axios.CancelToken.source();
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
        const response = await axios.get(url, { cancelToken: source.token });
        setProducts(response.data);
        // Log an error if fetching products fails
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error("Error fetching products:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel();
    };
  }, [selectedCategory, currentPage]);

  return { products, loading };
};

export default useProductFetch;
