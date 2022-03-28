import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { ImportImage } from "../../Components/ImportedImages";
import { PriceWithComma } from "../../Functions";

export const OrderSuccess = (props) => {
  const orderProducts =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.ordered
      ? props.location.state.orderItems
      : null;
  const storeUrl =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.storeUrl
      ? props.location.state.storeUrl
      : "";

  const history = useHistory();
  return (
    <>
      <div className="border-and-shadow-for-order-suces">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img
            style={{ height: "4em" }}
            src={ImportImage.Orderdone}
            alt="Order-Done"
          />
        </div>
        <div className="ordeer-placed-header-is">
          <h2>Order Placed Sucessfully</h2>
        </div>
      </div>
      <div className="arriving-date-of-orde-cjni">
        {/* <p>Arriving by 00/00/0000</p> */}
      </div>
      <div>
        {" "}
        <div className="product-of-order-item-in-order-success">
          {orderProducts && orderProducts.length > 0
            ? orderProducts.map((order, index) => (
                <div className="contaner-for-item-ie-order-in-it">
                  <div className="cart-design-product-one">
                    <div className="dispsdop-cm-ckawdjd">
                      <img
                        className="image-of-product-ie-orders"
                        alt="Cart_Image"
                        src={order.productPictures}
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
                            {order.productName}
                          </h3>{" "}
                        </div>

                        <p className="your-shop-name-in-cart-under-item">
                          {PriceWithComma(order.payablePrice)}
                        </p>
                        <div className="displar-xnj-flex-for-grand-total">
                          {" "}
                          <div className="cart-design-final-offer-price">
                            <p className="product-decription-of-product">
                              {order.productDescription}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : null}
        </div>{" "}
        <div className="iwuhdjsma">
          {/* <button className="trackorder-and-acacel-order-option-btn">
            Cancel
          </button> */}{" "}
          <button
            className="trackorder-and-acacel-order-option-btn"
            onClick={() => {
              history.push({
                pathname: "/user-profile",
                state: {
                  storeUrl: storeUrl,
                  viewOrder: true,
                },
              });
            }}
          >
            View Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderSuccess;
