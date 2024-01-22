import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.scss";
import offersBg from "../../assets/images/offers-bg.jpg";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        let url = `/api/products?page=${currentPage}&limit=12`;

        if (selectedCategory) {
          url = `/api/products/category/${selectedCategory}?page=${currentPage}&limit=12`;
        }
        const response = await axios.get(url);
        setProducts(response.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, selectedCategory]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleCategoryClick = (category) => {
    console.log("Handling category click:", category);
    setSelectedCategory(category);
    setCurrentPage(1);

    const targetURL = `/products${category ? `?category=${category}` : ""}`;
    console.log("Target URL:", targetURL);

    navigate(targetURL, {
      replace: true,
    });
  };

  const cardBannerStyle = {
    backgroundImage: `url(${offersBg})`,
    backgroundSize: "cover",
    backgroundPosition: "100% 7%",
  };

  const textStyle = {
    color: "black",
    textShadow: "2px 2px 2px rgba(0, 0, 0, 0.6)",
  };

  return (
    <section className="mt-2 pt-3">
      <div className="container">
        <div className="row gx-3">
          <main className="col-lg-9">
            <div className="card-banner p-5 rounded-5" style={cardBannerStyle}>
              <div style={{ maxWidth: "500px" }}>
                <h2 className="text-white" style={textStyle}>
                  Fantastiska produkter med <br />
                  de bästa erbjudandena
                </h2>
                <p className="text-grey">
                  Oavsett hur långt du har kommit som hemmabagare finns det
                  alltid något nytt att upptäcka.
                </p>
                <button onClick={() => handleCategoryClick("")}>
                  Visa alla produkter
                </button>
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
                <button onClick={() => handleCategoryClick("decorations")}>
                  Visa mer
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default HomePage;
