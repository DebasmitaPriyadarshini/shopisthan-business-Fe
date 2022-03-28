import React from "react";
import { PriceWithComma } from "../../Functions";
import { Modal } from "../Modal";
import OrderDate from "../Order-Date";
import "./style.css";

const UserOrderDetailsModal = (props) => {
  const { show, handleclose, orderDetails } = props;


  if (!orderDetails) {
    return null;
  }



  return (
    <>
      <Modal visible={show} onClose={handleclose} size="lg">
        <div>
          <div id="content">
            <div className="new-store-order-pop-first-div-starts-for-order-pop-only">
              {/*  */}

              <div className="new-store-order-pop-secound-div-starts">
                <div className="new-store-order-pop-secound-headers-div-starts">
                  <div className="store-order-pop-up-cd-cinc-ede">
                    <h2 className="orderid-inorderpop">Order ID</h2>
                    <h2 className="orderid-inorderpop">
                      #{orderDetails.orderId}
                    </h2>
                    <p className="orderstausinpopupview">
                      {" "}
                      {orderDetails.orderStatus ? orderDetails.orderStatus === "Not Available" ? "Rejected" : orderDetails.orderStatus : "Pending"}{" "}
                    </p>
                  </div>
                </div>{" "}
              </div>
              <div className="store-order-pop-up-order-id-div">
                {/* {orderDetails.orderStatus ? null : type === "User" ? null : (
                  <div className="order-confirmbtningap">
                    <button
                      className="confirmorderand-popconfirmgreen"
                      onClick={() => {
                        setOrderStatus("Confirm");
                        setConfirmOrderStatusModal(true);
                      }}
                    >
                      Confirm Order
                    </button>
                    <button
                      className="notinstockorder-popred"
                      onClick={() => {
                        setOrderStatus("Not Available");
                        setConfirmOrderStatusModal(true);
                      }}
                    >
                      Not Available
                    </button>
                  </div>
                )} */}

                <div className="for-order-recieved-dateandtime">
                  <div
                    className="nv-si-dke-dnw-pep-snis-odpnd"
                    style={{ display: "flex" }}
                  >
                    <span>
                      {" "}
                      Order Placed on
                    </span>
                    <h2>
                      <OrderDate date={orderDetails.createdAt} />
                    </h2>
                  </div>
                </div>
              </div>

              <div className="new-order-details-pop-uop-user-and-vendor-details">
                <div>
                  <div style={{ marginBottom: "0.8rem" }}>
                    {" "}
                    <h2 className="only-store-name-and-user-name">
                      Store Name
                    </h2>
                    <p className="new-details-for-popup-nae-add-no">
                      {orderDetails.storeId && orderDetails.storeId.storeName ? orderDetails.storeId.storeName : "Store"}
                    </p>
                  </div>
                  <div style={{ marginBottom: "0.8rem" }}>
                    {" "}
                    <h2 className="only-store-name-and-user-name">Address</h2>
                    <p className="for-address-use-only-paragraph">
                      {orderDetails.storeId && orderDetails.storeId.storeAddress ? orderDetails.storeId.storeAddress : "Store Address"}
                    </p>
                  </div>

                </div>
                <div className="for-user-customer-deatils">
                  <div>
                    <div style={{ marginBottom: "0.8rem" }}>
                      {" "}
                      <h2 className="only-store-name-and-user-name">
                        Customer Name
                      </h2>
                      <p className="new-details-for-popup-nae-add-no">
                        {orderDetails.addressName
                          ? orderDetails.addressName
                          : "User"}
                        {/* {type === "Store" ? orderDetails.user.name : userName} */}
                      </p>
                    </div>
                    <div style={{ marginBottom: "0.8rem" }}>
                      {" "}
                      <h2 className="only-store-name-and-user-name">Address</h2>
                      <p className="for-address-use-only-paragraph">
                        {orderDetails.address}
                      </p>
                    </div>
                    <div>
                      {" "}
                      <h2 className="only-store-name-and-user-name">
                        Phone Number
                      </h2>
                      <p>{orderDetails.phoneNo}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/*  */}
              <div className="new-store-order-pop-order-items-info-div">
                <h2 className="order-details-pop-deyilsad">Order Info</h2>
              </div>

              <div className="new-store-order-pop-four-order-details-three-div">
                {orderDetails && orderDetails.items.length > 0
                  ? orderDetails.items.map((items, index) => (
                    <div key={index}>
                      <div className="new-table-for-order-using-division">
                        <div className="table-div-of-order-header-product-img">
                          <img
                            src={items.productPictures}
                            alt={items.productName}
                            className="new-store-dashboard-order-pup-up-product-img"
                          />
                        </div>
                        <div className="table-div-of-order-header-for-product-title">
                          <h2 className="title-of-product-items-odisy">
                            Title
                          </h2>
                          <p className="bvpsfrpuvna">{items.productName}</p>
                        </div>

                        <div className="table-div-of-order-header">
                          <h2 className="title-of-product-items-odisy">
                            Price
                          </h2>
                          <p className="new-details-for-popup-nae-add-no">
                            {" "}
                            {PriceWithComma(items.payablePrice)}{" "}
                          </p>
                        </div>
                        <div className="table-div-of-order-header">
                          <h2 className="title-of-product-items-odisy">
                            Qty
                          </h2>
                          <p className="new-details-for-popup-nae-add-no">
                            {items.purchasedQty} items
                          </p>
                        </div>
                        <div className="table-div-of-order-header">
                          <h2 className="title-of-product-items-odisy">
                            Amount
                          </h2>
                          <p className="new-details-for-popup-nae-add-no">
                            {PriceWithComma(
                              items.payablePrice * items.purchasedQty
                            )}
                            /-
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                  : null}
              </div>
              <div className="new-store-order-pop-for-total-price-only">
                <h4>Grand Total</h4>
                <h4>
                  {PriceWithComma(orderDetails.totalAmount)}

                  { }
                </h4>
              </div>
            </div>
          </div>
        </div>
      </Modal>

    </>
  );
};

export default UserOrderDetailsModal;
