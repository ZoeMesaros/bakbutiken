import { useState, useEffect } from "react";

// Custom hook to handle all cart functionality
const useCart = () => {
  const [cart, setCart] = useState([]);

  // Load the cart from localStorage when the component mounts and listen for changes
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);

    const handleStorageChange = (e) => {
      if (e.key === "cart") {
        const updatedCart = JSON.parse(e.newValue) || [];
        setCart(updatedCart);
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Update localStorage with cart data
  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //Functionality for adding a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      //If the product exists, the quantity will be updated, if not it will be added to cart with a quantity of 1
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

  //Handle removal of a single product in the cart
  const handleRemoveSingleProduct = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        if (updatedCart[existingItemIndex].quantity > 1) {
          updatedCart[existingItemIndex].quantity -= 1;
        } else {
          updatedCart.splice(existingItemIndex, 1);
        }

        updateLocalStorage(updatedCart);
        return updatedCart;
      }

      return prevCart;
    });
  };

  // Functionality to remove a product from the cart
  const handleRemoveFromCart = (product) => {
    setCart((prevCart) => {
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
