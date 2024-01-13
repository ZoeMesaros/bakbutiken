import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import useCart from "./customHooks/useCart";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/Products/Products";
import SingleProductPage from "./pages/Product/Product";
import CartPage from "./pages/Cart/cart";

function App() {
  const {
    cart,
    ShowQuantity,
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
          element={<ProductPage addToCart={handleAddToCart} />}
        />
        <Route
          path="/products/:slug"
          element={
            <SingleProductPage
              cart={cart}
              qty={ShowQuantity}
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
      </Routes>
    </main>
  );
}

export default App;
