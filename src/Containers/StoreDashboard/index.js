import React, { useEffect, useState } from "react";
import DashBoard from "../../Components/SideMenu-Dashboard/index";
import "./style.css";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import OrderDate from "../../Components/Order-Date/index";
import { HomeNabar } from "../../Components/Navbar/index";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
} from "../../Functions";
import StoreSubNavBar from "../../Components/Sub-navbar";
import StoreOverview from "../../Components/Store-Over-View";
import OrderDetialsModal from "../../Components/OrderModal";
import StoreResponsiveDashboard from "./Responsive";
import { ReNewStorePlanModal, ShareModal } from "../../Components/Modal";
import NotificationIcon from "../../img/Notificationbell.png";
import { ImportImage } from "../../Components/ImportedImages";

const StoreDasboard = (props) => {
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore);
  const history = useHistory();
  const [orderDetails, setOrderDetails] = useState("");
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
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

  if (!auth.authenticate) {
    return (
      <Redirect
        to={{
          pathname: `/signin`,
          state: { storeId: "Store", Store: true },
        }}
      />
    );
  }

  const close = (value) => {
    setOrderDetailsModal(false);
  };

  const render = () => {
    return (
      <div className="cart">
        <div className="PrimaryNav-coreNavigationLink-2uv e2e-Nav-jobs svkxxkxx">
          <h3 className="PrimaryNav-coreNavigationLabel-3rj">
            <div className="link-background">
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
                    top: "-12px",
                    right: "8px",
                    color: "white",
                    fontWeight: "600",
                  }}
                >
                  {pendingOrders.length}
                </span>
              ) : null}

              {/* ) : null} */}

              <img
                src={NotificationIcon}
                className="homepagenavbar-icon"
                alt="ShopisthanLogo"
              />
            </div>
          </h3>
        </div>
      </div>
    );
  };

  return (
    <>
      <div style={{ background: "#EFF1FF" }}>
        <div className="dashboard-destop-view-only">
          <div>
            <HomeNabar />
          </div>
          <DashBoard
            storeDetail={storeDetails}
            sidebar
            userName={auth.user.name}
            userPic={auth.user.picture}
            storeName={storeDetails.userStore.storeName}
            storeCity={storeDetails.userStore.storeCity}
            storeProfilePicture={
              storeDetails.userStore.storeProfilePicture &&
              storeDetails.userStore.storeProfilePicture.img
                ? storeDetails.userStore.storeProfilePicture.img
                : ""
            }
          >
            <div className="lkjhasdrfr">
              <StoreSubNavBar>
                <h2 style={{ fontSize: "1.5rem" }}>Dashboard</h2>{" "}
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Link to={`/${storeName}`}>
                    <h4 style={{ cursor: "pointer" }}>View Store</h4>
                  </Link>

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

                  <button
                    className="kajsdkcjecdd"
                    onClick={() => setShowShareModal(true)}
                  >
                    {" "}
                    Share
                  </button>
                </div>
              </StoreSubNavBar>
              <div
                style={{
                  marginTop: "4.5rem",
                  height: "40em",
                  overflowY: "scroll",
                }}
              >
                <div>
                  <StoreOverview storeDetails={storeDetails} />
                </div>
                <div>
                  <div
                    className="new-order-new-heder-new"
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <h1 className="new-order-hearder-new">New Orders</h1>
                    <button
                      className="dnscneaewuocn"
                      onClick={() => {
                        history.push({
                          pathname: "/storeOrder",
                        });
                      }}
                    >
                      View All
                    </button>
                  </div>
                  <div
                    className="new-order-table-div-for-user-order"
                    style={{ paddingBottom: "8em" }}
                  >
                    <div className="new-order-table-new">
                      <div>
                        <table className="table-new-table">
                          <div className="cdf-fkj-dflwe-dsd">
                            <div className="order-asdcx">Order Id</div>
                            <div className="order-asdcx">Date</div>
                            <div className="product-mn-sdjks-iuer-dds">
                              Customer
                            </div>
                            <div className="order-asdcx">Amount</div>
                            <div className="order-asdcx">Status</div>
                            <div className="order-asdcx">Payment</div>
                            <div className="order-asdcx">Action</div>
                          </div>

                          <tbody className="homeorder-dashboard">
                            {pendingOrders && pendingOrders.length > 0 ? (
                              pendingOrders.map((order, index) => (
                                <div style={{ display: "flex" }} key={index}>
                                  <div
                                    className="order-idedsf"
                                    data-label="Order Id"
                                  >
                                    #{order.orderId}
                                  </div>
                                  <div
                                    className="order-idedsf"
                                    data-label="Customer"
                                  >
                                    <OrderDate date={order.createdAt} />
                                  </div>
                                  <div
                                    className="productsname-in-table-cjkf"
                                    data-label="Date / Time"
                                  >
                                    {order.addressName
                                      ? order.addressName
                                      : "User"}
                                  </div>
                                  <div
                                    className="order-idedsf"
                                    data-label="Amount"
                                  >
                                    {PriceWithComma(order.totalAmount)}
                                  </div>
                                  <div
                                    className="order-idedsf"
                                    data-label="Items"
                                  >
                                    {order.orderStatus
                                      ? order.orderStatus
                                      : "New Order"}
                                  </div>
                                  <div
                                    className="order-idedsf"
                                    data-label="Status"
                                  >
                                    {order.paymentType
                                      ? order.paymentType
                                      : "---"}
                                  </div>
                                  <div
                                    className="order-idedsf"
                                    data-label="Items"
                                    onClick={() => {
                                      setOrderDetailsModal(true);
                                      setOrderDetails(order);
                                    }}
                                    style={{ cursor: "pointer" }}
                                  >
                                    View Details
                                  </div>
                                </div>
                              ))
                            ) : (
                              <div
                                style={{ width: "58%" }}
                                className="new-no-ejkdjbkfersdf"
                              >
                                {" "}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    style={{ height: "10em" }}
                                    src={ImportImage.NoOrder}
                                    alt={"Shopisthan"}
                                  />
                                </div>
                                <h2
                                  style={{
                                    color: "#363636",
                                    lineHeight: "2",
                                    textAlign: "center",
                                    paddingTop: "10px",
                                    fontSize: "24px",
                                  }}
                                >
                                  No New Order
                                </h2>{" "}
                                <p
                                  style={{
                                    textAlign: "center",
                                    paddingBottom: "10px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                    color: "grey",
                                  }}
                                >
                                  Share your store to get new orders
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <button
                                    onClick={() => setShowShareModal(true)}
                                    className="medium-button-compo-btn"
                                  >
                                    Share Store
                                  </button>
                                </div>
                              </div>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashBoard>
        </div>
        <div className="responsive-dashbord-view-block">
          <StoreResponsiveDashboard />
        </div>
      </div>
      <OrderDetialsModal
        type={"Store"}
        show={orderDetailsModal}
        handleclose={() => setOrderDetailsModal(false)}
        orderDetails={orderDetails}
        close={close}
      />
      <ShareModal
        show={showShareModal}
        handleclose={() => setShowShareModal(false)}
        shareLink={`${storeName}`}
        shareTitle={`Watch my Store ${storeDetails.userStore.storeName} at Shopisthan`}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => {
          setReNewPlanModal(false);
        }}
      />
    </>
  );
};

export default StoreDasboard;
