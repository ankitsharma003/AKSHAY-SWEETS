import React from "react";
import "./OfferBanner.css";
import banner from "../../assets/offer-banner.png";
import { Link } from "react-router-dom";
export const OfferBanner = () => {
  return (
    <div className="Offer">
      <div
        id="carouselExampleFade"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <Link to="/Offers">
              <img
                src={banner}
                onClick={()=>{window.scrollTo(0, 0)}}
                className="d-block w-100"
                alt="..."
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
