import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import ProductPage from "./pages/Products/Products";
import NavBar from "./components/NavBar/NavBar";

function App() {
  return (
    <>
      <h1>Bakbutiken</h1>
      <main>
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductPage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
