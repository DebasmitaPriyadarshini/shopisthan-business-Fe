import React, { useEffect, useState } from "react";
import "./style.css";
import { useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import Switch from "react-switch";
import { useDispatch } from "react-redux";
import { outOfStockProductAction } from "../../actions/product.action";
import {
  FreeStorePlanNoOfDaysCompleted,
  PriceWithComma,
  StorePlanDeatils,
} from "../../Functions";
import { HomeNabar } from "../../Components/Navbar/index";
import DashBoard from "../../Components/SideMenu-Dashboard";
import StoreSubNavBar from "../../Components/Sub-navbar";
import { MessageModal, ReNewStorePlanModal } from "../../Components/Modal";
import StoreProductResponsive from "./Responsive";
import { ImportImage } from "../../Components/ImportedImages";

const StoreProduct = (props) => {
  const storeDetails = useSelector((state) => state.userStore);
  const history = useHistory();
  const auth = useSelector((state) => state.auth);
  const [searchTerm, setSearchTerm] = useState("");
  const productList = useSelector((state) => state.userStore.storeProduct);
  const dispatch = useDispatch();
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const storePlanDetails = StorePlanDeatils(
    storeDetails && storeDetails.userStore
      ? storeDetails.userStore.storePlan
      : null
  );

  const noOfStoreProducts = storeDetails.storeProduct
    ? storeDetails.storeProduct.length
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
          state: {
            storeId: "Store",
            Store: true,
            path: props.location.pathname,
          },
        }}
      />
    );
  }

  const addProduct = () => {
    if (storePlanDetails.noOfProducts > noOfStoreProducts) {
      return history.push({
        pathname: "/storeAddProduct",
      });
    } else {
      return setShowErrorModal(true);
    }
  };

  const toggleChecked = (product) => {
    if (product.productOutOfStock === "No") {
      const productOutOfStock = {
        _id: product._id,
        productOutOfStock: "Yes",
        productId: product.productId,
      };
      dispatch(outOfStockProductAction(productOutOfStock));
    } else {
      const productOutOfStock = {
        _id: product._id,
        productOutOfStock: "No",
        productId: product.productId,
      };
      dispatch(outOfStockProductAction(productOutOfStock));
    }
  };

  const proceed = (product) => {
    history.push({
      pathname: "/storeEditProduct",
      state: {
        productDetails: product,
        editProduct: true,
      },
    });
  };

  const renderProducts = () => {
    if (searchTerm === "" || searchTerm === null) {
      return productList.map((product, index) => (
        <div style={{ display: "flex" }} key={index}>
          <div className="productsname-in-table-cjkf" data-label="S.No">
            {product.productName}
          </div>
          <div className="product-details-in-dget-jhds" data-label="Order Id">
            #{product.productId}
          </div>
          <div className="product-details-in-dget-jhds" data-label="Customer">
            {product.productCatalog.name}
          </div>
          <div className="product-details-in-dget-jhds" data-label="Amount">
            {PriceWithComma(product.productPrice)}
          </div>
          <div className="product-details-in-dget-jhds" data-label="Items">
            <Switch
              onChange={() => toggleChecked(product)}
              checked={product.productOutOfStock === "No" ? false : true}
              checkedIcon={false}
              uncheckedIcon={false}
              onColor="#585858"
              offColor="#585858"
            />
            <h3>
              {" "}
              {product.productOutOfStock === "No"
                ? "Available"
                : "Out Of Stock"}
            </h3>
          </div>
          <div className="product-details-in-dget-jhds" data-label="Status">
            <button
              className="new-store-catelog-edit-btn-only"
              onClick={() => proceed(product)}
            >
              Edit
            </button>
          </div>
        </div>
      ));
    }

    if (searchTerm !== "" || searchTerm !== null) {
      const filterdProducts = productList.filter(
        (product) =>
          product.productName
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join("")) ||
          product.productCatalog.name
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join("")) ||
          product.productId
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join(""))
      );
      return filterdProducts && filterdProducts.length > 0 ? (
        filterdProducts.map((product, index) => (
          <div style={{ display: "flex" }} key={index}>
            <div className="productsname-in-table-cjkf" data-label="S.No">
              {product.productName}
            </div>
            <div className="product-details-in-dget-jhds" data-label="Order Id">
              #{product.productId}
            </div>
            <div className="product-details-in-dget-jhds" data-label="Customer">
              {product.productCatalog.name}
            </div>
            <div className="product-details-in-dget-jhds" data-label="Amount">
              {PriceWithComma(product.productPrice)}
            </div>
            <div className="product-details-in-dget-jhds" data-label="Items">
              <Switch
                onChange={() => toggleChecked(product)}
                checked={product.productOutOfStock === "No" ? false : true}
                checkedIcon={false}
                uncheckedIcon={false}
                onColor="#585858"
                offColor="#585858"
              />
              <h3>
                {" "}
                {product.productOutOfStock === "No"
                  ? "Available"
                  : "Out Of Stock"}
              </h3>
            </div>
            <div className="product-details-in-dget-jhds" data-label="Status">
              <button
                className="new-store-catelog-edit-btn-only"
                onClick={() => proceed(product)}
              >
                Edit
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="new-no-ejkdjbkfersdf">
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <img
              className="no-product-image-in-stroe-view-in-user-side"
              src={ImportImage.NoProduct}
              alt={"Shopisthan"}
            />
          </div>
          <h2
            style={{
              color: "grey",
              lineHeight: "2",
              textAlign: "center",
              padding: "10px 5px",
              fontSize: "24px",
            }}
          >
            Oooppss..! No Such Product found
          </h2>{" "}
        </div>
      );
    }
  };
  return (
    <>
      <div style={{ background: "#EFF1FF" }}>
        <div className="dashboard-destop-view-only">
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
                <h2 style={{ fontSize: "1.5rem" }}>Store Products</h2>
              </StoreSubNavBar>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "3em",
                }}
              >
                <div style={{ display: "flex" }}>
                  <h3 className="product-active-in-all-sdhe">Products</h3>

                  {storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.catalogFeature ? (
                    <Link to="/storeCatalog">
                      <h3 className="inactive-way-sofhresd">Catalogs</h3>
                    </Link>
                  ) : null}
                </div>
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
                      placeholder="Search by Product name or id..."
                      aria-label="Search "
                      className="SearchTypeahead-nav-store-dash-input"
                      style={{ outline: "none" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center" }}>
                  <div style={{ marginLeft: "8px" }}>
                    <button
                      className="medium-button-compo-btn"
                      onClick={addProduct}
                    >
                      Add New Item
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div className="new-order-table-div-for-user-order">
                    <div className="new-order-table-new">
                      <div>
                        <table className="table-new-table">
                          <div className="cdf-fkj-dflwe-dsd">
                            <div className="product-mn-sdjks-iuer-dds">
                              {" "}
                              Product Title
                            </div>
                            <div className="product-asdcx">Item Id</div>
                            <div className="product-asdcx">Category</div>
                            <div className="product-asdcx">Amount</div>
                            {storePlanDetails &&
                            storePlanDetails.stockProducts ? (
                              <div className="product-asdcx">
                                {" "}
                                Stock Available
                              </div>
                            ) : null}
                            {storePlanDetails &&
                            storePlanDetails.stockProducts ? (
                              <div className="product-asdcx"> Action</div>
                            ) : null}{" "}
                          </div>

                          <tbody className="Product-table-dashboard">
                            {productList && productList.length > 0 ? (
                              renderProducts()
                            ) : (
                              <div className="new-no-ejkdjbkfersdf">
                                {" "}
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <img
                                    style={{ height: "20em" }}
                                    src={ImportImage.NoProduct}
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
                                  No Products
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
                                  Add Your First Product
                                </p>
                                <div
                                  style={{
                                    display: "flex",
                                    justifyContent: "center",
                                  }}
                                >
                                  <Link to="/storeAddProduct">
                                    <button className="medium-button-compo-btn">
                                      Add Product
                                    </button>
                                  </Link>
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
      </div>
      <div className="responsive-dashbord-view-block">
        <StoreProductResponsive props={props} />
      </div>
      <MessageModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={"No More Proudct will be added"}
        title={"Error"}
      />

      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreProduct;
