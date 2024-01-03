import { Link } from "react-router-dom";
import "./navbar.scss";
import logo from "../../assets/images/bakbutiken.png";

const NavBar = () => {
  return (
    <>
      <header>
        <div className="header-nav">
          <div className="header-logo">
            <Link to={"/"}>
              <img src={logo} />
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
        <nav class="navbar navbar-light navbar-1 white">
          <a class="navbar-brand" href="#"></a>

          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent15"
            aria-controls="navbarSupportedContent15"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>

          <div class="collapse navbar-collapse" id="navbarSupportedContent15">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item active">
                <a class="nav-link" href="#">
                  Home <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Features
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">
                  Pricing
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
