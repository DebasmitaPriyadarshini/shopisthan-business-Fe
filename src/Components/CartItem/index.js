import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PriceWithComma } from "../../Functions";
import "./style.css";

export const CartItem = (props) => {
  const [qty, setQty] = useState(props.cartItem.qty);
  const { _id, productName, productPrice, img, storeId, productDescription, colorName, colorCode } =
    props.cartItem;

  useEffect(() => {
    setQty(props.cartItem.qty);
  }, [props.cartItem.qty]);

  const onQuantityIncrement = () => {
    if (qty >= 5) return;
    setQty(qty + 1);
    props.onQuantityInc(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription,
      colorName,
      colorCode
    );
  };

  const onQuantityDecrement = () => {
    if (qty === 1) {
      return props.onRemoveCartItem(_id);
    }
    setQty(qty - 1);
    props.onQuantityDec(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription,
      colorName,
      colorCode
    );
  };

  return (
    <div className="cart-design-products-main-page">
      <div className="cart-design-product-inner-container">
        <div className="cart-design-product-one">
          <div className="dispsdop-cm-ckawdjd">
            <div className="cart-design-image-for-the-product">
              <img className="cart-design-image" src={img} alt="Cart_Image" />
            </div>
            <div className="cart-design-product-description">
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {" "}
                <h3 className="cart-design-product-name">
                  {" "}
                  {productName}
                </h3>{" "}
                <div className="crice-total-in-right-side">
                  <Link
                    onClick={() => props.onRemoveCartItem(_id)}
                    to={{
                      state: {
                        storeUrl: props.cart ? props.storeUrl : null,
                        cart: true,
                      },
                    }}
                  >
                    <svg
                      version="1.0"
                      xmlns="http://www.w3.org/2000/svg"
                      width="15px"
                      height="15px"
                      viewBox="0 0 512.000000 512.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                        fill="#707070"
                        stroke="none"
                      >
                        <path
                          d="M2210 5090 c0 -20 -5 -30 -15 -30 -35 0 -144 -60 -197 -109 -66 -60
-122 -162 -138 -250 -6 -29 -10 -127 -10 -217 l0 -164 -600 0 -600 0 0 -255 0
-255 1910 0 1910 0 0 255 0 255 -600 0 -600 0 0 164 c0 90 -4 188 -10 217 -16
88 -72 190 -138 250 -55 51 -159 109 -194 109 -13 0 -18 8 -18 30 l0 30 -350
0 -350 0 0 -30z m778 -252 c63 -39 72 -74 72 -310 l0 -208 -500 0 -500 0 0
205 c0 234 8 269 69 311 l36 24 394 0 c386 0 394 0 429 -22z"
                        />
                        <path
                          d="M986 3378 c2 -24 61 -693 129 -1488 69 -795 130 -1466 135 -1493 12
-59 52 -139 96 -194 43 -53 143 -118 206 -134 43 -12 48 -16 48 -41 l0 -28
960 0 960 0 0 28 c0 25 5 29 48 41 63 16 163 81 206 134 44 55 84 135 96 194
5 27 66 698 135 1493 68 795 127 1464 129 1488 l6 42 -1580 0 -1580 0 6 -42z
m1164 -1493 l0 -875 -195 0 -195 0 0 875 0 875 195 0 195 0 0 -875z m610 0 l0
-875 -200 0 -200 0 0 875 0 875 200 0 200 0 0 -875z m600 0 l0 -875 -195 0
-195 0 0 875 0 875 195 0 195 0 0 -875z"
                        />
                      </g>
                    </svg>
                  </Link>
                </div>
              </div>

              <p className="your-shop-name-in-cart-under-item">Western wear</p>
              <div className="displar-xnj-flex-for-grand-total">
                {" "}
                <div
                  className="add-and-subtract-items-of-cart-in-one-pastore-product"
                  style={{ marginTop: "5px" }}
                >
                  {qty === 1 ? (
                    <Link
                      onClick={() => props.onRemoveCartItem(_id)}
                      to={{
                        state: {
                          storeUrl: props.cart ? props.storeUrl : null,
                          cart: true,
                        },
                      }}
                      style={{ color: "white" }}
                    >
                      <p className="decrement-btn-in-minus-inadd-to-cart">-</p>
                    </Link>
                  ) : (
                    <p
                      className="decrement-btn-in-minus-inadd-to-cart"
                      onClick={onQuantityDecrement}
                    >
                      -
                    </p>
                  )}

                  <p style={{ fontSize: "12px" }} readOnly value={qty}>
                    {qty}
                  </p>
                  <p
                    className="qauntity-increase-inadd-to-cart-btn"
                    onClick={onQuantityIncrement}
                  >
                    {" "}
                    +{" "}
                  </p>
                </div>
                <div className="cart-design-final-offer-price">
                  <p className="actual-pice-in-cart">
                    {PriceWithComma(productPrice)}
                  </p>
                </div>
              </div>

              {/* <div className="add-and-subtract-items-of-cart-in-one-pastore-product">
                {cartProductDetails[0].qty === 1 ? (
                  <Link
                    onClick={() => {
                      const _id = cartItemsList[product._id];
                      props.onRemoveCartItem(_id._id);
                    }}
                    style={{
                      color: "white",
                    }}
                  >
                    <p>-</p>
                  </Link>
                ) : (
                  <p onClick={onQuantityDecrement}>-</p>
                )}
                <p>{cartProductDetails[0].qty}</p>

                <p onClick={onQuantityIncrement}>+</p>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
