import React, { useEffect, useState } from "react";
import "./style.css";
import { Link, useHistory } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";
import { useDispatch, useSelector } from "react-redux";
import { editUserAddressAction } from "../../actions/user.action";
import NavbarForDash from "../../Components/Navbar/Responsive";
import { ImportImage } from "../../Components/ImportedImages";

export const AddNewAddress = (props) => {
  const auth = useSelector((state) => state.userDetails);
  const dispatch = useDispatch();
  const history = useHistory();
  const [added, setAdded] = useState(false);

  const [addressName, setAddressName] = useState(
    auth.authenticate && auth.user && auth.user.addressName
      ? auth.user.addressName
      : ""
  );
  const [addressMobileNumber, setAddressMobileNumber] = useState(
    auth.authenticate && auth.user && auth.user.phoneNo ? auth.user.phoneNo : ""
  );

  const [addressAddress, setAddressAddress] = useState(
    auth.authenticate && auth.user && auth.user.addressAddress
      ? auth.user.addressAddress
      : ""
  );

  const [addressState, setAddressState] = useState(
    auth.authenticate && auth.user && auth.user.addressState
      ? auth.user.addressState
      : ""
  );
  const [addressCity, setAddressCity] = useState(
    auth.authenticate && auth.user && auth.user.addressCity
      ? auth.user.addressCity
      : ""
  );

  const [validation, setValidation] = useState("");

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };
  const [showValidation, setShowValidation] = useState(false);

  const backUrl =
    props && props.location && props.location.state && props.location.state.edit
      ? "/Checkout"
      : "/store-responsive-cart";

  useEffect(() => {
    if (added && auth.loading && auth.error === "") {
      setValidation("");
      setShowValidation(false);
      history.push({
        pathname: "/Checkout",
        state: {
          cart: true,
          storeUrl:
            props &&
            props.location &&
            props.location.state &&
            props.location.state.address &&
            props.location.state.storeUrl
              ? props.location.state.storeUrl
              : "",
        },
      });
    }
  });

  useEffect(() => {
    if (auth.user && auth.user.phoneNo && addressMobileNumber === "") {
      setAddressName(
        auth.authenticate && auth.user && auth.user.addressName
          ? auth.user.addressName
          : ""
      );
      setAddressAddress(
        auth.authenticate && auth.user && auth.user.addressAddress
          ? auth.user.addressAddress
          : ""
      );
      setAddressState(
        auth.authenticate && auth.user && auth.user.addressState
          ? auth.user.addressState
          : ""
      );
      setAddressCity(
        auth.authenticate && auth.user && auth.user.addressCity
          ? auth.user.addressCity
          : ""
      );
      return setAddressMobileNumber(
        auth.authenticate && auth.user && auth.user.phoneNo
          ? auth.user.phoneNo
          : ""
      );
    }
  }, [auth.user]);

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

  const procced = (e) => {
    e.preventDefault();
    if (
      addressName === "" ||
      addressMobileNumber === "" ||
      addressAddress === "" ||
      addressCity === "" ||
      addressState === "" ||
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
      addressCity,
      addressState,
    };

    setAdded(true);
    dispatch(editUserAddressAction(data));
  };

  return (
    <>
      {" "}
      <NavbarForDash>
        {" "}
        <Link
          to={{
            pathname: backUrl,
            state: {
              storeUrl:
                props &&
                props.location &&
                props.location.state &&
                props.location.state.address &&
                props.location.state.storeUrl
                  ? props.location.state.storeUrl
                  : "",
              cart: true,
            },
          }}
        >
          <img
            style={{ height: "1.2rem", paddingTop: "5px" }}
            src={ImportImage.BackForNext}
            alt="ShopisthanLogo"
          />
          {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
        </Link>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>
          {props &&
          props.location &&
          props.location.state &&
          props.location.state.edit
            ? "Edit "
            : "Add New "}{" "}
          Address
        </h2>
      </NavbarForDash>
      <div style={{ marginTop: "4em" }}>
        {" "}
        <div className="background-white-in-store-profile-settings-page">
          <p className="header-of-particular-compomen">Your Address</p>

          <div className="stoe-form-jksdba-iojdea">
            <label className="label-for-store-settings-label-only">Name</label>
            <div className="profile-user-njrln">
              <input
                name="storeName"
                className="checkout-page-input-in-sdks"
                placeholder={"Enter your Name"}
                value={addressName}
                onChange={(e) =>
                  setAddressName(e.target.value.replace(/\s\s+/g, " "))
                }
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
          </div>

          <div className="stoe-form-jksdba-iojdea">
            <label className="label-for-store-settings-label-only">
              Phone Number
            </label>
            <div className="profile-user-njrln">
              <input
                name="storeName"
                className="checkout-page-input-in-sdks"
                value={addressMobileNumber}
                onChange={handleChange}
                placeholder={"Mobile Number"}
                maxLength={10}
                type="number"
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
            <label className="label-for-store-settings-label-only">
              Complete Address
            </label>
            <div className="profile-user-njrln">
              <input
                name="storeName"
                className="checkout-page-input-in-sdks"
                placeholder={"Enter your Address"}
                value={addressAddress}
                onChange={(e) =>
                  setAddressAddress(e.target.value.replace(/\s\s+/g, " "))
                }
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

          <div className="stoe-form-jksdba-iojdea">
            <div className="bottom-padding-in-storeprofe-deit">
              <label className="label-for-store-settings-label-only">
                State
              </label>
              <CountryDropdown
                value={addressState}
                onChange={(e) => setAddressState(e)}
                id="CountryDropdown-for-store-profile-settings-only"
              />
              {showValidation && !addressState
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invaild State
                    </div>
                  )
                : null}
            </div>
          </div>

          <div className="bottom-padding-in-storeprofe-deit">
            <label className="label-for-store-settings-label-only">City</label>
            <RegionDropdown
              defaultOptionLabel="Select City"
              id="CountryDropdown-for-store-profile-settings-only"
              country={addressState}
              value={addressCity}
              onChange={(e) => setAddressCity(e)}
            />
            {showValidation && !addressCity
              ? showErrorContent(
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invaild City
                  </div>
                )
              : null}
          </div>
        </div>{" "}
      </div>
      <div className="bottom-navigation-for-user-profile-in-store-view">
        {added ? (
          <div className="btn-for-checout-of-shop-profile-only">
            {" "}
            <h2>Please wait</h2>{" "}
          </div>
        ) : (
          <div
            className="btn-for-checout-of-shop-profile-only"
            onClick={procced}
          >
            {" "}
            <h2>Confirm</h2>{" "}
          </div>
        )}
      </div>
    </>
  );
};

export default AddNewAddress;
