import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/bakbutiken.png";
import cartImg from "../../assets/images/cart.png";
import cartItemImg from "../../assets/images/cart-item.png";

// Main avigation menu
const NavBar = ({ cart, loggedIn }) => {
  return (
    <>
      <header>
        {/* Main header */}
        {loggedIn && (
          <div className="admin-btn">
            <Link to={"/admin"}>
              <i className="fa-solid fa-user-gear fa-2xl"></i>
            </Link>
          </div>
        )}
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
                <Link to={"/produkter"} className="nav-link">
                  Produkter
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={"/om-oss"} className="nav-link">
                  Om oss
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link to={"/kontakt"} className="nav-link">
                  Kontakt
                </Link>
              </Nav.Item>
            </Nav>
          </div>
          <div className="header-button">
            <button className={`btn-cart`}>
              <Link to="/kundvagn">
                <div className="d-md-block mb-0">
                  <p>Kundvagn</p>
                  {cart.length > 0 ? (
                    <>
                      <img
                        src={cartItemImg}
                        className="cart-img"
                        alt="Kundvagn"
                      />
                      <span
                        className={`item${cart.length ? "-symbol" : ""}`}
                      ></span>
                    </>
                  ) : (
                    <img src={cartImg} className="cart-img" alt="Kungvagn" />
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
                  <Link to={"/produkter"} className="nav-link">
                    Produkter
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/om-oss"} className="nav-link">
                    Om oss
                  </Link>
                </Nav.Item>
                <Nav.Item>
                  <Link to={"/kontakt"} className="nav-link">
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
