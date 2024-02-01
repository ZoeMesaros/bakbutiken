import React from "react";
import { Link } from "react-router-dom";
import "./notfound.scss";
import notFoundImg from "../../assets/images/404.jpg";

//404 Not found page
const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="container">
        <div className="col text-center">
          <h2>404 - Sidan hittades inte</h2>
          <img src={notFoundImg} alt="Sidan hittades inte" />
          <p>Sidan du sökte efter existerar inte</p>
          <Link to="/">Gå till startsidan</Link>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
