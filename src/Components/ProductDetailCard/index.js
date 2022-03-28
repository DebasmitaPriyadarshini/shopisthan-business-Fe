import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { PriceWithComma } from "../../Functions/index";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../../actions/user.action";
import { MessageModal } from "../Modal";
import "./style.css";

export const ProductDetailCard = (props) => {
  const { productDetails } = props;
  const cart = useSelector((state) => state.userDetails);
  const [cartItemsList, setCartItemsList] = useState(
    useSelector((state) => state.userDetails.cartItems)
  );
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [showMessage, setShowMessage] = useState(false);
  const dispatch = useDispatch();

  const cartProductDetails = Object.keys(cartItemsList)
    .filter((key) =>
      productDetails && productDetails._id
        ? productDetails._id === cartItemsList[key]._id
        : null
    )
    .map((key, index) => cartItemsList[key]);

  useEffect(() => {
    setCartItemsList(cart.cartItems);
  }, [cart.cartItems]);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const onQuantityIncrement = () => {
    if (cartProductDetails[0].qty >= 5) return;
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[productDetails._id];
    dispatch(
      addToCart(
        { _id, productName, productPrice, img, storeId, productDescription },
        1
      )
    );
  };

  const onQuantityDecrement = () => {
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[productDetails._id];
    dispatch(
      addToCart(
        { _id, productName, productPrice, img, storeId, productDescription },
        -1
      )
    );
  };

  const addFirstItemToCart = (
    storeId,
    _id,
    productName,
    productPrice,
    img,
    productDescription
  ) => {
    dispatch(
      addToCart({
        _id,
        productName,
        productPrice,
        storeId,
        img,
        productDescription,
      })
    );
  };

  const addAnotherItemToCart = (
    storeId,
    _id,
    productName,
    productPrice,
    img,
    productDescription
  ) => {
    const itemsStoreId = Object.keys(cartItemsList).filter(
      (key) => storeId === cartItemsList[key].storeId
    );

    if (itemsStoreId && itemsStoreId.length > 0) {
      dispatch(
        addToCart({
          _id,
          productName,
          productPrice,
          storeId,
          img,
          productDescription,
        })
      );
    } else {
      return setShowMessage(true);
    }
  };

  const renderAddToCartButton = () => {
    const check = Object.keys(cartItemsList).filter(
      (key) => productDetails._id === cartItemsList[key]._id
    );
    if (check && check.length > 0) {
      return (
        <>
          <div className="jcbsorcwsope">
            <div className="cartModOptionInner">
              <div className="cartModOptions">
                <div className="quantityControl">
                  {cartProductDetails[0].qty === 1 ? (
                    <Link
                      onClick={() => {
                        const _id = cartItemsList[productDetails._id];
                        dispatch(removeCartItem({ productId: _id._id }));
                      }}
                    >
                      <button>-</button>
                    </Link>
                  ) : (
                    <button onClick={onQuantityDecrement}>-</button>
                  )}
                  <input readOnly value={cartProductDetails[0].qty} />
                  <button onClick={onQuantityIncrement}>+</button>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button
            className="add-to-bag-button"
            onClick={() => {
              const storeId = productDetails.storeId;
              const { _id, productName, productPrice, productDescription } =
                productDetails;
              const img = productDetails.productPictures[0].img;

              cartItemsList && Object.keys(cartItemsList).length === 0
                ? addFirstItemToCart(
                    storeId,
                    _id,
                    productName,
                    productPrice,
                    img,
                    productDescription
                  )
                : addAnotherItemToCart(
                    storeId,
                    _id,
                    productName,
                    productPrice,
                    img,
                    productDescription
                  );
            }}
          >
            Add To Cart{" "}
          </button>
        </>
      );
    }
  };

  return (
    <>
      <>
        <div className="Profile-profileContents-3cP">
          <div className="Product-details-pop-dsitg-xed Profile-transitionBackwards-1fh">
            <div className="store-main-section">
              <div className="store-inner-section">
                <div className="lbeg-cbrsc ">
                  <div className="store-image-section-mew-oddkrf-de">
                    <div className="store-image-first-preview">
                      <div className="store-image-first-preview-section">
                        {productDetails &&
                        productDetails.productPictures &&
                        productDetails.productPictures.length > 0 ? (
                          <img
                            className="store-image-first-preview"
                            src={productDetails.productPictures[0].img}
                            alt={
                              productDetails
                                ? productDetails.productName
                                : "Shopisthan"
                            }
                          />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="store-product-details-section">
                    <div>
                      <div className="store-product-description-heading-section">
                        <h1 className="store-product-description-heading-huk">
                          {productDetails ? productDetails.productName : null}
                        </h1>
                      </div>
                      <div className="store-name-and-follower-sand-follow-btn">
                        <div></div>
                      </div>
                      <div className="store-product-amount-section">
                        <span className="store-product-amount">
                          {productDetails
                            ? PriceWithComma(productDetails.productPrice)
                            : null}{" "}
                        </span>
                        {productDetails ? (
                          productDetails.productPrice ===
                          productDetails.productMrpPrice ? null : (
                            <span className="store-product-amount-discount">
                              {PriceWithComma(productDetails.productMrpPrice)}
                            </span>
                          )
                        ) : null}

                        {productDetails ? (
                          productDetails.productPrice ===
                          productDetails.productMrpPrice ? null : (
                            <p className="discount-in-product-deatilast-page">
                              {PriceWithComma(
                                Math.round(
                                  ((productDetails.productMrpPrice -
                                    productDetails.productPrice) /
                                    productDetails.productMrpPrice) *
                                    100
                                )
                              )}
                              % off
                            </p>
                          )
                        ) : null}
                      </div>
                      <div className="store-stock-section">
                        <span className="store-product-detail-size"></span>
                      </div>
                      {renderAddToCartButton()}
                      <div className="store-add-product-details-section">
                        <span className="store-product-detail-size">
                          <b> Product Details </b>{" "}
                        </span>
                        <p className="product-decription-for-product-deatils-page">
                          {productDetails
                            ? productDetails.productDescription
                            : null}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Link to="/store-responsive-cart">
          <div className="bottom-cart-btn-in-out-eaSy">
            {Object.keys(cartItems) && Object.keys(cartItems).length === 0 ? (
              <div className="cartitems-zero-into-rituy">
                <div style={{ display: "grid" }}></div>

                <span class="title-svelte-1b3vcum">View cart</span>
                <div style={{ display: "grid" }}></div>
              </div>
            ) : (
              <div className="Cart-btn-bottom-btn">
                <div style={{ display: "grid" }}>
                  <span class="no-of-items-in-cart">
                    {Object.keys(cartItems) &&
                    Object.keys(cartItems).length === 0
                      ? null
                      : Object.keys(cartItems).length + " " + "ITEM"}
                  </span>
                  <div style={{ display: "flex", gap: "5px" }}>
                    <span>
                      {PriceWithComma(
                        Object.keys(cart.cartItems).reduce(
                          (totalPrice, key) => {
                            const { productPrice, qty } = cart.cartItems[key];
                            return totalPrice + productPrice * qty;
                          },
                          0
                        )
                      )}
                    </span>
                    <p style={{ fontSize: "12px", marginTop: "5px" }}>
                      plus taxes
                    </p>
                  </div>
                </div>

                <span class="title-svelte-1b3vcum">View cart</span>
              </div>
            )}
          </div>
        </Link>
      </>
      <MessageModal
        visible={showMessage}
        onClose={() => setShowMessage(false)}
        title={"Message"}
        message={
          "You can't add the product to cart from another store untill you checkout"
        }
      />
    </>
  );
};
