import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./cart.scss";

const CartPage = () => {
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  const calculateTotalQuantity = () => {
    return cart.reduce((total, cartItem) => total + cartItem.quantity, 0);
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
                    {cartItem.quantity * cartItem.price}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="col-md-4 summary border-left border-right">
            <div>
              <h5>Din beställning</h5>
            </div>
          </div>
        </div>
      ) : (
        <>
          <h4>Inga produkter tillagda</h4>
          <p>
            Se vårat <Link to={"/products"}>sortiment</Link>
          </p>
        </>
      )}
    </div>
  );
};

export default CartPage;
