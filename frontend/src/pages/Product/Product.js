import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./product.scss";

const SingleProductPage = () => {
  const [product, setProduct] = useState({});
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

  return (
    <>
      <div className="single-product-page">
        <div className="product-info">
          <div className="product-image">
            <img src={product.imgSingle} alt={product.name} />
          </div>
          <div className="product-details">
            <h2 className="product-name">{product.name}</h2>
            <p className="product-price">{product.price} Kr</p>
            <div className="add-to-cart">
              <button className="btn card-btn">Lägg till i kundvagnen</button>
            </div>
            <div className="product-description">
              <p>{product.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
