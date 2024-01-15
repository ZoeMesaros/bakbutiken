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
      <h3>Kassan</h3>
      {cart.length > 0 ? (
        <div className="col summary border-left border-right">
          <div className="row border-top border-bottom">
            <div className="row main align-items-center">
              <div className="col-2"></div>
              <div className="col">Artikel</div>
              <div className="col">Antal</div>
              <div className="col">À-pris </div>
              <div className="col">Summa</div>
              <div className="col-2"></div>
            </div>
          </div>
          <h5>Sammanfattning</h5>
          <div className="cart-summary">
            <div className="checkout-cart">
              {cart.map((cartItem, index) => (
                <div className="row border-top border-bottom" key={index}>
                  <div className="row main align-items-center">
                    <div className="col-2">
                      <img
                        className="img-fluid"
                        src={cartItem.img}
                        alt={cartItem.name}
                      />
                    </div>
                    <div className="col">
                      <Link to={`/products/${cartItem.slug}`}>
                        <div className="row text-muted">{cartItem.name}</div>
                      </Link>
                    </div>
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
            <div className="summary-section">
              <p>
                Antal varor:&nbsp;
                <strong>{calculateTotalQuantity()}</strong>
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
          <h5>Dina uppgifter</h5>
          <div className="order-info">
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)}>
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
                </div>
              </div>
              <div className="col checkout-form-div">
                <div>
                  {/* E-email */}
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
              {/*        <div>
                <button type="submit" form="checkout-form">
                  Skicka
                </button>
              </div> */}
            </form>
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
