import React from "react";
import "./loadingspinner.scss";

//Component to render a loading spinner
const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
