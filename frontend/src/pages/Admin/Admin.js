import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import useProductFetch from "../../customHooks/fetchProducts";
import "./admin.scss";

// Admin page component
const AdminPage = ({ handleLogout }) => {
  const { category } = useParams();
  const [currentPage, setCurrentPage] = useState(1);
  const selectedCategory = category || "";

  const { products, loading } = useProductFetch(selectedCategory, currentPage);

  const { handleSubmit, control, setValue } = useForm();

  // State to track the open/closed state of each accordion
  const [openAccordions, setOpenAccordions] = useState({});

  const toggleAccordion = (productId) => {
    setOpenAccordions((prevOpenAccordions) => ({
      ...prevOpenAccordions,
      [productId]: !prevOpenAccordions[productId],
    }));
  };

  const handleInputChange = (productId, fieldName, value) => {
    setValue(`${productId}.${fieldName}`, value);
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLogoutClick = () => {
    if (typeof handleLogout === "function") {
      handleLogout();
    }
  };

  const onSubmit = (data) => {
    // Handle form submission, send data to the server, etc.
    console.log(data);
  };

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
                <form onSubmit={handleSubmit(onSubmit)} key={product._id}>
                  <div className="row no-gutters border-top cart-item">
                    <div className="row main align-items-center">
                      <div className="col">
                        <img className="admin-img" src={product.img} alt="" />
                      </div>
                      <div className="col">
                        <div className="row text-muted">Namn</div>
                        <div className="row text-muted">{product.name}</div>
                      </div>
                      <div className="col">
                        <div className="row text-muted">Antal i lager</div>
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
                      <button onClick={() => toggleAccordion(product._id)}>
                        Redigera
                      </button>
                    </div>
                    {openAccordions[product._id] && (
                      <div
                        className="col accordion-content"
                        id={`field-${product._id}`}
                      >
                        <div className="admin-items-info">
                          <div>
                            Produktnamn
                            <Controller
                              name={`${product._id}.name`}
                              control={control}
                              defaultValue={product.name}
                              render={({ field }) => (
                                <input
                                  type="text"
                                  {...field}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product._id,
                                      "name",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            />
                          </div>
                          <div>
                            Pris
                            <Controller
                              name={`${product._id}.price`}
                              control={control}
                              defaultValue={product.price}
                              render={({ field }) => (
                                <input
                                  type="number"
                                  {...field}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product._id,
                                      "price",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            />
                          </div>
                          <div>
                            På REA
                            <Controller
                              name={`${product._id}.onSale`}
                              control={control}
                              defaultValue={product.onSale}
                              render={({ field }) => (
                                <input
                                  type="checkbox"
                                  {...field}
                                  onChange={(e) =>
                                    handleInputChange(
                                      product._id,
                                      "onSale",
                                      e.target.value
                                    )
                                  }
                                />
                              )}
                            />
                          </div>
                        </div>
                        <button type="submit">Spara</button>
                      </div>
                    )}
                  </div>
                </form>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
