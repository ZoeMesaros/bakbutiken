// LoadingSpinner.js
import React from "react";
import "./loadingspinner.scss";

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-overlay">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
