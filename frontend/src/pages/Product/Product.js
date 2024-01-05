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
        console.log("Fetched product:", response.data);
        setProduct(response.data);
      } catch (error) {
        setProduct(null);
        console.error("Error fetching product:", error);
      }
    };

    fetchSingleProduct();
  }, [slug]);

  console.log("Product state:", product);

  if (Object.keys(product).length === 0) {
    return <div>Loading...</div>; // Add a loading state while fetching
  }

  return (
    <>
      <div className="single-product-page">
        <div className="product-card">
          <h2 className="card-title">{product.name}</h2>
        </div>
      </div>
    </>
  );
};

export default SingleProductPage;
