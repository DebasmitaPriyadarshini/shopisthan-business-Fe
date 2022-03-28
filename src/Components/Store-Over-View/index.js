import React from "react";
import { Link } from "react-router-dom";
import { showFollowerNumbers } from "../../Functions";
import "./style.css";

const StoreOverview = (props) => {
  const { storeDetails } = props;
  const renderToatalSalePrice = (orderList) => {
    let sum = orderList
      .map((o) => o.totalAmount)
      .reduce((a, c) => {
        return a + c;
      });
    return (
      "₹ " + sum.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",")
    );
  };

  function findUnique(arr, predicate) {
    var found = {};
    arr.forEach((d) => {
      found[predicate(d)] = d;
    });
    return Object.keys(found).map((key) => found[key]).length;
  }

  // const coustomerList = findUnique(storeDetails && storeDetails.storeOrder ? storeDetails.storeOrder : null, );

  return (
    <div className="total-overview-first-divinrow">
      <div className="store-overview-indisplay-flex-and-grid-respo">
        <div className="white-div-for-product-and-others-count">
          <p className="header-of-productsand">Total Orders</p>
          <h3 className="number-of-of-a-prent-header">
            {storeDetails && storeDetails.storeOrder
              ? storeDetails.storeOrder.length
              : 0}
          </h3>
        </div>

        <div className="white-div-for-product-and-others-count">
          <p className="header-of-productsand"> Total Sales</p>
          <h3 className="number-of-of-a-prent-header">
            {storeDetails &&
            storeDetails.storeOrder &&
            storeDetails.storeOrder.length > 0
              ? renderToatalSalePrice(storeDetails.storeOrder)
              : 0}
          </h3>
        </div>
      </div>
      <div className="store-overview-indisplay-flex-and-grid-respo">
        <div className="white-div-for-product-and-others-count">
          <p className="header-of-productsand">Total Products</p>
          <h3 className="number-of-of-a-prent-header">
            {storeDetails && storeDetails.storeProduct
              ? storeDetails.storeProduct.length
              : 0}
          </h3>
        </div>

        <div className="white-div-for-product-and-others-count">
          <p className="header-of-productsand">Total Customers</p>
          <h3 className="number-of-of-a-prent-header">
            {storeDetails &&
            storeDetails.storeOrder &&
            storeDetails.storeOrder.length > 0
              ? findUnique(storeDetails.storeOrder, (d) => d.user._id)
              : 0}
            {/* {storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.followers
                ? showFollowerNumbers(storeDetails.userStore.followers.length)
                : 0} */}
          </h3>
        </div>
      </div>
    </div>
  );
};

export default StoreOverview;
