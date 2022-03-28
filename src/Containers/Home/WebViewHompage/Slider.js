import React from "react";
import { ImportImage } from "../../../Components/ImportedImages";
import "./Slider.css";

const Slider = () => {
  return (
    <>
      <div className="slider">
        <div className="slider-track">
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryOne}
              alt="Sliding-Images"
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryTwo}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryThree}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryFour}
              alt={"Sliding-Images"}
            />
          </div>

          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryOne}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryTwo}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryThree}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryFour}
              alt={"Sliding-Images"}
            />
          </div>

          {/* --------------- */}
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryOne}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryTwo}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryThree}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryFour}
              alt={"Sliding-Images"}
            />
          </div>

          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryOne}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryTwo}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryThree}
              alt={"Sliding-Images"}
            />
          </div>
          <div className="slide">
            <img
              className="sliding-images-on-homepage-onluy"
              src={ImportImage.HomeScrollingCategoryFour}
              alt={"Sliding-Images"}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Slider;