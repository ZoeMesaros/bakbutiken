import React, { useEffect } from "react";
import { Link } from "react-router-dom";

// Page for successful transaction
const SuccessPage = () => {
  useEffect(() => {
    localStorage.clear();
  }, []);

  return (
    <div>
      <h1>Tack för din beställning</h1>
      <Link to="/">Gå tillbaka till start</Link>
    </div>
  );
};

export default SuccessPage;
