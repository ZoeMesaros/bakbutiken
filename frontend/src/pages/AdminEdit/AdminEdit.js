import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import "./adminedit.scss";

const AdminEditPage = () => {
  const { category, slug } = useParams();
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `/api/products/category/${category}/${slug}`
        );

        setProduct(response.data);
        setLoading(false);

        setValue("product_name", response.data.name);
        setValue("slug_name", response.data.slug);
        setValue("desc", response.data.desc);
        setValue("price", response.data.price);
        setValue("stock", response.data.inStock);
        setValue("on_sale", response.data.onSale);
        setValue("sale_price", response.data.salePrice);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [category, slug, setValue]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div>Error fetching product: {error.message}</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const onSaleChecked = watch("on_sale");

  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.put(`/api/products/${product._id}`, data);
      if (response.status === 200) {
        console.log("Product updated successfully!", data);
      } else {
        console.error("Error updating product:", response.data);
      }
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  return (
    <div className="admin-edit-page">
      <div className="container pt-5">
        <div className="col">
          <Link to={`/admin`} className="btn btn-outline-secondary mx-5">
            <i className="fa-solid fa-arrow-left"></i>&nbsp;Tillbaka till admin
          </Link>
          <h4 className="mb-5 mx-auto text-center">
            Redigera produkt: {product.name}
          </h4>
        </div>

        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="row mx-3">
            <div className="col-md-6 mx-auto">
              <div className="mb-3 pb-4">
                <label htmlFor="product_name" className="form-label">
                  Produktnamn
                </label>
                {errors.product_name && (
                  <span className="form-error">Ange ett produktnamn</span>
                )}
                <input
                  {...register("product_name", { required: true })}
                  type="text"
                  className="form-control rounded"
                />
              </div>

              <div className="mb-3 pb-4">
                <label htmlFor="desc" className="form-label">
                  Produkteskrivning
                </label>
                {errors.desc && (
                  <span className="form-error">Ange en produktbeskrivning</span>
                )}
                <textarea
                  {...register("desc", { required: true })}
                  type="text"
                  className="form-control rounded"
                />
              </div>

              <div className="mb-3 pb-4">
                <label htmlFor="stock" className="form-label">
                  Antal i lager
                </label>
                {errors.stock && (
                  <span className="form-error">Ange lagerstatus</span>
                )}
                <input
                  {...register("stock", { required: false })}
                  type="number"
                  className="form-control rounded"
                />
              </div>

              <div className="mb-3 pb-4">
                <label htmlFor="price" className="form-label">
                  Pris
                </label>
                {errors.price && (
                  <span className="form-error">Ange ett pris</span>
                )}
                <input
                  {...register("price", { required: true })}
                  type="number"
                  className="form-control rounded"
                />
              </div>

              <div className="mb-3 pb-4 form-check">
                <input
                  {...register("on_sale")}
                  type="checkbox"
                  className="form-check-input"
                />
                <label htmlFor="on_sale" className="form-check-label">
                  På rea
                </label>
              </div>

              <div className="mb-3 pb-4">
                <label htmlFor="sale_price" className="form-label">
                  Rea pris
                </label>
                {errors.sale_price && (
                  <span className="form-error">Ange ett reapris</span>
                )}
                <input
                  {...register("sale_price", { required: true })}
                  type="number"
                  className="form-control rounded"
                  disabled={!onSaleChecked}
                />
              </div>

              <button type="submit" className="btn custom-btn">
                Spara ändringar
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminEditPage;
