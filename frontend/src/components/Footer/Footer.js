import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import logo from "../../assets/images/bakbutiken.png";
import "./footer.scss";

// Footer component
const Footer = () => {
  const [isRegistered, setRegistered] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log("Form data submitted:", data);
    setRegistered(true);
  };
  return (
    <footer>
      <div className="container py-5">
        <div className="row py-4">
          <div className="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <img src={logo} alt="Bakbutiken" width="180" className="mb-2" />
            <p>
              Välkommen till Bakbutiken - din nya plats för högkvalitativa
              bakningstillbehör! Utforska vårt utvalda sortiment för fest och
              vardagsbaking. Välkommen in och upplev glädjen med att baka hos
              Bakbutiken!
            </p>
            <ul className="footer-social p-0">
              <li>
                <a className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
              </li>
              <li>
                <a className="social-icon">
                  <i className="fab fa-facebook"></i>
                </a>
              </li>
              <li>
                <a className="social-icon">
                  <i className="fab fa-instagram"></i>
                </a>
              </li>
              <li>
                <a className="social-icon">
                  <i className="fab fa-linkedin"></i>
                </a>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Produkter</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to={"/products/pans"}>Bakformar</Link>
              </li>
              <li className="mb-2">
                <Link to={"/products/utensils"}>Verktyg</Link>
              </li>
              <li className="mb-2">
                <Link to={"/products/bowls"}>Skålar</Link>
              </li>
              <li className="mb-2">
                <Link to={"/products/decorations"}>Dekorationer</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Länkar</h6>
            <ul className="list-unstyled mb-0">
              <li className="mb-2">
                <Link to={"/"}>Hem</Link>
              </li>
              <li className="mb-2">
                <Link to={"/products"}>Produkter</Link>
              </li>
              <li className="mb-2">
                <Link to={"/about"}>Om oss</Link>
              </li>
              <li className="mb-2">
                <Link to={"/contact"}>Kontakt</Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-4 col-md-6 mb-lg-0">
            <h6 className="text-uppercase font-weight-bold mb-4">Nyhetsbrev</h6>
            <p className="text-muted mb-4">
              Prenumerera på vårt nyhetsbrev för att ta del av de senaste
              erbjudandena och spännande uppdateringar
            </p>
            {isRegistered ? (
              <p className="text-muted mb-4">
                Du är nu registrerad till vårt nyhetsbrev
              </p>
            ) : (
              <form
                className="subscribe-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="form-group d-flex">
                  <input
                    {...register("email", {
                      required: true,
                      pattern: {
                        value:
                          /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                        message: "Ogiltig e-postadress",
                      },
                    })}
                    type="text"
                    className="form-control rounded-left"
                    placeholder="Din e-postadress"
                    name="email"
                  />
                  <input
                    type="submit"
                    value="Prenumerera"
                    className="form-control submit px-3 rounded-right"
                  />
                </div>
                {errors.email && (
                  <span className="form-error">
                    &nbsp;Ange en giltig e-post adress
                  </span>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
