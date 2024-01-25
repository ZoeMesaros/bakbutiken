import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/bakbutiken.png";
import cartImg from "../../assets/images/cart.png";
import cartItemImg from "../../assets/images/cart-item.png";

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
        <div className="container-xl header-nav">
          <div className="header-logo">
            <Link to={"/"}>
              <img src={logo} alt="Bakbutiken" />
            </Link>
          </div>
          <div className="main-nav-items text-center">
            <Nav id="main-navbar">
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
                <Link to={"/about"} className="nav-link">
                  Om oss
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={"/contact"} className="nav-link">
                  Kontakt
                </Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="header-button">
            <button className={`btn-cart`}>
              <Link to="/cart">
                <div className="d-md-block mb-0">
                  <p>Kundvagn</p>
                  {cart.length > 0 ? (
                    <>
                      <img src={cartItemImg} className="cart-img" />
                      <span
                        className={`item${cartLength ? "-symbol" : ""}`}
                      ></span>
                    </>
                  ) : (
                    <img src={cartImg} className="cart-img" />
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
            <Navbar.Collapse id="navbarNav" className="justify-content-center">
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
                  <Link to={"/about"} className="nav-link">
                    Om oss
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/contact"} className="nav-link">
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
