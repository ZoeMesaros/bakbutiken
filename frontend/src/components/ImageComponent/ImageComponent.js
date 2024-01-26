import React, { useState, useEffect } from "react";
import LoadingImg from "../LoadingState/LoadingState";
import "./imagecomponent.scss";

const ImageComponent = ({ imageUrl, imageName }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <div className="product-image">
      {loading ? <LoadingImg /> : <img src={imageUrl} alt={imageName} />}
    </div>
  );
};

export default ImageComponent;
