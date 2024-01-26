import React from "react";
import { Link } from "react-router-dom";
import aboutBg from "../../assets/images/bakbutiken-om.jpg";
import "./about.scss";

const AboutPage = () => {
  const cardBannerStyle = {
    backgroundImage: `url(${aboutBg})`,
    backgroundSize: "cover",
    backgroundPosition: "100% 7%",
    minHeight: "300px",
  };
  return (
    <div className="about-page">
      <div className="container">
        <div className="row">
          <div className="col-md-8 offset-md-2">
            <h3 className="text-center about-title">Om Bakbutiken</h3>
            <div className="about-section mx-3 mt-4">
              <main className="col ">
                <div
                  className="card-banner p-5 rounded-5"
                  style={cardBannerStyle}
                ></div>
              </main>
              <div className="about-text">
                <p>
                  Välkommen till Bakbutiken, din destination för högkvalitativa
                  bakningstillbehör! Vi är en startup som nyligen öppnade våra
                  dörrar med en passion för att tillhandahålla bakentusiaster de
                  finaste verktygen för fester och vardagsbaking.
                </p>

                <p>
                  På Bakbutiken förstår vi glädjen och kreativiteten som bakning
                  för med sig i människors liv. Oavsett om du planerar en
                  speciell fest eller bara njuter av den enkla glädjen av att
                  baka hemma har vi allt du behöver för att göra din
                  bakupplevelse underbar.
                </p>

                <p>
                  Vårt åtagande är att erbjuda ett kuraterat urval av
                  bakningstillbehör för att säkerställa att du har tillgång till
                  de bästa produkterna på marknaden. Från förstklassiga
                  köksredskap till festliga dekorationer väljer vi våra
                  produkter med kvalitet och överkomliga priser i åtanke.
                </p>
                <div className="about-text-2">
                  <p>
                    <strong>Varför välja Bakbutiken?</strong>
                  </p>

                  <ul>
                    <li>
                      Kvalitetsprodukter: Vi prioriterar högkvalitativa
                      bakningstillbehör för dina kreativa äventyr.
                    </li>
                    <li>
                      Fantastiska Erbjudanden: Njut av specialerbjudanden och
                      rabatter för att göra din bakupplevelse ännu roligare.
                    </li>
                    <li>
                      Brett Utbud: Hitta ett mångsidigt utbud av produkter
                      lämpliga både för festbaking och dagligt bruk.
                    </li>
                    <li>
                      Engagerat Team: Vårt team är dedikerat att hjälpa dig att
                      hitta de perfekta verktygen för dina bakäventyr.
                    </li>
                  </ul>
                  <br></br>
                  <p>
                    Tack för att du valt Bakbutiken. Oavsett om du är en erfaren
                    bagare eller bara börjar är vi här för att stödja din
                    bakningsresa. Utforska vår{" "}
                    <Link to={"/products"}>butik</Link> och upptäck glädjen med
                    att baka hos Bakbutiken!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
