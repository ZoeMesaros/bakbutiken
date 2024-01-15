import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./checkout.scss";

//Checkout page
const CheckoutPage = ({ cart }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };

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
    const shippingPrice = 59;

    return totalItems + shippingPrice;
  };

  return (
    <div className="checkout-page">
      {cart.length > 0 ? (
        <div className="row">
          <div className="col-md-8 address">
            <div className="checkout-title">
              <div className="row">
                <div className="col">
                  <h3>Kassan</h3>
                </div>
                <div className="col align-self-center text-right text-muted"></div>
              </div>
            </div>
            <h5>Uppgifter</h5>
            <div className="checkout-form-div">
              <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-input-row">
                  <div>
                    {/* First name label */}
                    <label htmlFor="form-firstname"></label>
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
                    {/* Last name label */}
                    <label htmlFor="form-lastname"></label>
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
                    {/* Address label*/}
                    <label htmlFor="form-address"></label>
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
                    {/* Postal label*/}
                    <label htmlFor="form-address"></label>
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
                    {/* Area */}
                    <label htmlFor="form-address"></label>
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
                </div>
                <div className="form-input-row">
                  <div>
                    {/* E-email */}
                    <label htmlFor="form-email"></label>{" "}
                    {errors.email && (
                      <span className="form-error">Ange en giltig e-post</span>
                    )}
                    <input
                      {...register("email", {
                        required: true,
                        pattern: {
                          value:
                            /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                          message: "Ogiltig e-postadress",
                        },
                      })}
                      type="text"
                      id="form-email"
                      placeholder="E-post"
                    />
                  </div>
                  <div>
                    {/* Mobile */}
                    <label htmlFor="form-mobile"></label>
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
                  <div>
                    {/* Phone */}
                    <label htmlFor="form-phone"></label>
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
                <div>
                  <button type="submit" form="checkout-form">
                    Skicka
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4 summary border-left border-right">
            <div className="cart-summary">
              <h5>Sammanfattning</h5>
              <p>
                Antal varor:&nbsp;<strong>{calculateTotalQuantity()}</strong>
              </p>
              <p>
                Summa varor:&nbsp;<strong>{calculateTotalSum()} Kr</strong>
              </p>
              <p className="col border-bottom">
                Frakt:&nbsp;<strong>59kr</strong>
              </p>
              <p>
                Totalt att betala:
                <strong>&nbsp;{calculateTotalSumWithShipping()}</strong>
              </p>
              <p>
                {`Varav moms 25%:`}
                <strong>&nbsp;{calculateTotalSumWithTax()} kr</strong>
              </p>
              <button>
                <Link to={"/checkout"}>Till betalning</Link>
              </button>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h4>Inga produkter tillagda</h4>
          <p>
            <Link to={"/products"}>Gå till sortiment</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default CheckoutPage;
