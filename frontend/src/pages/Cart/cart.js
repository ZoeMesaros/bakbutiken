import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.scss";
import CartModal from "../../components/CartModal/CartModal";

// Cart page component to render the cart
const CartPage = ({ cart, removeFromCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedCartItem, setSelectedCartItem] = useState(null);
  // Calculate the total amount of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
  };

  // Calculate the total sum of items in the cart
  const calculateTotalSum = () => {
    return cart.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );
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
      {cart.length > 0 ? (
        <div className="row">
          <div className="col-md-8 cart">
            <div className="cart-title">
              <div className="row">
                <div className="col">
                  <h3>Kundvagn</h3>
                </div>
                <div className="col align-self-center text-right text-muted">
                  {calculateTotalQuantity()} artiklar i kundvagnen
                  <br />
                  <br />
                </div>
              </div>
            </div>
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
                    <div className="row text-muted">{cartItem.name}</div>
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
          <div className="col-md-4 summary border-left border-right">
            <h5>Sammanfattning</h5>

            <div className="cart-summary">
              <p>Antal varor:{calculateTotalQuantity()}</p>
              <p>Summa varor:{calculateTotalSum()} Kr</p>
              <p className="col border-bottom">Frakt: 59kr</p>
              <p>Totalt att betala:</p>
              <p>Varav moms:</p>
            </div>
            <button>
              <Link to={"/checkout"}>Gå till kassan</Link>
            </button>
          </div>
        </div>
      ) : (
        <>
          <h4>Inga produkter tillagda</h4>
          <p>
            Se vårt <Link to={"/products"}>sortiment</Link>
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
