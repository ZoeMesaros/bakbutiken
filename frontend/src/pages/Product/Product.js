import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import NotFoundPage from "../404/NotFound";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import ImageComponent from "../../components/ImageComponent/ImageComponent";
import "./product.scss";

const SingleProductPage = ({ cart, addToCart, removeFromCart }) => {
  const [product, setProduct] = useState({});
  const [specificationsOpen, setSpecificationsOpen] = useState(false);
  const [materialsOpen, setMaterialsOpen] = useState(false);
  const [existingCartItem, setExistingCartItem] = useState(null);
  const [productNotFound, setProductNotFound] = useState(false);
  const [loading, setLoading] = useState(true);

  // Use useParams to get both category and slug
  const { category, slug } = useParams();

  useEffect(() => {
    const fetchSingleProduct = async () => {
      try {
        // Adjust the API endpoint to include both category and slug
        const response = await axios.get(
          `/api/products/category/${category}/${slug}`
        );
        const existingCartItem = cart.find(
          (item) => item._id === response.data._id
        );
        setProduct(response.data);
        setExistingCartItem(existingCartItem);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setProduct(null);
        setProductNotFound(true);
        console.error("Error fetching product:", error);
      }
    };
    fetchSingleProduct();
  }, [category, slug, cart]);

  if (loading) {
    return <LoadingSpinner />; // Display the loading spinner while data is being fetched
  }

  if (productNotFound) {
    return <NotFoundPage />;
  }

  if (!product) {
    return <p>Loading...</p>;
  }

  //Add to cart funcitonality
  const AddToCart = () => {
    if (existingCartItem && existingCartItem.quantity < product.inStock) {
      addToCart(product);
    } else if (!existingCartItem) {
      addToCart(product);
    }
  };

  const RemoveFromCart = () => {
    removeFromCart(product);
  };

  //Toggle specification accordion
  const toggleSpecifications = () => {
    setSpecificationsOpen(!specificationsOpen);
  };

  //Toggle materials accordion
  const toggleMaterials = () => {
    setMaterialsOpen(!materialsOpen);
  };

  if (!product) {
    return <p>Loading...</p>; // or return an error message
  }

  return (
    <div className="single-product-page">
      <div className="container">
        <div className="row">
          <Link to={"/products"}>
            <i className="fa-solid fa-arrow-left-long"></i>&nbsp;Gå tillbaka
          </Link>
          <div className="product-info">
            <div className="product-image">
              <ImageComponent
                imageUrl={product.imgSingle}
                imageName={product.name}
              />
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
                <div
                  className={`add-to-cart-container${
                    existingCartItem ? "-added" : ""
                  }`}
                >
                  <button className="btn card-btn" onClick={AddToCart}>
                    Lägg till i kundvagnen
                  </button>
                  {existingCartItem && existingCartItem.quantity >= 1 && (
                    <div className="qty-container">
                      <button className="btn" onClick={RemoveFromCart}>
                        -
                      </button>
                      <span>{existingCartItem.quantity}</span>
                      <button
                        className={`btn${
                          existingCartItem.quantity >= product.inStock
                            ? "-max"
                            : ""
                        }`}
                        onClick={AddToCart}
                      >
                        +
                      </button>
                    </div>
                  )}
                </div>
              </div>
              <br></br>
              <p className="in-stock">Antal varor i lager: {product.inStock}</p>
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProductPage;
