import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./footer.scss";

// Footer component
const Footer = () => {
  return (
    <footer>
      <div class="container py-5">
        <div class="row py-4">
          <div class="col-lg-4 col-md-6 mb-4 mb-lg-0">
            <img src="img/logo.png" alt="" width="180" class="mb-3" />
            <p class="font-italic text-muted">
              Välkommen till Bakbutiken - din nya plats för högkvalitativa
              bakningstillbehör! Utforska vårt utvalda sortiment för fest och
              vardagsbaking. Välkommen in och upplev glädjen med att baka hos
              Bakbutiken!
            </p>

            <ul class="list-inline mt-4">
              <li class="list-inline-item">
                <a href="#" target="_blank" title="twitter">
                  <i class="fa fa-twitter"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" target="_blank" title="facebook">
                  <i class="fa fa-facebook"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" target="_blank" title="instagram">
                  <i class="fa fa-instagram"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" target="_blank" title="pinterest">
                  <i class="fa fa-pinterest"></i>
                </a>
              </li>
              <li class="list-inline-item">
                <a href="#" target="_blank" title="vimeo">
                  <i class="fa fa-vimeo"></i>
                </a>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Produkter</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <Link to={"/products/pans"}>Bakformar</Link>
              </li>
              <li class="mb-2">
                <Link to={"/products/utensils"}>Verktyg</Link>
              </li>
              <li class="mb-2">
                <Link to={"/products/bowls"}>Skålar</Link>
              </li>
              <li class="mb-2">
                <Link to={"/products/decorations"}>Dekorationer</Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-2 col-md-6 mb-4 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Länkar</h6>
            <ul class="list-unstyled mb-0">
              <li class="mb-2">
                <Link to={"/"}>Hem</Link>
              </li>
              <li class="mb-2">
                <Link to={"/products"}>Produkter</Link>
              </li>
              <li class="mb-2">
                <Link to={"/about"}>Om oss</Link>
              </li>
              <li class="mb-2">
                <Link to={"/contact"}>Kontakt</Link>
              </li>
            </ul>
          </div>
          <div class="col-lg-4 col-md-6 mb-lg-0">
            <h6 class="text-uppercase font-weight-bold mb-4">Newsletter</h6>
            <p class="text-muted mb-4">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. At
              itaque temporibus.
            </p>
            <div class="p-1 rounded border">
              <div class="input-group">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  aria-describedby="button-addon1"
                  class="form-control border-0 shadow-0"
                />
                <div class="input-group-append">
                  <button id="button-addon1" type="submit" class="btn btn-link">
                    <i class="fa fa-paper-plane"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
