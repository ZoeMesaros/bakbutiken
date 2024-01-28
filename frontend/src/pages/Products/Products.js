import React, { useState, useEffect, useLayoutEffect } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./products.scss";
import NotFoundPage from "../404/NotFound";
import useProductFetch from "../../customHooks/fetchProducts";
import allProducts from "../../assets/images/all-products.jpg";
import utensils from "../../assets/images/bakbutiken-om.jpg";
import pans from "../../assets/images/pans.jpg";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const cardBannerAll = {
  backgroundImage: `url(${allProducts})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 45%",
};

const cardBannerUtensils = {
  backgroundImage: `url(${utensils})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 15%",
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
  backgroundImage: `url(${utensils})`,
  backgroundSize: "cover",
  backgroundPosition: "100% 90%",
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
      case "bakformar":
        return cardBannerPans;
      case "verktyg":
        return cardBannerUtensils;
      case "dekorationer":
        return cardBannerDecorations;
      case "skalar":
        return cardBannerBowls;
      default:
        return cardBannerAll;
    }
  };

  const renderCategoryBanner = () => {
    switch (selectedCategory) {
      case "bakformar":
        return (
          <>
            <h2 className="text-color">Upptäck Fantastiska Bakformar</h2>
            <p className="text-color">
              Utforska vårt sortiment av bakformar för att skapa magiska bakverk
              hemma. Hitta den perfekta formen för ditt nästa bakprojekt!
            </p>
          </>
        );
      case "verktyg":
        return (
          <>
            <h2 className="text-color">De Bästa Verktygen för Hemmabagaren</h2>
            <p className="text-color">
              Upptäck essentiella verktyg för att förbättra dina bakfärdigheter.
              Vi erbjuder högkvalitativa verktyg för varje hemmabagares behov.
            </p>
          </>
        );
      case "skalar":
        return (
          <>
            <h2 className="text-color">Stilfulla Skålar för Dina Mästerverk</h2>
            <p className="text-color">
              Våra vackra skålar gör inte bara din bakning enklare, utan ger
              också en extra touch av stil till dina bakverk.
            </p>
          </>
        );
      case "dekorationer":
        return (
          <>
            <h2 className="text-color">Skapa Magi med Våra Dekorationer</h2>
            <p className="text-color">
              Utforska vårt sortiment av dekorationer och ge dina bakverk en
              fantastisk touch. Låt kreativiteten flöda!
            </p>
          </>
        );
      default:
        return (
          <>
            <h2 className="text-color">Utforska Vårt Fantastiska Sortiment</h2>
            <p className="text-color">
              Oavsett hur långt du har kommit som hemmabagare finns det alltid
              något nytt att upptäcka. Ta del av våra erbjudanden idag!
            </p>
          </>
        );
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <div className="product-page">
        <div className="container align-items-center">
          <div className="row">
            <main className="row category-row ">
              <div className="card-banner mt-3 rounded-5" style={getBanner()}>
                <div
                  className="default-banner-text"
                  style={{ height: "150px" }}
                >
                  {renderCategoryBanner()}
                </div>
              </div>
            </main>
          </div>
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
