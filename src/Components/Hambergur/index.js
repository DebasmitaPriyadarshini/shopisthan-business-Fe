import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { signoutAction } from "../../actions/auth.action";
import Shopisthanindia from "../../img/shopisthan-india-private-limited-logo.png";
import "./style.css";

const Hambergur = (props) => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  if (!props.show) {
    return null;
  }
  const logout = () => {
    dispatch(signoutAction());
  };

  return (
    <div className="modal-for-hamburger">
      <div className="popup-for-hamburger-only">
        <div className="side-bar-for-user-side-bar">
          <div className="side-bar-for-user">
            <div className="name-logo-of-shopisthan-and-close-btn-a-che">
              <div>
                <img
                  style={{ height: "2em" }}
                  src={Shopisthanindia}
                  alt={"ShopisthanLogo"}
                />{" "}
              </div>
              <span className="close-icon">
                <svg
                  onClick={props.close}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="30px"
                  height="30px"
                  viewBox="0 0 512.000000 512.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="#000"
                    stroke="none"
                  >
                    <path
                      d="M2310 5114 c-284 -34 -517 -93 -748 -190 -767 -321 -1344 -1020
-1511 -1829 -70 -342 -70 -728 0 -1070 198 -959 956 -1736 1914 -1960 221 -52
303 -60 595 -60 292 0 374 8 595 60 958 224 1716 1001 1914 1960 70 342 70
728 0 1070 -196 951 -947 1726 -1894 1956 -203 49 -311 61 -575 64 -140 2
-271 1 -290 -1z m-572 -1460 c25 -10 165 -143 429 -407 l393 -391 393 391
c264 264 404 397 429 407 129 54 275 -32 286 -168 8 -103 14 -97 -416 -529
l-396 -397 391 -393 c264 -264 397 -404 407 -429 54 -129 -32 -275 -168 -286
-104 -8 -96 -14 -528 416 l-398 396 -397 -396 c-432 -430 -426 -424 -529 -416
-136 11 -222 157 -168 286 10 25 143 165 407 429 l391 393 -396 397 c-430 432
-424 426 -416 529 11 136 157 222 286 168z"
                    />
                  </g>
                </svg>
              </span>
            </div>
            <div style={{ paddingTop: "1rem" }}>
              <div>
                <div className="pointer-and-down-aarowjcba">
                  <h2>Start</h2>
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </div>
                <div className="pointer-and-down-aarowjcba">
                  <h2>Sell</h2>
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Sell"
                  />
                </div>
                <div className="pointer-and-down-aarowjcba">
                  <h2>Market</h2>
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Market"
                  />
                </div>
                <div className="pointer-and-down-aarowjcba">
                  <h2>Develop</h2>
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Develop"
                  />
                </div>
                <div className="pointer-and-down-aarowjcba">
                  <h2>Resources</h2>
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Resources"
                  />
                </div>
                <div className="tshask"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hambergur;
