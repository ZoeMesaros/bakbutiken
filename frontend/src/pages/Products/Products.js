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
    <div className="product-page">
      <ul className="cards">
        {products.map((product) => (
          <li className="cards-item" key={product._id}>
            <div className="card">
              <div className={`sale${product.onSale ? "-item" : ""} `}>
                {product.onSale && <span>REA</span>}
              </div>
              <div className="card-image">
                <img src="https://picsum.photos/500/300/?image=10" />
              </div>
              <div className="card-content">
                <div className="card-text">
                  <h2 className="card-title">{product.name}</h2>
                  <p className={`card-price ${product.onSale ? "-sale" : ""}`}>
                    <span
                      className={`item-price${product.onSale ? "-sale" : ""}`}
                    >
                      {product.price} Kr
                    </span>
                    {product.onSale && (
                      <span className="sale-price">
                        &nbsp; {product.salePrice} Kr
                      </span>
                    )}
                  </p>
                </div>
                <button className="btn card-btn">Läs mer</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductPage;
