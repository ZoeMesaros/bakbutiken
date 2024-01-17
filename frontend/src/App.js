import React, { useEffect, useState } from "react";
import axios from "axios";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import useCart from "./customHooks/useCart";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/Products/Products";
import SingleProductPage from "./pages/Product/Product";
import CartPage from "./pages/Cart/Cart";
import CheckoutPage from "./pages/Checkout/Checkout";

function App() {
  const [productInfo, setProductInfo] = useState([]);

  useEffect(() => {
    const fetchProductInfo = async () => {
      try {
        const response = await axios.get("/api/products");
        setProductInfo(response.data);
      } catch (error) {
        console.error("Error fetching product information:", error);
      }
    };

    fetchProductInfo();
  }, []);

  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveSingleProduct,
  } = useCart();

  return (
    <main className="App">
      <NavBar cart={cart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/products"
          element={<ProductsPage addToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:slug"
          element={
            <SingleProductPage
              cart={cart}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveSingleProduct}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <CartPage cart={cart} removeFromCart={handleRemoveFromCart} />
          }
        />
        <Route
          path="/checkout"
          element={<CheckoutPage cart={cart} productInfo={productInfo} />}
        />
      </Routes>
    </main>
  );
}

export default App;
