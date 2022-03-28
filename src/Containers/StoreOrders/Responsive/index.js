import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { editOrderProductAction } from "../../../actions/store.action";
import { Modal, ReNewStorePlanModal } from "../../../Components/Modal/index";
import OrderDate from "../../../Components/Order-Date";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
} from "../../../Functions";
import jsPDF from "jspdf";
import NavbarForDash from "../../../Components/Navbar/Responsive";
import { ImportImage } from "../../../Components/ImportedImages";
import { Link } from "react-router-dom";

const OrderdetailsResponsive = (props) => {
  const { orderDetails } = props;
  const storeDetails = useSelector((state) => state.userStore);
  const [orderStatus, setOrderStatus] = useState("");
  const [confirmOrderStatusModal, setConfirmOrderStatusModal] = useState(false);
  const dispatch = useDispatch();
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const [showErrorMsg, setShowErrorMsg] = useState(false);

  useEffect(() => {
    if (
      showLoadingButton &&
      !storeDetails.error &&
      storeDetails.loading &&
      storeDetails.message === "Saved"
    ) {
      setShowLoadingButton(false);
      setShowErrorMsg(false);
      setOrderStatus("");
      setConfirmOrderStatusModal(false);
      props.close();
    }
    if (
      showLoadingButton &&
      storeDetails.error &&
      !storeDetails.loading &&
      !storeDetails.message
    ) {
      setShowLoadingButton(false);
      setShowErrorMsg(true);
    }
  }, [
    showLoadingButton,
    storeDetails.error,
    storeDetails.loading,
    storeDetails.message,
    props,
  ]);

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

  if (!orderDetails) {
    return null;
  }

  const SendOrderStatus = () => {
    if (orderStatus === "") {
      return null;
    }

    const details = {
      _id: orderDetails._id,
      orderStatus,
    };

    setShowLoadingButton(true);
    dispatch(editOrderProductAction(details));
  };

  const RenderConfirmOrderStatusModal = () => {
    return (
      <Modal
        visible={confirmOrderStatusModal}
        onClose={() => {
          setOrderStatus("");
          setConfirmOrderStatusModal(false);
        }}
        size="lg"
      >
        <div>
          <div className="frist-div-input-validation-pop-up">
            <div className="content">
              <h2>Please Confirm</h2>
              <p className="paragraph-for-the-errormseg">
                {" "}
                Are you sure you want to {orderStatus} Order
              </p>
              <div style={{ display: "flex" }}>
                {showLoadingButton ? (
                  <button className="got-it-and-close-btn">
                    Please wait.....
                  </button>
                ) : (
                  <button
                    className="got-it-and-close-btn"
                    onClick={SendOrderStatus}
                  >
                    Accept - ({orderStatus})
                  </button>
                )}
              </div>
              {showErrorMsg
                ? "something went wrong please try again later"
                : null}
            </div>
          </div>
        </div>
      </Modal>
    );
  };

  // const generatePDF = () => {
  //   var doc = new jsPDF("p", "pt", "a4");
  //   doc.html(document.querySelector("#invoce-content"), {
  //     callback: function (pdf) {
  //       pdf.save(`OrderId-${orderDetails.orderId}.pdf`);
  //     },
  //   });
  // };

  return (
    <>
      <NavbarForDash>
        {" "}
        <Link onClick={() => props.close()}>
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Order Summary</h2>
      </NavbarForDash>
      <div>
        {/* <div className="order-recieved-date-And-o-in-pop-up">
          <div className="zjocaimsa">
            <p>Order Summary</p>
          </div>
          <div className="acbuiuiaoc">
            {" "}
            <h2 className="new-order-id-at-soreder-pagedsd">
              Order id - {orderDetails.orderId}
            </h2>{" "}
            <h2 className="new-order-id-at-soreder-pagedsd">
              {" "}
              <OrderDate date={orderDetails.createdAt} />
            </h2>
          </div>
          <div className="oder-side-bansidbje">
            {" "}
            <h2 className="user-customer-name-in-reder-ofhfh">
              {orderDetails.addressName ? orderDetails.addressName : "User"}
            </h2>{" "}
            <h2 className="new-order-id-at-soreder-pagedsd">
              {" "}
              Total bill : {PriceWithComma(orderDetails.totalAmount)}
            </h2>
          </div>
        </div> */}
        {/* {orderDetails.orderStatus ? null : props.user ? null : (
          <div className="order-recieved-date-And-o-in-pop-up">
            <div className="order-raccepring-two-btns-ssdn">
              <button
                className="confirmorderand-popconfirmgreen"
                onClick={() => {
                  setOrderStatus("Confirm");
                  setConfirmOrderStatusModal(true);
                }}
              >
                Accept Order
              </button>
              <button
                className="notinstockorder-popred"
                onClick={() => {
                  setOrderStatus("Not Available");
                  setConfirmOrderStatusModal(true);
                }}
              >
                Reject Order
              </button>
            </div>
          </div>
        )} */}
        {/* <div className="order-info-sdcdcsd">
          {orderDetails.items.map((item, index) => (
            <div className="total-div-for-oder-details-andin-order" key={index}>
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
        {confirmOrderStatusModal ? RenderConfirmOrderStatusModal() : null} */}

        <div id="invoce-content">
          <div
            className="order-recieved-date-And-o-in-pop-up"
            style={{ marginTop: "95px", paddingBottom: "3em" }}
          >
            <div className="delevry-from-new-oreder-adress">
              <p>Delivery from</p>
            </div>
            <div className="new-shopname-at-order-page-new-ndc">
              <p>
                {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeName
                  ? storeDetails.userStore.storeName
                  : "Store Name"}
              </p>
              <p className="shopname-form-ordered-page">
                {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeAddress
                  ? storeDetails.userStore.storeAddress
                  : "Store Adress"}
              </p>
            </div>
            {/* <div className="download-summary-nclsiah-ahoa">
              <p
                className="dowload-summary-of-aorder-new-option"
                onClick={generatePDF}
              >
                Download summary
              </p>
              <img style={{ height: "20px" }} src={DownloadSummary} />
            </div> */}
            <div>
              <h2 className="your-porddr-ordr-details-starts">Your Order</h2>
            </div>{" "}
            {orderDetails.items.map((item, index) => (
              <>
                <div style={{ padding: "10px 20px" }}>
                  <p>{item.productName}</p>
                </div>
                <div className="quantity-of-items-and-caj">
                  <div className="cyioinca">
                    {" "}
                    <p>{item.purchasedQty}</p>
                    <p>x</p>
                    <p className="new-option-of-prir-ith">
                      {PriceWithComma(item.payablePrice)}
                    </p>
                  </div>
                  <p className="new-option-of-prir-ith">
                    {PriceWithComma(item.payablePrice * item.purchasedQty)}
                  </p>
                </div>
              </>
            ))}
            <div className="item-total-cabcia">
              <p>Item Total</p>
              <p>{PriceWithComma(orderDetails.totalAmount)}</p>
            </div>
            <div className="deleviery-cahegrcnao">
              <p>Delivery Charges</p>
              <p>₹0.00</p>
            </div>
            <div className="grand-total-at-order-page-bold">
              <p>Grand Total</p>
              <p>{PriceWithComma(orderDetails.totalAmount)}</p>
            </div>
            <div style={{ padding: "15px 20px" }}>
              <div className="order-details-fios">
                <h2>Order Details</h2>
              </div>
              <div
                className="details-of-order-customer-delivery-add"
                style={{ marginTop: "8px" }}
              >
                <p className="header-of-order-cjoa">Order Number</p>
                <p>#{orderDetails.orderId}</p>
              </div>
              <div className="details-of-order-customer-delivery-add">
                <p className="header-of-order-cjoa">Payment</p>
                <p>Cash on delevry</p>
              </div>
              <div className="details-of-order-customer-delivery-add">
                <p className="header-of-order-cjoa">Date</p>
                <p>
                  <OrderDate date={orderDetails.createdAt} />
                </p>
              </div>
              <div className="details-of-order-customer-delivery-add">
                <p className="header-of-order-cjoa">Phone number</p>
                <p>
                  {orderDetails.phoneNo.toString().trim().substring(0, 7)}XXX
                </p>
              </div>
              <div className="details-of-order-customer-delivery-add">
                <p className="header-of-order-cjoa">Deliver to</p>
                <p>{orderDetails.address}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {orderDetails.orderStatus ? null : props.user ? null : (
        <div
          className="bottom-navigation-for-user-profile-in-store-view"
          style={{ display: "flex", justifyContent: "space-around" }}
        >
          <button
            className="aceept-order-ntb-btn-dow-stick"
            onClick={() => {
              setOrderStatus("Confirm");
              setConfirmOrderStatusModal(true);
            }}
          >
            Accept Order
          </button>{" "}
          <button
            className="reject-order-ntb-btn-dow-stick"
            onClick={() => {
              setOrderStatus("Not Available");
              setConfirmOrderStatusModal(true);
            }}
          >
            Reject
          </button>
        </div>
      )}
      {confirmOrderStatusModal ? RenderConfirmOrderStatusModal() : null}
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default OrderdetailsResponsive;
