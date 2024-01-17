import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.scss";
import CartModal from "../../components/CartModal/CartModal";

// Cart page
const CartPage = ({ cart, removeFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
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

  //Open modal to confirm clearing the cart if quantity is more than 1, otherwise remove item
  const handleRemoveClick = (cartItem) => {
    if (cartItem.quantity === 1) {
      removeFromCart(cartItem);
    } else {
      setSelectedCartItem(cartItem);
      setShowModal(true);
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedCartItem(null);
  };

  return (
    <div className="cart-page">
      <h3 className="mx-5">Kundvagn</h3>
      <div className="col-md-7 text-muted pe-1 pb-3">
        <strong>
          <h5>{calculateTotalQuantity()} artiklar i kundvagnen</h5>
        </strong>
      </div>
      {cart.length > 0 ? (
        <div className="row mx-5">
          <div className="col-md-8 cart">
            <div className="row border-top border-bottom">
              <div className="row main align-items-center">
                <div className="col-2"></div>
                <div className="col">Artikel</div>
                <div className="col">Antal</div>
                <div className="col">À-pris </div>
                <div className="col">Summa</div>
                <div className="col"></div>
              </div>
            </div>
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
                  <div className="col">
                    <span
                      className="close"
                      onClick={() => handleRemoveClick(cartItem)}
                    >
                      &#10005;
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col summary border-left border-right">
            <div className="cart-summary">
              <h5>Sammanfattning</h5>
              <p>
                Antal varor:&nbsp;<strong>{calculateTotalQuantity()} st</strong>
              </p>
              <p>
                Summa varor:&nbsp;<strong>{calculateTotalSum()} kr</strong>
              </p>
              <p className="col border-bottom">
                Frakt (standard):&nbsp;<strong>59 kr</strong>
              </p>
              <p>
                <strong>
                  Totalt att betala: &nbsp;{calculateTotalSumWithShipping()} kr
                </strong>
              </p>
              <p>
                Varav moms:
                <strong>&nbsp;{calculateTotalSumWithTax()} kr</strong>
              </p>
              <button>
                <Link to={"/checkout"}>Gå till kassan</Link>
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
      {showModal && (
        <CartModal
          cartItem={selectedCartItem}
          removeFromCart={removeFromCart}
          closeModal={closeModal}
        />
      )}
    </div>
  );
};

export default CartPage;
