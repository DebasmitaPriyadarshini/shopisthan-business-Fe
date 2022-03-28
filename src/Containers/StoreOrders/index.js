import React, { useEffect, useState } from "react";
import DashBoard from "../../Components/SideMenu-Dashboard/index";
import { HomeNabar } from "../../Components/Navbar/index";
import "./style.css";
import { useSelector } from "react-redux";
import OrderDate from "../../Components/Order-Date";
import StoreOrdersrespo from "./Responsive/storeorder";
import OrderDetialsModal from "../../Components/OrderModal";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
} from "../../Functions";
import StoreSubNavBar from "../../Components/Sub-navbar/index";
import { ReNewStorePlanModal } from "../../Components/Modal";
import { Redirect } from "react-router";
import { ImportImage } from "../../Components/ImportedImages";

const StoreOrder = (props) => {
  const storeDetails = useSelector((state) => state.userStore);
  const [selectedOrderAction, setSelectedOrderAction] = useState("All");
  const [orderDetails, setOrderDetails] = useState("");
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const auth = useSelector((state) => state.auth);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);

  // var today = new Date();
  // var dd = today.getDate();
  // var mm = today.getMonth() + 1;
  // var yyyy = today.getFullYear();
  // today = mm + '/' + dd + '/' + yyyy;
  // const thisMonth = mm + yyyy;

  // const getDate = (orderDate) => {
  //   const date = new Date(orderDate);
  //   const month = date.getMonth();
  //   const dt = date.getDate();
  //   const year = date.getFullYear();
  //   return month + 1 + '/' + dt + '/' + year
  // }
  // const getMonth = (orderDate) => {
  //   const date = new Date(orderDate);
  //   const month = date.getMonth();
  //   const year = date.getFullYear();
  //   return month + 1 + year
  // }

  // const getTime = (time) => {
  //   const date = new Date(time);
  //   const hours = date.getHours();
  //   const min = date.getMinutes();

  //   // return hours + min

  // }

  // const todaySales = storeDetails &&
  //   storeDetails.storeOrder &&
  //   storeDetails.storeOrder.length > 0 ?
  //   storeDetails.storeOrder.filter((order) => getDate(order.createdAt) === today)
  //   :
  //   []

  // const thisMonthSales = storeDetails &&
  //   storeDetails.storeOrder &&
  //   storeDetails.storeOrder.length > 0 ?
  //   storeDetails.storeOrder.filter((order) => getMonth(order.createdAt) === thisMonth)
  //   :
  //   [];

  //   const todaySalesPrice = todaySales.length > 0 ?
  //   todaySales.map((price) => price.totalAmount).reduce((a, c) => {
  //     return a + c;
  //   })
  //   : 0

  // const thisMonthSalesPrice = thisMonthSales.length > 0 ?
  //   thisMonthSales.map((price) => price.totalAmount).reduce((a, c) => {
  //     return a + c;
  //   })
  //   : 0

  // console.log("thisMonthSalesPrice Sales", thisMonthSalesPrice, todaySalesPrice);

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
      props.location &&
      props.location.state &&
      props.location.state.PendingOrders
    ) {
      return setSelectedOrderAction("Pending");
    } else {
      return setSelectedOrderAction("All");
    }
  }, [props.location]);

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

  // 0169.

  const close = (value) => {
    setOrderDetailsModal(false);
  };

  const orderListByAction = () => {
    if (selectedOrderAction === "All") {
      return storeDetails.storeOrder;
    } else if (selectedOrderAction === "Pending") {
      return storeDetails.storeOrder.filter((order) => !order.orderStatus);
    } else if (selectedOrderAction === "Confrim") {
      return storeDetails.storeOrder.filter(
        (order) => order.orderStatus === "Confirm"
      );
    } else if (selectedOrderAction === "Rejected") {
      return storeDetails.storeOrder.filter(
        (order) => order.orderStatus === "Not Available"
      );
    } else {
      return storeDetails.storeOrder;
    }
  };

  const renderOrderList = () => {
    const orderList = orderListByAction();
    if (searchTerm === "" || searchTerm === null) {
      return orderList.length > 0 ? (
        orderList.map((order, index) => (
          <div style={{ display: "flex" }} key={index}>
            <div className="order-new-skjew">#{order.orderId}</div>
            <div className="order-new-skjew">
              {" "}
              <OrderDate date={order.createdAt} />
            </div>
            <div className="order-new-skjew">
              {order.addressName ? order.addressName : "User"}
            </div>
            <div className="order-new-skjew">
              {" "}
              {PriceWithComma(order.totalAmount)}
            </div>
            <div className="order-new-skjew">
              {" "}
              {order.orderStatus
                ? order.orderStatus === "Not Available"
                  ? "Rejected"
                  : order.orderStatus
                : "New Order"}
            </div>
            <div className="order-new-skjew">
              {" "}
              {order.paymentType ? order.paymentType : "---"}
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOrderDetailsModal(true);
                setOrderDetails(order);
              }}
              className="order-new-skjew"
            >
              {" "}
              View Details
            </div>
          </div>
        ))
      ) : (
        <div style={{ width: "50%" }} className="new-no-ejkdjbkfersdf">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ height: "20em" }}
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
            Oooppss..! No Such Order found
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
        </div>
      );
    }

    if (searchTerm !== "" || searchTerm !== null) {
      const filterdOrders =
        orderList && orderList.length > 0
          ? orderList.filter((order) =>
              order.orderId
                .toLowerCase()
                .split(" ")
                .join("")
                .includes(searchTerm.toLowerCase().split(" ").join("")) ||
              (order && order.addressName)
                ? order.addressName
                    .toLowerCase()
                    .split(" ")
                    .join("")
                    .includes(searchTerm.toLowerCase().split(" ").join(""))
                : null
            )
          : null;
      return filterdOrders && filterdOrders.length > 0 ? (
        filterdOrders.map((order, index) => (
          <div style={{ display: "flex" }} key={index}>
            <div className="order-new-skjew">#{order.orderId}</div>
            <div className="order-new-skjew">
              {" "}
              <OrderDate date={order.createdAt} />
            </div>
            <div className="order-new-skjew">
              {order.addressName ? order.addressName : "User"}
            </div>
            <div className="order-new-skjew">
              {" "}
              {PriceWithComma(order.totalAmount)}
            </div>
            <div className="order-new-skjew">
              {" "}
              {order.orderStatus
                ? order.orderStatus === "Not Available"
                  ? "Rejected"
                  : order.orderStatus
                : "New Order"}
            </div>
            <div className="order-new-skjew">
              {" "}
              {order.paymentType ? order.paymentType : "---"}
            </div>
            <div
              style={{ cursor: "pointer" }}
              onClick={() => {
                setOrderDetailsModal(true);
                setOrderDetails(order);
              }}
              className="order-new-skjew"
            >
              {" "}
              View Details
            </div>
          </div>
        ))
      ) : (
        <div style={{ width: "50%" }} className="new-no-ejkdjbkfersdf">
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <img
              style={{ height: "20em" }}
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
            Oooppss..! No Such Order found
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
        </div>
      );
    }
  };

  // const renderNoOfSalesToday = () => {
  //   if (storeDetails &&
  //     storeDetails.storeOrder &&
  //     storeDetails.storeOrder.length > 0) {
  //     const noOfSalesToday = storeDetails.storeOrder.filter((order) => getDate(order.createdAt) === today).length;
  //     return noOfSalesToday
  //   } else {
  //     return 0;
  //   }
  // }

  return (
    <>
      {" "}
      <div className="dashboard-destop-view-only">
        <div style={{ background: "#EFF1FF", height: "100vh" }}>
          <HomeNabar />

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
                <h2 style={{ fontSize: "1.5rem" }}>Store Orders</h2>
              </StoreSubNavBar>

              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3em",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h3
                    style={{
                      padding: "10px  0px",
                      fontSize: "1rem",
                      color: selectedOrderAction === "All" ? "#000" : "grey",
                      cursor: "pointer",
                      borderBottom:
                        selectedOrderAction === "All"
                          ? "3px solid #000 "
                          : "none",
                      width: "6em",
                      margin: "0px 8px",
                      textAlign: "center",
                    }}
                    onClick={() => {
                      setSelectedOrderAction("All");
                    }}
                  >
                    All
                  </h3>

                  <h3
                    style={{
                      padding: "10px 15px",
                      fontSize: "1rem",
                      color:
                        selectedOrderAction === "Pending" ? "#000" : "grey",
                      borderBottom:
                        selectedOrderAction === "Pending"
                          ? "3px solid #000 "
                          : "none",
                      cursor: "pointer",
                      width: "6em",
                      textAlign: "center",
                      margin: "0px 8px",
                    }}
                    onClick={() => {
                      setSelectedOrderAction("Pending");
                    }}
                  >
                    Pending
                  </h3>
                  <h3
                    style={{
                      padding: "10px 15px",
                      fontSize: "1rem",
                      color:
                        selectedOrderAction === "Confrim" ? "#000" : "grey",
                      borderBottom:
                        selectedOrderAction === "Confrim"
                          ? "3px solid #000 "
                          : "none",
                      cursor: "pointer",
                      width: "6em",
                      margin: "0px 8px",
                    }}
                    onClick={() => {
                      setSelectedOrderAction("Confrim");
                    }}
                  >
                    Confrim
                  </h3>
                  <h3
                    style={{
                      padding: "10px 15px",
                      fontSize: "1rem",
                      color:
                        selectedOrderAction === "Rejected" ? "#000" : "grey",
                      borderBottom:
                        selectedOrderAction === "Rejected"
                          ? "3px solid #000 "
                          : "none",
                      cursor: "pointer",
                      width: "6em",
                      margin: "0px 8px",
                    }}
                    onClick={() => {
                      setSelectedOrderAction("Rejected");
                    }}
                  >
                    Rejected
                  </h3>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div>
                    <div className="SearchTypeahead-for-store-dash-nav">
                      <div className="SearchTypeahead-searchIcon-1ld">
                        <svg
                          viewBox="0 0 12 12"
                          class="SearchTypeahead-icon-fornavdash"
                        >
                          <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
                        </svg>
                      </div>
                      <input
                        type="search"
                        name="search"
                        autoComplete="off"
                        placeholder="Search…"
                        aria-label="Search "
                        className="SearchTypeahead-nav-store-dash-input"
                        style={{ outline: "none" }}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="new-order-table-div-for-user-order">
                <div className="new-order-table-new">
                  <div>
                    <table className="table-new-table">
                      {/* {storeDetails &&
                    storeDetails.storeOrder &&
                    storeDetails.storeOrder.length < 0 ? ( */}
                      <thead className="oknbhgrtyfc-dashboard">
                        <th className="new-order-table-heeder-dashboard">
                          Order Id
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Date
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Customer
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Amount
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Status
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Payment
                        </th>
                        <th className="new-order-table-heeder-dashboard">
                          Action
                        </th>
                      </thead>
                      {/* ) : null} */}

                      <tbody className="lgadkyhdtq-dashboard">
                        {/* {
                            showPendingOrders ? renderPendingOrderList() : renderOrderList()
                          } */}
                        {storeDetails &&
                        storeDetails.storeOrder &&
                        storeDetails.storeOrder.length > 0 ? (
                          renderOrderList()
                        ) : (
                          <div
                            style={{ width: "50%" }}
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
                                style={{ height: "20em" }}
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
                          </div>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </DashBoard>
        </div>
      </div>
      <div className="responsive-dashbord-view-block">
        <StoreOrdersrespo selectedOrder={selectedOrderAction} />
      </div>
      <OrderDetialsModal
        type={"Store"}
        show={orderDetailsModal}
        handleclose={() => setOrderDetailsModal(false)}
        orderDetails={orderDetails}
        close={close}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreOrder;
