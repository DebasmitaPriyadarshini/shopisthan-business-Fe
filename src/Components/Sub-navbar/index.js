import React from "react";
import "./style.css";

const StoreSubNavBar = (props) => {
  return (
    <>
      <div className="eodednolcsdc">
        <div className="new-store-dashboard-profile-navbar-starts">
          {props.children}
        </div>
      </div>
    </>
  );
};

export default StoreSubNavBar;
