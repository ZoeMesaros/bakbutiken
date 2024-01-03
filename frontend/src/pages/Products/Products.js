import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.scss";

const ProductPage = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div class="product-page">
      <ul class="cards">
        {products.map((product) => (
          <li class="cards-item" key={product._id}>
            <div class="card">
              <div class="card-image">
                <img src="https://picsum.photos/500/300/?image=10" />
              </div>
              <div class="card-content">
                <div className="card-text">
                  <h2 class="card-title">{product.name}</h2>
                  <p class="card-price">Kr</p>
                </div>
                <button class="btn card-btn">Läs mer</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
