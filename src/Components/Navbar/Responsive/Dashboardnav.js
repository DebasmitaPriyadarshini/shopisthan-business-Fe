import React from "react";
import "./style.css";

const NavbarForDash = (props) => {
  return (
    <>
      <div className="navbar-dashboard-only-anduser-view">{props.children}</div>
    </>
  );
};

export default NavbarForDash;
