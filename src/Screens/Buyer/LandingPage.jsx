import React from "react";
import Header from "../../Components/Header/Header";
import Banner from "../../Components/buyer/Banner";
import { LIGHTBOX_IMAGES } from "../../config/urls";

function LandingPage() {
  return (
    <div>
      <header>
        <Header />
      </header>
      <main>
        <div className="container-fluid">
          <Banner />
          <div className="images-lists">
            {LIGHTBOX_IMAGES.map((image, index) => (
              <div className="image-container" key={index}>
                <img src={image} className="" alt={`Image ${index + 1}`} />
                <div className="image-overlay">{`Image ${index + 1}`}</div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default LandingPage;
