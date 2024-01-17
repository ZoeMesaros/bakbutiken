import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./checkout.scss";

//Checkout page
const CheckoutPage = ({ cart }) => {
  const [shippingCost, setShippingCost] = useState(59);
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };

  const watchShippingMethod = watch("shipping_method");

  useEffect(() => {
    if (watchShippingMethod === "standard") {
      setShippingCost(59);
    } else if (watchShippingMethod === "homed") {
      setShippingCost(150);
    }
  }, [watchShippingMethod]);

  // Calculate the total amount of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce(
      (total, cartItem) => total + Number(cartItem.quantity || 0),
      0
    );
  };

  // Calculate the total sum of items in the cart
  const calculateTotalSum = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
  };

  //Calculate tax based on total sum
  const calculateTotalSumWithTax = () => {
    const totalItems = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    //Fixed tax of 25% of the total sum of products
    const taxRate = 0.25;

    return totalItems * taxRate;
  };

  //Calculate the total sum with shipping
  const calculateTotalSumWithShipping = () => {
    const totalItems = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    //Fixed shipping fee

    return totalItems + shippingCost;
  };

  return (
    <div className="checkout-page">
      <h3 className="mx-5">Kassa</h3>
      <h5 className="col mx-5 summary-title">Sammanfattning</h5>
      {cart.length > 0 ? (
        <>
          <div className="row">
            <div className="col mx-5 cart">
              <div className="row" id="bg-color">
                <div className="row main align-items-center">
                  <div className="col-2"></div>
                  <div className="col">Artikel</div>
                  <div className="col"></div>
                  <div className="col">Antal</div>
                  <div className="col">À-pris </div>
                  <div className="col">Summa</div>
                </div>
              </div>
              <div id="bg-color">
                {cart.map((cartItem, index) => (
                  <div
                    className="row no-gutters border-top cart-item"
                    key={index}
                  >
                    <div className="row main align-items-center">
                      <div className="col-2 ">
                        <img
                          className="img-fluid"
                          src={cartItem.img}
                          alt={cartItem.name}
                        />
                      </div>
                      <div className="col">
                        <div className="row text-muted">{cartItem.name}</div>
                      </div>
                      <div className="col"></div>
                      <div className="col">{cartItem.quantity}</div>
                      <div className="col">
                        <div className="price-container">
                          <span
                            className={`item-price${
                              cartItem.onSale ? "-sale" : ""
                            }`}
                          >
                            {cartItem.price} Kr
                          </span>
                          {cartItem.onSale && (
                            <span className="sale-price">
                              {cartItem.salePrice} Kr
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="col">
                        {cartItem.quantity * cartItem.price} Kr
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col cart-summary border-top">
              <p>
                Summa varor:&nbsp;&nbsp;
                <strong>{calculateTotalSum().toLocaleString()} kr</strong>
              </p>
              <p className="col border-bottom">
                Frakt:&nbsp;&nbsp;<strong>{shippingCost} kr</strong>
              </p>
              <p>
                <strong>
                  <h5>
                    Totalt att betala:&nbsp;&nbsp;
                    {calculateTotalSumWithShipping().toLocaleString()} kr
                  </h5>
                </strong>
              </p>
              <p>
                Varav moms:
                <strong>
                  &nbsp;&nbsp;
                  {calculateTotalSumWithTax().toLocaleString()} kr
                </strong>
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <h4>Inga produkter tillagda</h4>
          <p>
            <Link to={"/products"}>Gå till sortiment</Link>
          </p>
        </>
      )}
      <h5 className="col mx-5 info-title">Uppgifter</h5>
      <div className="col mx-5 order-info">
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="adress-form">
            <div className="col checkout-form-div">
              <div className="form-input-row">
                <div>
                  {/* First name label */}
                  {errors.first_name && (
                    <span className="form-error">Ange ett namn</span>
                  )}

                  <input
                    {...register("first_name", { required: true })}
                    type="text"
                    id="form-firstname"
                    placeholder="Förnamn"
                  />
                </div>
                <div>
                  {/* Address label*/}
                  {errors.address && (
                    <span className="form-error">Ange en adress</span>
                  )}
                  <input
                    {...register("address", { required: true })}
                    type="text"
                    id="input-address"
                    placeholder="Adress"
                  />
                </div>
                <div>
                  {/* Area */}
                  {errors.area && (
                    <span className="form-error">Ange en postort</span>
                  )}
                  <input
                    {...register("area", { required: true })}
                    type="text"
                    id="input-area"
                    placeholder="Postort"
                  />
                </div>
                <div>
                  {/* Mobile */}
                  {errors.mobile && (
                    <span className="form-error">
                      Ange ett giltigt telefonnummer
                    </span>
                  )}
                  <input
                    {...register("mobile", {
                      required: false,
                      pattern: {
                        value: /^[0-9\s+-]+$/,
                      },
                    })}
                    type="tel"
                    id="form-mobile"
                    placeholder="Mobilnummer"
                  />
                </div>
              </div>
            </div>
            <div className="col checkout-form-div">
              <div>
                {/* Last name label */}
                {errors.last_name && (
                  <span className="form-error">Ange ett efternamn</span>
                )}
                <input
                  {...register("last_name", { required: true })}
                  type="text"
                  id="form-lastname"
                  placeholder="Efternamn"
                />
              </div>
              <div>
                {/* Postal label*/}
                {errors.postal && (
                  <span className="form-error">Ange ett postnummer</span>
                )}
                <input
                  {...register("postal", { required: true })}
                  type="text"
                  id="input-postal"
                  placeholder="Postnummer"
                />
              </div>
              <div>
                {/* E-email */}
                {errors.email && (
                  <span className="form-error">Ange en giltig e-post</span>
                )}
                <input
                  {...register("email", {
                    required: true,
                    pattern: {
                      value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                      message: "Ogiltig e-postadress",
                    },
                  })}
                  type="text"
                  id="form-email"
                  placeholder="E-post"
                />
              </div>
              <div>
                {/* Phone */}
                {errors.phone && (
                  <span className="form-error">
                    Ange ett giltigt telefonnummer
                  </span>
                )}
                <input
                  {...register("phone", {
                    required: false,
                    pattern: {
                      value: /^[0-9\s+-]+$/,
                    },
                  })}
                  type="tel"
                  id="form-phone"
                  placeholder="Telefonnummer"
                />
              </div>
            </div>
          </div>
          <h5 className="shipping-title">Fraktalternativ</h5>
          <div className="shipping-options">
            <label className="shipping-div" htmlFor="field-standard">
              <div>
                <input
                  {...register("shipping_method")}
                  type="radio"
                  value="standard"
                  id="field-standard"
                  checked={
                    watchShippingMethod === "standard" || !watchShippingMethod
                  }
                />
              </div>
              <p>Ombud</p>
              <p>59 kr</p>
            </label>
            <label className="shipping-div" htmlFor="field-home">
              <div>
                <input
                  {...register("shipping_method")}
                  type="radio"
                  value="homed"
                  id="field-home"
                  defaultChecked={watchShippingMethod === "homed"}
                />
              </div>
              <p>Hemleverans</p>
              <p>150 kr</p>
            </label>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
