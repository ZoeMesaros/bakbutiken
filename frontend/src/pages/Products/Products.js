import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./products.scss";
import useProductFetch from "../../customHooks/fetchProducts";

//All products page
const ProductsPage = () => {
  const {
    products,
    currentPage,
    selectedCategory,
    handlePageChange,
    handleCategoryClick,
  } = useProductFetch();

  return (
    <>
      <div className="product-page">
        <div className="container align-items-center">
          <div className="row items-row">
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="col product-category">
                <a onClick={() => handleCategoryClick("")}>Alla</a>
                <a onClick={() => handleCategoryClick("pans")}>Bakformar</a>
                <a onClick={() => handleCategoryClick("utensils")}>Verktyg</a>
                <a onClick={() => handleCategoryClick("bowls")}>Skålar</a>
                <a onClick={() => handleCategoryClick("decorations")}>
                  Dekoration
                </a>
              </div>
              <div className="cards">
                {products.map((product) => (
                  <div className="cards-item" key={product._id}>
                    {product.inStock === 0 ? (
                      <div className="card">
                        <div
                          className={`sale${product.onSale ? "-item" : ""} `}
                        >
                          {product.onSale && <span>REA</span>}
                        </div>
                        <div className="card-image">
                          <img src={product.img} alt={product.name} />
                        </div>
                        <div className="card-content">
                          <div className="card-text">
                            <h2 className="card-title">{product.name}</h2>
                            <p
                              className={`card-price ${
                                product.onSale ? "-sale" : ""
                              }`}
                            >
                              <span
                                className={`item-price${
                                  product.onSale ? "-sale" : ""
                                }`}
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
                          <button className="btn soldout" disabled>
                            Slutsålt
                          </button>
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={`/products/${product.slug}`}
                        className="hover-effect"
                      >
                        <div className="card">
                          <div
                            className={`sale${product.onSale ? "-item" : ""} `}
                          >
                            {product.onSale && <span>REA</span>}
                          </div>
                          <div className="card-image">
                            <img src={product.img} alt={product.name} />
                          </div>
                          <div className="card-content">
                            <div className="card-text">
                              <h2 className="card-title">{product.name}</h2>
                              <p
                                className={`card-price ${
                                  product.onSale ? "-sale" : ""
                                }`}
                              >
                                <span
                                  className={`item-price${
                                    product.onSale ? "-sale" : ""
                                  }`}
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
                            {product.inStock === 0 ? (
                              <button className="btn soldout" disabled>
                                Slutsålt
                              </button>
                            ) : (
                              <button className="btn card-btn">Läs mer</button>
                            )}
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container align-items-center">
        <div className="row summary-row">
          <div className="col-md-6 col-lg-8 mx-auto">
            <nav className="pag-nav">
              <ul className="pagination ">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductsPage;
