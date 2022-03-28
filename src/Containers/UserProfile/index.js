import React, { useState } from "react";
import "./style.css";
import { BottomNavigationProfile } from "../../Components/BottomNavigation";
import CheckoutLogin from "../../Components/CheckoutLogin";
import { useSelector } from "react-redux";
import UserProfileSettings from "../UserProfileSettings";
import UserOrders from "../UserOrders";
import LayoutCenter from "../../Components/Layout/index";
import StoreNavBar from "../../Components/StoreNavBar";
import OrderDate from "../../Components/Order-Date";
import { PriceWithComma } from "../../Functions";
import UserOrderDetailsModal from "../../Components/UserOrderModal";
import { ImportImage } from "../../Components/ImportedImages";
import { useEffect } from "react";

export const UserProfile = (props) => {
  const auth = useSelector((state) => state.userDetails);
  const [showLogin, setShowLogin] = useState(false);
  const [showPage, setShowPage] = useState("");
  const optionLists = ["Primary Settings", "Order History"];
  const store = useSelector((state) => state.userDetails.store);
  const [pageOnDesktop, setPageOnDesktop] = useState("Primary Settings");
  const [orderDetails, setOderDetails] = useState("");
  const [showOrderDetailsModal, setShowOrderDetailsModal] = useState(false);
  const userOrderLists = useSelector((state) => state.userDetails.orders);
  const storeId = useSelector((state) =>
    state.userDetails.store && state.userDetails.store._id
      ? state.userDetails.store._id
      : null
  );

  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.viewOrder
    ) {
      return setShowPage("Order History");
    } else {
      return setShowPage("");
    }
  }, [props]);

  const renderRequestedPage = () => {
    if (showPage === "Primary Settings") {
      return <UserProfileSettings onClose={() => setShowPage("")} />;
    } else if (showPage === "Order History") {
      return <UserOrders onClose={() => setShowPage("")} />;
    } else {
      return setShowPage("");
    }
  };

  const renderDesktopPage = () => {
    if (pageOnDesktop === "Primary Settings") {
      return <UserProfileSettings />;
    } else if (pageOnDesktop === "Order History") {
      if (!storeId) {
        return (
          <>
            <div>
              <img src={ImportImage.NoOrder} alt={"Logo"} />
            </div>
            <div>You have not placed Order till now in this store</div>
          </>
        );
      }
      if (userOrderLists.length === 0) {
        return (
          <>
            <div>
              <img src={ImportImage.NoOrder} alt={"Logo"} />
            </div>
            <div>You have not placed Order till now in this store</div>
          </>
        );
      } else {
        const userOrdersAsPerStoreId = userOrderLists.filter(
          (order) => order.storeId._id === storeId
        );
        if (userOrdersAsPerStoreId.length > 0) {
          return userOrdersAsPerStoreId.map((order, index) => (
            <div className="table-body-in-user-order-history" key={index}>
              <div className="order-details-box-osswlis">
                <div>
                  <p className="order-deatils-xcjdielkc"> Order Id</p>
                  <h2 className="order-deatils-xcjdielkc">#{order.orderId}</h2>
                </div>
                <div>
                  <p className="order-deatils-xcjdielkc"> Date</p>
                  <h2 className="order-deatils-xcjdielkc">
                    <OrderDate date={order.createdAt} />
                  </h2>
                </div>
                {/* <div>
                    <p className="order-deatils-xcjdielkc"> Customer</p>
                    <h2 className="order-deatils-xcjdielkc">
                      Sohail Qureshi
                    </h2>
                  </div> */}
                <div>
                  <p className="order-deatils-xcjdielkc"> Amount</p>
                  <h2 className="order-deatils-xcjdielkc">
                    {PriceWithComma(order.totalAmount)}
                  </h2>
                </div>
                <div>
                  <p className="order-deatils-xcjdielkc"> Status</p>
                  <h2 className="order-deatils-xcjdielkc">
                    {order.orderStatus
                      ? order.orderStatus === "Not Available"
                        ? "Rejected"
                        : order.orderStatus
                      : "Pending"}
                  </h2>
                </div>
                <div>
                  <p className="order-deatils-xcjdielkc"> Payment</p>
                  <h2 className="order-deatils-xcjdielkc">
                    {order.paymentType}
                  </h2>
                </div>
                <div>
                  <p className="order-deatils-xcjdielkc"> Action</p>
                  <h2
                    className="order-deatils-xcjdielkc"
                    onClick={() => {
                      setOderDetails(order);
                      setShowOrderDetailsModal(true);
                    }}
                  >
                    View Details
                  </h2>
                </div>
              </div>
            </div>
          ));
        } else {
          return "You have not placed on this Store";
        }
      }
    } else {
      return null;
    }
  };

  const renderLoginUserView = () => {
    return (
      <>
        {showPage === "" ? (
          <>
            {/* -------------Responsive--View----- */}
            <div className="responsive-dashbord-view-block">
              <div>
                <div className="seetings-header-withbackgound-color">
                  <h2 className="settings-header-in-stroe-profile-esponsive">
                    Settings
                  </h2>
                </div>
                <div className="displcjdco-cdd-edk">
                  <div>
                    <div className="store-profile-instore-dashboard-l">
                      <div className="store-profile-fisrt-letter-os-store-name">
                        <h2>
                          {auth.authenticate && auth.user && auth.user.name
                            ? auth.user.name.charAt(0)
                            : "G"}
                        </h2>
                      </div>
                    </div>
                    <div className="store-name-aain-dashsetiings-dk">
                      <h2
                        style={{
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                        }}
                      >
                        {auth.authenticate && auth.user && auth.user.name
                          ? auth.user.name
                          : "Guest User"}
                      </h2>
                    </div>
                  </div>

                  <div className="responsive-dashbord-view-block">
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
                  </div>
                </div>
              </div>
            </div>{" "}
            {/* -------------Responsive--View----- */}
            {/* -------------Desktop--View----- */}
            <div className="dashboard-destop-view-only">
              <div>
                <StoreNavBar checkout={true} store={store} />
              </div>

              <div className="bjwoecjnp"></div>
              <div className="background-image-for-user-in-destop-vie-coic"></div>
              <div className="top-for-user-proile-in-peeamw-xs">
                {" "}
                <LayoutCenter>
                  {" "}
                  <div className="pic-and-name-at-user-proffile-xakjn">
                    {/* <img
                      className="user-profile-pic-in-nrew-ceciks"
                      src={
                        "https://shopisthan.in/wp-content/uploads/2021/12/Group-13.png"
                      }
                      alt={"store pic"}
                    /> */}
                    <div className="pic-and-name-at-user-proffile-xakjn">
                      <h2 className="user-profile-pic-name-hkv">
                        {auth.authenticate && auth.user && auth.user.name
                          ? auth.user.name.charAt(0)
                          : "G"}
                      </h2>
                    </div>
                    <div className="name-of-user-sa">
                      <h2>
                        {" "}
                        {auth.authenticate && auth.user && auth.user.name
                          ? auth.user.name
                          : "Guest User"}
                      </h2>

                      <div>
                        <h2 className="active-component-name-at-top">
                          {" "}
                          {pageOnDesktop}
                        </h2>
                      </div>
                    </div>{" "}
                  </div>
                  <div className="profile-option-and-their-results-atleft-side-asd">
                    <div className="option-of-neew-opnnc-andn">
                      {optionLists && optionLists.length > 0
                        ? optionLists.map((option, index) => (
                            <div key={index}>
                              {" "}
                              <h2
                                className="option-of-profile-aneoa"
                                onClick={() => setPageOnDesktop(option)}
                                style={{
                                  color:
                                    option === pageOnDesktop ? "black" : "gray",
                                }}
                              >
                                {option}
                              </h2>
                            </div>
                          ))
                        : null}
                    </div>

                    <div className="cepiid-render-pages-xjeona">
                      {renderDesktopPage()}
                    </div>
                  </div>
                </LayoutCenter>
              </div>
            </div>{" "}
            {/* -------------Desktop--View----- */}
          </>
        ) : (
          renderRequestedPage()
        )}
      </>
    );
  };
  return (
    <>
      {!auth.authenticate && !showLogin ? (
        <div className="backgornlrsifa-lewldn">
          <div className="login-card-at-proffile-and-other-uses-sc">
            <h2 className="logint-in-header-at-cndkscc">
              {" "}
              Login to view your profile
            </h2>
            <div className="lofing-login-btn-incheckout-page">
              <CheckoutLogin />
            </div>
            <div className="terms-ands-ectx-cezn">
              <h3>By continuing, you agree to Shopisthan's</h3>
              <div className="kadwd-wk-awoihd-ma">
                <h3 className="doipwod-clcalwopd">Terms & Conditions </h3>and
                <h3 className="doipwod-clcalwopd">Privacy Policy</h3>
              </div>
            </div>
          </div>{" "}
        </div>
      ) : null}

      {/* {!auth.authenticate && showLogin ? (
        <>
          <h2 className="logint-in-header-at-cndkscc">
            Login to view your profile
          </h2>
          <div className="lofing-login-btn-incheckout-page">
            <CheckoutLogin />
          </div>
        </>
      ) : null} */}
      {auth.authenticate ? renderLoginUserView() : null}

      <div className="responsive-dashbord-view-block">
        <BottomNavigationProfile
          storeUrl={
            props.location &&
            props.location.state &&
            props.location.state.storeUrl
              ? props.location.state.storeUrl
              : ""
          }
          cart={true}
        />
      </div>

      <UserOrderDetailsModal
        show={showOrderDetailsModal}
        handleclose={() => {
          setOderDetails("");
          setShowOrderDetailsModal(false);
        }}
        orderDetails={orderDetails}
      />

      {/* -------------Responsive--View----- */}
    </>
  );
};
