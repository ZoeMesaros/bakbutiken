import { useState, useEffect } from "react";
import axios from "axios";

// Custom hook to fetch all orders
const useOrderFetch = () => {
  // State to store the fetched orders
  const [orders, setOrders] = useState([]);

  // State to control the visibility of the loading spinner
  const [loading, setLoading] = useState(true);

  // Function to fetch all orders from the backend endpoint
  const fetchOrders = async () => {
    try {
      // Construct URL for fetching all orders
      const url = "/api/admin";

      // Try to fetch orders from the backend endpoint
      const response = await axios.get(url);
      setOrders(response.data);
      // Log an error if fetching orders fails
    } catch (error) {
      console.error("Error fetching orders:", error);
      // Set loading to false regardless of success or failure
    } finally {
      setLoading(false);
    }
  };

  // useEffect to call fetchOrders
  useEffect(() => {
    fetchOrders();
  }, []);

  // Return the orders and the loader
  return { orders, loading };
};

export default useOrderFetch;
