import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./product.scss";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
  const [specificationsOpen, setSpecificationsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const { slug } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${slug}`);
        setProduct(response.data);
      } catch (error) {
        setProduct(null);
        console.error("Error fetching product:", error);
      }
    };

    fetchSingleProduct();
  }, [slug]);

  const toggleSpecifications = () => {
    setSpecificationsOpen(!specificationsOpen);
  };

  const toggleMaterials = () => {
    setMaterialsOpen(!materialsOpen);
  };

  return (
    <>
      <div className="single-product-page">
        <div className="product-info">
          <div className="product-image">
            <img src={product.imgSingle} alt={product.name} />
          </div>
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">
              <span className={`item-price${product.onSale ? "-sale" : ""}`}>
                {product.price} Kr
              </span>
              {product.onSale && (
                <span className="sale-price">
                  &nbsp; {product.salePrice} Kr
                </span>
              )}
            </p>
            <div className="add-to-cart">
              <button className="btn card-btn">Lägg till i kundvagnen</button>
            </div>
            <div className="product-description">
              <p>{product.desc}</p>
            </div>
            <div className="accordion" id="accordionFlushExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingOne">
                  <button
                    className={`accordion-button ${
                      specificationsOpen ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={toggleSpecifications}
                  >
                    Specifikationer
                  </button>
                </h2>
                <div
                  id="flush-collapseOne"
                  className={`accordion-collapse collapse ${
                    specificationsOpen ? "show" : ""
                  }`}
                  aria-labelledby="flush-headingOne"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <ul>
                      <li>{product.spec}</li>
                      <li>{product.spec1}</li>
                      <li>{product.spec2}</li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="flush-headingTwo">
                  <button
                    className={`accordion-button ${
                      materialsOpen ? "" : "collapsed"
                    }`}
                    type="button"
                    onClick={toggleMaterials}
                  >
                    Material
                  </button>
                </h2>
                <div
                  id="flush-collapseTwo"
                  className={`accordion-collapse collapse ${
                    materialsOpen ? "show" : ""
                  }`}
                  aria-labelledby="flush-headingTwo"
                  data-bs-parent="#accordionFlushExample"
                >
                  <div className="accordion-body">
                    <p>{product.material}</p>
                  </div>
                </div>
              </div>
              {/* Add more accordion items as needed */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
