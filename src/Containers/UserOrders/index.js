import React, { useState } from "react";
import { useSelector } from "react-redux";
import { ImportImage } from "../../Components/ImportedImages";
import ProfileNavBarResponsive from "../../Components/Navbar/Responsive";
import OrderDate from "../../Components/Order-Date";
import { FilterOrder, TrackOrder } from "../../Components/Modal/index";
import { PriceWithComma } from "../../Functions";
import "./style.css";

const UserOrders = (props) => {
  const userOrderLists = useSelector((state) => state.userDetails.orders);
  const storeId = useSelector((state) =>
    state.userDetails.store && state.userDetails.store._id
      ? state.userDetails.store._id
      : null
  );
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [orderDetails, setOrderDetails] = useState("");

  const [showOrderTracker, setShowOrderTracker] = useState(false);
  const [trackOrderDetails, setTrackOrderDetails] = useState("");

  const [selectFilter, setSelectFilter] = useState("");
  const [showFilterModal, setShowFilterModal] = useState(false);

  const renderOrderDetails = () => {
    if (!orderDetails) return null;
    else {
      return (
        <>
          <ProfileNavBarResponsive>
            <div className="flex-with-three-dots-on-it-onhj">
              <div
                style={{ display: "flex", alignItems: "center", gap: "8px" }}
                onClick={() => {
                  setOrderDetails("");
                  setShowOrderDetails(false);
                }}
              >
                <img
                  style={{ height: "1.5rem" }}
                  src={
                    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8jHyD8/PwdGBpMSUoAAAAgHB0JAAAeGhsYExQWEBLCwcHz8/OenZ17enoQCQsLAATs7Ozl5eWtq6w5NjdcWlqnpqbb2tvT0tJSUFCLiorIx8dpZ2hVU1OamZlwbm9FQkMrJyk1MjJ4dnc+OzwoJSaOjY32EwFQAAADNklEQVR4nO3d21riMBQFYNKSHrDQFlFkZBCK+v6POBQvRmlyt8uua6//CXY+dCVpTrMZEREREREREREREREREREREREREdEvkbStdgljag8n732+f9AuZCyHvMmcc1npd1vtWkax9337rsryVbuaEay8+6/wa+16xC2/N9C59KhdkLSHnw10zoPFzbrOblpY7rVrElV9FDcNdNmm0q5KUPJ3cdtAlxVIWbPKBw289IpALVzepsy1hR84w7dBjH51F3PtusRsBzF6VR+0C5PSbtJQAzMP80e6G8Zoz8P8hG9NsIE1TH8fjNHLgOaI0t2HYxSoL4zEqPMv2pUJqU7BGHX+UbsyKbEY/aNdmJRVJEaftAuTEovR90S7MiGxGE1RYnSdB2M08ygf2eBjNMGP0cCk3kSMbsBjtHAoMbpdhGM0R4nRtgOP0ehodKVdmJQ3qzGKM6mPDNYamBgNNxBoUu8GS0xgMRpYYurlOKPR8KR+gR6jaQc+GsWZ1Ee+jeKMRqvYaPRZuzIh+JP6c3g0Ch+jJcyOkliMZjAxWkZGo4zR32KOPqk/G11iSt/RYxRmD/Dao8focN/o1eJ5ltzVWA0M7Rv9spvf1W7/Oc6XoEiMXhTpfZW1fxrhP/8QThklpfze+NdJNXCEFfQkvK1SUeZk++Cp/YQXteh8uzqFOwpN2UnyR3yZ3k8ovHrwGP5uoSuXXD5YRvtCRc1SsIX4vyH+/2HVhWcVmmSzdHautRs00Mh+f066qXWI0mOayQ1qRtjZCT+3MDA/nNQcf6Q7DOC/0xj41mbge6mBb94G1i0MrD0ZWD/EXwM2sI5vYC+Ggf00BvZEmQhU9L2JBvaXGtgjbGCft4G9+gbOW+CfmTFw7snA2TUD5w8NnCE1cA4Y/yy3gfP4Bu5UMHAvhokpP/r9NAbuGLI85ce568vAfW0G7tyzEKjwd18auL/UxpQf/R5hA3dBx+7zdjj3eePfyW7gXn0DbyMYeN/CwBsloUWprMPp9HvwbwUZeO9pEKjlUbsgefDvrhl4O68/stgUDvn9w/4Ny857X+O+YXnVYnWDRERERERERERERERERERERERERESzf26lPPFI7CkpAAAAAElFTkSuQmCC"
                  }
                  alt="ShopisthanLogo"
                />

                <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>
                  OrderID {orderDetails.orderId}
                </h2>
              </div>
            </div>
          </ProfileNavBarResponsive>
          <div>
            <div className="order-page-details-in-user-side-vie-full">
              <p className="your-cart-option-in-one-ac">Order Details</p>
              <div className="oder-side-pokjm">
                {" "}
                <h2 className="new-order-id-at-soreder-pagedsd">
                  Order ID - {orderDetails.orderId}
                </h2>{" "}
                <h2 className="new-order-id-at-soreder-pagedsd">
                  {" "}
                  <OrderDate date={orderDetails.createdAt} />
                </h2>
              </div>
              <div className="oder-side-neioskd">
                {" "}
                <h2 className="user-customer-name-in-reder-ofhfh">
                  {orderDetails.addressName ? orderDetails.addressName : "User"}
                  <div>
                    {orderDetails.address
                      ? orderDetails.address
                      : "User Adress"}
                  </div>
                </h2>{" "}
                <h2 className="new-order-id-at-soreder-pagedsd">
                  {" "}
                  Total bill : {PriceWithComma(orderDetails.totalAmount)}
                </h2>
              </div>
            </div>

            <div className="order-info-sdcdcsd">
              {" "}
              <p className="your-cart-option-in-one-ac">Item Details</p>
              {orderDetails.items.map((item, index) => (
                <div
                  className="total-div-for-oder-details-andin-order"
                  key={index}
                >
                  <div className="table-div-of-order-header-product-img">
                    <img
                      src={item.productPictures}
                      alt={item.productName}
                      className="orders-page-order-img-jd"
                    />
                  </div>
                  <div style={{ width: "100%" }}>
                    <div className="name-and-price-and-quantity-in-one-line">
                      <h2 className="items-total-and-item-nanemd-name">
                        {" "}
                        {item.purchasedQty} X {item.productName}
                      </h2>{" "}
                      <h2 className="paSDyua-jcaSa-scAC">
                        {PriceWithComma(item.payablePrice)}
                      </h2>{" "}
                    </div>
                    <p className="product-ddeciption-in-product-order-details-djs">
                      {item.productDescription ? item.productDescription : null}
                    </p>
                  </div>
                  <div style={{ textAlign: "left" }}></div>
                </div>
              ))}
            </div>
            <div className="order-info-sdcdcsd" style={{ marginBottom: "5em" }}>
              {" "}
              <p className="your-cart-option-in-one-ac">Order Status</p>
              <div className="orde-stausts-in-order-details-jcs">
                Order Status -{" "}
                {orderDetails.orderStatus
                  ? orderDetails.orderStatus
                  : "Pending"}
              </div>
              <div className="orde-stausts-in-order-details-jcs">
                Your Order is{" "}
                {orderDetails.orderStatus
                  ? orderDetails.orderStatus
                  : "Pending"}{" "}
                from Store Owner
              </div>
            </div>
          </div>
        </>
      );
    }
  };

  const getOrderList = (orderList) => {
    if (selectFilter === "") {
      return orderList;
    } else if (selectFilter === "Pending") {
      return orderList.filter((order) => !order.orderStatus);
    } else if (selectFilter === "Confrim") {
      return orderList.filter((order) => order.orderStatus === "Confirm");
    } else if (selectFilter === "Rejected") {
      return orderList.filter((order) => order.orderStatus === "Not Available");
    } else {
      return orderList;
    }
  };

  const renderUserOrders = () => {
    if (!storeId) {
      return (
        <>
          <div style={{ paddingTop: "8em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: "15em", paddingBottom: "1em" }}
                src={ImportImage.NoOrder}
                alt={"Shopisthan"}
              />
            </div>
            <div className="no-orddr-for-user-in-responsivee-cns">
              You have not placed Order till now in this store
            </div>
          </div>
        </>
      );
    }
    if (userOrderLists.length === 0) {
      return (
        <>
          <div style={{ paddingTop: "8em" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                style={{ height: "15em", paddingBottom: "1em" }}
                src={ImportImage.NoOrder}
                alt={"Shopisthan"}
              />
            </div>
            <div className="no-orddr-for-user-in-responsivee-cns">
              You have not placed Order till now in this store
            </div>
          </div>
        </>
      );
    } else {
      const userOrdersAsPerStoreId = userOrderLists.filter(
        (order) => order.storeId._id === storeId
      );
      if (userOrdersAsPerStoreId.length > 0) {
        const getOrderListByAction = getOrderList(userOrdersAsPerStoreId);
        if (getOrderListByAction && getOrderListByAction.length > 0) {
          return getOrderListByAction.map((order, index) => (
            <div className="border-bottom-grey-ten-pexel" key={index}>
              <div className="order-details-of-perticular-user">
                <img
                  style={{ height: "22px" }}
                  src={ImportImage.Orderdone}
                  alt={"Order-Done-Logo"}
                />
                <div style={{ lineHeight: "1.4" }}>
                  {" "}
                  <p className="order-confirmed-incskl">
                    {order.orderStatus
                      ? order.orderStatus === "Not Available"
                        ? "Rejected"
                        : order.orderStatus
                      : "New Order"}
                  </p>
                  <p className="Arriving-new-clsd">
                    Order Id : #{order.orderId}
                  </p>
                </div>
              </div>
              <div>
                {" "}
                <div className="product-of-order-item-in-order-success">
                  <div className="contaner-for-item-ie-order-in-it">
                    <div className="cart-design-product-one">
                      <div className="dispsdop-cm-ckawdjd">
                        <img
                          className="image-of-product-ie-orders"
                          src={order.items[0].productPictures}
                          alt="Cart_Image"
                        />

                        <div className="cart-design-product-description">
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            {" "}
                            <h3 className="cart-design-product-name">
                              {" "}
                              {order.items[0].productName}
                            </h3>{" "}
                          </div>

                          <p className="your-shop-name-in-cart-under-item">
                            {PriceWithComma(order.items[0].payablePrice)}
                          </p>
                          <div className="displar-xnj-flex-for-grand-total">
                            {" "}
                            <div className="cart-design-final-offer-price">
                              <p className="product-decription-of-product">
                                {order.items[0].productDescription}
                              </p>
                            </div>
                          </div>
                          <p className="product-decription-of-product">
                            {order.items && order.items.length > 1 ? (
                              <>
                                & {order.items.length - 1}{" "}
                                {order.items.length - 1 === 1
                                  ? "item"
                                  : "items"}{" "}
                                more
                              </>
                            ) : null}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>{" "}
                <div className="iwuhdjsma">
                  <button
                    className="trackorder-and-acacel-order-option-btn"
                    onClick={() => {
                      setOrderDetails(order);
                      setShowOrderDetails(true);
                    }}
                  >
                    View Order
                  </button>{" "}
                  <button
                    className="trackorder-and-acacel-order-option-btn"
                    onClick={() => {
                      setTrackOrderDetails(order);
                      setShowOrderTracker(true);
                    }}
                  >
                    Track
                  </button>
                </div>
              </div>
            </div>
          ));
        } else {
          return (
            <>
              <div style={{ paddingTop: "8em" }}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "5em",
                  }}
                >
                  <img
                    style={{ height: "15em", paddingBottom: "1em" }}
                    src={ImportImage.NoOrder}
                    alt={"Shopisthan"}
                  />
                </div>
                <div className="no-orddr-for-user-in-responsivee-cns">
                  You have no {selectFilter} Order till now in this store
                </div>
              </div>
            </>
          );
        }
      } else {
        return (
          <>
            <div style={{ paddingTop: "8em" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "5em",
                }}
              >
                <img
                  style={{ height: "15em", paddingBottom: "1em" }}
                  src={ImportImage.NoOrder}
                  alt={"Shopisthan"}
                />
              </div>
              <div className="no-orddr-for-user-in-responsivee-cns">
                You have not placed Order till now in this store
              </div>
            </div>
          </>
        );
      }
    }
  };

  return (
    <>
      <div>
        {!showOrderDetails ? (
          <>
            <div className="diffrent-navbar-for-another-nav-incart">
              {" "}
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "25px",
                  padding: "15px",
                }}
              >
                {" "}
                {/* <img
                  style={{ height: "1.2rem", paddingTop: "5px" }}
                  src={
                    "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
                  }
                  alt="ShopisthanLogo"
                  onClick={props.onClose}
                /> */}
                <img
                  style={{ height: "1.2rem", paddingTop: "5px" }}
                  src={ImportImage.BackForNext}
                  alt="ShopisthanLogo"
                  onClick={props.onClose}
                />
                {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
                <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Orders</h2>
              </div>
              <div className="ne-sunnavbar-for-new-status-of-ordr">
                <div className="disl-fl-of-file">
                  <p className="showing-all-orders">Showing All Orders</p>
                  <button
                    className="filter-btn-of-for-b-down-pop-up"
                    onClick={() => {
                      setShowFilterModal(true);
                    }}
                  >
                    Filter
                  </button>
                </div>
              </div>
            </div>
            <div style={{ padding: " 8em 0em" }}>{renderUserOrders()}</div>
          </>
        ) : (
          renderOrderDetails()
        )}
      </div>
      <FilterOrder
        show={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        selectFilter={selectFilter}
        setFilter={(val) => {
          setSelectFilter(val);
          setShowFilterModal(false);
        }}
      />
      <TrackOrder
        show={showOrderTracker}
        orderDetails={trackOrderDetails}
        onClose={() => {
          setShowOrderTracker(false);
        }}
      />
    </>
  );
};

export default UserOrders;

// <div index={index}>
//             <div className="component-of-snlge-orders-in-sjdhrg" key={index}>
//               <div className="order-page-user-div-1-heading">
//                 <div style={{ width: "23em" }}>
//                   <div className="order-id-and-order-date-iall-order-component">
//                     <p className="order-id-right-border-indlkd">
//                       #{order.orderId}
//                     </p>
//                     <p className="oder-o-date-and-timede">
//                       <OrderDate date={order.createdAt} />{" "}
//                     </p>
//                     <p className="Order-value-in-order-page-responsive-dj">
//                       Order Value
//                     </p>{" "}
//                     <p> {PriceWithComma(order.totalAmount)}</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="all-order-bodbrjkd">
//                 <div style={{ paddingBottom: "10px" }}>
//                   {" "}
//                   <div className="uswre-satus-order-and-asdnek">
//                     <div className="ckdpaspodls">
//                       {" "}
//                       <div
//                         className="view-order-option-in-responsive"
//                         onClick={() => {
//                           setOrderDetails(order);
//                           setShowOrderDetails(true);
//                         }}
//                       >
//                         View more{" "}
//                       </div>
//                     </div>
//                     <p className="followers-total-orders-in-view-ndnnn">
//                       Order status -{" "}
//                       {order.orderStatus ? order.orderStatus : "Pending"}
//                     </p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
