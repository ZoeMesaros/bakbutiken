import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./products.scss";
import NotFoundPage from "../404/NotFound";
import useProductFetch from "../../customHooks/fetchProducts";
import allProducts from "../../assets/images/all-products.jpg";
import utensils from "../../assets/images/utensils.jpg";
import pans from "../../assets/images/pans.jpg";
import decorations from "../../assets/images/decorations.jpg";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const cardBannerAll = {
  backgroundImage: `url(${allProducts})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 45%",
};

const cardBannerUtensils = {
  backgroundImage: `url(${utensils})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 35%",
};

const cardBannerPans = {
  backgroundImage: `url(${pans})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 55%",
};

const cardBannerBowls = {
  backgroundImage: `url(${allProducts})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 100%",
};

const cardBannerDecorations = {
  backgroundImage: `url(${decorations})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 40%",
};

// All products page
const ProductsPage = () => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCategory = category || "";

  const { products, loading } = useProductFetch(selectedCategory, currentPage);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  const getBanner = () => {
    switch (selectedCategory) {
      case "pans":
        return cardBannerPans;
      case "utensils":
        return cardBannerUtensils;
      case "decorations":
        return cardBannerDecorations;
      case "bowls":
        return cardBannerBowls;
      default:
        return cardBannerAll;
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="product-page">
        <div className="container align-items-center">
          {/* <div className="row mx-auto">
            <main className="row category-row">
              <div className="card-banner p-2 rounded-5" style={getBanner()}>
                <div style={{ height: "150px" }}>
                  <h2 className="text-color">
                    Fantastiska produkter med <br />
                    de bästa erbjudandena
                  </h2>
                  <p className="text-color">
                    Oavsett hur långt du har kommit som hemmabagare finns det
                    alltid något nytt att upptäcka.
                  </p>
                </div>
              </div>
            </main>
          </div> */}
          <div className="row items-row">
            <div className="col-md-6 col-lg-4 mx-auto">
              <div className="col product-category">
                <Link to="/produkter" className="hover-effect">
                  Alla
                </Link>
                <Link to="/produkter/bakformar" className="hover-effect">
                  Bakformar
                </Link>
                <Link to="/produkter/verktyg" className="hover-effect">
                  Verktyg
                </Link>
                <Link to="/produkter/skalar" className="hover-effect">
                  Skålar
                </Link>
                <Link to="/produkter/dekorationer" className="hover-effect">
                  Dekorationer
                </Link>
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
                        to={`/produkter/${product.category}/${product.slug}`}
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
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(currentPage - 1)}
                    >
                      Föregående
                    </a>
                  </li>
                )}
                <li className="page-item">
                  <a className="page-link">{currentPage}</a>
                </li>
                {products.length === 12 && (
                  <li className="page-item">
                    <a
                      className="page-link"
                      onClick={() => handlePageChange(currentPage + 1)}
                    >
                      Nästa
                    </a>
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
