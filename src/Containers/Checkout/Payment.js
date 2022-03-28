import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import { PriceWithComma } from "../../Functions";
import { useSelector, useDispatch } from "react-redux";
import { addOrder } from "../../actions/user.action";
import { ImportImage } from "../../Components/ImportedImages";

export const Payment = (props) => {
  const auth = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.userDetails);
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [lodingButton, setLoadingButton] = useState(false);
  const [confirmOrder, setConfirmOrder] = useState(false);
  const dispatch = useDispatch();
  const [orderProducts, setOrderProducts] = useState("");
  const history = useHistory();
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (confirmOrder && auth.loading && auth.error === "") {
      setLoadingButton(false);
      return history.push({
        pathname: "/order-success",
        state: {
          ordered: true,
          orderItems: orderProducts,
          storeUrl:
            props &&
            props.location &&
            props.location.state &&
            props.location.state.payment
              ? props.location.state.storeUrl
              : "",
        },
      });
    }
  }, [auth.loading]);

  const onConfirmOrder = () => {
    const totalAmount = Object.keys(cart.cartItems).reduce(
      (totalPrice, key) => {
        const { productPrice, qty } = cart.cartItems[key];
        return totalPrice + productPrice * qty;
      },
      0
    );

    const storeID = Object.keys(cart.cartItems).map((key) => ({
      storeId: cart.cartItems[key].storeId,
    }));

    const checkProductsFromAnthoerStore =
      storeID &&
      storeID.filter((store) => storeID[0].storeId !== store.storeId);

    if (
      checkProductsFromAnthoerStore &&
      checkProductsFromAnthoerStore.length > 0
    ) {
      return null;
    }

    const unqiue = storeID.filter(
      (elem, index) =>
        storeID.findIndex((obj) => obj.storeId === elem.storeId) === index
    );
    const items = Object.keys(cart.cartItems).map((key) => ({
      productId: key,
      payablePrice: cart.cartItems[key].productPrice,
      purchasedQty: cart.cartItems[key].qty,
      productName: cart.cartItems[key].productName,
      productPictures: cart.cartItems[key].img,
      productDescription: cart.cartItems[key].productDescription,
    }));
    setOrderProducts(items);
    const payload = {
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "COD",
      storeId: unqiue[0].storeId,
      address: auth.user.addressAddress,
      phoneNo: auth.user.addressMobileNumber,
      addressName: auth.user.addressName,
      addressState: auth.user.addressState,
      addressCity: auth.user.addressCity,
    };
    setLoadingButton(true);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  return (
    <>
      {" "}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "25px",
          padding: "15px",
        }}
      >
        {" "}
        <Link
          to={{
            pathname: "/Checkout",
            state: {
              storeUrl:
                props &&
                props.location &&
                props.location.state &&
                props.location.state.payment
                  ? props.location.state.storeUrl
                  : "",
              cart: true,
            },
          }}
        >
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={
              "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
            }
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Payments</h2>
      </div>
      <div className="ne-sunnavbar-for-new-status-of-ordr">
        <div className="flex-direction-for-status">
          <div className="bag-address-and-palce-order">
            <div className="active-circle-of-step">
              {" "}
              <img
                style={{ height: "10px" }}
                src={ImportImage.Orderdone}
                alt="Order-Done"
              />
            </div>
            <p className="option-for-nxksnfl">Bag</p>
          </div>
          <div className="border-of-height-for-space"></div>
          <div className="bag-address-and-palce-order">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="active-circle-of-step">
                {" "}
                <img
                  style={{ height: "10px" }}
                  src={ImportImage.Orderdone}
                  alt="Order-Done"
                />
              </div>
            </div>

            <p className="option-for-nxksnfl">Address</p>
          </div>
          <div className="border-of-height-for-space"></div>
          <div className="bag-address-and-palce-order">
            <div style={{ display: "flex", justifyContent: "center" }}>
              <div className="active-circle-of-step">
                {" "}
                <div className="color-ofstep-activein"></div>
              </div>
            </div>
            <p className="non-activeoption-for-nxksnfl">Payment</p>
          </div>
        </div>
      </div>
      <div style={{ padding: "20px 0px" }}>
        {" "}
        <div
          className="background-white-in-store-profile-settings-page"
          style={{ margin: "0em", padding: "0px 20px 10px 20px" }}
        >
          <p
            className="header-of-particular-compomen"
            style={{ borderBottom: "none", padding: "0px" }}
          >
            Select Payment Method
          </p>
        </div>{" "}
        <div className="active-payment-method-incheckout-page">
          <div className="active-circle-of-step">
            {" "}
            <img
              style={{ height: "10px" }}
              src={ImportImage.Orderdone}
              alt="Order-Done"
            />
          </div>{" "}
          <p>Cash On Delivery ( Cash/Cards/ UPI)</p>
        </div>{" "}
        <div className="non-active-payment-method-incheckout-page">
          <p>Online Payment Coming Soon..</p>
        </div>
      </div>
      <div className="ag-total-b-isnd">
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
        </div>{" "}
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
      <div className="bottom-navigation-for-user-profile-in-store-view">
        <div
          onClick={onConfirmOrder}
          className="btn-for-checout-of-shop-profile-only"
          style={{ justifyContent: "space-between" }}
        >
          {" "}
          <p>
            {" "}
            {PriceWithComma(
              Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                const { productPrice, qty } = cart.cartItems[key];
                return totalPrice + productPrice * qty;
              }, 0)
            )}
          </p>{" "}
          {lodingButton ? <p>Please Wait</p> : <p>Place Order</p>}
        </div>
      </div>
    </>
  );
};

export default Payment;
