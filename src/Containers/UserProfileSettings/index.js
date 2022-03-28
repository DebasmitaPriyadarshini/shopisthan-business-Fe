import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { editUserAddressAction } from "../../actions/user.action";
import ProfileNavBarResponsive from "../../Components/Navbar/Responsive";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";

const UserProfileSettings = (props) => {
  const auth = useSelector((state) => state.userDetails);
  const userDetails = useSelector((state) => state.userDetails.user);
  const [name, setName] = useState(userDetails.name ? userDetails.name : "");
  const [addressName, setAddressName] = useState(
    userDetails.addressName ? userDetails.addressName : ""
  );
  const [addressMobileNumber, setAddressMobileNumber] = useState(
    userDetails.addressMobileNumber ? userDetails.addressMobileNumber : ""
  );
  const [addressAddress, setAddressAddress] = useState(
    userDetails.addressAddress ? userDetails.addressAddress : ""
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

  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");

  useEffect(() => {
    if (auth.authenticate && added && auth.loading && auth.error === "") {
      setAdded(false);
      setValidation("");
      setShowValidation(false);
    }
  });

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const save = (e) => {
    e.preventDefault();
    if (
      addressName === "" ||
      addressMobileNumber === "" ||
      addressAddress === "" ||
      name === "" ||
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
      name,
      addressName,
      addressMobileNumber,
      addressAddress,
      addressCity,
      addressState,
    };

    setAdded(true);
    dispatch(editUserAddressAction(data));
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
  const showErrorContent = (msg) => {
    return <div className="error-mafg-in-validdatiom-in-inout-area">{msg}</div>;
  };

  return (
    <>
      <ProfileNavBarResponsive>
        <div
          style={{ display: "flex", alignItems: "center", gap: "8px" }}
          onClick={props.onClose}
        >
          <img
            style={{ height: "1.5rem" }}
            src={
              "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8jHyD8/PwdGBpMSUoAAAAgHB0JAAAeGhsYExQWEBLCwcHz8/OenZ17enoQCQsLAATs7Ozl5eWtq6w5NjdcWlqnpqbb2tvT0tJSUFCLiorIx8dpZ2hVU1OamZlwbm9FQkMrJyk1MjJ4dnc+OzwoJSaOjY32EwFQAAADNklEQVR4nO3d21riMBQFYNKSHrDQFlFkZBCK+v6POBQvRmlyt8uua6//CXY+dCVpTrMZEREREREREREREREREREREREREdEvkbStdgljag8n732+f9AuZCyHvMmcc1npd1vtWkax9337rsryVbuaEay8+6/wa+16xC2/N9C59KhdkLSHnw10zoPFzbrOblpY7rVrElV9FDcNdNmm0q5KUPJ3cdtAlxVIWbPKBw289IpALVzepsy1hR84w7dBjH51F3PtusRsBzF6VR+0C5PSbtJQAzMP80e6G8Zoz8P8hG9NsIE1TH8fjNHLgOaI0t2HYxSoL4zEqPMv2pUJqU7BGHX+UbsyKbEY/aNdmJRVJEaftAuTEovR90S7MiGxGE1RYnSdB2M08ygf2eBjNMGP0cCk3kSMbsBjtHAoMbpdhGM0R4nRtgOP0ehodKVdmJQ3qzGKM6mPDNYamBgNNxBoUu8GS0xgMRpYYurlOKPR8KR+gR6jaQc+GsWZ1Ee+jeKMRqvYaPRZuzIh+JP6c3g0Ch+jJcyOkliMZjAxWkZGo4zR32KOPqk/G11iSt/RYxRmD/Dao8focN/o1eJ5ltzVWA0M7Rv9spvf1W7/Oc6XoEiMXhTpfZW1fxrhP/8QThklpfze+NdJNXCEFfQkvK1SUeZk++Cp/YQXteh8uzqFOwpN2UnyR3yZ3k8ovHrwGP5uoSuXXD5YRvtCRc1SsIX4vyH+/2HVhWcVmmSzdHautRs00Mh+f066qXWI0mOayQ1qRtjZCT+3MDA/nNQcf6Q7DOC/0xj41mbge6mBb94G1i0MrD0ZWD/EXwM2sI5vYC+Ggf00BvZEmQhU9L2JBvaXGtgjbGCft4G9+gbOW+CfmTFw7snA2TUD5w8NnCE1cA4Y/yy3gfP4Bu5UMHAvhokpP/r9NAbuGLI85ce568vAfW0G7tyzEKjwd18auL/UxpQf/R5hA3dBx+7zdjj3eePfyW7gXn0DbyMYeN/CwBsloUWprMPp9HvwbwUZeO9pEKjlUbsgefDvrhl4O68/stgUDvn9w/4Ny857X+O+YXnVYnWDRERERERERERERERERERERERERESzf26lPPFI7CkpAAAAAElFTkSuQmCC"
            }
            alt="ShopisthanLogo"
          />
        </div>
        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Profile</h2>
        <div></div>
      </ProfileNavBarResponsive>
      <div className="user-in-new-profile-form">
        {" "}
        <div className="store-view-inputs-profile-flex">
          <div className="stoe-form-jksdba-iojdea">
            <div className="profile-user-njrln">
              <input
                className="checkout-page-input-in-sdks"
                placeholder={"Name"}
                value={name}
                onChange={(e) => setName(e.target.value.replace(/\s\s+/g, " "))}
                max={30}
              ></input>
              {showValidation && name.length < 5
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invaild Name
                    </div>
                  )
                : null}
            </div>
          </div>

          <div className="stoe-form-jksdba-iojdea">
            <div className="profile-user-njrln">
              <input
                className="checkout-page-input-in-sdks"
                placeholder={"Mobile Number"}
                readOnly={true}
                value={
                  userDetails && userDetails.phoneNo ? userDetails.phoneNo : ""
                }
              ></input>
            </div>
          </div>
        </div>
        <h2 className="active-component-name-at-top">Shipping Details</h2>
        <div className="store-view-inputs-profile-flex">
          <div className="stoe-form-jksdba-iojdea">
            <div className="profile-user-njrln">
              <input
                className="checkout-page-input-in-sdks"
                placeholder={"Name"}
                value={addressName}
                onChange={(e) =>
                  setAddressName(e.target.value.replace(/\s\s+/g, " "))
                }
                max={50}
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
            <div className="profile-user-njrln">
              <input
                className="checkout-page-input-in-sdks"
                placeholder={"Mobile Number"}
                value={addressMobileNumber}
                onChange={(e) =>
                  setAddressMobileNumber(
                    e.target.value.replace(/[^0-9]/g, "").replace(/\s\s+/g, " ")
                  )
                }
                type="number"
                max={10}
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
        </div>
        <div className="stoe-form-jksdba-iojdea">
          <div className="profile-user-njrln">
            <input
              className="checkout-page-input-in-sdks"
              placeholder={"Address"}
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
            <label className="label-for-store-settings-label-only">State</label>
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
        {/* <div className="stoe-form-jksdba-iojdea">
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Address"}
                ></input>
              </div>
            </div> */}
      </div>
      {/* ------- */}
      <div className="cjkajln-djalow">
        <div
          disabled={added ? true : false}
          onClick={save}
          className="btn-for-update-profile-only"
        >
          {" "}
          <h2> {added ? "Updating" : "Update"}</h2>{" "}
        </div>
      </div>
    </>
  );
};

export default UserProfileSettings;

{
  /* <div>

<div
    style={{ paddingTop: "6em" }}
    className="adressForm-in-new-checkout-form"
>
    <div className="stoe-form-jksdba-iojdea">
        <div className="icdsbnlcses-feef">
            <input
                className="checkout-page-input-in-sdks"
                placeholder={"Name"}
                value={name}
                onChange={(e) => setName(e.target.value.replace(/\s\s+/g, " "))}
                max={30}
            ></input>
            {showValidation && name.length < 5
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                        Invaild Name
                    </div>
                )
                : null}
        </div>
    </div>
    <div className="stoe-form-jksdba-iojdea">
        <div className="icdsbnlcses-feef">
            <input
                className="checkout-page-input-in-sdks"
                placeholder={"Mobile Number"}
                readOnly={true}
                value={userDetails && userDetails.phoneNo ? userDetails.phoneNo : ""}
            ></input>
        </div>
    </div>
    <div>
        Shipping Details
    </div>
    <div className="stoe-form-jksdba-iojdea">
        <div className="icdsbnlcses-feef">
            <input
                className="checkout-page-input-in-sdks"
                placeholder={"Name"}
                value={addressName}
                onChange={(e) => setAddressName(e.target.value.replace(/\s\s+/g, " "))}
                max={50}
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
        <div className="icdsbnlcses-feef">
            <input
                className="checkout-page-input-in-sdks"
                placeholder={"Mobile Number"}
                value={addressMobileNumber}
                onChange={(e) => setAddressMobileNumber(e.target.value.replace(/[^0-9]/g, "").replace(/\s\s+/g, " "))}
                type="number"
                max={10}
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
                className="checkout-page-input-in-sdks"
                placeholder={"Address"}
                value={addressAddress}
                onChange={(e) => setAddressAddress(e.target.value.replace(/\s\s+/g, " "))}
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
</div>

<div className="checkout-btn-outside-div-padding">
    <button className="btn-for-checout-of-shop-profile-only"
        disabled={added ? true : false}
        onClick={save}
    >
        {" "}
        {added ? "Updating" : "Update"}
        {" "}
    </button>
</div>
</div> */
}
