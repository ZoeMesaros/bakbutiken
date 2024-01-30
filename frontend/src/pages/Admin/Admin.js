import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";

import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useProductFetch from "../../customHooks/fetchProducts";
import "./admin.scss";

const AdminPage = ({ handleLogout }) => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCategory = category || "";

  const { products, loading } = useProductFetch(selectedCategory, currentPage);

  const handleLogoutClick = () => {
    if (typeof handleLogout === "function") {
      handleLogout();
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="admin-page">
      <div className="container">
        <div className="d-flex justify-content-end">
          <button onClick={handleLogoutClick} className="btn btn-danger m-5">
            Logga ut
          </button>
        </div>
        <div className="row">
          <div className="col">
            <div>
              {products.map((product) => (
                <div
                  key={product._id}
                  className="row no-gutters border-top cart-item"
                >
                  <div className="row main align-items-center">
                    <div className="col">
                      <img className="admin-img" src={product.img} alt="" />
                    </div>
                    <div className="col">
                      <div className="row text-muted">Namn</div>
                      <div className="row text-muted">{product.name}</div>
                    </div>
                    <div className="col">
                      <div className="row text-muted">I lager</div>
                      <div className="row text-muted">{product.inStock}</div>
                    </div>
                    <div className="col">
                      <div className="row text-muted">På rea</div>
                      <div className="row text-muted">{`${
                        product.onSale ? "Ja" : "Nej "
                      }`}</div>
                    </div>
                    <div className="col">
                      <div className="row text-muted">Pris</div>
                      <div className="row text-muted">
                        {`${
                          product.onSale
                            ? `${product.salePrice}`
                            : `${product.price}`
                        }`}{" "}
                        kr
                      </div>
                    </div>
                    <div className="col">
                      <Link
                        to={`/admin/edit/${product.category}/${product.slug}`}
                      >
                        <button className="btn btn-outline-success">
                          Redigera
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
