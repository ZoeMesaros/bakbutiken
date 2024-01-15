import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/bakbutiken.png";
import cupcakeImg from "../../assets/images/cupcake.png";

// Navigation menu
const NavBar = ({ cart }) => {
  const [cartLength, setCartLength] = useState(cart.length);

  // Calculate the total amount of items in the cart
  const calculateTotalQuantity = () => {
    return cart.reduce(
      (total, cartItem) => total + Number(cartItem.quantity || 0),
      0
    );
  };

  return (
    <>
      <header>
        {/* Main header */}
        <div className="header-nav">
          <div className="header-logo">
            <Link to={"/"}>
              <img src={logo} alt="Bakbutiken" />
            </Link>
          </div>
          <div className="header-button">
            <button className={`btn-cart${cart.length > 0 ? "-btn" : ""}`}>
              <Link to="/cart">
                <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                <div className="d-none d-md-block mb-0">
                  <p>Kundvagn</p>
                  {cart.length > 0 && (
                    <>
                      <img src={cupcakeImg} className="cupcake-img" />
                      <span className={`item${cartLength ? "-symbol" : ""}`}>
                        <p className="cart-qty">{calculateTotalQuantity()}</p>
                      </span>
                    </>
                  )}
                </div>
              </Link>
            </button>
          </div>
        </div>
        {/* Navigation bar */}
        <Navbar expand="md" variant="light" className="border">
          <Container>
            <Navbar.Toggle aria-controls="navbarNav" />
            <Navbar.Collapse id="navbarNav">
              <Nav className="mx-auto">
                <Nav.Item>
                  <Link to={"/"} className="nav-link">
                    Hem
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/products"} className="nav-link">
                    Produkter
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/products"} className="nav-link">
                    Om oss
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/products"} className="nav-link">
                    Kontakt
                  </Link>
                </Nav.Item>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
