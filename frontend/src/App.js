import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/Products/Products";
import NavBar from "./components/NavBar/NavBar";
import SingleProductPage from "./pages/Product/Product";

function App() {
  return (
    <>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products/" element={<ProductPage />} />
          <Route path="/products/:slug" element={<SingleProductPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
