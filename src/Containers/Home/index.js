import React from "react";
import Slideshow from "./SliderResponsiveHomePage/Slideshow";
import Home from "./WebViewHompage/index";
import "./style.css";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";


const WebHome = (props) => {


  const auth = useSelector((state) => state.auth)
  const store = useSelector((state) => state.userStore)
  const history = useHistory();

  if (auth && auth.authenticate && store && store.userStore) {
    history.push({
      pathname: '/storeDashboard'
    })
  }


  return (
    <>
      <div className="home-page-for-web-view-only--asd">
        <Home />{" "}
      </div>
      <div className="home-page-for-mobile-view-only--asd">
        {" "}
        <Slideshow />
      </div>
    </>
  );
};

export default WebHome;
