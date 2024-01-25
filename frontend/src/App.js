import React from "react";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import useCart from "./customHooks/useCart";
import NavBar from "./components/NavBar/NavBar";
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/Products/Products";
import SingleProductPage from "./pages/Product/Product";
import CartPage from "./pages/Cart/cart";
import CheckoutPage from "./pages/Checkout/Checkout";
import SuccessPage from "./pages/Success/Success";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import Footer from "./components/Footer/Footer";

function App() {
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveSingleProduct,
    clearCart,
  } = useCart();

  return (
    <main className="App">
      <NavBar cart={cart} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:category?" element={<ProductsPage />} />
        <Route
          path="/products/:category/:slug"
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
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
