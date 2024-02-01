import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import "./checkout.scss";
import ScrollToTop from "../../components/ScrollToTop/ScrollToTop";
import parcel from "../../assets/images/parcel.png";
import parcelTruck from "../../assets/images/parcel-truck.png";
import visa from "../../assets/images/visa.png";
import masterCard from "../../assets/images/mastercard.png";
import swish from "../../assets/images/swish.png";

//Checkout page
const CheckoutPage = ({ cart, clearCart }) => {
  //State to track chosen shipping cost, with 59 kr as the initial state
  const [shippingCost, setShippingCost] = useState(59);

  //State to track which payment method has been chosen, with card / "kort" as the initial state
  const [paymentMethod, setPaymentMethod] = useState("Kort");

  //State to control open and close functionality of payment method accordion
  const [isOpen, setIsOpen] = useState(true);

  // Form managed using react hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();

  const navigate = useNavigate();

  // Function to handle opening and closing accordions
  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  //Validation for credit card input fields
  const inputValidation = (placeholder, additionalRules = {}) => ({
    ...additionalRules,
    required: `${placeholder} är obligatoriskt`,
  });

  function generateOrderNumber() {
    const timestamp = Date.now(); // Get current timestamp
    const random = Math.floor(Math.random() * 1000); // Generate a random number with 3 digits

    // Concatenate timestamp and random number to create a unique order number
    const orderNumber = `${timestamp}${random}`;

    return orderNumber;
  }

  const onSubmit = async (formData) => {
    try {
      const cartData = cart.map(({ _id, quantity }) => ({ _id, quantity }));
      const orderNumber = generateOrderNumber();
      // Include order details and cart data in the request body
      const requestBody = {
        ...formData,
        items: cartData,
        totalAmount: calculateTotalSumWithShipping(),
        orderNumber: orderNumber,
      };

      // Step 1: Make a request to create a new order
      const createOrderResponse = await fetch(
        "http://localhost:5000/api/orders/new",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!createOrderResponse.ok) {
        console.error(
          "Failed to create order:",
          createOrderResponse.status,
          createOrderResponse.statusText
        );
        return; // Exit if creating order fails
      }

      // Extract orderId from the response
      const createOrderData = await createOrderResponse.json();
      const orderId = createOrderData.orderId;

      // Step 2: Make a request to update stock for the created order
      const updateStockResponse = await fetch(
        `http://localhost:5000/api/orders/${orderId}/update-stock`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          // Include any necessary data in the body if required
        }
      );

      if (!updateStockResponse.ok) {
        console.error(
          "Failed to update stock and orders:",
          updateStockResponse.status,
          updateStockResponse.statusText
        );
        return; // Exit if updating stock fails
      }

      const updateStockData = await updateStockResponse.json();
      console.log(
        "Stock and orders updated successfully. Response:",
        updateStockData
      );

      // After successful purchase, clear and remove the items in the cart
      localStorage.removeItem("cart");
      clearCart();
      navigate("/success");
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };

  // Form hook funcitonality watch chosen shipping or payment method
  const watchShippingMethod = watch("shipping_method");
  const watchPaymentMethod = watch("payment_method");

  // UseEffect to apply the correct values to the chosen shipping or payment method
  useEffect(() => {
    if (watchShippingMethod === "Ombud") {
      setShippingCost(59);
    } else if (watchShippingMethod === "Hemleverans") {
      setShippingCost(150);
    }

    if (watchPaymentMethod === "Kort") {
      setPaymentMethod("Kort");
    } else if (watchPaymentMethod === "Swish") {
      setPaymentMethod("Swish");
    }
  }, [watchShippingMethod, watchPaymentMethod]);

  // Calculate the total sum of items in the cart
  const calculateTotalSum = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
  };

  // Calculate tax based on total sum
  const calculateTotalSumWithTax = () => {
    const totalItems = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    // Fixed tax of 25% of the total sum of products
    const taxRate = 0.25;

    return totalItems * taxRate;
  };

  // Calculate the total sum with shipping
  const calculateTotalSumWithShipping = () => {
    const totalItems = cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    return totalItems + shippingCost;
  };

  //When clicking a link, go to top of the page
  const handleLinkClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="checkout-page">
      <ScrollToTop />
      <div className="container">
        <div className="row">
          {cart.length > 0 ? (
            <>
              <h3 className=" page-title">Kassa</h3>
              <h5 className="summary-title">Sammanfattning</h5>
              <div className="row">
                <div className="col cart">
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
                            <div className="row text-muted">
                              {cartItem.name}
                            </div>
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
                  <strong>
                    <h5>
                      Totalt att betala:&nbsp;&nbsp;
                      {calculateTotalSumWithShipping().toLocaleString()} kr
                    </h5>
                  </strong>
                  <p>
                    Varav moms:
                    <strong>
                      &nbsp;&nbsp;
                      {calculateTotalSumWithTax().toLocaleString()} kr
                    </strong>
                  </p>
                </div>
              </div>
              <h5 className="info-title">Uppgifter</h5>
              <div className="col order-info">
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
                          <span className="form-error">
                            Ange ett postnummer
                          </span>
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
                          <span className="form-error">
                            Ange en giltig e-post
                          </span>
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
                        {/* Standard shipping */}
                        <input
                          {...register("shipping_method")}
                          type="radio"
                          value="Ombud"
                          id="field-standard"
                          checked={
                            watchShippingMethod === "Ombud" ||
                            !watchShippingMethod
                          }
                        />
                      </div>
                      <p>Ombud</p>
                      <p>59 kr</p>
                      <img src={parcel} alt="" />
                    </label>
                    <label className="shipping-div" htmlFor="field-home">
                      <div>
                        {/* Home delivery */}
                        <input
                          {...register("shipping_method")}
                          type="radio"
                          value="Hemleverans"
                          id="field-home"
                          defaultChecked={watchShippingMethod === "Hemleverans"}
                        />
                      </div>
                      <p>Hemleverans</p>
                      <p>150 kr</p>
                      <img src={parcelTruck} alt="" />
                    </label>
                  </div>
                  <h5 className="payment-title">Betalsätt</h5>
                  <div className="payment-options">
                    <label
                      className="payment-div-card"
                      htmlFor="field-standard"
                    >
                      <div>
                        {/* Payment method using card */}
                        <input
                          {...register("payment_method")}
                          type="radio"
                          value="Kort"
                          id="field-card"
                          checked={
                            watchPaymentMethod === "Kort" || !watchPaymentMethod
                          }
                          onClick={toggleAccordion}
                        />
                      </div>
                      <p>Betalkort</p>
                      <div className="cards-container">
                        <img className="visa" src={visa} alt="" />
                        <img className="master" src={masterCard} alt="" />
                      </div>
                    </label>
                    {isOpen && (
                      <div className="col accordion-content">
                        <div className="credit-card-info">
                          {/* Credit Card Details */}
                          <div>
                            {errors.creditCard && (
                              <span className="form-error">
                                {errors.creditCard.message}
                              </span>
                            )}
                            <input
                              {...register(
                                "creditCard",
                                inputValidation("Kortnummer", {
                                  pattern: {
                                    value: /^\d{16}$/,
                                    message: "Ogiltigt kortnummer",
                                  },
                                })
                              )}
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              id="creditCard"
                            />
                          </div>
                          <div>
                            {errors.expiryDate && (
                              <span className="form-error">
                                {errors.expiryDate.message}
                              </span>
                            )}
                            <input
                              {...register(
                                "expiryDate",
                                inputValidation("Giltigt till", {
                                  pattern: {
                                    value: /^(0[1-9]|1[0-2])\/\d{2}$/,
                                    message: "Ogiltigt datumformat",
                                  },
                                })
                              )}
                              type="text"
                              id="expiryDate"
                              placeholder="MM/ÅÅ"
                            />
                          </div>
                          <div>
                            {errors.cvv && (
                              <span className="form-error">
                                {errors.cvv.message}
                              </span>
                            )}
                            <input
                              {...register(
                                "cvv",
                                inputValidation("CVV/CVC", {
                                  pattern: {
                                    value: /^\d{3}$/,
                                    message: "Ogiltigt CVV/CVC",
                                  },
                                })
                              )}
                              type="text"
                              id="cvv"
                              placeholder="3 siffror"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <label className="payment-div-swish" htmlFor="field-swish">
                      <div>
                        {/*   Payment method using Swish */}
                        <input
                          {...register("payment_method")}
                          type="radio"
                          value="Swish"
                          id="field-swish"
                          defaultChecked={watchPaymentMethod === "Swish"}
                          onClick={toggleAccordion}
                        />
                      </div>
                      <p>Swish</p>
                      <img className="swish" alt="" src={swish} />
                    </label>
                  </div>
                  <div className="payment-section">
                    <p>Totalt att betala</p>
                    <h2>{calculateTotalSumWithShipping()} kr</h2>
                    <div className="row">
                      <button
                        onClick={handleLinkClick}
                        className="paybutton"
                        type="submit"
                      >
                        Betala med {paymentMethod}
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <>
              <div className="row no-items">
                <h3 className="no-cart text-center pt-5">Kundvagn </h3>
                <div className="col mx-5 d-flex align-items-center justify-content-center text-center no-cart-div mb-5">
                  <div>
                    <h4>Inga produkter tillagda</h4>
                    <p>
                      <Link to="/produkter">Gå till sortiment</Link>
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
