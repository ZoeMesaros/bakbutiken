import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch all orders
const useOrderFetch = () => {
  // State to store the fetched orders
  const [orders, setOrders] = useState([]);

  // State to control the visibility of the loading spinner
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Create a cancel token source using Axios
    const source = axios.CancelToken.source();
    // Function to fetch all orders from the backend endpoint
    const fetchOrders = async () => {
      try {
        // Construct URL for fetching all orders
        const url = "/api/admin";

        // Try to fetch orders from the backend endpoint
        const response = await axios.get(url, { cancelToken: source.token });
        setOrders(response.data);
        // Log an error if fetching orders fails
      } catch (error) {
        if (axios.isCancel(error)) {
        } else {
          console.error("Error fetching orders:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();

    return () => {
      // Cancel the request when the component unmounts
      source.cancel();
    };
  }, []);

  return { orders, loading };
};

export default useOrderFetch;
