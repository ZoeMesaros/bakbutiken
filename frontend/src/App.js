import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// Custom hooks
import useCart from "./customHooks/useCart";
import useAuth from "./customHooks/useAuth";

// Components
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Pages
import HomePage from "./pages/HomePage/HomePage";
import ProductsPage from "./pages/Products/Products";
import SingleProductPage from "./pages/Product/Product";
import CartPage from "./pages/Cart/cart";
import CheckoutPage from "./pages/Checkout/Checkout";
import SuccessPage from "./pages/Success/Success";
import AboutPage from "./pages/About/About";
import ContactPage from "./pages/Contact/Contact";
import NotFoundPage from "./pages/404/NotFound";
import AdminPage from "./pages/Admin/Admin";
import LoginPage from "./pages/Login/Login";

// Main application
function App() {
  // Use cart functionality from cart hook
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveSingleProduct,
    clearCart,
  } = useCart();

  // Use authentication from auth hook
  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  // Function to handle login functionality
  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      console.log(data.message);
      // After successful login, redirect to admin page
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  // Log in using credentials
  const handleLoginWrapper = (credentials) => {
    handleLogin(credentials);
  };

  return (
    <main className="App">
      <NavBar cart={cart} />
      <Routes>
        {/* Route to homepage */}
        <Route path="/" element={<HomePage />} />

        {/* Route to all products page */}
        <Route path="/produkter" element={<ProductsPage />} />

        {/* Route to category page */}
        <Route path="/produkter/:category?" element={<ProductsPage />} />

        {/* Route to single product page */}
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

        {/* Route to cart page */}
        <Route
          path="/kundvagn"
          element={
            <CartPage cart={cart} removeFromCart={handleRemoveFromCart} />
          }
        />

        {/* Route to checkout page */}
        <Route
          path="/kassa"
          element={<CheckoutPage cart={cart} clearCart={clearCart} />}
        />

        {/* Route to success page */}
        <Route path="/success" element={<SuccessPage />} />

        {/* Route to about us page */}
        <Route path="/om-oss" element={<AboutPage />} />

        {/* Route to contact page */}
        <Route path="/kontakt" element={<ContactPage />} />

        {/* Route to admin login page */}
        <Route
          path="/login"
          element={<LoginPage handleLogin={handleLogin} />}
        />
        {isLoggedIn ? (
          <Route path="/admin" element={<AdminPage />} />
        ) : (
          <Route path="/admin/*" element={<Navigate to="/" replace />} />
        )}

        {/* Routes to handle not found */}
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/produkter/*" element={<NotFoundPage />} />
        <Route path="/produkter/:category/*" element={<NotFoundPage />} />
      </Routes>
      <Footer />
    </main>
  );
}

export default App;
