import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { addToCart, removeCartItem } from "../../actions/user.action";
import { PriceWithComma } from "../../Functions";
import CartBag from "../../img/CartBag.jpeg";
import { CartItem } from "../CartItem";
import { ImportImage } from "../ImportedImages";
import "./style.css";

export const StoreViewCart = () => {
  const cart = useSelector((state) => state.userDetails);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
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

  return (
    <>
      <div className="disde-dl-ed-jkew-corinks">
        <div className="card-jekdnml-cwoerrwwk">
          <div className="your-bag-dropdown">
            {" "}
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <h2 style={{ fontSize: "17px" }}>Cart</h2>{" "}
              <span style={{ fontSize: "12px" }}>
                {Object.keys(cartItems) && Object.keys(cartItems).length === 0
                  ? null
                  : " " + Object.keys(cartItems).length + " " + "item" + " "}
              </span>
            </div>
          </div>
          <div
            style={{
              overflowY: "scroll",
              height: "38em",
            }}
          >
            {Object.keys(cartItems).map((key, index) => (
              <CartItem
                key={index}
                cartItem={cartItems[key]}
                onQuantityInc={onQuantityIncrement}
                onQuantityDec={onQuantityDecrement}
                onRemoveCartItem={onRemoveCartItem}
              />
            ))}

            {Object.keys(cartItems).length === 0 ? (
              <div className="cart">
                <div className="sec1">
                  <div className="sec2">
                    <div className="sec3">
                      <b> Cart is Empty</b>
                    </div>
                    <div style={{ display: "flex", justifyContent: "center" }}>
                      {" "}
                      <img
                        src={ImportImage.EmptyCart}
                        class="image-cart-ckeuwo"
                        alt={"CartBag"}
                      />
                    </div>

                    <div className="sec4">
                      <p>Your bag is empty.</p>
                      <p>Start shopping!! </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </div>
        {/* <div className="ne-line-between-lnce-kjne"></div> */}

        <div className="width-of-total-price-deatils-in-ione-box">
          {" "}
          <h2 className="piffcjr-nvr-price-details-page-at-noce-xa">
            Price Details
          </h2>
          <div className="new-pde-nxedd-rowncs">
            <div className="pric-detailed-inc-cmklesmfe">Product Charges</div>
            <div className="pric-detailed-inc-cmklesmfe">
              {PriceWithComma(
                Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                  const { productPrice, qty } = cart.cartItems[key];
                  return totalPrice + productPrice * qty;
                }, 0)
              )}
            </div>
          </div>
          <div className="new-pde-nxedd-rowncs">
            <div className="pric-detailed-inc-cmklesmfe">Delivery Charges</div>
            <div className="pric-detailed-inc-cmklesmfe">+ ₹0</div>
          </div>
          <div className="order-total-inde-nelblse">
            <div className="order-total-celoefnsl">Order Total</div>
            <div className="order-total-celoefnsl">
              {PriceWithComma(
                Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                  const { productPrice, qty } = cart.cartItems[key];
                  return totalPrice + productPrice * qty;
                }, 0)
              )}
            </div>
          </div>
          <div className="checlout-padding-iinf-debll">
            {Object.keys(cartItems).length === 0 ? null : (
              <div
                className="btn-for-checout-of-shop-profile-only"
                onClick={() => {
                  history.push({
                    pathname: "/Checkout",
                  });
                }}
              >
                {" "}
                <h2>Checkout</h2>{" "}
                <h4>
                  {PriceWithComma(
                    Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                      const { productPrice, qty } = cart.cartItems[key];
                      return totalPrice + productPrice * qty;
                    }, 0)
                  )}
                </h4>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
