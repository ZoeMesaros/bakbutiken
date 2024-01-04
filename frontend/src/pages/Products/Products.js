import React, { useState, useEffect } from "react";
import axios from "axios";
import "./products.scss";

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `/api/products?page=${currentPage}&limit=12`
        );
        console.log("Fetched products:", response.data);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <>
      <div className="product-page">
        <div className="product-category">
          <ul>
            <li>
              <a>Alla</a>
            </li>
            <li>
              <a>Bakformar</a>
            </li>
            <li>
              <a>Verktyg</a>
            </li>
            <li>
              <a>Skålar</a>
            </li>
            <li>
              <a>Dekoration</a>
            </li>
          </ul>
        </div>
        <ul className="cards">
          {products.map((product) => (
            <li className="cards-item" key={product._id}>
              <div className="card">
                <div className={`sale${product.onSale ? "-item" : ""} `}>
                  {product.onSale && <span>REA</span>}
                </div>
                <div className="card-image">
                  <img src={product.img} />
                </div>
                <div className="card-content">
                  <div className="card-text">
                    <h2 className="card-title">{product.name}</h2>
                    <p
                      className={`card-price ${product.onSale ? "-sale" : ""}`}
                    >
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
      <nav>
        <ul className="pagination">
          {currentPage > 1 && (
            <li
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage - 1);
              }}
              className="page-item"
            >
              <a className="page-link">Föregående</a>
            </li>
          )}
          <li className="page-item">
            <a className="page-link">{currentPage}</a>
          </li>
          {products.length === 12 && (
            <li
              onClick={(e) => {
                e.preventDefault();
                handlePageChange(currentPage + 1);
              }}
              className="page-item"
            >
              <a className="page-link">Nästa</a>
            </li>
          )}
        </ul>
      </nav>
    </>
  );
};

export default ProductPage;
