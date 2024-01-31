import { useState, useEffect } from "react";

// Custom hook to handle cart functionality
const useCart = () => {
  // State to store cart items
  const [cart, setCart] = useState([]);

  //UseEffect to apply cart from local storage to state and lissen to and update cart changes
  useEffect(() => {
    // Retrieve cart data from local storage or initialize an empty array
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    // Event listener for changes in local storage, specifically for the "cart" key
    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        // Parse the new value from local storage or use an empty array
        const updatedCart = JSON.parse(e.newValue) || [];
        setCart(updatedCart);
      }
    };

    // Add event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Remove event listener when the component unmounts to prevent memory leaks
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update local storage with cart data
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  // Functionality for adding a product to the cart based on product id
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      // If the product exists, update the quantity; otherwise, add to cart with a quantity of 1
      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        updateLocalStorage(updatedCart);
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        updateLocalStorage(updatedCart);
        return updatedCart;
      }
    });
  };

  // Handle removal of a single product in the cart
  const handleRemoveSingleProduct = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        // If the quantity is more than 1, decrease the quantity; otherwise, remove the item
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }

        updateLocalStorage(updatedCart);
        return updatedCart;
      }
      // Return the previous cart if the item is not found
      return prevCart;
    });
  };

  // Functionality to remove a product from the cart
  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
      // Filter out the product to be removed
      const updatedCart = prevCart.filter((item) => item._id !== product._id);
      updateLocalStorage(updatedCart);
      return updatedCart;
    });
  };

  //Clear cart after successful purchase
  const clearCart = () => {
    setCart([]);
    updateLocalStorage([]);
  };

  return {
    cart,
    handleAddToCart,
    handleRemoveSingleProduct,
    handleRemoveFromCart,
    clearCart,
  };
};

export default useCart;
