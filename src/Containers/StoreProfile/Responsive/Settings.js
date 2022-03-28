import React, { useEffect, useState } from "react";
import "./style.css";
import ProfileNavBarResponsive from "../../../Components/Navbar/Responsive";
import { useDispatch, useSelector } from "react-redux";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";
import { editStoreAction } from "../../../actions/store.action";
import Addlogo from "../../../img/Icon awesome-file-upload.png";
import { EditProfileModal } from "../../../Components/Modal";
import { useHistory } from "react-router-dom";

const SettingInput = (props) => {
  const storeDetails = useSelector((state) => state.userStore.userStore);
  const [validation, setValidation] = useState(false);
  const [state, setState] = useState({
    storeName:
      storeDetails && storeDetails.storeName ? storeDetails.storeName : "",
    storePhoneNumber:
      storeDetails && storeDetails.storePhoneNumber
        ? storeDetails.storePhoneNumber
        : "",
    storeAddress:
      storeDetails && storeDetails.storeAddress
        ? storeDetails.storeAddress
        : "",
    storePinCode:
      storeDetails && storeDetails.storePinCode
        ? storeDetails.storePinCode
        : "",
    storeSince:
      storeDetails && storeDetails.storeSince ? storeDetails.storeSince : "",
    storeDescription:
      storeDetails && storeDetails.storeDescription
        ? storeDetails.storeDescription
        : "",
    storeEmail:
      storeDetails && storeDetails.storeEmail ? storeDetails.storeEmail : "",
  });
  const [storeState, setStoreState] = useState(
    storeDetails && storeDetails.storeState ? storeDetails.storeState : ""
  );
  const [storeCity, setStoreCity] = useState(
    storeDetails && storeDetails.storeCity ? storeDetails.storeCity : ""
  );
  const [storeInstagramUrl, setStoreInstagramUrl] = useState(
    storeDetails && storeDetails.storeInstagramUrl
      ? storeDetails.storeInstagramUrl
      : ""
  );
  const [storeFacebookUrl, setStoreFacebookUrl] = useState(
    storeDetails && storeDetails.storeFacebookUrl
      ? storeDetails.storeFacebookUrl
      : ""
  );
  const [editProfilePicModal, setEditProfilePicModal] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();
  const store = useSelector((state) => state.userStore);
  const [storeEdited, setStoreEdited] = useState(false);

  useEffect(() => {
    if (storeEdited && store.loading && store.message) {
      if (
        props &&
        props.props &&
        props.props.location &&
        props.props.location.state &&
        props.props.location.state.storeProgress
      ) {
        history.push({
          pathname: "/storeDashboard",
        });
      } else {
        setTimeout(function () {
          setStoreEdited(false);
        }, 2000);
      }
    }
  });

  const handleChange = (evt) => {
    if (evt.target.name === "storePhoneNumber") {
      const value = evt.target.value.replace(/\D/g, "");
      setState({
        ...state,
        [evt.target.name]: value,
      });
    } else if (evt.target.name === "storeSince") {
      const value = evt.target.value.replace(/\D/g, "");
      setState({
        ...state,
        [evt.target.name]: value,
      });
    } else {
      const value = evt.target.value.replace(/\s\s+/g, " ");
      setState({
        ...state,
        [evt.target.name]: value,
      });
    }
  };

  const saveStoreDetails = (e) => {
    e.preventDefault();

    if (state.storeName.length < 5 || state.storeAddress.length < 5) {
      return setValidation(true);
    } else {
      const form = {
        storeName: state.storeName,
        storeAddress: state.storeAddress,
        storeDescription: state.storeDescription,
        storeState: storeState,
        storeCity: storeCity,
        storeSince: state.storeSince,
        storeEmail: state.storeEmail,
        storeFacebookUrl,
        storeInstagramUrl,
      };

      setStoreEdited(true);
      dispatch(editStoreAction(form));
    }
  };

  return (
    <>
      <div className="full-responsive-new-store-profile-page">
        <ProfileNavBarResponsive>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            <img
              onClick={props.onClose}
              // onClick={() => {
              //   console.log("sdfsd");
              // }}
              style={{ height: "1.5rem" }}
              src={
                "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAdVBMVEX///8jHyD8/PwdGBpMSUoAAAAgHB0JAAAeGhsYExQWEBLCwcHz8/OenZ17enoQCQsLAATs7Ozl5eWtq6w5NjdcWlqnpqbb2tvT0tJSUFCLiorIx8dpZ2hVU1OamZlwbm9FQkMrJyk1MjJ4dnc+OzwoJSaOjY32EwFQAAADNklEQVR4nO3d21riMBQFYNKSHrDQFlFkZBCK+v6POBQvRmlyt8uua6//CXY+dCVpTrMZEREREREREREREREREREREREREdEvkbStdgljag8n732+f9AuZCyHvMmcc1npd1vtWkax9337rsryVbuaEay8+6/wa+16xC2/N9C59KhdkLSHnw10zoPFzbrOblpY7rVrElV9FDcNdNmm0q5KUPJ3cdtAlxVIWbPKBw289IpALVzepsy1hR84w7dBjH51F3PtusRsBzF6VR+0C5PSbtJQAzMP80e6G8Zoz8P8hG9NsIE1TH8fjNHLgOaI0t2HYxSoL4zEqPMv2pUJqU7BGHX+UbsyKbEY/aNdmJRVJEaftAuTEovR90S7MiGxGE1RYnSdB2M08ygf2eBjNMGP0cCk3kSMbsBjtHAoMbpdhGM0R4nRtgOP0ehodKVdmJQ3qzGKM6mPDNYamBgNNxBoUu8GS0xgMRpYYurlOKPR8KR+gR6jaQc+GsWZ1Ee+jeKMRqvYaPRZuzIh+JP6c3g0Ch+jJcyOkliMZjAxWkZGo4zR32KOPqk/G11iSt/RYxRmD/Dao8focN/o1eJ5ltzVWA0M7Rv9spvf1W7/Oc6XoEiMXhTpfZW1fxrhP/8QThklpfze+NdJNXCEFfQkvK1SUeZk++Cp/YQXteh8uzqFOwpN2UnyR3yZ3k8ovHrwGP5uoSuXXD5YRvtCRc1SsIX4vyH+/2HVhWcVmmSzdHautRs00Mh+f066qXWI0mOayQ1qRtjZCT+3MDA/nNQcf6Q7DOC/0xj41mbge6mBb94G1i0MrD0ZWD/EXwM2sI5vYC+Ggf00BvZEmQhU9L2JBvaXGtgjbGCft4G9+gbOW+CfmTFw7snA2TUD5w8NnCE1cA4Y/yy3gfP4Bu5UMHAvhokpP/r9NAbuGLI85ce568vAfW0G7tyzEKjwd18auL/UxpQf/R5hA3dBx+7zdjj3eePfyW7gXn0DbyMYeN/CwBsloUWprMPp9HvwbwUZeO9pEKjlUbsgefDvrhl4O68/stgUDvn9w/4Ny857X+O+YXnVYnWDRERERERERERERERERERERERERESzf26lPPFI7CkpAAAAAElFTkSuQmCC"
              }
              alt="ShopisthanLogo"
            />
            <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>
              Primary Settings
            </h2>
          </div>
        </ProfileNavBarResponsive>
        <div className="scroll-in-all-setings-jccof-ncj-dnsssok">
          <div className="background-white-in-store-profile-settings-page">
            <p className="header-of-particular-compomen">Store Logo</p>
            <div className="display-axbc-flex-jci-for-logo-add-option">
              <div className="cvuyiwuejomkld">
                <div className="display-in-center-logo-add-image">
                  <img
                    src={Addlogo}
                    style={{ paddingTop: "1em " }}
                    alt={"Add-Logo"}
                  />
                </div>

                <button
                  className="Upload-Logo-option-in-store-profile-cnb"
                  onClick={() => setEditProfilePicModal(true)}
                >
                  Upload Logo{" "}
                </button>
              </div>
            </div>
          </div>
          <div className="background-white-in-store-profile-settings-page">
            <p className="header-of-particular-compomen">Store details</p>
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                name="storeName"
                label={"Store Name"}
                placeholder={"Enter Store Name"}
                maxLength={50}
                value={state.storeName}
                onChange={handleChange}
              />
              {validation && state.storeName.length < 5 ? (
                <div className="error-mafg-in-validdatiom-in-inout-area">
                  Invaild Store Name
                </div>
              ) : null}
            </div>{" "} */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Name *
              </label>
              <div className="profile-user-njrln">
                <input
                  name="storeName"
                  className="checkout-page-input-in-sdks"
                  placeholder={"Enter Store Name"}
                  maxLength={50}
                  value={state.storeName}
                  onChange={handleChange}
                ></input>
                {validation && state.storeName.length < 5 ? (
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invaild Store Name
                  </div>
                ) : null}
              </div>
            </div>
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                name="storeEmail"
                label={"Store Email Address"}
                placeholder={"Email Address"}
                maxLength={100}
                value={state.storeEmail}
                onChange={handleChange}
              />
            </div> */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Email Address
              </label>
              <div className="profile-user-njrln">
                <input
                  name="storeEmail"
                  className="checkout-page-input-in-sdks"
                  placeholder={"Email Address"}
                  maxLength={100}
                  value={state.storeEmail}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                name="storePhoneNumber"
                label={"Phone Number"}
                value={state.storePhoneNumber}
                readOnly={true}
              />
            </div> */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Phone Number
              </label>
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Phone Number"}
                  maxLength={100}
                  value={state.storePhoneNumber}
                  readOnly={true}
                ></input>
              </div>
            </div>
          </div>{" "}
          <div className="background-white-in-store-profile-settings-page">
            <p className="header-of-particular-compomen">Store address</p>{" "}
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                name="storeAddress"
                label={"Store Address"}
                value={state.storeAddress}
                onChange={handleChange}
                placeholder={"Store Address"}
              />
            </div> */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Address *
              </label>
              <div className="profile-user-njrln">
                <input
                  name="storeAddress"
                  className="checkout-page-input-in-sdks"
                  placeholder={"Store Address"}
                  value={state.storeAddress}
                  onChange={handleChange}
                ></input>
                {validation && state.storeAddress.length < 5 ? (
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invaild Store Address
                  </div>
                ) : null}
              </div>
            </div>
            <div className="bottom-padding-in-storeprofe-deit">
              <label className="label-for-store-settings-label-only">
                State
              </label>
              <CountryDropdown
                value={storeState}
                onChange={(e) => setStoreState(e)}
                id="CountryDropdown-for-store-profile-settings-only"
              />
            </div>
            <div className="bottom-padding-in-storeprofe-deit">
              <label className="label-for-store-settings-label-only">
                City
              </label>
              <RegionDropdown
                country={storeState}
                defaultOptionLabel="Select City"
                value={storeCity}
                onChange={(e) => setStoreCity(e)}
                id="CountryDropdown-for-store-profile-settings-only"
              />
            </div>
          </div>
          <div className="background-white-in-store-profile-settings-page">
            <p className="header-of-particular-compomen">Store Profile</p>{" "}
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                label={"Store Since"}
                name="storeSince"
                value={state.storeSince}
                onChange={handleChange}
                type={"number"}
                placeholder={"Store Since"}
              />
            </div> */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Since
              </label>
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Store Since"}
                  maxLength={100}
                  name="storeSince"
                  value={state.storeSince}
                  onChange={handleChange}
                  // type={"number"}
                ></input>
              </div>
            </div>
            {/* <div className="bottom-padding-in-storeprofe-deit">
              <InputComponents
                name="storeDescription"
                label={"Store Description"}
                value={state.storeDescription}
                onChange={handleChange}
                placeholder={"Store Description"}
              />
            </div> */}
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Bio.
              </label>
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Store Bio."}
                  name="storeDescription"
                  value={state.storeDescription}
                  onChange={handleChange}
                ></input>
              </div>
            </div>
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Instagram URL.
              </label>
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Paste Instagram Share Link here"}
                  name="storeSince"
                  value={storeInstagramUrl}
                  onChange={(e) => setStoreInstagramUrl(e.target.value)}
                ></input>
              </div>
            </div>
            <div className="stoe-form-jksdba-iojdea">
              <label className="label-for-store-settings-label-only">
                Store Facebook URL.
              </label>
              <div className="profile-user-njrln">
                <input
                  className="checkout-page-input-in-sdks"
                  placeholder={"Paste Facebook Share Link here"}
                  name="storeSince"
                  value={storeFacebookUrl}
                  onChange={(e) => setStoreFacebookUrl(e.target.value)}
                ></input>
              </div>
            </div>
          </div>
          {/* </div> */}
          <div className="save-store-settings-btn-in-stryeui">
            {storeEdited && store.loading && store.message ? (
              <button className="confirmorderand-popconfirmgreen">Saved</button>
            ) : (
              <button
                className="confirmorderand-popconfirmgreen"
                onClick={saveStoreDetails}
              >
                Save
              </button>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
      <EditProfileModal
        visible={editProfilePicModal}
        onClose={() => setEditProfilePicModal(false)}
        Close={() => setEditProfilePicModal(false)}
        storeDetails={storeDetails}
      />
    </>
  );
};

export default SettingInput;

// .store-profile-instore-dashboard-l {
//   padding-left: 10em;
//   display: flex;
//   margin-top: -4em;
//   justify-content: left;
// }
