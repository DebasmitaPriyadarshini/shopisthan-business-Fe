import React, { useState, useEffect } from "react";
import { addToCart, removeCartItem } from "../../actions/user.action";
import StoreSingleProduct from "../StoreSingleProduct";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import { CatalogOptionsModal, ProductDetailsPopupScreen } from "../Modal";
import { ImportImage } from "../ImportedImages";
import { PriceWithComma } from "../../Functions";
import { Link } from "react-router-dom";
import {
  StoreCategorySkeleton,
  StoreProductSingleSkeleton,
} from "../SkeletonComponents/StoreComponents";

export const StoreViewProductSide = (props) => {
  const {
    store,
    product,
    catalogTerm1,
    catalog,
    productLoading,
    catalogLoading,
  } = props;

  const storeUrl = props.store1
    ? props.storeUrl.storeUrl
    : props.cart
    ? props.storeUrl
    : null;
  const [searchTerm, setSearchTerm] = useState("");
  const cart = useSelector((state) => state.userDetails);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [showCatalogModal, setShowCatalogModal] = useState(false);
  const dispatch = useDispatch();

  const [showProductDetailsModal, setShowProductDetailsModal] = useState(false);
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  const selectedCatalog = (val) => {
    setShowCatalogModal(false);
    return props.onCatalogChange(val);
  };

  const onQuantityIncrement = (
    _id,
    productName,
    productPrice,
    img,
    storeId,
    productDescription
  ) => {
    dispatch(
      addToCart(
        { _id, productName, productPrice, img, storeId, productDescription },
        1
      )
    );
  };

  const onQuantityDecrement = (
    _id,
    productName,
    productPrice,
    img,
    storeId,
    productDescription
  ) => {
    dispatch(
      addToCart(
        { _id, productName, productPrice, img, storeId, productDescription },
        -1
      )
    );
  };

  const showProductDetails = (val) => {
    setProductDetails(val);
    return setShowProductDetailsModal(true);
  };

  const renderProduct = () => {
    if (product && product.length === 0) {
      return (
        <>
          {" "}
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <div style={{ display: "flex", justifyContent: "center" }}>
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
                No Products on this store
              </h2>
            </div>
          </div>
        </>
      );
    } else if (catalogTerm1 === "" && searchTerm === "") {
      return (
        <div className="for-respo-and-desktop-display">
          <div className="StoreProductGridView">
            {product.map((product) => (
              <StoreSingleProduct
                product={product}
                storeDetails={store}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
                showProductDetails={showProductDetails}
              />
            ))}
          </div>
        </div>
      );
    }
    if (catalogTerm1 !== "" && searchTerm === "") {
      const filterdCatalogProducts = product.filter((product) =>
        product.productCatalog._id.includes(catalogTerm1)
      );
      return (
        <div className="for-respo-and-desktop-display">
          {" "}
          <div className="StoreProductGridView">
            {filterdCatalogProducts && filterdCatalogProducts.length > 0 ? (
              filterdCatalogProducts.map((product) => (
                <StoreSingleProduct
                  product={product}
                  storeDetails={store}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                  onRemoveCartItem={onRemoveCartItem}
                  showProductDetails={showProductDetails}
                />
              ))
            ) : (
              <div style={{ display: "flex", justifyContent: "center" }}>
                <div>
                  <div style={{ display: "flex", justifyContent: "center" }}>
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
                  </h2>
                </div>
              </div>
            )}{" "}
          </div>
        </div>
      );
    }
    if (searchTerm !== "" && catalogTerm1 === "") {
      const filterdSearchProducts = product.filter((product) =>
        product.productName
          .toLowerCase()
          .split(" ")
          .join("")
          .includes(searchTerm.toLowerCase().split(" ").join(""))
      );
      return (
        <div className="for-respo-and-desktop-display">
          {" "}
          <div className="StoreProductGridView">
            {filterdSearchProducts && filterdSearchProducts.length > 0 ? (
              filterdSearchProducts.map((product) => (
                <StoreSingleProduct
                  product={product}
                  storeDetails={store}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                  onRemoveCartItem={onRemoveCartItem}
                  showProductDetails={showProductDetails}
                />
              ))
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
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
                    </h2>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      );
    }

    if (searchTerm !== "" && catalogTerm1 !== "") {
      const filterdCatalogSearchProducts = product.filter(
        (product) =>
          product.productCatalog._id.includes(catalogTerm1) &&
          product.productName
            .toLowerCase()
            .split(" ")
            .join("")
            .includes(searchTerm.toLowerCase().split(" ").join(""))
      );
      return (
        <div className="for-respo-and-desktop-display">
          <div className="StoreProductGridView">
            {filterdCatalogSearchProducts &&
            filterdCatalogSearchProducts.length > 0 ? (
              filterdCatalogSearchProducts.map((product) => (
                <StoreSingleProduct
                  product={product}
                  storeDetails={store}
                  onQuantityInc={onQuantityIncrement}
                  onQuantityDec={onQuantityDecrement}
                  showProductDetails={showProductDetails}
                  onRemoveCartItem={onRemoveCartItem}
                />
              ))
            ) : (
              <>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <img
                      className="no-product-image-in-stroe-view-in-user-side"
                      src={ImportImage.NoProduct}
                      alt={"Shopisthan"}
                    />
                  </div>
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
                </h2>
              </>
            )}
          </div>
        </div>
      );
    }
  };

  return (
    <>
      <div className="Profile-profileContents-3cP">
        <div>
          {" "}
          {!catalogLoading ? (
            <div className="scrolling-category-at-y-axis-nstore-view">
              <p
                className={
                  catalogTerm1 === ""
                    ? "active-acategory-green"
                    : "non-active-acategory-green"
                }
                onClick={() => {
                  selectedCatalog("");
                }}
              >
                Recomended
              </p>{" "}
              {catalog && catalog.length > 0
                ? catalog.map((catalog, index) => (
                    <>
                      <p
                        className={
                          catalogTerm1 === catalog._id
                            ? "active-acategory-green"
                            : "non-active-acategory-green"
                        }
                        onClick={() => {
                          selectedCatalog(catalog._id);
                        }}
                      >
                        {catalog.name}
                      </p>{" "}
                    </>
                  ))
                : null}
            </div>
          ) : (
            <StoreCategorySkeleton />
          )}
        </div>

        <div className="prfile-hg-pl-ui-neb-popop-csc">
          <div style={{ width: "100%" }}>
            <div>
              {/* <div id="myID" className="bottomMenu hide">
                Hi there
              </div> */}
            </div>{" "}
            <div className="new-filter-for-explore-store-only">
              <div>
                <div
                  tabIndex="0"
                  className="kfjfhurcncncbchn SearchTypeahead-isTypeaheadEnabled-3i3"
                >
                  <div className="new-sesarch-compo-for-home-only-transparent">
                    <div className="SearchTypeahead-searchIcon-1ld">
                      <svg
                        viewBox="0 0 12 12"
                        className="search-svg-for-homepage-only"
                      >
                        <path d="M11.407,10.421,8.818,7.832a4.276,4.276,0,1,0-.985.985l2.589,2.589a.7.7,0,0,0,.985-.985ZM2.355,5.352a3,3,0,1,1,3,3,3,3,0,0,1-3-3Z"></path>
                      </svg>
                    </div>
                    <input
                      type="search"
                      name="search"
                      autocomplete="off"
                      placeholder="Search by product name"
                      aria-label="Search "
                      className="homepage-input-for-search-only-catehry"
                      style={{ outline: "none" }}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Profile-tabs-DeN Profile-transitionBackwards-1fh">
          {!productLoading ? (
            renderProduct()
          ) : (
            <>
              <StoreProductSingleSkeleton />
              <StoreProductSingleSkeleton />
              <StoreProductSingleSkeleton />
              <StoreProductSingleSkeleton />
            </>
          )}
        </div>

        {Object.keys(cartItems).length === 0 ? (
          <div className="floating-cart-inresponsive-view-instore-view">
            <div>
              <div
                className="floating-icon-of-category-in-resonsview"
                onClick={() => {
                  setShowCatalogModal(true);
                }}
              >
                Category
              </div>{" "}
            </div>
          </div>
        ) : (
          <div className="floating-cart-inresponsive-view-instore-view">
            <div>
              <div
                className="floating-bhucowmke-spes"
                onClick={() => {
                  setShowCatalogModal(true);
                }}
              >
                Category
              </div>{" "}
              <div className="cart-btn-in-store-view-injs">
                <Link
                  to={{
                    pathname: "/store-responsive-cart",
                    state: { storeUrl: storeUrl },
                  }}
                  style={{
                    color: "white",
                  }}
                >
                  <div className="new-cart-checkout-btn-after-item-added-in-aaart">
                    {" "}
                    <div>
                      <p style={{ fontSize: "12px", paddingBottom: "2px" }}>
                        {" "}
                        {Object.keys(cartItems).length}{" "}
                        {Object.keys(cartItems).length > 1 ? "Items" : "Item"}
                      </p>{" "}
                      <p style={{ fontSize: "20px" }}>
                        {" "}
                        {PriceWithComma(
                          Object.keys(cart.cartItems).reduce(
                            (totalPrice, key) => {
                              const { productPrice, qty } = cart.cartItems[key];
                              return totalPrice + productPrice * qty;
                            },
                            0
                          )
                        )}
                      </p>
                    </div>
                    <p style={{ fontSize: "20px" }}>
                      <Link
                        to={{
                          pathname: "/store-responsive-cart",
                          state: { storeUrl: storeUrl },
                        }}
                        style={{
                          color: "white",
                        }}
                      >
                        Next
                      </Link>
                    </p>
                  </div>
                </Link>
              </div>{" "}
            </div>
          </div>
        )}
      </div>
      <div className="responsive-dashbord-view-block">
        <CatalogOptionsModal
          show={showCatalogModal}
          catalog={catalog}
          onClose={() => setShowCatalogModal(false)}
          selectedCatalog={selectedCatalog}
        />
      </div>{" "}
      <ProductDetailsPopupScreen
        show={showProductDetailsModal}
        onClose={() => setShowProductDetailsModal(false)}
        productDetails={productDetails}
        storeDetails={store}
        onQuantityInc={onQuantityIncrement}
        onQuantityDec={onQuantityDecrement}
        onRemoveCartItem={onRemoveCartItem}
        storeUrl={storeUrl}
      />
    </>
  );
};
{
  /* <svg
onClick={() => {
  setShowCatalogModal(true);
}}
version="1.0"
xmlns="http://www.w3.org/2000/svg"
className="floatting-category-option-svg"
viewBox="0 0 512.000000 512.000000"
preserveAspectRatio="xMidYMid meet"
>
<g
  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
  stroke="none"
>
  <path
    d="M752 4539 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
  />
  <path
    d="M2992 4539 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
  />
  <path
    d="M752 2299 c-71 -28 -144 -101 -171 -174 -20 -54 -21 -72 -21 -685 0
-613 1 -631 21 -685 28 -74 100 -146 174 -174 54 -20 72 -21 685 -21 613 0
631 1 685 21 74 28 146 100 174 174 20 54 21 72 21 685 0 613 -1 631 -21 685
-28 74 -100 146 -174 174 -54 21 -71 21 -688 20 -611 0 -634 -1 -685 -20z"
  />
  <path
    d="M3475 2301 c-313 -80 -539 -291 -641 -601 -26 -79 -28 -96 -29 -255
0 -138 4 -182 19 -235 90 -309 317 -536 626 -626 53 -15 97 -19 235 -19 159 1
176 3 255 29 314 103 533 341 604 655 23 102 21 293 -4 401 -75 314 -336 575
-650 650 -112 26 -313 27 -415 1z"
  />
</g>
</svg> */
}

// bottom: 118px;
//     right: 80px;
// }
// @media (min-width: 320px) and (max-width: 425px)
// .floating-icon-of-category-in-resonsview {
//     position: fixed;
//     /* right: 12px; */
//     bottom: 70px;
//     background: #007f61;
//     color: #fff;
//     padding: 6px 40px;
//     border-radius: 15px;
