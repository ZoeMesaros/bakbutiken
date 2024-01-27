import React, { useEffect } from "react";
import "./homepage.scss";
import offersBg from "../../assets/images/offers-bg.jpg";
import { Link } from "react-router-dom";
import useProductFetch from "../../customHooks/fetchProducts";

const HomePage = () => {
  const { products } = useProductFetch();

  //Display the 4 latest added items based on date added
  const latestProducts = products
    .slice(0, 4) // Limit to the first 5 items
    .sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded)); // Sort by dateAdded

  // Display the 4 best-selling items based on items ordered
  const bestSellingProducts = products
    .slice()
    .sort((a, b) => b.orders - a.orders)
    .slice(0, 4);

  const cardBannerStyle = {
    backgroundImage: `url(${offersBg})`,
    backgroundSize: "cover",
    backgroundPosition: "100% 7%",
  };

  const categories = [
    {
      category: "pans",
      image: "path/to/pan-image.jpg",
      title: "Stylish Pan",
      description: "Discover our latest stylish pans with advanced features.",
      price: 49.99,
    },
    // Add similar data for bowls, utensils, and decorations
    // ...
  ];

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
                    <Link
                      to="/produkter"
                      className="btn btn-light shadow-0 text-grey"
                    >
                      Visa alla produkter
                    </Link>
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
                    <Link
                      to="/produkter/dekorationer"
                      className="btn btn-light shadow-0 text-grey"
                    >
                      Visa mer
                    </Link>
                  </div>
                </div>
              </aside>
            </div>
            <div className="latest-section">
              <h3>Nyheter</h3>
              <div className="latest-products">
                {latestProducts.map((product) => (
                  <div className="cards-item" key={product._id}>
                    <div className="card">
                      <div className={`sale${product.onSale ? "-item" : ""} `}>
                        {product.onSale && <span>REA</span>}
                      </div>
                      <div className="card-image">
                        <img src={product.img} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <div className="card-text">
                          <h2 className="card-title">{product.name}</h2>
                          <p
                            className={`card-price ${
                              product.onSale ? "-sale" : ""
                            }`}
                          >
                            <span
                              className={`item-price${
                                product.onSale ? "-sale" : ""
                              }`}
                            >
                              {product.price} Kr
                            </span>
                            {product.onSale && (
                              <span className="sale-price">
                                &nbsp; {product.salePrice} Kr
                              </span>
                            )}
                          </p>
                        </div>
                        {product.inStock === 0 ? (
                          <button className="btn soldout" disabled>
                            Slutsålt
                          </button>
                        ) : (
                          <Link
                            className="btn card-btn"
                            to={`/produkter/${product.category}/${product.slug}`}
                          >
                            Läs mer
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <section className="pt-5 pb-3">
              <div className="card p-4 bg-custom">
                <div className="row align-items-center">
                  <div className="col">
                    <h4 className="mb-0">
                      Utforska vårt sortiment av högkvalitativa
                      bakningsprodukter
                    </h4>
                    <p className="mb-0">
                      Hitta allt du behöver för att skapa läckra bakverk och
                      njut av en fantastisk bakningsupplevelse.
                    </p>
                  </div>
                </div>
              </div>
            </section>
            <div className="best-section pb-5">
              <h3>Bästsäljare</h3>
              <div className="best-products">
                {bestSellingProducts.map((product) => (
                  <div className="cards-item" key={product._id}>
                    <div className="card">
                      <div className={`sale${product.onSale ? "-item" : ""} `}>
                        {product.onSale && <span>REA</span>}
                      </div>
                      <div className="card-image">
                        <img src={product.img} alt={product.name} />
                      </div>
                      <div className="card-content">
                        <div className="card-text">
                          <h2 className="card-title">{product.name}</h2>
                          <p
                            className={`card-price ${
                              product.onSale ? "-sale" : ""
                            }`}
                          >
                            <span
                              className={`item-price${
                                product.onSale ? "-sale" : ""
                              }`}
                            >
                              {product.price} Kr
                            </span>
                            {product.onSale && (
                              <span className="sale-price">
                                &nbsp; {product.salePrice} Kr
                              </span>
                            )}
                          </p>
                        </div>
                        {product.inStock === 0 ? (
                          <button className="btn soldout" disabled>
                            Slutsålt
                          </button>
                        ) : (
                          <Link
                            className="btn card-btn"
                            to={`/produkter/${product.category}/${product.slug}`}
                          >
                            Läs mer
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
