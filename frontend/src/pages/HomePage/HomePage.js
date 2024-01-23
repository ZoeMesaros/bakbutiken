import "./homepage.scss";
import offersBg from "../../assets/images/offers-bg.jpg";

const HomePage = () => {
  const cardBannerStyle = {
    backgroundImage: `url(${offersBg})`,
    backgroundSize: "cover",
    backgroundPosition: "100% 7%",
  };

  return (
    <div className="home-page">
      <div className="container">
        <div className="row mx-1">
          <section className="mt-2 pt-3 ">
            <div className="row">
              <main className="col ">
                <div
                  className="card-banner p-5 rounded-5"
                  style={cardBannerStyle}
                >
                  <div style={{ maxWidth: "500px" }}>
                    <h2 className="text-grey">
                      Fantastiska produkter med <br />
                      de bästa erbjudandena
                    </h2>
                    <p className="text-grey">
                      Oavsett hur långt du har kommit som hemmabagare finns det
                      alltid något nytt att upptäcka.
                    </p>
                    <a
                      href="/products"
                      className="btn btn-light shadow-0 text-grey"
                    >
                      Visa alla produkter
                    </a>
                  </div>
                </div>
              </main>
              <aside className="col-lg-3">
                <div
                  className="card-banner rounded-5 p-3"
                  style={{ backgroundColor: "#d0ebde" }}
                >
                  <div className="card-body text-center pb-5 ">
                    <h5 className="pt-5 text-normal">Dekorationer</h5>
                    <p className="text-normal">
                      Utforska vårt utbud av kakdekorationer som passar till
                      vardagen så väl som till fest
                    </p>
                    <a
                      href="/products"
                      className="btn btn-light shadow-0 text-grey"
                    >
                      Visa mer
                    </a>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
