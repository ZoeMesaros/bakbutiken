import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./products.scss";

//All products page
const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");

  //Fetch all products based on category and current page
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `/api/products?page=${currentPage}&limit=12`;

        if (selectedCategory) {
          url = `/api/products/category/${selectedCategory}?page=${currentPage}&limit=12`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  //Handle page pagnation
  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  //Handle change of category
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <>
      <div className="product-page">
        <div className="product-category">
          <a onClick={() => handleCategoryClick("")}>Alla</a>
          <a onClick={() => handleCategoryClick("pans")}>Bakformar</a>
          <a onClick={() => handleCategoryClick("utensils")}>Verktyg</a>
          <a onClick={() => handleCategoryClick("bowls")}>Skålar</a>
          <a onClick={() => handleCategoryClick("decorations")}>Dekoration</a>
        </div>
        <div className="cards">
          {products.map((product) => (
            <div className="cards-item" key={product._id}>
              {product.inStock === 0 ? (
                <div className="card">
                  <div className={`sale${product.onSale ? "-item" : ""} `}>
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
                <Link to={`/products/${product.slug}`}>
                  <div className="card">
                    <div className={`sale${product.onSale ? "-item" : ""} `}>
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
      <nav className="pag-nav">
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

export default ProductsPage;
