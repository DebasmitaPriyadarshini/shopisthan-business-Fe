import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import {
  addOrder,
  addToCart,
  editUserAddressAction,
  getCartItems,
  removeCartItem,
  updateCart,
} from "../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { CartItem } from "../../Components/CartItem";
import PriceDetails from "../../Components/PriceDetails";
import CheckoutLogin from "../../Components/CheckoutLogin";
import { LoginAtAddress, OrderSucess } from "../../Components/Modal";
import CartBag from "../../img/CartBag.jpeg";
import ProfileNavBarResponsive from "../../Components/Navbar/Responsive";
import StoreNavBar from "../../Components/StoreNavBar";
import { ImportImage } from "../../Components/ImportedImages";
import NavbarForDash from "../../Components/Navbar/Responsive";
import AddedAddress from "./Addressadded";
import AddNewAddress from "./AddAddress";

export const Checkout = (props) => {
  const auth = useSelector((state) => state.userDetails);
  const cart = useSelector((state) => state.userDetails);
  const storeDetails = useSelector((state) =>
    state.userDetails && state.userDetails.store ? state.userDetails.store : ""
  );
  const [cartItems, setCartItems] = useState(cart.cartItems);
  const [showValidation, setShowValidation] = useState(false);
  const [showAdress, setShowAdress] = useState(false);
  const [added, setAdded] = useState(false);
  const [validation, setValidation] = useState("");
  const [lodingButton, setLoadingButton] = useState(false);
  const [addressName, setAddressName] = useState(
    auth.authenticate && auth.user && auth.user.addressName
      ? auth.user.addressName
      : ""
  );
  const [addressMobileNumber, setAddressMobileNumber] = useState(
    auth.authenticate && auth.user && auth.user.phoneNo ? auth.user.phoneNo : ""
  );
  const [orderConfirmationModal, setOrderConfirmationModal] = useState(false);

  const [addressAddress, setAddressAddress] = useState(
    auth.authenticate && auth.user && auth.user.addressAddress
      ? auth.user.addressAddress
      : ""
  );
  const [errorModal, setErrorModal] = useState(false);
  const [errorModalMsg, setErrorModalMsg] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const [confirmOrder, setConfirmOrder] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const [showLogin, setShowLogin] = useState(false);
  const store = useSelector((state) => state.userDetails.store);

  useEffect(() => {
    if (confirmOrder && auth.loading && auth.error === "") {
      setLoadingButton(false);
      return setOrderConfirmationModal(true);
    }
  }, [auth.loading]);

  // useEffect(() => {
  //   if (auth.user && auth.user.phoneNo && addressMobileNumber === "") {
  //     setAddressName(
  //       auth.authenticate && auth.user && auth.user.addressName
  //         ? auth.user.addressName
  //         : ""
  //     );
  //     setAddressAddress(
  //       auth.authenticate && auth.user && auth.user.addressAddress
  //         ? auth.user.addressAddress
  //         : ""
  //     );
  //     return setAddressMobileNumber(
  //       auth.authenticate && auth.user && auth.user.phoneNo
  //         ? auth.user.phoneNo
  //         : ""
  //     );
  //   }
  // }, [auth.user]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);
  useEffect(() => {
    setCartItems(cart.cartItems);
  }, [cart.cartItems]);

  useEffect(() => {
    if (auth.authenticate) {
      return dispatch(getCartItems());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (auth.authenticate) {
      if (
        !auth.user.addressAddress ||
        !auth.user.addressCity ||
        !auth.user.addressState ||
        !auth.user.addressMobileNumber ||
        !auth.user.addressName
      ) {
        return history.push({
          pathname: "/add-address",
          state: {
            address: true,
            storeUrl:
              props.location.state && props.location.state.cart
                ? props.location.state.storeUrl
                : null,
          },
        });
      }
    }
  }, [auth.authenticate]);

  // useEffect(() => {
  //   if (auth.authenticate) {
  //     setAddressMobileNumber(
  //       auth.authenticate && auth.user && auth.user.phoneNo
  //         ? auth.user.phoneNo
  //         : ""
  //     );
  //     dispatch(getCartItems());
  //   }
  // }, [auth.authenticate]);

  // useEffect(() => {
  //   if (auth.authenticate && added && auth.loading && auth.error === "") {
  //     setShowAdress(true);
  //     setAdded(false);
  //     setValidation("");
  //     setShowValidation(false);
  //   }
  // });

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const onQuantityIncrementCartItem = (
    _id,
    productName,
    productPrice,
    img,
    storeId
  ) => {
    dispatch(addToCart({ _id, productName, productPrice, img, storeId }, 1));
  };

  const onQuantityDecrementCartItem = (
    _id,
    productName,
    productPrice,
    img,
    storeId
  ) => {
    dispatch(addToCart({ _id, productName, productPrice, img, storeId }, -1));
  };

  const onRemoveCartItem = (_id) => {
    dispatch(removeCartItem({ productId: _id }));
  };

  const onConfirmOrder = () => {
    if (!showAdress) {
      setValidation("Save");
      return setShowValidation(true);
    }

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
      setErrorModalMsg(
        "You can't buy products from different stores at a time"
      );
      return setErrorModal(true);
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
    const payload = {
      totalAmount,
      items,
      paymentStatus: "pending",
      paymentType: "COD",
      storeId: unqiue[0].storeId,
      address: addressAddress,
      phoneNo: addressMobileNumber,
      addressName: addressName,
    };
    setLoadingButton(true);
    dispatch(addOrder(payload));
    setConfirmOrder(true);
  };

  const goBack = (value) => {
    if (storeDetails === null) {
      return null;
    } else {
      return props.history.push({
        pathname: `/${storeDetails.storeUrl}`,
      });
    }
  };
  const returnToOrderPage = () => {
    if (storeDetails === null) {
      return null;
    } else {
      return props.history.push({
        pathname: `/${storeDetails.storeUrl}`,
        state: { Account: true },
      });
    }
  };

  const procced = (e) => {
    e.preventDefault();
    if (
      addressName === "" ||
      addressMobileNumber === "" ||
      addressAddress === "" ||
      isNaN(addressMobileNumber) ||
      (addressMobileNumber.toString().charAt(0) !== "9" &&
        addressMobileNumber.toString().charAt(0) !== "8" &&
        addressMobileNumber.toString().charAt(0) !== "7")
    ) {
      showErrorMsg("PhoneNumber");
      return setShowValidation(true);
    }
    if (
      isNaN(addressMobileNumber) ||
      (addressMobileNumber.toString().charAt(0) !== "9" &&
        addressMobileNumber.toString().charAt(0) !== "8" &&
        addressMobileNumber.toString().charAt(0) !== "7")
    ) {
      return showErrorMsg("PhoneNumber");
    }
    if (addressMobileNumber.length < 10) {
      return showErrorMsg("PhoneNumber");
    }

    if (addressMobileNumber.length > 10) {
      return showErrorMsg("PhoneNumber");
    }
    const data = {
      addressName,
      addressMobileNumber,
      addressAddress,
    };

    setAdded(true);
    dispatch(editUserAddressAction(data));
  };

  const showErrorContent = (msg) => {
    return <div className="error-mafg-in-validdatiom-in-inout-area">{msg}</div>;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "").replace(/\s\s+/g, " ");
    return setAddressMobileNumber(value);
  };

  const validForPhoneNo = () => {
    if (
      addressMobileNumber.toString().charAt(0) !== "9" &&
      addressMobileNumber.toString().charAt(0) !== "8" &&
      addressMobileNumber.toString().charAt(0) !== "7"
    ) {
      return showErrorContent(
        <div className="error-mafg-in-validdatiom-in-inout-area">
          Invalid Phone Number Please check
        </div>
      );
    } else {
      if (addressMobileNumber.length < 10) {
        return showErrorContent(
          <div className="error-mafg-in-validdatiom-in-inout-area">
            Invalid Phone Number Please check
          </div>
        );
      } else if (addressMobileNumber.length > 10) {
        return showErrorContent("Phone number should be 10 digit number");
      } else {
        return null;
      }
    }
  };

  const renderCheckoutButton = () => {
    return (
      <>
        <div
          className="edcn-ruvr"
          style={{
            alignItems: "center",
          }}
        >
          Cash on Delivery
        </div>
        <div className="div-of-iwuerhf">Pay on delivery (Cash/Card/UPI)</div>
        <div style={{ display: "flex", padding: "10px 20px" }}>
          <button
            disabled={!lodingButton ? false : true}
            className="place-order-btn-in-oredr-placingpage"
            onClick={onConfirmOrder}
          >
            {lodingButton ? "Placing Order" : "Place Order"}
          </button>
        </div>
      </>
    );
  };

  const renderCheckoutButtonForMobile = () => {
    return (
      <>
        <div className="bottom-stick-place-order-btn">
          <h2 className="mode-of-payment-incheckout-at-bottom">
            Cash on Delivery
          </h2>
          {/* <p>543</p> */}

          <button
            className="bottom-pace-oreder-btn-incheckout"
            onClick={onConfirmOrder}
          >
            Place Order
          </button>
        </div>
      </>
    );
  };

  if (Object.keys(cartItems).length === 0 && !orderConfirmationModal) {
    return (
      <>
        <div>
          <StoreNavBar checkout={true} store={store} />
        </div>
        <div className="container-for-nothing-in-cart-in-checckout">
          <>
            <div
              className="emptycartwish emptyPage"
              style={{ padding: "30px 0px 0px" }}
            >
              <img
                src={ImportImage.EmptyCart}
                title="Empty Cart Page Doodle"
                alt="Empty-Cart-Page-Doodle"
                className="no-product-image-in-stroe-view-in-user-side"
              />
              <h2
                style={{
                  color: "grey",
                  lineHeight: "2",
                  textAlign: "center",
                  padding: "10px 5px",
                  fontSize: "24px",
                }}
              >
                Nothing in the Cart
              </h2>
            </div>
          </>
        </div>

        {/* <Footer /> */}
      </>
    );
  }

  return (
    <>
      <div className="dashboard-destop-view-only">
        <div>
          <StoreNavBar checkout={true} store={store} />
        </div>
      </div>

      <div className="diffrent-navbar-for-another-nav-incart">
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
              pathname: "/store-responsive-cart",
              state: {
                storeUrl:
                  props.location.state && props.location.state.cart
                    ? props.location.state.storeUrl
                    : null,
              },
            }}
          >
            <img
              style={{ height: "1.2rem", paddingTop: "5px" }}
              src={ImportImage.BackForNext}
              alt="ShopisthanLogo"
            />
          </Link>
          <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Address</h2>
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
                  <div className="color-ofstep-activein"></div>
                </div>
              </div>

              <p className="option-for-nxksnfl">Address</p>
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
      {auth && auth.authenticate ? (
        <div style={{ paddingTop: "126px" }}>
          <AddedAddress props={props} />
        </div>
      ) : (
        <LoginAtAddress props={props} />
      )}
    </>
  );
};
{
  /* <Link
to={{
  pathname: "/store-responsive-cart",
  state: {
    storeUrl:
      props.location.state && props.location.state.cart
        ? props.location.state.storeUrl
        : null,
  },
}}
// to=""
>
<img
  style={{ height: "1.5rem" }}
  src={
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8jHyD8/PwdGBpMSUoAAAAgHB0JAAAeGhsYExQWEBLCwcHz8/OenZ17enoQCQsLAATs7Ozl5eWtq6w5NjdcWlqnpqbb2tvT0tJSUFCLiorIx8dpZ2hVU1OamZlwbm9FQkMrJyk1MjJ4dnc+OzwoJSaOjY32EwFQAAADNklEQVR4nO3d21riMBQFYNKSHrDQFlFkZBCK+v6POBQvRmlyt8uua6//CXY+dCVpTrMZEREREREREREREREREREREREREdEvkbStdgljag8n732+f9AuZCyHvMmcc1npd1vtWkax9337rsryVbuaEay8+6/wa+16xC2/N9C59KhdkLSHnw10zoPFzbrOblpY7rVrElV9FDcNdNmm0q5KUPJ3cdtAlxVIWbPKBw289IpALVzepsy1hR84w7dBjH51F3PtusRsBzF6VR+0C5PSbtJQAzMP80e6G8Zoz8P8hG9NsIE1TH8fjNHLgOaI0t2HYxSoL4zEqPMv2pUJqU7BGHX+UbsyKbEY/aNdmJRVJEaftAuTEovR90S7MiGxGE1RYnSdB2M08ygf2eBjNMGP0cCk3kSMbsBjtHAoMbpdhGM0R4nRtgOP0ehodKVdmJQ3qzGKM6mPDNYamBgNNxBoUu8GS0xgMRpYYurlOKPR8KR+gR6jaQc+GsWZ1Ee+jeKMRqvYaPRZuzIh+JP6c3g0Ch+jJcyOkliMZjAxWkZGo4zR32KOPqk/G11iSt/RYxRmD/Dao8focN/o1eJ5ltzVWA0M7Rv9spvf1W7/Oc6XoEiMXhTpfZW1fxrhP/8QThklpfze+NdJNXCEFfQkvK1SUeZk++Cp/YQXteh8uzqFOwpN2UnyR3yZ3k8ovHrwGP5uoSuXXD5YRvtCRc1SsIX4vyH+/2HVhWcVmmSzdHautRs00Mh+f066qXWI0mOayQ1qRtjZCT+3MDA/nNQcf6Q7DOC/0xj41mbge6mBb94G1i0MrD0ZWD/EXwM2sI5vYC+Ggf00BvZEmQhU9L2JBvaXGtgjbGCft4G9+gbOW+CfmTFw7snA2TUD5w8NnCE1cA4Y/yy3gfP4Bu5UMHAvhokpP/r9NAbuGLI85ce568vAfW0G7tyzEKjwd18auL/UxpQf/R5hA3dBx+7zdjj3eePfyW7gXn0DbyMYeN/CwBsloUWprMPp9HvwbwUZeO9pEKjlUbsgefDvrhl4O68/stgUDvn9w/4Ny857X+O+YXnVYnWDRERERERERERERERERERERERERESzf26lPPFI7CkpAAAAAElFTkSuQmCC"
  }
  alt="ShopisthanLogo"
/>
</Link> */
}
{
  /* <div
style={{ display: "flex", alignItems: "center", gap: "8px" }}
onClick={() => {
  history.push({
    pathname: "/store-responsive-cart",
    state: {
      storeUrl:
        props.location.state && props.location.state.cart
          ? props.location.state.storeUrl
          : null,
    },
  });
}}
></div> */
}

// {!auth.authenticate && showLogin ? (
//   <>
//     <h2 className="headerof-address-details">Login</h2>
//     <div
//       className="lofing-login-btn-incheckout-page"
//       style={{
//         width: "350px",
//       }}
//     >
//       <CheckoutLogin />
//     </div>
//   </>
// ) : null}

// {!auth.authenticate && !showLogin ? (
//   <>
//     <h2 className="headerof-address-details">Login</h2>
//     <div className="lofing-login-btn-incheckout-page">
//       <button
//         onClick={() => setShowLogin(true)}
//         className="login-btn-at-checkout"
//         style={{
//           background: "black",
//         }}
//       >
//         Login and Continue
//       </button>
//     </div>
//   </>
// ) : null}

// {!lodingButton ? (
//   renderCheckoutButtonForMobile()
// ) : (
//   <>
//     <div className="bottom-stick-place-order-btn">
//       <h2 className="mode-of-payment-incheckout-at-bottom"></h2>

//       <button className="bottom-pace-oreder-btn-incheckout">
//         Placing Order
//       </button>
//     </div>
//   </>
// )}

{
  /* <div className="backgoundof-checkout">
<div className="maindivision-for-firsrt-div">
  <div className="leftdivision-for-adress-info">


    <h2 className="headerof-address-details">Delivery Details</h2>

    {auth.authenticate ? (
      !showAdress ? (
        <div className="adressForm-in-new-checkout-form">
          <div className="stoe-form-jksdba-iojdea">
            <div className="icdsbnlcses-feef">
              <input
                value={addressName}
                onChange={(e) =>
                  setAddressName(e.target.value.replace(/\s\s+/g, " "))
                }
                className="checkout-page-input-in-sdks"
                placeholder={"Name"}
                maxLength={50}
              ></input>
              {showValidation && addressName.length < 5
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invaild Name
                    </div>
                  )
                : null}
            </div>
            <div className="icdsbnlcses-feef">
              <input
                value={addressMobileNumber}
                onChange={handleChange}
                className="checkout-page-input-in-sdks"
                placeholder={"Mobile Number"}
                maxLength={10}
              ></input>
              {showValidation &&
              addressMobileNumber.length < 10 &&
              validation !== "PhoneNumber"
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      {addressMobileNumber.length < 10
                        ? "Invalid phone number please check"
                        : "Phone number should be 10 digit number"}
                    </div>
                  )
                : null}

              {showValidation && validation === "PhoneNumber"
                ? validForPhoneNo()
                : null}
            </div>
          </div>

          <div className="stoe-form-jksdba-iojdea">
            <div className="icdsbnlcses-feef">
              <input
                value={addressAddress}
                onChange={(e) =>
                  setAddressAddress(
                    e.target.value.replace(/\s\s+/g, " ")
                  )
                }
                className="checkout-page-input-in-sdks"
                placeholder={"Please Enter Address"}
                maxLength={500}
              ></input>
              {showValidation && addressAddress.length < 5
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invaild Address
                    </div>
                  )
                : null}
            </div>
          </div>
          <div className="saveaddress-dividonin-checkout">
            <button
              className="place-order-btn-in-oredr-placingpage"
              disabled={added ? true : false}
              onClick={procced}
            >
              {added ? "Saving" : "Save"}
            </button>
          </div>
          {showValidation && validation === "Save"
            ? showErrorContent(
                <div className="error-mafg-in-validdatiom-in-inout-area">
                  Save the details first
                </div>
              )
            : null}
        </div>
      ) : (
        <div className="for-addresswhenfilled-deatiled">
          <h2 className="add-black-font">{addressName}</h2>
          <h2 className="add-grey">{addressMobileNumber}</h2>
          <h2 className="add-grey">{addressAddress}</h2>
          <div className="edit-delete-option-for-adress-incheckout">
            <button
              className="e-ditbtninadd"
              onClick={() => setShowAdress(false)}
            >
              Change
            </button>
          </div>
        </div>
      )
    ) : null}

    <div className="only-display-inedsk-mobil-none">
      <h2 className="headerof-address-details">Payment</h2>
      {renderCheckoutButton()}
    </div>
  </div>
  <div className="div-for-price-and-cart-items-incheckout">
    <div className="price-deatils-of-total-items">
      <h2 className="your-items-itemsyour">Your items</h2>
      <div className="Cartitemsscrolling-effect">
        {Object.keys(cartItems).map((key, index) => (
          <CartItem
            key={index}
            cartItem={cartItems[key]}
            onQuantityInc={onQuantityIncrementCartItem}
            onQuantityDec={onQuantityDecrementCartItem}
            onRemoveCartItem={onRemoveCartItem}
            cart={true}
            storeUrl={
              props.location.state && props.location.state.cart
                ? props.location.state.storeUrl
                : null
            }
          />
        ))}
      </div>
    </div>
    <div className="price-deatils-of-total-items">
      <PriceDetails
        totalItem={Object.keys(cart.cartItems).reduce(function (
          qty,
          key
        ) {
          return qty + cart.cartItems[key].qty;
        },
        0)}
        totalPrice={Object.keys(cart.cartItems).reduce(
          (totalPrice, key) => {
            const { productPrice, qty } = cart.cartItems[key];
            return totalPrice + productPrice * qty;
          },
          0
        )}
      />
    </div>
  </div>
</div>
</div> */
}
