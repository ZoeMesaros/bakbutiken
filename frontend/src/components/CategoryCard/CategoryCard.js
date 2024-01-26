import React from "react";
import { Link } from "react-router-dom";
import "./categorycard.scss";

const CategoryCard = ({ category, image, title, description, price }) => {
  return (
    <div className="col-md-3 mb-4">
      <div className="card h-100">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <p className="card-price">{price} Kr</p>
        </div>
        <div className="card-footer">
          <Link to={`/products/${category}`} className="btn btn-primary">
            Explore {category}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
