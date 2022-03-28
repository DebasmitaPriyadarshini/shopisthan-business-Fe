import React from "react";
import "./style.css";

const LoadingsWithMessage = (props) => {
  return (
    <>
      <div className="error-with-message-pop-background">
        <div className="new-error-box-wiht-message">
          <p className="paragraoph-message-of-error-in-box">
            Product getting added to your store please dont leave the screen
          </p>
          <button className="plaese-wait-btn-in-error-box">Please Wait</button>
        </div>
      </div>
    </>
  );
};
export default LoadingsWithMessage;
