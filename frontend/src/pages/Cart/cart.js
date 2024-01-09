import React, { useState, useEffect } from "react";
import "./cart.scss";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  return (
    <div className="cart-page">
      <div className="row">
        <div className="col-md-8 cart">
          <div className="cart-title">
            <div className="row">
              <div className="col">
                <h3>Kundvagn</h3>
              </div>
              <div className="col align-self-center text-right text-muted">
                {cart.length} artiklar i kundvagnen
                <br />
                <br />
              </div>
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
                <div className="col"></div>
                <div className="col">
                  <div className="price-container">
                    <span
                      className={`item-price${cartItem.onSale ? "-sale" : ""}`}
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
              </div>
            </div>
          ))}
        </div>
        <div className="col-md-4 summary">
          <div>Din beställning</div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;