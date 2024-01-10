import "./App.css";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/Products/Products";
import SingleProductPage from "./pages/Product/Product";
import CartPage from "./pages/Cart/cart";

function App() {
  const [cart, setCart] = useState([]);

  const handleAddToCart = (product) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );

      if (existingItemIndex !== -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };

  return (
    <>
      <main className="App">
        <NavBar cart={cart} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/" element={<ProductPage />} />
          <Route
            path="/products/:slug"
            element={<SingleProductPage handleAddToCart={handleAddToCart} />}
          />
          <Route path="/cart" element={<CartPage cart={cart} />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
