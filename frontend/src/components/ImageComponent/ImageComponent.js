import React, { useState, useEffect } from "react";
import LoadingImg from "../LoadingState/LoadingState";
import "./imagecomponent.scss";

//Component for loading and rendering images
const ImageComponent = ({ imageUrl, imageName }) => {
  //State to tack weather the loading component should show
  const [loading, setLoading] = useState(true);

  //UseEffect to handle image loading and updating the loading state
  useEffect(() => {
    const image = new Image();
    image.src = imageUrl;
    image.onload = () => setLoading(false);
  }, [imageUrl]);

  //Render the component in a loading state while image is loading
  return (
    <div className="product-image">
      {loading ? <LoadingImg /> : <img src={imageUrl} alt={imageName} />}
    </div>
  );
};

export default ImageComponent;
