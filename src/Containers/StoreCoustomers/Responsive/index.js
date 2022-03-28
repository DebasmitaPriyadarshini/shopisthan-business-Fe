import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
  showOrdersAmountNumbers,
} from "../../../Functions";
import OrderDate from "../../../Components/Order-Date";
import HambergurForProfile from "../../../Components/HambergurProfile";
import { BottomNavigationDashboard } from "../../../Components/BottomNavigation/index";
import { ReNewStorePlanModal } from "../../../Components/Modal";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";
import { Link } from "react-router-dom";

const StoreFollowersResponsive = () => {
  const [humburgerModal, setShowHumburgerModal] = useState(false);
  const storeDetails = useSelector((state) => state.userStore);
  const [showCoustomers, setShowCoustomers] = useState(false);
  const [coustomerDetails, setCoustomersDetails] = useState("");
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);

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
      } else {
        return setReNewPlanModal(false);
      }
    }
  }, [storeDetails]);

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  today = mm + "/" + dd + "/" + yyyy;
  const thisMonth = mm + yyyy;

  // const getDate = (orderDate) => {
  //   const date = new Date(orderDate);
  //   const month = date.getMonth();
  //   const dt = date.getDate();
  //   const year = date.getFullYear();
  //   return month + 1 + '/' + dt + '/' + year
  // }
  const getMonth = (orderDate) => {
    const date = new Date(orderDate);
    const month = date.getMonth();
    const year = date.getFullYear();
    return month + 1 + year;
  };

  // const todaySales = storeDetails &&
  // storeDetails.storeOrder &&
  // storeDetails.storeOrder.length > 0 ?
  // storeDetails.storeOrder.filter((order) => getDate(order.createdAt) === today)
  // :
  // []

  const thisMonthSales =
    storeDetails &&
    storeDetails.storeOrder &&
    storeDetails.storeOrder.length > 0
      ? storeDetails.storeOrder.filter(
          (order) => getMonth(order.createdAt) === thisMonth
        )
      : [];

  // const todaySalesPrice = todaySales.length > 0 ?
  // todaySales.map((price) => price.totalAmount).reduce((a, c) => {
  //   return a + c;
  // })
  // : 0

  const thisMonthSalesPrice =
    thisMonthSales.length > 0
      ? showOrdersAmountNumbers(
          thisMonthSales
            .map((price) => price.totalAmount)
            .reduce((a, c) => {
              return a + c;
            })
        )
      : "₹0";

  function findUnique(arr, predicate) {
    var found = {};
    arr.forEach((d) => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map((key) => found[key]);
  }

  const coustomerList = findUnique(
    storeDetails && storeDetails.storeOrder ? storeDetails.storeOrder : null,
    (d) => d.user._id
  );

  const close = () => {
    setShowHumburgerModal(false);
  };
  const orderList =
    storeDetails && storeDetails.storeOrder ? storeDetails.storeOrder : null;

  const renderToatalSalePrice = (orderList) => {
    let sum = orderList
      .map((o) => o.totalAmount)
      .reduce((a, c) => {
        return a + c;
      });
    return showOrdersAmountNumbers(sum);
  };

  const renderNumberOfOrderByCoustomer = (coustomer) => {
    const coustomerOrders =
      orderList && orderList.length > 0
        ? orderList.filter((order) => order.user._id === coustomer.user._id)
            .length
        : 0;

    return `${coustomerOrders} ${
      coustomerOrders === 0 || coustomerOrders === 1 ? "order" : "orders"
    } from ${coustomer.addressName ? coustomer.addressName : "User"} so far`;
  };

  const renderCoustomerListDetails = (coustomerList) => {
    return coustomerList.map((coustomer, index) => (
      <div
        key={index}
        className="component-of-single-customers-in-hdge"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "10px 5px",
        }}
      >
        <div className="customerstroes-followedsnew">
          <div className="customer-first-letter-of-name-indjd">
            {coustomer.addressName
              ? coustomer.addressName.charAt(0).toUpperCase()
              : "U"}
          </div>
          <div>
            <h3 className="followers-users-name-in-followers">
              {coustomer.addressName ? coustomer.addressName : "User"}
            </h3>
            <div className="hdre-product-proic-total">
              {" "}
              <h2 className="followers-total-orders-in-view-ndnnn">
                {renderNumberOfOrderByCoustomer(coustomer)}
              </h2>{" "}
            </div>
          </div>
        </div>
      </div>
    ));
  };
  const renderCoustomerList = () => {
    if (searchTerm === "" || !searchTerm) {
      return renderCoustomerListDetails(coustomerList);
    } else {
      const searchTermCoustomer = coustomerList.filter((coustomer) =>
        coustomer.addressName
          ? coustomer.addressName
              .toLowerCase()
              .split(" ")
              .join("")
              .includes(searchTerm.toLowerCase().split(" ").join(""))
          : null
      );
      return searchTermCoustomer && searchTermCoustomer.length > 0 ? (
        renderCoustomerListDetails(searchTermCoustomer)
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <img
                style={{ height: "10em" }}
                src={ImportImage.NoCustomers}
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
                Oooppss..! No Such Customer found
              </h2>{" "}
            </div>
          </div>
        </div>
      );
    }
  };
  const renderCoustomer = () => {
    return (
      <>
        {coustomerList && coustomerList.length > 0 ? (
          renderCoustomerList()
        ) : (
          <div className="new-no-ejkdjbkfersdf">
            {" "}
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div>
                <img
                  style={{ height: "10em" }}
                  src={ImportImage.NoCustomers}
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
                  No Customers please Share your Store to get new Orders
                </h2>{" "}
              </div>
            </div>
          </div>
        )}
      </>
    );
  };

  const renderCoustomerAddress = () => {
    if (orderList.length <= 0) {
      return "N.A.";
    }
    if (!coustomerDetails) {
      return "N.A.";
    }
    const followerOrders =
      orderList && orderList.length > 0
        ? orderList.filter((order) => order.user._id === coustomerDetails._id)
        : "N.A.";

    if (followerOrders && followerOrders.length > 0) {
      return followerOrders[0].address;
    } else {
      return "N.A.";
    }
  };

  const renderFollowingOrderLists = () => {
    if (orderList.length <= 0) {
      return null;
    }
    if (!coustomerDetails) {
      return null;
    }
    const followerOrders =
      orderList && orderList.length > 0
        ? orderList.filter((order) => order.user._id === coustomerDetails._id)
        : null;

    if (followerOrders && followerOrders.length > 0) {
      return followerOrders.map((order, index) => (
        <div key={index}>
          <h3 className="newbottmnfiveem" key={index}>
            Order id -{order.orderId}
          </h3>
          <h3 className="newbottmnfiveem">
            Order Date - <OrderDate date={order.createdAt} />
          </h3>
          <h3 className="newbottmnfiveem">
            Order Amount - {PriceWithComma(order.totalAmount)}
          </h3>
          <h3 className="newbottmnfiveem">
            Order Status -{order.orderStatus ? order.orderStatus : "New Order"}
          </h3>
        </div>
      ));
    } else {
      return "No Orders";
    }
  };

  const renderCoustomerDetails = () => {
    if (!coustomerDetails) {
      return null;
    }
    return (
      <>
        <div
          style={{
            paddingBottom: "8em",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
        >
          {/* {showCoustomers ? ( */}
          <div></div>
          <div className="new-table-for-store-vendor-customers-only-vndor-side">
            <div>
              <div className="new-order-table-div-for-user-order">
                <div className="new-order-table-new">
                  <div>
                    <div
                      className="oknbhgrtyfc-oenc-customer-serv"
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <h3>Customer Deatils </h3>
                      <span
                        className="eudn-fkn-kjeof-wd"
                        onClick={() => {
                          setCoustomersDetails("");
                          setShowCoustomers(false);
                        }}
                      >
                        {" "}
                        Back
                      </span>
                    </div>
                    <div className="onbh-oenc-customer-serv">
                      <h3 className="newbottmnfiveem">
                        Name -{" "}
                        {coustomerDetails && coustomerDetails.name
                          ? coustomerDetails.name
                          : "User"}
                      </h3>
                      <h3 className="newbottmnfiveem">
                        Address -{renderCoustomerAddress()}
                      </h3>
                    </div>
                    <div className="onbh-oenc-customer-serv">
                      <h2 style={{ paddingBottom: "10px", color: "gray" }}>
                        Orders
                      </h2>
                      {renderFollowingOrderLists()}
                      {/* <h3 className='newbottmnfiveem'>
                        Order id -{" "}
                      </h3>
                      <h3 className='newbottmnfiveem'>
                        Order Date -{" "}
                      </h3>
                      <h3 className='newbottmnfiveem'>
                        Order Amount -{" "}
                      </h3>
                      <h3 className='newbottmnfiveem'>
                        Order Status -{" "}
                      </h3> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* ) : null} */}
        </div>
      </>
    );
  };

  return (
    <>
      <NavbarForDash>
        {" "}
        <Link to="/storeDashboard">
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>
          {" "}
          Business Insights
        </h2>
      </NavbarForDash>
      <div className="new-customers-online-cbajk">
        <h2 className="new-online-store-customrbb">Online Sales</h2>
        <div className="total-overview-first-divinrow">
          <div className="store-overview-indisplay-flex-and-grid-respo">
            <div className="white-div-for-product-and-others-count">
              <p className="header-of-productsand">Total Sales</p>
              <h3 className="number-of-of-a-prent-header">
                {orderList && orderList.length > 0
                  ? renderToatalSalePrice(orderList)
                  : "₹0"}
              </h3>
            </div>

            <div className="white-div-for-product-and-others-count">
              <p className="header-of-productsand">Total Orders</p>
              <h3 className="number-of-of-a-prent-header">
                {orderList && orderList.length > 0 ? orderList.length : "00"}
              </h3>
            </div>
          </div>
          <div className="store-overview-indisplay-flex-and-grid-respo">
            <div className="white-div-for-product-and-others-count">
              <p className="header-of-productsand">Total Month Sales</p>
              <h3 className="number-of-of-a-prent-header">
                {thisMonthSalesPrice}
              </h3>
            </div>

            <div className="white-div-for-product-and-others-count">
              <p className="header-of-productsand">This Month Orders</p>
              <h3 className="number-of-of-a-prent-header">
                {thisMonthSales && thisMonthSales.length > 0
                  ? thisMonthSales.length
                  : "00"}
              </h3>
            </div>
          </div>
        </div>
      </div>
      <div className="subnav-bar-for-all-followers-and-total">
        <h2 className="products-in-responsibe-jdks">All Customers</h2>
        {/* <p>
          Total Customers -{" "}
          {coustomerList ? showFollowerNumbers(coustomerList.length) : 0}
        </p> */}
      </div>
      <div className="Store-customers-list-in-scroll-view-inresponsve">
        {showCoustomers ? renderCoustomerDetails() : renderCoustomer()}
      </div>
      {/* --------------- For Onclick ________------------------------ */}{" "}
      <HambergurForProfile
        show={humburgerModal}
        handleclose={() => setShowHumburgerModal(false)}
        close={close}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
      <BottomNavigationDashboard show={focused}></BottomNavigationDashboard>
    </>
  );
};

export default StoreFollowersResponsive;
