import React, { useState } from "react";
import "./LightBox.css";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Loader from "../Loader/Loader";
const Lightbox = ({ images }) => {
  console.log("IMAGES FOR LIGHTBOX--------------", images);
  const [selectedImage, setSelectedImage] = useState(images?.[0].ImageLink);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const handlePrevClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    setSelectedImage(images[currentImageIndex].ImageLink);
  };

  const handleNextClick = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    setSelectedImage(images[currentImageIndex].ImageLink);
  };
  return (
    <div class="lightbox">
      {!images || images == null ? (
        <Loader />
      ) : (
        <>
          <div class="info-page-conatiner">
            <img
              src={selectedImage}
              alt="Main"
              class="main-image-build"
            />
            <div className="arrow-container">
              <button class="arrow-container-prevbtn" onClick={handlePrevClick}>

                <ArrowBackIosIcon className='arrowIcon' />
              </button>
              <button class="arrow-container-nextbtn" onClick={handleNextClick}>
                <ArrowForwardIosIcon className='arrowIcon' />
              </button>
            </div>
          </div>
          <div class="image-list">
            {images.map((image, index) => (
              <div
                key={index}
                class="image-map"
                onClick={() => handleImageClick(image.ImageLink)}
                onMouseEnter={() => handleImageClick(image.ImageLink)}
              >
                <img
                  class="thumbnail-lightbox"
                  src={image.ImageLink}
                  alt={`Thumbnail ${index}`}
                  style={{ objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Lightbox;
