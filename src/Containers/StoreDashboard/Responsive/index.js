import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import StoreOverview from "../../../Components/Store-Over-View";
import { Link } from "react-router-dom";
import HambergurForProfile from "../../../Components/HambergurProfile";
import { BottomNavigationDashboard } from "../../../Components/BottomNavigation/index";
import { ReNewStorePlanModal, ShareModal } from "../../../Components/Modal";
import { FreeStorePlanNoOfDaysCompleted } from "../../../Functions";
import { signoutAction } from "../../../actions/auth.action";
import {
  StoreNavbarSkeleton,
  StoreShareBoxSkeleton,
} from "../../../Components/SkeletonComponents/StoreComponents";

const StoreResponsiveDashboard = () => {
  const [humburgerModal, setShowHumburgerModal] = useState(false);
  const storeDetails = useSelector((state) => state.userStore);
  const [showShareModal, setShowShareModal] = useState(false);
  const dispatch = useDispatch();
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const storeProfileDetails = useSelector((state) => state.userStore.userStore);

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

  const close = (value) => {
    setShowHumburgerModal(false);
  };
  const storeName =
    storeDetails && storeDetails.userStore && storeDetails.userStore.storeUrl
      ? storeDetails.userStore.storeUrl.split(" ").join("-")
      : null;

  const pendingOrders =
    storeDetails &&
    storeDetails.storeOrder &&
    storeDetails.storeOrder.length > 0
      ? storeDetails.storeOrder.filter((order) => !order.orderStatus)
      : null;

  const render = () => {
    return (
      <div>
        <div className="PrimaryNav-coreNavigationLink-2uv e2e-Nav-jobs svkxxkxx">
          <h3 className="PrimaryNav-coreNavigationLabel-3rj">
            <div className="div-for-bell-icon-on-dashboard">
              {pendingOrders && pendingOrders.length > 0 ? (
                <span
                  style={{
                    paddinga: "1px",
                    position: "absolute",
                    background: "red",
                    width: "20px",
                    height: "auto",
                    borderRadius: "50%",
                    fontSize: "14px",
                    border: "1px solid #fff",
                    textAlign: "center",
                    alignSelf: "center",
                    top: "-5px",
                    right: "-12px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {pendingOrders.length}
                </span>
              ) : null}

              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <metadata>
                  Created by potrace 1.16, written by Peter Selinger 2001-2019
                </metadata>
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#fff"
                  stroke="none"
                >
                  <path
                    d="M2460 5100 c-94 -50 -120 -112 -120 -291 l0 -128 -37 -6 c-562 -95
-1031 -521 -1188 -1079 -43 -150 -47 -199 -55 -701 -7 -477 -8 -493 -33 -595
-75 -309 -223 -560 -451 -764 -124 -112 -174 -239 -146 -379 24 -124 96 -216
210 -271 l65 -31 1855 0 1855 0 65 31 c192 92 270 311 180 502 -22 48 -57 90
-157 189 -222 220 -338 426 -410 723 -25 102 -26 118 -33 595 -8 502 -12 551
-55 701 -109 387 -373 721 -719 913 -140 77 -315 139 -468 165 l-38 7 0 126
c0 69 -5 143 -11 164 -15 50 -62 105 -110 129 -51 26 -150 26 -199 0z"
                  />
                  <path
                    d="M1770 636 c0 -17 47 -151 68 -191 77 -153 208 -286 354 -359 128 -64
222 -86 368 -86 146 0 240 22 368 86 146 73 277 206 354 359 21 40 68 174 68
191 0 2 -355 4 -790 4 -434 0 -790 -2 -790 -4z"
                  />
                </g>
              </svg>
            </div>
          </h3>
        </div>
      </div>
    );
  };

  const logout = () => {
    dispatch(signoutAction());
  };

  const renderStoreProgress = (percentage, link, title) => {
    return (
      <>
        <h2 className="ghjmkiuh">Complete store for first order.</h2>
        <div className="status-bar-and-percentage-bar-in-one-frame">
          <p className="readdy-stateus-word-in-sdash">Ready</p>
          <div className="percentage-bar-with-status-of-store-nik">
            <p>{percentage}%</p>
            <progress
              className="progress-bar-for-store-completion-steps"
              id="file"
              value={percentage}
              max="100"
            >
              {" "}
              {percentage}%{" "}
            </progress>
          </div>
        </div>

        <Link
          to={{
            pathname: link,
            state: { storeProgress: true },
          }}
        >
          <button className="vsubvosjnssf">{title}</button>
        </Link>
      </>
    );
  };

  const renderShareBtn = () => {
    return (
      <>
        <h2 className="ghjmkiuh"> Share store to get orders.</h2>
        <div className="status-bar-and-percentage-bar-in-one-frame">
          <p className="readdy-stateus-word-in-sdash">
            Your store is ready to receive orders online.
          </p>
        </div>
        <button
          className="vsubvosjnssf"
          onClick={() => setShowShareModal(true)}
        >
          Share Store{" "}
          <svg
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="20px"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <metadata>
              Created by potrace 1.16, written by Peter Selinger 2001-2019
            </metadata>
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              fill="#fff"
              stroke="none"
            >
              <path
                d="M2632 4620 c-18 -11 -41 -34 -52 -52 -19 -32 -20 -52 -20 -620 l0
-588 -68 0 c-171 0 -489 -35 -702 -76 -467 -92 -803 -255 -1065 -518 -227
-228 -362 -479 -455 -846 -70 -274 -100 -557 -106 -995 -5 -331 -5 -341 15
-373 31 -49 77 -72 141 -72 63 0 112 25 136 68 8 15 54 99 101 187 105 198
168 294 265 410 206 245 486 406 878 505 206 52 445 84 713 96 l147 7 0 -584
c0 -565 1 -585 20 -617 30 -49 75 -72 140 -72 30 1 65 6 78 13 40 22 2133
1961 2148 1989 8 15 14 50 14 78 0 28 -6 63 -14 78 -15 28 -2108 1967 -2148
1989 -36 20 -128 16 -166 -7z m1102 -1303 c446 -412 811 -752 811 -757 0 -5
-373 -353 -830 -775 l-830 -766 -5 484 c-6 536 -3 515 -73 557 -29 18 -51 20
-213 20 -630 0 -1190 -121 -1572 -341 -175 -101 -359 -256 -479 -403 l-39 -49
3 39 c57 612 189 956 469 1225 103 98 190 159 330 230 300 152 679 229 1216
248 274 10 290 14 335 81 l23 33 0 480 0 480 21 -19 c12 -10 387 -356 833
-767z"
              />
            </g>
          </svg>
        </button>
      </>
    );
  };

  return (
    <>
      <>
        <div className="main-dashboard-navbar-only">
          <div className="profile-plus-store-name-in-nav">
            {storeDetails &&
            storeDetails.userStore &&
            storeDetails.userStore.storeProfilePicture &&
            storeDetails.userStore.storeProfilePicture.img ? (
              <img
                className="profile-div-of-dashboard-imgide"
                src={storeDetails.userStore.storeProfilePicture.img}
                alt={"store pic"}
              />
            ) : storeDetails &&
              storeDetails.userStore &&
              storeDetails.userStore.storeName ? (
              <div className="store-first-letter-name-dashboard">
                <h2>
                  {storeDetails.userStore.storeName.charAt(0).toUpperCase()}
                </h2>
              </div>
            ) : (
              <StoreNavbarSkeleton />
            )}
            <div>
              <p style={{ fontSize: "12px" }}>
                {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeName
                  ? "Hello"
                  : null}
              </p>
              <h2
                style={{
                  overflowY: "hidden",
                  overflowX: "hidden",
                  textOverflow: "ellipsis",
                  width: "8em",
                  whiteSpace: "nowrap",
                }}
              >
                {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeName
                  ? storeDetails.userStore.storeName
                  : null}
              </h2>
            </div>
          </div>

          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div>
              {pendingOrders && pendingOrders.length > 0 ? (
                <Link
                  to={{
                    pathname: "/storeOrder",
                    state: { PendingOrders: true },
                  }}
                >
                  {render()}
                </Link>
              ) : (
                <div>{render()}</div>
              )}
            </div>
            <button
              className="logout-btn-at-store-dashboard-in-navbar-new-dcnd-dmgh-dmutnfksnf"
              onClick={() => logout()}
            >
              logout
            </button>
          </div>
        </div>
        <div className="dasboardveryfristrespocompo">
          <div className="dashboard-respo-in-first-div-main"></div>

          <div className="feuopoesjcs">
            <div className="">
              {storeDetails &&
              storeDetails.productloading &&
              storeDetails.storeProduct &&
              storeDetails.storeProduct.length === 0 ? (
                renderStoreProgress(33, "/store-Add-Product", "Add Product")
              ) : storeDetails.storeProfileloading ? (
                storeProfileDetails.storeAddress === "" ? (
                  renderStoreProgress(66, "/storeProfile", "Update Profile")
                ) : (
                  renderShareBtn()
                )
              ) : (
                <StoreShareBoxSkeleton />
              )}
            </div>
          </div>

          <h2
            style={{
              fontSize: "18px",
              color: "#000",
              letterSpacing: "1.5px",
            }}
          >
            Overview
          </h2>
          <div className="dashboard-respo-in-first-div-main">
            <StoreOverview storeDetails={storeDetails} />
          </div>
        </div>
        <HambergurForProfile
          show={humburgerModal}
          handleclose={() => setShowHumburgerModal(false)}
          close={close}
        />
        <BottomNavigationDashboard></BottomNavigationDashboard>
        <ShareModal
          show={showShareModal}
          handleclose={() => setShowShareModal(false)}
          shareLink={`${storeName}`}
          shareTitle={`Watch my Store ${storeDetails.userStore.storeName} at Shopisthan`}
        />
        <ReNewStorePlanModal
          visible={reNewPlanModal}
          onClose={() => setReNewPlanModal(false)}
        />
      </>
    </>
  );
};

export default StoreResponsiveDashboard;

// {
//   storeDetails &&
//   storeDetails.productloading &&
//   storeDetails.storeProduct &&
//   storeDetails.storeProduct.length === 0
//     ? renderStoreProgress(33, "/store-Add-Product", "Add Product")
//     : storeDetails.storeProfileloading
//     ? storeProfileDetails.storeDescription === "" ||
//       !storeProfileDetails.storeSince ||
//       storeProfileDetails.storeAddress === "" ||
//       storeProfileDetails.storeCity === "" ||
//       storeProfileDetails.storeEmail === "" ||
//       storeProfileDetails.storeState === "" ||
//       !storeProfileDetails.storeProfilePicture ||
//       !storeProfileDetails.storeProfilePicture.img
//       ? renderStoreProgress(66, "/storeProfile", "Update Profile")
//       : renderShareBtn()
//     : null;
// }
