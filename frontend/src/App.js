import React from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
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
import useAuth from "./customHooks/useAuth";
import AdminPage from "./pages/Admin/Admin";
import LoginPage from "./pages/Login/Login";

const DefaultLayout = ({ children, cart }) => (
  <div className="app-layout">
    <NavBar cart={cart} />
    {children}
    <Footer />
  </div>
);

const AdminLayout = ({ children }) => (
  <div className="app-layout admin-layout">{children}</div>
);

function App() {
  const {
    cart,
    handleAddToCart,
    handleRemoveFromCart,
    handleRemoveSingleProduct,
    clearCart,
  } = useCart();

  const { isLoggedIn, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (credentials) => {
    try {
      const data = await login(credentials);
      console.log(data.message);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleLoginWrapper = (credentials) => {
    handleLogin(credentials);
  };

  return (
    <main className="App">
      <Routes>
        <Route
          path="/"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<HomePage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/produkter"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<ProductsPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/produkter/:category?"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<ProductsPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/produkter/:category/:slug"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route
                  index
                  element={
                    <SingleProductPage
                      cart={cart}
                      addToCart={handleAddToCart}
                      removeFromCart={handleRemoveSingleProduct}
                    />
                  }
                />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/kundvagn"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route
                  index
                  element={
                    <CartPage
                      cart={cart}
                      removeFromCart={handleRemoveFromCart}
                    />
                  }
                />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/kassa"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route
                  index
                  element={<CheckoutPage cart={cart} clearCart={clearCart} />}
                />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/success"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<SuccessPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/om-oss"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<AboutPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/kontakt"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<ContactPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/admin"
          element={
            isLoggedIn ? (
              <AdminLayout>
                <Routes>
                  <Route
                    index
                    element={<AdminPage cart={cart} handleLogout={logout} />}
                  />
                </Routes>
              </AdminLayout>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/admin" replace />
            ) : (
              <DefaultLayout cart={cart}>
                <Routes>
                  <Route
                    index
                    element={<LoginPage handleLogin={handleLoginWrapper} />}
                  />
                </Routes>
              </DefaultLayout>
            )
          }
        />

        <Route
          path="/*"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<NotFoundPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/produkter/*"
          element={
            <DefaultLayout cart={cart}>
              <Routes>
                <Route index element={<NotFoundPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
        <Route
          path="/produkter/:category/*"
          element={
            <DefaultLayout>
              <Routes>
                <Route index element={<NotFoundPage />} />
              </Routes>
            </DefaultLayout>
          }
        />
      </Routes>
    </main>
  );
}

export default App;
