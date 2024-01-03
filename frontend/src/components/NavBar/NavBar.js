import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/images/bakbutiken.png";

const NavBar = () => {
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
              <a
                href="https://github.com/mdbootstrap/bootstrap-material-design"
                target="_blank"
              >
                <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                <p className="d-none d-md-block mb-0">Kundvagn</p>
              </a>
            </button>
          </div>
        </div>
        {/* Navigation bar */}
        <nav
          id="main-nav"
          className="navbar navbar-expand-md navbar-light border"
        >
          <div className="collapse navbar-collapse" id="main_nav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item active">
                <Link className="nav-link" to={"/"}>
                  Hem
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Produkter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Om oss
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/products"}>
                  Kontakt
                </Link>
              </li>
            </ul>
          </div>
        </nav>
        {/* Mobile Navigation Menu */}
        <nav id="mobile-nav" className="navbar navbar-light navbar-1 white">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent15"
            aria-controls="navbarSupportedContent15"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent15"
          >
            <ul className="navbar-nav mr-auto">
              <li className="nav-item active">
                <div className="header-button-mobile">
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
                    <a
                      href="https://github.com/mdbootstrap/bootstrap-material-design"
                      target="_blank"
                    >
                      <i className="fas fa-shopping-cart m-1 me-md-2"></i>
                      <p className="d-none d-md-block mb-0">Kundvagn</p>
                    </a>
                  </button>
                </div>
                <Link className="nav-link" to={"/"}>
                  Hem <span className="sr-only">(current)</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-item" to={"/products"}>
                  {" "}
                  Produkter
                </Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Om oss
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Kontakt
                </a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
};

export default NavBar;
