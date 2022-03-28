import React, { useEffect, useState } from "react";
import "./style.css";
import { NavLink } from "react-router-dom";
import Homeicon from "../../img/home.png";
import products from "../../img/product-icon.png";
import orders from "../../img/shopping-bag.png";
import customers from "../../img/male-user-icon.png";
import Profilepiclogo from "../../img/shopping-bag.png";
import Storeprofilediv from "../SideMenu-Dashboard/storeprofilecard";
import { EditProfileModal } from "../Modal";
import { useSelector } from "react-redux";

const DashBoard = (props) => {
  const { storeName, storeCity, storeProfilePicture } = props;
  const [editProfilePicModal, setEditProfilePicModal] = useState(false);
  const storeInfo = useSelector((state) => state.userStore);
  const [storeDetails, setStoreDetails] = useState(storeInfo);

  useEffect(() => {
    return setStoreDetails(storeInfo);
  }, [storeInfo]);

  var dropdown = document.getElementsByClassName("dropdown-btn");
  var i;

  for (i = 0; i < dropdown.length; i++) {
    dropdown[i].addEventListener("click", function () {
      this.classList.toggle("active");
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") {
        dropdownContent.style.display = "none";
      } else {
        dropdownContent.style.display = "block";
      }
    });
  }

  const renderStorePicChangeLogo = () => {
    return (
      <>
        <div
          style={{
            border: "1px solid #e6e6e6",
            marginLeft: "-45px",
            padding: "5px 8px",
            marginTop: "100px",
            background: "#fff",
            borderRadius: "50%",
            width: "35px",
          }}
        >
          <svg
            onClick={() => setEditProfilePicModal(true)}
            className="new-w-edit-btn-at-store-profile-ch"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M1643 4635 c-187 -51 -314 -174 -367 -354 -11 -38 -16 -95 -16 -187
l0 -133 -402 -3 -403 -3 -74 -27 c-136 -50 -253 -149 -316 -269 -69 -131 -65
-48 -65 -1449 0 -1405 -5 -1305 67 -1442 64 -124 190 -228 328 -271 l70 -22
2095 0 2095 0 70 22 c138 43 264 147 328 271 72 137 67 37 67 1442 0 1402 4
1318 -66 1450 -63 120 -178 218 -315 268 l-74 27 -402 3 -403 3 0 133 c0 146
-12 203 -61 296 -53 101 -156 187 -274 232 l-60 23 -885 2 c-737 2 -894 0
-937 -12z m1087 -1190 c279 -42 507 -155 704 -349 377 -372 475 -953 241
-1428 -173 -349 -487 -592 -875 -675 -118 -25 -362 -25 -480 0 -391 84 -706
329 -881 687 -136 279 -158 626 -58 924 190 569 769 930 1349 841z"
              />
              <path
                d="M2480 3039 c-195 -17 -368 -100 -509 -242 -78 -80 -113 -129 -161
-232 -61 -128 -74 -190 -74 -350 0 -167 13 -225 84 -370 125 -255 365 -423
647 -454 413 -45 788 214 899 619 25 91 25 319 0 410 -85 307 -327 541 -627
603 -93 20 -164 24 -259 16z"
              />
            </g>
          </svg>
        </div>
      </>
    );
  };

  const renderMenuOtpions = (link, icon, title) => {
    return (
      <li>
        <NavLink exact activeClassName="active" to={link}>
          <img src={icon} className="dashicon-icon" alt="Shopisthan" />
          <span className="las la-igloo"></span>{" "}
          <span className="dashicon-text-for-user-side-only">{title}</span>
        </NavLink>
      </li>
    );
  };

  return (
    <>
      <div className="shop-dashboard-very-firstdiv-inshop-and-dashboard">
        {props.sidebar ? (
          <div className="total-wodthof-dashboardandprofile">
            <div className="sidebar-for-seller-only">
              <div className="sidebar-menu-user">
                <div className="new-store-dashboard-profile-div-starts">
                  <Storeprofilediv
                    name={storeName}
                    city={storeCity}
                    pic={storeProfilePicture ? storeProfilePicture : ""}
                    type={"Store"}
                  />
                  <div>{renderStorePicChangeLogo()}</div>
                </div>

                <ul className="caahufdpioew">
                  {renderMenuOtpions("/storeDashboard", Homeicon, "Dashboard")}
                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.productFeature
                    ? renderMenuOtpions("/storeProduct", products, "Product")
                    : null}
                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.customerFeature
                    ? renderMenuOtpions(
                        "/storeCoustomer",
                        customers,
                        "Customer"
                      )
                    : null}
                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.orderFeature
                    ? renderMenuOtpions("/storeOrder", orders, "Order")
                    : null}

                  {renderMenuOtpions(
                    "/storeProfile",
                    Profilepiclogo,
                    "Settings"
                  )}
                </ul>
              </div>
            </div>
            <div>{props.children}</div>
          </div>
        ) : (
          props.children
        )}
      </div>
      <EditProfileModal
        visible={editProfilePicModal}
        onClose={() => setEditProfilePicModal(false)}
        Close={() => setEditProfilePicModal(false)}
        storeDetails={storeDetails}
      />
    </>
  );
};

export default DashBoard;
