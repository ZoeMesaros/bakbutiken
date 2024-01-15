import { useState, useEffect } from "react";

// Custom hook to handle all cart functionality
const useCart = () => {
  const [cart, setCart] = useState([]);

  //Load the cart from localStorage when the component mounts
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  //Update localStorage with cart data
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

  return {
    cart,
    handleAddToCart,
    handleRemoveSingleProduct,
    handleRemoveFromCart,
  };
};

export default useCart;
