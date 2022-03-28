import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCartItem } from "../../actions/user.action";
import { PriceWithComma } from "../../Functions";
import { CartItem } from "../CartItem";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { BottomNavigationProfile } from "../BottomNavigation";
import NavbarForDash from "../Navbar/Responsive/Dashboardnav";
import { ImportImage } from "../ImportedImages";

const ResponsiveStoreViewCart = (props) => {
  const history = useHistory();
  const cart = useSelector((state) => state.userDetails);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const dispatch = useDispatch();
  const storeUrl =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.storeUrl
      ? props.location.state.storeUrl
      : "";

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
    storeId
  ) => {
    dispatch(addToCart({ _id, productName, productPrice, img, storeId }, 1));
  };

  const onQuantityDecrement = (
    _id,
    productName,
    productPrice,
    img,
    storeId
  ) => {
    dispatch(addToCart({ _id, productName, productPrice, img, storeId }, -1));
  };

  if (Object.keys(cartItems).length === 0) {
    return (
      <>
        <NavbarForDash>
          {" "}
          <Link
            to={{
              pathname: storeUrl,
              state: { storeUrl: storeUrl, alreadyStoreDetails: true },
            }}
          >
            <img
              style={{ height: "1.2rem", paddingTop: "5px" }}
              src={ImportImage.BackForNext}
              alt="ShopisthanLogo"
            />
            {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
          </Link>
          <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Bag</h2>
        </NavbarForDash>
        <div className="cart">
          <div className="sec1">
            <div className="sec2">
              <div className="sec3">
                <b> Cart is Empty</b>
              </div>
              <img
                src={ImportImage.EmptyCart}
                class="cart-empty-inmage-in-responsive"
                alt="Cart"
              />
              <div className="sec4">
                <p>Your bag is empty.</p>
                <p>Start shopping!! </p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="diffrent-navbar-for-another-nav-incart">
        {" "}
        <NavbarForDash>
          {" "}
          <Link
            to={{
              pathname: storeUrl,
              state: { storeUrl: storeUrl, alreadyStoreDetails: true },
            }}
          >
            <img
              style={{ height: "1.2rem", paddingTop: "5px" }}
              src={ImportImage.BackForNext}
              alt="ShopisthanLogo"
            />
            {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
          </Link>
          <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Bag</h2>
        </NavbarForDash>
        <div className="ne-sunnavbar-for-new-status-of-ordr">
          <div className="flex-direction-for-status">
            <div className="bag-address-and-palce-order">
              <div className="active-circle-of-step">
                {" "}
                <div className="color-ofstep-activein"></div>
              </div>
              <p className="option-for-nxksnfl">Bag</p>
            </div>
            <div className="border-of-height-for-space"></div>
            <div className="bag-address-and-palce-order">
              <div className="non-acijnam-oiw">
                {" "}
                <div className="none-acjks"></div>
              </div>

              <p className="non-activeoption-for-nxksnfl">Address</p>
            </div>
            <div className="non-activeborder-of-height-for-space"></div>
            <div className="bag-address-and-palce-order">
              <div className="non-acijnam-oiw">
                {" "}
                <div className="none-acjks"></div>
              </div>

              <p className="non-activeoption-for-nxksnfl">Payment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="height-of-cart-in-dropdown-store-view">
        <div className="your-cart-option-in-one-ac">
          <p> Your Items</p>
        </div>

        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrement}
            onQuantityDec={onQuantityDecrement}
            onRemoveCartItem={onRemoveCartItem}
            cart={true}
            storeUrl={props.location.state.storeUrl}
          />
        ))}

        <div
          className="item-total-cabcia-inorder-xabjzk"
          style={{ borderTop: "1px solid #E4E4E4" }}
        >
          <p>Item Total</p>
          <p>
            {PriceWithComma(
              Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { productPrice, qty } = cart.cartItems[key];
                return totalPrice + productPrice * qty;
              }, 0)
            )}
          </p>
        </div>
        <div className="deleviery-cahegrcnao-new-delevidcn">
          <p>Delivery Charges</p>
          <p>₹0.00</p>
        </div>
        <div className="grand-total-xwexw">
          <p>Grand Total</p>
          <p>
            {" "}
            {PriceWithComma(
              Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { productPrice, qty } = cart.cartItems[key];
                return totalPrice + productPrice * qty;
              }, 0)
            )}
          </p>
        </div>
      </div>

      {Object.keys(cartItems).length === 0 ? null : (
        <div className="bottom-navigation-for-user-profile-in-store-view">
          <div
            className="btn-for-checout-of-shop-profile-only"
            onClick={() => {
              history.push({
                pathname: "/Checkout",
                state: {
                  cart: true,
                  storeUrl:
                    props.location.state && props.location.state.storeUrl
                      ? props.location.state.storeUrl
                      : null,
                },
              });
            }}
          >
            {" "}
            <h2>Place Order</h2>{" "}
          </div>
        </div>
      )}
    </>
  );
};

export default ResponsiveStoreViewCart;
