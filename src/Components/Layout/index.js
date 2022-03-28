import React from "react";
import "./style.css";

const LayoutCenter = (props) => {
  return (
    <>
      <div className="center-of-layout-display-flex-view-justifify-center">
        <div className="width-of-center-layout-in-center-componrt">
          {props.children}
        </div>
      </div>
    </>
  );
};
export default LayoutCenter;
