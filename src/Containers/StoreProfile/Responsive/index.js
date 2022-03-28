import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import {
  EditProfileModal,
  MessageModal,
  ReNewStorePlanModal,
} from "../../../Components/Modal";
import { FreeStorePlanNoOfDaysCompleted } from "../../../Functions";
import { BottomNavigationDashboard } from "../../../Components/BottomNavigation/index";
import SettingInput from "./Settings";
import { Link } from "react-router-dom";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";

const StoreResponsiveProfile = ({ props }) => {
  const storeDetails = useSelector((state) => state.userStore);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState("");
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [editProfilePicModal, setEditProfilePicModal] = useState(false);
  const [showPage, setShowPage] = useState("");
  const optionLists = ["Primary Settings"];
  // const optionLists = ["Primary Settings", "Online Payments", "Plan", "About"];

  useEffect(() => {
    if (
      storeDetails &&
      storeDetails.userStore &&
      storeDetails.userStore.storePlanType &&
      storeDetails.userStore.storePlanType === "Free"
    ) {
      if (
        FreeStorePlanNoOfDaysCompleted(storeDetails.userStore.storeStartedDate)
      ) {
        return setReNewPlanModal(true);
      }
    } else {
      return setReNewPlanModal(false);
    }
  }, [storeDetails]);

  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.storeProgress
    ) {
      return setShowPage("Primary Settings");
    }
  }, [props]);

  const renderRequestedPage = () => {
    if (showPage === "Primary Settings") {
      return <SettingInput onClose={() => setShowPage("")} props={props} />;
    } else {
      return setShowPage("");
    }
  };

  return (
    <>
      {" "}
      <NavbarForDash>
        {" "}
        <Link to="/storeDashboard">
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Outlet Settings</h2>
      </NavbarForDash>
      {showPage === "" ? (
        <>
          <div className="store-profile-background-with-hiieght">
            <div className="display-flex-gvahja">
              {" "}
              <div className="store-profile-instore-dashboard-l">
                {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeProfilePicture &&
                storeDetails.userStore.storeProfilePicture.img ? (
                  <>
                    <img
                      className="store-profile-image-in-settings"
                      src={storeDetails.userStore.storeProfilePicture.img}
                      alt={"store pic"}
                    />
                  </>
                ) : storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.storeName ? (
                  <>
                    <div className="store-profile-fisrt-letter-os-store-name">
                      <h2>{storeDetails.userStore.storeName.charAt(0)}</h2>
                    </div>
                  </>
                ) : (
                  <div className="store-profile-fisrt-letter-os-store-name">
                    <h2>S</h2>
                  </div>
                )}
              </div>
              <div className="store-name-aain-dashsetiings-dk">
                <p
                  style={{
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    fontSize: "25px",
                  }}
                >
                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.storeName
                    ? storeDetails.userStore.storeName
                    : "Store"}
                </p>
                <p className="store-address-in-down-profile">
                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.storeCategory
                    ? storeDetails.userStore.storeCategory
                    : null}
                </p>
              </div>
            </div>
            <div className="all-components-of-settings-n-store-profile">
              {optionLists && optionLists.length > 0
                ? optionLists.map((option, index) => (
                    <div key={index}>
                      <div
                        onClick={() => setShowPage(option)}
                        className="stings-ins-store-profile-division"
                      >
                        <p>{option}</p>
                        <svg
                          version="1.0"
                          xmlns="http://www.w3.org/2000/svg"
                          width="15px"
                          height="15px"
                          viewBox="0 0 512.000000 512.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <g
                            transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                            fill="#303030cf"
                            stroke="none"
                          >
                            <path
                              d="M1550 4751 c-133 -41 -213 -149 -213 -286 0 -109 22 -144 203 -330
86 -88 408 -419 715 -735 307 -316 619 -636 693 -711 l134 -137 -838 -852
c-462 -469 -848 -867 -860 -884 -73 -107 -62 -260 26 -360 94 -107 283 -126
391 -39 19 16 462 462 983 993 1049 1067 999 1009 999 1140 0 129 11 116 -600
742 -301 309 -730 749 -952 978 -223 228 -419 425 -435 438 -58 43 -176 64
-246 43z"
                            />
                          </g>
                        </svg>
                      </div>
                    </div>
                  ))
                : null}
            </div>

            {/* <SettingInput /> */}
          </div>
          <MessageModal
            visible={showErrorModal}
            onClose={() => {
              setShowErrorModalMessage("");
              setShowErrorModal(false);
            }}
            message={showErrorModalMessage}
            title={"Message"}
          />
          <ReNewStorePlanModal
            visible={reNewPlanModal}
            onClose={() => setReNewPlanModal(false)}
          />
          <BottomNavigationDashboard></BottomNavigationDashboard>
        </>
      ) : (
        renderRequestedPage()
      )}
      <EditProfileModal
        visible={editProfilePicModal}
        onClose={() => setEditProfilePicModal(false)}
        Close={() => setEditProfilePicModal(false)}
        storeDetails={storeDetails}
      />
    </>
  );
};

export default StoreResponsiveProfile;
