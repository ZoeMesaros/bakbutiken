import React from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import { Navbar, Nav, Container } from "react-bootstrap";
import logo from "../../assets/images/bakbutiken.png";

const NavBar = ({ cart }) => {
  console.log("kundvagn", cart);
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
            <button>
              <a
                href="https://github.com/mdbootstrap/bootstrap-material-design"
                target="_blank"
              >
                <i className="fas fa-user-alt m-1 me-md-2"></i>
                <p className="d-none d-md-block mb-0">Logga in</p>
              </a>
            </button>
            <button>
              <Link to={"/cart"}>
                <a
                  href="https://github.com/mdbootstrap/bootstrap-material-design"
                  target="_blank"
                >
                  <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                  <p className="d-none d-md-block mb-0">
                    Kundvagn
                    {cart.length > 0 && (
                      <span className={`item${cart.length ? "-symbol" : ""}`}>
                        <i class="fa-solid fa-circle"></i>
                      </span>
                    )}
                  </p>
                </a>
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
