import React, { useEffect, useState } from "react";
import ProductDetailsStore from "../../Components/ProductDetailCard/ProductDetailsVendor";
import "./style.css";

const Scrollingtest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, []);

  const listenToScroll = () => {
    let heightToHideFrom = 200;
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;
    setHeight(winScroll);

    if (winScroll > heightToHideFrom) {
      isVisible && setIsVisible(false);
    } else {
      setIsVisible(true);
    }
  };

  return (
    <>
      {/* <div id="container">
        <div id="height">
          <b>
            height: {height} - {isVisible ? "show" : "hide"}
          </b>
        </div>
        {isVisible && <div id="show">Fusion Store</div>}
      </div> */}
      <ProductDetailsStore></ProductDetailsStore>
    </>
  );
};

export default Scrollingtest;
// const { useState, useEffect } = React;

// function App() {
//   const [isVisible, setIsVisible] = useState(true);
//   const [height, setHeight] = useState(0)

//   useEffect(() => {
//     window.addEventListener("scroll", listenToScroll);
//     return () =>
//        window.removeEventListener("scroll", listenToScroll);
//   }, [])

//   const listenToScroll = () => {
//     let heightToHideFrom = 200;
//     const winScroll = document.body.scrollTop ||
//         document.documentElement.scrollTop;
//     setHeight(winScroll);

//     if (winScroll > heightToHideFrom) {
//          isVisible && setIsVisible(false);
//     } else {
//          setIsVisible(true);
//     }
//   };

//   return (

//    </div>
//   );
// }
