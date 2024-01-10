import { useState, useEffect } from "react";

const useCart = () => {
  const [cart, setCart] = useState([]);

  //Load the cart from localStorage when the component mounts
  useEffect(() => {
    //Retrieve the cart from local storage or set an empty array if it doesnt exist
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    //Set the cart state with the retrieved cart
    setCart(storedCart);
  }, []);

  //Update localStorage with cart data
  const updateLocalStorage = (updatedCart) => {
    //Updated cart to JSON and store in localStorage
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  //Functionality for adding a product to the cart
  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      //Check if the product already exist in cart
      const existingItemIndex = prevCart.findIndex(
        (item) => item._id === product._id
      );

      if (existingItemIndex !== -1) {
        //If the product exists, the quantity will be updated
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        //Update localStorage with the new quantity
        updateLocalStorage(updatedCart);
        //Return the updated cart
        return updatedCart;
      } else {
        //If the product doesn't exist, add it to the cart with the quantity of 1
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        //Update localStorage with the cart data
        updateLocalStorage(updatedCart);
        //Return the updated cart
        return updatedCart;
      }
    });
  };

  return {
    cart,
    handleAddToCart,
  };
};

export default useCart;
