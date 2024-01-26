import React, { useEffect } from "react";
import Lottie from "lottie-web";
import { Link } from "react-router-dom";
import "./success.scss";
import success from "../../assets/images/success.json";

// Page for a successful transaction
const SuccessPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  useEffect(() => {
    const animationContainer = document.getElementById("successAnimation");
    Lottie.loadAnimation({
      container: animationContainer,
      animationData: success,
      loop: false,
      renderer: "svg",
      autoplay: true,
    });

    return () => {
      if (animationContainer) {
        animationContainer.innerHTML = "";
      }
    };
  }, []);

  return (
    <div className="success-page">
      <div className="container">
        <div
          id="successAnimation"
          className="success-animation text-center"
        ></div>
        <div className="row text-center">
          <h1>Tack!</h1>
          <h4>Vi har mottagit din beställning</h4>
          <p>En bekräftelse har skickats till din e-postadress</p>
          <Link to={"/"}>Gå tilbaka till startsidan</Link>
        </div>
      </div>
    </div>
  );
};

export default SuccessPage;
