import React, { useEffect, useState } from "react";
import "./style.css";
import { BottomNavigationDashboard } from "../../../Components/BottomNavigation/index";
import { useDispatch, useSelector } from "react-redux";
import OrderDate from "../../../Components/Order-Date";
import OrderdetailsResponsive from "./index";
import { editOrderProductAction } from "../../../actions/store.action";
import { PriceWithComma } from "../../../Functions";
import HambergurForProfile from "../../../Components/HambergurProfile";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";
import { Link } from "react-router-dom";

const StoreOrdersrespo = (props) => {
  const { selectedOrder } = props;
  const [humburgerModal, setShowHumburgerModal] = useState(false);
  const storeDetails = useSelector((state) => state.userStore);
  const [orderDetails, setOrderDetails] = useState("");
  const [orderDetailsModal, setOrderDetailsModal] = useState(false);
  const [selectedOrderAction, setSelectedOrderAction] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (selectedOrder) {
      return setSelectedOrderAction(selectedOrder);
    } else {
      return setSelectedOrderAction("All");
    }
  }, [selectedOrder]);

  const close = (value) => {
    setShowHumburgerModal(false);
  };

  const renderOrderListDetails = (orderList) => {
    return orderList.map((order, index) => (
      // <div className="component-of-snlge-orders-in-sjdhrg" key={index}>
      //   <div className="order-page-user-div-1-heading">
      //     <div style={{ width: "23em" }}>
      //       <div className="order-id-and-order-date-iall-order-component">
      //         <p className="order-id-right-border-indlkd">{order.orderId}</p>
      //         {/* <h3 style={{ color: "#000" }}>{order.user.name}</h3> */}
      //         <p className="oder-o-date-and-timede">
      //           <OrderDate date={order.createdAt} />{" "}
      //         </p>
      //       </div>
      //       <p className="followers-total-orders-in-view-ndnnn">
      //         {order.addressName ? order.addressName : "User"}
      //       </p>
      //     </div>
      //   </div>
      //   <div className="all-order-bodbrjkd">
      //     <div style={{ paddingBottom: "10px" }}>
      //       {" "}
      //       <div className="order-totak-value-in-bortttom">
      //         <div className="ckdpaspodls">
      //           {" "}
      //           <p className="Order-value-in-order-page-responsive-dj">
      //             Order Value
      //           </p>{" "}
      //           <p> {PriceWithComma(order.totalAmount)}</p>
      //         </div>

      //         <div
      //           className="view-order-option-in-responsive"
      //           onClick={() => {
      //             setOrderDetails(order);
      //             setOrderDetailsModal(true);
      //           }}
      //         >
      //           View more{" "}
      //         </div>
      //       </div>
      //     </div>
      //   </div>
      // </div>
      <div className="ordess-box-component-inrespo">
        <div className="name-and-price-of-order-in-component">
          <div className="name-ndhcbu-price-xaoi">
            {" "}
            <p className="user-name-in-store-order-details-gb">
              {order.addressName ? order.addressName : "User"}
            </p>
            <p>{PriceWithComma(order.totalAmount)}</p>
          </div>
          <div className="address-and-order-id-hashtag">
            {" "}
            <p className="addressof-stroe-in-order-list-cd">{order.address}</p>
            <p>Order #{order.orderId}</p>
          </div>
        </div>
        <div className="product-details-at-order-page-cpmpo">
          {order.items && order.items.length > 0 ? (
            <>
              <div className="product-aname-and-quantiy-and-order-rta-status">
                {" "}
                <div className="quantity-plus-item-name">
                  {" "}
                  <p className="time-anddate-of-order-form-cust ">
                    {order.items[0].purchasedQty}
                  </p>
                  <p className="time-anddate-of-order-form-cust ">x</p>
                  <p className="product-name-ove-in-order-cus">
                    {order.items[0].productName}
                  </p>
                </div>
                <h2 className="order-status-at-order-page-compo">
                  {order.orderStatus
                    ? order.orderStatus === "Not Available"
                      ? "Rejected"
                      : order.orderStatus
                    : "New Order"}
                </h2>
              </div>
              <div className="product-name-of-order-done">
                {" "}
                <p className="product-description-in-order-page-respo-injm">
                  {order.items[0].productDescription}
                </p>
              </div>
            </>
          ) : null}
          <div
            style={{ fontSize: "12px", padding: "0px 20px", color: "#999999" }}
          >
            {order.items && order.items.length > 1 ? (
              <>
                & {order.items.length - 1}{" "}
                {order.items.length - 1 === 1 ? "item" : "items"} more
              </>
            ) : null}
          </div>
        </div>
        <div className="date-off-order-and-vieworder-option">
          <p className="time-anddate-of-order-form-cust">
            <OrderDate date={order.createdAt} />
          </p>
          <div className="view-order-page-cni-go-option">
            <p
              style={{ fontSize: "14px" }}
              onClick={() => {
                setOrderDetails(order);
                setOrderDetailsModal(true);
              }}
            >
              View Order
            </p>

            <img
              onClick={() => {
                setOrderDetails(order);
                setOrderDetailsModal(true);
              }}
              style={{ height: "1rem" }}
              src={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAaVBMVEX///8eIB0AAAAABQAABwCfn56jpKIbHRoZGxjR0dG9vr3Nzc3S0tIRFA/CwsIcHxt1dnUTFRGwsK+pqqm2t7bf39+XmJfq6upQUU8iJCAqLCkKDgdFRkQ3OTby8/Ly8vFcXVtpaWg6Ozkgv1bJAAADLElEQVR4nO2d0XKbMBREhaCGmITYEOPYOE6T///IOqmnhXL1VobR0Z5nP2hHe3VXIGTnhBBCCCGEEEIIIYQQQgghhBBCrMOh6/v2uPYolqN+9X4ovN9RNW78PvtmOD2uPZZFaH2Z3an8w9qjWYBj/kdglpVEiX2ejaie6rUH9N85l9lEYoGrRZ9NKT1M4vVfhVlZwIw6U3irRdZyc6nmElkrajefRFjTuJ7nk5iVqKbx4Mu5xGogzWJjSWQ1ja0tkWRUUyIrwNkSc5JRk63FgW9UVIALrKgkiYFaJEm0ZzGBpjGQVtRkm0bONyq/aVQooyZbiwpwcZGAUVMNcNWeX4sKcHFhNw3Ua5tALfKXG5RRU20a2vVHRrJNg1+LKTQN1LmbZGtRu/64UIAjEAhweIkKcJEReG3DN2oCAQ5l1GRrEXWSMRDgSLOYgFFTDXApNA0FuLhItmkkUIsooyZQi031bEic7Prfm/ZHxHQ/je+JxgHu+OG9L2LGEjgyauMH8wfxcw9wtVWnEKrqcFP4Zk8xg/3FuRfju0YQfus+9msPYlH2O/dmtBIQ5Zs7rT2GZXk+uU/uSvrFbQ53T2sPYlFudbjFr6XuQl5Mv/qhexy4Lf93pnF1wc2l9WhvkcdMaG/xd4d4bdpNxAT2h6DHUY0lkHTKZuuthxigh/umQNLNNi/0iybwnyrgj9XaFgW9ezIFkk7w4y/ssWcQX4OgM4r2DKKiWpIWxQsEtYnAKooXSLcoaEePj2ppWhQvkNQmWnpUw1vUnMEK9CGJLRBUg4pqsWNbFBTV1CZix7YoXiCoTdg1CHr5YgvEW7SACyTt6AMWxQuEW5QU1Tp6VGvp52Q6+jkZ06KkqGbOIOlOdnybsGsQ1Sbm+mBRzRJItyheIOmcjF2DoKhmC0RZ1BBIevliCwS1iYBF8QI5FjXvtyBFtevJ+i9ZUJtwG/z/AX/Op5Al0PxfbpBFnXtP77/VYRa9cZ72CtLLlzt9Dq7Bb455ObYoT+Dk+Rrpwe+Yjb/ffjCcOF+fTalfvR8K73fHtUeyHIeu71uwPiGEEEIIIYQQQgghhBBCCCGEWJJfMX9FR2FQhKYAAAAASUVORK5CYII="
              }
              alt="ShopisthanLogo"
            />
          </div>
        </div>
      </div>
    ));
  };

  const showOrderList = (orderList) => {
    if (orderList.length <= 0) {
      return (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img
                style={{ height: "10em" }}
                src={ImportImage.NoOrder}
                alt="ShopisthanLogo"
              />
              <h2
                style={{
                  color: "grey",
                  lineHeight: "2",
                  padding: "10px 5px",
                  fontSize: "24px",
                }}
              >
                No {selectedOrderAction} Order
              </h2>{" "}
              <div>Share your store to get new orders</div>
            </div>
          </div>
        </div>
      );
    } else if (searchTerm === "" || searchTerm === null) {
      return renderOrderListDetails(orderList);
    } else {
      const filterdOrders =
        orderList && orderList.length > 0
          ? orderList.filter((order) =>
              "#"
                .toLowerCase()
                .concat(order.orderId)
                .split(" ")
                .join("")
                .includes(searchTerm.toLowerCase().split(" ").join(""))
            )
          : null;
      return filterdOrders && filterdOrders.length > 0 ? (
        renderOrderListDetails(filterdOrders)
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <h2 className="ops-in-no-product-catelog">Oops!!!</h2>
              <p className="no-ciocalpcds">
                No order received in Online Store.
              </p>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {" "}
                <img
                  style={{ height: "10em" }}
                  src={ImportImage.NoProduct}
                  alt="ShopisthanLogo"
                />
              </div>
              <p className="no-ciocalpcds">Share Store to get Orders</p>{" "}
            </div>
          </div>{" "}
        </div>
      );
    }
  };

  const renderOrderList = () => {
    if (selectedOrderAction === "All") {
      return showOrderList(storeDetails.storeOrder);
    } else if (selectedOrderAction === "Pending") {
      return showOrderList(
        storeDetails.storeOrder.filter((order) => !order.orderStatus)
      );
    } else if (selectedOrderAction === "Confrim") {
      return showOrderList(
        storeDetails.storeOrder.filter(
          (order) => order.orderStatus === "Confirm"
        )
      );
    } else if (selectedOrderAction === "Rejected") {
      return showOrderList(
        storeDetails.storeOrder.filter(
          (order) => order.orderStatus === "Not Available"
        )
      );
    } else {
      return showOrderList(storeDetails.storeOrder);
    }
  };

  const closeModal = () => {
    setOrderDetails("");
    setOrderDetailsModal(false);
  };

  const asdasd = (value) => {
    dispatch(editOrderProductAction(value));
  };

  return (
    <>
      {orderDetailsModal ? (
        <OrderdetailsResponsive
          orderDetails={orderDetails}
          store
          close={closeModal}
          procced={asdasd}
        />
      ) : (
        <>
          {/* <ProfileNavResponsive>
            <Link to="/storeProduct">
              <img
                style={{ height: "1rem" }}
                src={
                  "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
                }
                alt="ShopisthanLogo"
              />
     
            </Link>

            <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Order List</h2>
            <div></div>
          </ProfileNavResponsive> */}{" "}
          <NavbarForDash>
            {" "}
            <Link
              to={{
                pathname: "/storeProduct",
                state: {
                  showCatalog:
                    props &&
                    props.location &&
                    props.location.state &&
                    props.location.state.catalog
                      ? true
                      : false,
                },
              }}
            >
              <img
                style={{ height: "1.2rem", paddingTop: "5px" }}
                src={ImportImage.BackForNext}
                alt="ShopisthanLogo"
              />
              {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
            </Link>
            <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Order List</h2>
          </NavbarForDash>
          <div className="product-and-category-divided-inrespo-div">
            <div className="serach-down-asclna">
              <div
                className={
                  selectedOrderAction === "All"
                    ? "products-in-responsibe-jdks"
                    : "not-active-componts-in-products-and-catelogs"
                }
                onClick={() => {
                  setSelectedOrderAction("All");
                }}
              >
                <h2>All Orders</h2>
              </div>

              <div
                className={
                  selectedOrderAction === "Pending"
                    ? "products-in-responsibe-jdks"
                    : "not-active-componts-in-products-and-catelogs"
                }
                onClick={() => {
                  setSelectedOrderAction("Pending");
                }}
              >
                <h2> New Order </h2>
              </div>
              <div
                className={
                  selectedOrderAction === "Confrim"
                    ? "products-in-responsibe-jdks"
                    : "not-active-componts-in-products-and-catelogs"
                }
                onClick={() => {
                  setSelectedOrderAction("Confrim");
                }}
              >
                <h2> Confrim </h2>
              </div>
              <div
                className={
                  selectedOrderAction === "Rejected"
                    ? "products-in-responsibe-jdks"
                    : "not-active-componts-in-products-and-catelogs"
                }
                onClick={() => {
                  setSelectedOrderAction("Rejected");
                }}
              >
                <h2>Rejected </h2>
              </div>
            </div>
            <div className="search-at-navbar-in-all-product-rresponsive">
              <svg viewBox="0 0 12 12" class="SearchTypeahead-icon-fornavdash">
                <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
              </svg>
              <input
                className="new-search-for-every-navbar-in-stare-dashboard"
                type="search"
                name="search"
                autoComplete="off"
                placeholder={"Search with order Id"}
                aria-label="Search"
                style={{ outline: "none" }}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
            </div>
          </div>
          <div className="oreder-responsive-paGe-first-duv">
            {storeDetails &&
            storeDetails.storeOrder &&
            storeDetails.storeOrder.length > 0 ? (
              renderOrderList()
            ) : (
              <div className="new-no-ejkdjbkfersdf">
                {" "}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <img
                      style={{ height: "10em" }}
                      src={ImportImage.NoOrder}
                      alt="ShopisthanLogo"
                    />
                    <h2
                      style={{
                        color: "grey",
                        lineHeight: "2",
                        padding: "10px 5px",
                        fontSize: "24px",
                      }}
                    >
                      No New Order
                    </h2>{" "}
                    <div>Share your store to get new orders</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <HambergurForProfile
            show={humburgerModal}
            handleclose={() => setShowHumburgerModal(false)}
            close={close}
          />
          <BottomNavigationDashboard show={focused}></BottomNavigationDashboard>
        </>
      )}
    </>
  );
};

export default StoreOrdersrespo;
