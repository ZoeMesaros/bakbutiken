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
    setCart([...cart, product]);
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
