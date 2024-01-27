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
import NotFoundPage from "./pages/404/NotFound";

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
        <Route path="/produkter" element={<ProductsPage />} />
        <Route path="/produkter/:category?" element={<ProductsPage />} />
        <Route
          path="/produkter/:category/:slug"
          element={
            <SingleProductPage
              cart={cart}
              addToCart={handleAddToCart}
              removeFromCart={handleRemoveSingleProduct}
            />
          }
        />
        <Route
          path="/kundvagn"
          element={
            <CartPage cart={cart} removeFromCart={handleRemoveFromCart} />
          }
        />
        <Route
          path="/kassa"
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/om-oss" element={<AboutPage />} />
        <Route path="/kontakt" element={<ContactPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/produkter/*" element={<NotFoundPage />} />
        <Route path="/produkter/:category/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
