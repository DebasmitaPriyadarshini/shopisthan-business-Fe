import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addCatalogAction,
  storeProfileAction,
  verfiyStoreOtpAction,
  storeOtpAction,
} from "../../actions/store.action";
import { RetailBusiness } from "../../Data";
import { FacebookShareButton } from "react-share";
import { FacebookIcon } from "react-share";
import { REACT_APP_SHAREAPI } from "../../config/keys";
import "./style.css";
import { Whatsapp } from "react-social-sharing";
import { REACT_APP_API, REACT_APP_DATA_KEY } from "../../config/keys";
import axios from "axios";
import { userStoreDataAction } from "../../actions/initialData.action";
import { InputComponents } from "../Inputs/index";
import PlanCard from "../../img/PlanCard.jpg";
import Storeplanimages from "../../img/PlanRenew-icon.jpeg";
import { Link } from "react-router-dom";
import ProfileNavBarResponsive from "../Navbar/Responsive";
import { PriceWithComma } from "../../Functions";
import { addToCart } from "../../actions/user.action";
import { ImportImage } from "../ImportedImages";
import {
  getUserSigninOtpAction,
  userOtpVerfifyAction,
} from "../../actions/user.action";

var CryptoJS = require("crypto-js");

const Modal = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalContainer">
            {" "}
            <div className="modalClose" onClick={props.onClose}>
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="25px"
                height="24px"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="grey"
                  stroke="none"
                >
                  <path
                    d="M2310 5114 c-284 -34 -517 -93 -748 -190 -767 -321 -1344 -1020
                        -1511 -1829 -70 -342 -70 -728 0 -1070 198 -959 956 -1736 1914 -1960 221 -52
                        303 -60 595 -60 292 0 374 8 595 60 958 224 1716 1001 1914 1960 70 342 70
                        728 0 1070 -196 951 -947 1726 -1894 1956 -203 49 -311 61 -575 64 -140 2
                        -271 1 -290 -1z m-572 -1460 c25 -10 165 -143 429 -407 l393 -391 393 391
                        c264 264 404 397 429 407 129 54 275 -32 286 -168 8 -103 14 -97 -416 -529
                        l-396 -397 391 -393 c264 -264 397 -404 407 -429 54 -129 -32 -275 -168 -286
                        -104 -8 -96 -14 -528 416 l-398 396 -397 -396 c-432 -430 -426 -424 -529 -416
                        -136 11 -222 157 -168 286 10 25 143 165 407 429 l391 393 -396 397 c-430 432
                        -424 426 -416 529 11 136 157 222 286 168z"
                  />
                </g>
              </svg>
            </div>
            {props.children}
          </div>
        </div>
      </div>
    </>
  );
};

const MessageModal = (props) => {
  const { visible, onClose } = props;
  return (
    <Modal visible={visible} onClose={onClose} size="lg">
      <div>
        <div className="frist-div-input-validation-pop-up">
          <div className="content">
            <h2 className="prob">{props.title}</h2>
            <p className="paragraph-for-the-errormseg"> {props.message}</p>
            <button className="got-it-and-close-btn" onClick={onClose}>
              Got it
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

const OtpModal = (props) => {
  const store = useSelector((state) => state.userStore);
  const [otp, setOtp] = useState("");
  const [storeName, setStoreName] = useState("");
  const auth = useSelector((state) => state.auth);
  const planList = useSelector((state) => state.storePlans.storePlans);
  const storeCategoryList = RetailBusiness;
  const [storeCategory, setStoreCategory] = useState(
    storeCategoryList && storeCategoryList.length > 0
      ? storeCategoryList[0]
      : ""
  );
  const [showValidation, setShowValidation] = useState(false);
  const planDetails =
    planList && planList.length > 0
      ? planList.filter((plan) => plan.planName === "Retail Business")
      : null;
  const [submitData, setSumbitData] = useState(false);
  const dispatch = useDispatch("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState(
    store.error
  );
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [showTimer, setShowTimer] = useState(false);
  const [resendOtpSumbit, setResendOTPSumbit] = useState(false);

  useEffect(() => {
    if (props.visible) {
      setShowTimer(true);
    }
    if (showTimer) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  }, [props.visible, showTimer, seconds, minutes]);

  useEffect(() => {
    if (resendOtpSumbit && !auth.loading && auth.sentOtp && !auth.errorTF) {
      setMinutes(2);
      setResendOTPSumbit(false);
    }
    if (resendOtpSumbit && !auth.loading && !auth.sentOtp && auth.errorTF) {
      setResendOTPSumbit(false);
    }
  }, [resendOtpSumbit, auth.loading, auth.sentOtp, auth.errorTF]);

  useEffect(() => {
    if (storeCategory === "") {
      setStoreCategory(
        storeCategoryList && storeCategoryList.length > 0
          ? storeCategoryList[0]
          : ""
      );
    }
  }, [storeCategory, storeCategoryList]);

  useEffect(() => {
    if (submitData && store.error !== "" && !store.loading) {
      setShowErrorModalMessage(store.error);
      setShowErrorModal(true);
      setSumbitData(false);
    }

    if (
      submitData &&
      store.error === "" &&
      !store.loading &&
      auth.authenticate &&
      store &&
      store.userStore
    ) {
      setSumbitData(false);
      props.StoreCreated();
    }
  }, [submitData, store, auth.authenticate, props]);

  const showErrorContent = (msg) => {
    return <div className="error-mafg-in-validdatiom-in-inout-area">{msg}</div>;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    return setOtp(value);
  };

  if (!props.visible) {
    return null;
  }

  const submit = (e) => {
    e.preventDefault();

    if (!planDetails) {
      console.log("No Plan Details");
      return null;
    }

    if (otp === "" || storeName === "" || storeCategory === "") {
      return setShowValidation(true);
    }
    if (otp.length < 6) {
      return setShowValidation(true);
    }
    if (storeName.length < 3) {
      return setShowValidation(true);
    }

    if (!props.loginId) {
      return null;
    }

    const data = {
      loginId: props.loginId,
      storeName,
      storeType: planDetails[0].planName,
      storeCategory,
      storePhoneNumber: props.loginId,
      storePlan: planDetails[0]._id,
      otp,
    };
    setSumbitData(true);
    dispatch(verfiyStoreOtpAction(data));
  };

  const resendOtp = (e) => {
    e.preventDefault();

    if (!props.loginId) {
      return null;
    }

    const data = {
      loginId: props.loginId,
    };
    setResendOTPSumbit(true);
    dispatch(storeOtpAction(data));
  };

  return (
    <div className="modal-fjurfkn-frsf">
      <p
        className="gfrofbasj-ewhbhdebddsd"
        onClick={() => {
          // setSeconds(0);
          // setMinutes(0);
          setSumbitData(false);
          setStoreName("");
          setStoreCategory("");
          setOtp("");
          props.onClose();
        }}
      >
        X
      </p>
      <div className="Stroe-creation-frj-lk-jgh">
        <div className="frf-flrg-uyet-bgcdcd">
          <div className="close-for-store-free-creation">
            <h2 className="bdded-dneidnf-eed">
              {" "}
              Start your FREE trial with Shopisthan for 30 days
            </h2>
            <span className="xxswsws-mnv-frplfr">
              <div
                onClick={() => {
                  // setSeconds(0);
                  // setMinutes(0);
                  setSumbitData(false);
                  setStoreName("");
                  setStoreCategory("");
                  setOtp("");
                  props.onClose();
                }}
              >
                <b>x</b>
              </div>
            </span>
          </div>
          <div className="content-for-img-store">
            <div className="ompnlit-dhg-ijre">
              <label className="small-label-in-every-form">Enter OTP</label>
              <input
                className="dkdedmoeklkcscdsef"
                placeholder="Enter OTP"
                value={otp}
                onChange={handleChange}
                maxLength={6}
              ></input>
              {showValidation && otp.length < 6
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invalid OTP Please check
                    </div>
                  )
                : null}
              {minutes === 0 && seconds === 0 ? (
                <div
                  className="resendotpbtninotpsection"
                  style={{ cursor: "pointer" }}
                  onClick={resendOtp}
                >
                  Resend OTP
                </div>
              ) : (
                <h1>
                  {" "}
                  {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                </h1>
              )}
            </div>
            <div className="ompnlit-dhg-ijre">
              {" "}
              <label className="small-label-in-every-form">
                Enter Store Name
              </label>
              <input
                className="dkdedmoeklkcscdsef"
                placeholder="Enter Your Store Name"
                value={storeName}
                onChange={(e) =>
                  setStoreName(e.target.value.replace(/\s\s+/g, " "))
                }
                maxLength={50}
              ></input>
            </div>
            {showValidation && storeName.length < 5
              ? showErrorContent(
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invaild Store Name
                  </div>
                )
              : null}
            <div className="ompnlit-dhg-ijre">
              {" "}
              {/* <InputComponents
                label={"Select Store Category"}
                onChange={(e) => setStoreCategory(e.target.value)}
                value={storeCategory}
                options={storeCategoryList}
                storeType={true}
                type={"select"}
              /> */}
              <label className="small-label-in-every-form">
                Select Store Category
              </label>
              <select
                id="for-store-profilr-category-secleection-only"
                onChange={(e) => setStoreCategory(e.target.value)}
                value={storeCategory}
                type={"select"}
                style={{
                  height: "3.2em",
                }}
              >
                {storeCategoryList && storeCategoryList.length > 0
                  ? storeCategoryList.map((categoty, index) => (
                      <option key={index} value={categoty}>
                        {categoty}
                      </option>
                    ))
                  : null}
              </select>
              {showValidation && storeCategory === ""
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Select Store Category
                    </div>
                  )
                : null}
            </div>
            {submitData ? (
              <button
                style={{ width: "100%", marginTop: "10px" }}
                className="btn-for-start-free-trial-now-fr"
              >
                Please wait.....
              </button>
            ) : minutes === 0 && seconds === 0 ? (
              <button
                style={{
                  width: "100%",
                  marginTop: "10px",
                  background: "#004c3f",
                }}
                className="btn-for-start-free-trial-now-fr"
              >
                Create Free Store
              </button>
            ) : (
              <button
                style={{ width: "100%", marginTop: "10px" }}
                className="btn-for-start-free-trial-now-fr"
                onClick={submit}
              >
                Create Free Store
              </button>
            )}
          </div>
        </div>
      </div>
      <MessageModal
        visible={showErrorModal}
        onClose={() => {
          setShowErrorModalMessage("");
          setShowErrorModal(false);
        }}
        title={"Message"}
        message={showErrorModalMessage}
      />
    </div>
  );
};

const ShareModal = (props) => {
  const { show, handleclose, shareLink, shareTitle } = props;
  const [share, setShare] = useState(false);
  if (!shareLink) {
    return null;
  }
  return (
    <Modal visible={show} onClose={handleclose} size="lg">
      <div className="new-share-modal-for-sharing">
        <h3 style={{ padding: "10px 10px", fontSize: "1.3rem" }}>
          Social Share
        </h3>
        <div style={{ display: "flex" }}>
          <div className="for-only-share-btn-div">
            {" "}
            <FacebookShareButton
              title={"Shopisthan"}
              quote={`${shareTitle} ${REACT_APP_SHAREAPI}/${shareLink}`}
              hashtag="#myShopAtShopisthan"
              url="https://www.shopisthan.com/"
            >
              <FacebookIcon
                logofillcolor="green"
                round={true}
                size={35}
              ></FacebookIcon>
            </FacebookShareButton>
          </div>
          <div className="for-only-share-btn-div">
            {" "}
            <Whatsapp
              solid
              small
              message={shareTitle}
              link={`${REACT_APP_SHAREAPI}/${shareLink}`}
            ></Whatsapp>
          </div>
        </div>
      </div>
      <div className="for-only-share-btn-div-copy-lin-div">
        <h3 style={{ padding: "10px 0px" }}>Copy This Link</h3>
        <div className="ndne-ld-psle-jne">
          <p className="share-api-link-call-paragraph">{`${REACT_APP_SHAREAPI}/${shareLink}`}</p>

          <div
            className="new-share-link-copy-btn"
            onClick={() =>
              navigator.clipboard.writeText(
                `${REACT_APP_SHAREAPI}/${shareLink}`
              ) && setShare(true)
            }
          >
            {share ? "Copied" : "Copy"}
          </div>
        </div>
      </div>
    </Modal>
  );
};

const CatalogModal = (props) => {
  const [catalog, setCatalog] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [showLoadingButton, setShowLoadingButton] = useState(false);
  const data = useSelector((state) => state.userStore);
  const [showErrorMsg, setShowErrorMsg] = useState(false);
  const [validation, setValidation] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      showLoadingButton &&
      !data.error &&
      data.loading &&
      data.message === "Saved"
    ) {
      setValidation("");
      setShowValidation(false);
      setCatalog("");
      setShowLoadingButton(false);
      setShowErrorMsg(false);
      props.Close("yes");
    }
    if (showLoadingButton && data.error && !data.loading && !data.message) {
      setValidation("");
      setShowValidation(false);
      setShowLoadingButton(false);
      setShowErrorMsg(true);
    }
  }, [showLoadingButton, data.error, data.loading, data.message, props]);

  if (!props.visible) {
    return null;
  }

  const addCatalog = (e) => {
    e.preventDefault();
    if (catalog === "") {
      setValidation("");
      return setShowValidation(true);
    }
    if (
      catalog.toLocaleLowerCase().split(" ").join("") === "all" ||
      catalog.toLocaleLowerCase().trim() === "all"
    ) {
      validation("Catalog");
      return setShowValidation(true);
    }

    setShowLoadingButton(true);
    dispatch(addCatalogAction({ name: catalog }));
  };

  return (
    <div className="modal-for-error-type-msg">
      <div className="popup-box-for-adding-catelog">
        <div className="box-for-adding-catelof-box-peifbg">
          <div className="close-for-caetologs">
            <label className="box-for-adding-catelo-label-fhef">
              New Catalog Name
            </label>
            <span className="close-icon">
              <div
                onClick={() => {
                  setValidation("");
                  setShowValidation(false);
                  setCatalog("");
                  setShowLoadingButton(false);
                  setShowErrorMsg(false);
                  props.onClose();
                }}
              >
                <b>x</b>
              </div>
            </span>
          </div>
          <div className="content-for-img-store">
            <div className="new-adding-ac-catelogs-and-input">
              <InputComponents
                placeholder="Example - Laptop, T-shirts...."
                value={catalog}
                onChange={(e) =>
                  setCatalog(e.target.value.replace(/\s\s+/g, " "))
                }
                maxLength={30}
              />
            </div>
            {showValidation && catalog === "" ? "InVaild Catalog Name" : null}
            {(showValidation &&
              validation === "Catalog" &&
              catalog.toLocaleLowerCase().split(" ").join("") === "all") ||
            catalog.toLocaleLowerCase().trim() === "all"
              ? "You can't take this catalog name"
              : null}
            <div style={{ marginTop: "1rem" }}>
              {showLoadingButton ? (
                <button
                  className="save-product-btn-at-eit-product"
                  style={{ width: "12em", fontSize: "16px" }}
                >
                  Saving...
                </button>
              ) : (
                <button
                  style={{ width: "12em", fontSize: "16px" }}
                  className="save-product-btn-at-eit-product"
                  onClick={addCatalog}
                >
                  Save
                </button>
              )}
            </div>
            {showErrorMsg
              ? "something went wrong please try again later"
              : null}
          </div>
        </div>
      </div>
    </div>
  );
};

const EditProfileModal = (props) => {
  const { storeDetails } = props;
  const [storeProfile, setStoreProfile] = useState("");
  const [validation, setValidation] = useState(false);
  const [imageUri, setImageUri] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState("");
  const dispatch = useDispatch();

  if (!props.visible) {
    return null;
  }

  const handleProfileImage = (e) => {
    const fsize = e.target.files[0].size;

    if (fsize > 2e6) {
      setShowErrorMessage("File to long");
      return setShowErrorModal(true);
    } else {
      setImageUri(URL.createObjectURL(e.target.files[0]));
      return setStoreProfile(e.target.files[0]);
    }
  };

  const onClose = () => {
    setStoreProfile("");
    setImageUri("");
    setValidation(false);
    props.onClose();
  };

  const uploadStoreProfile = (e) => {
    e.preventDefault();
    if (storeProfile === "") {
      return setValidation(true);
    } else {
      const form = new FormData();
      form.append("storeProfilePicture", storeProfile);
      dispatch(storeProfileAction(form));
      props.Close("yes");
    }
  };

  const renderStorePicChangeLogo = () => {
    return (
      <>
        <div
          style={{
            border: "1px solid #e6e6e6",
            marginLeft: "80px",
            padding: "5px 8px",
            marginTop: "-30px",
            background: "#fff",
            borderRadius: "50%",
          }}
        >
          <svg
            className="new-w-edit-btn-at-store-profile-ch"
            version="1.0"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512.000000 512.000000"
            preserveAspectRatio="xMidYMid meet"
          >
            <g
              transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
              stroke="none"
            >
              <path
                d="M1643 4635 c-187 -51 -314 -174 -367 -354 -11 -38 -16 -95 -16 -187
l0 -133 -402 -3 -403 -3 -74 -27 c-136 -50 -253 -149 -316 -269 -69 -131 -65
-48 -65 -1449 0 -1405 -5 -1305 67 -1442 64 -124 190 -228 328 -271 l70 -22
2095 0 2095 0 70 22 c138 43 264 147 328 271 72 137 67 37 67 1442 0 1402 4
1318 -66 1450 -63 120 -178 218 -315 268 l-74 27 -402 3 -403 3 0 133 c0 146
-12 203 -61 296 -53 101 -156 187 -274 232 l-60 23 -885 2 c-737 2 -894 0
-937 -12z m1087 -1190 c279 -42 507 -155 704 -349 377 -372 475 -953 241
-1428 -173 -349 -487 -592 -875 -675 -118 -25 -362 -25 -480 0 -391 84 -706
329 -881 687 -136 279 -158 626 -58 924 190 569 769 930 1349 841z"
              />
              <path
                d="M2480 3039 c-195 -17 -368 -100 -509 -242 -78 -80 -113 -129 -161
-232 -61 -128 -74 -190 -74 -350 0 -167 13 -225 84 -370 125 -255 365 -423
647 -454 413 -45 788 214 899 619 25 91 25 319 0 410 -85 307 -327 541 -627
603 -93 20 -164 24 -259 16z"
              />
            </g>
          </svg>
        </div>
      </>
    );
  };

  return (
    <>
      {/* <div className="modal-for-edit-profile-msg">
        <div className="popup-for-profile-edit-img">
          <div className="box-for-edit-profile-img">
            <div className="close">
              <span className="close-icon">
                <div onClick={onClose}>
                  <b>x</b>
                </div>
              </span>
            </div>
            <div className="edit-profile-change-pop-up-view">
              {storeProfile === "" ? (
                storeDetails &&
                storeDetails.userStore &&
                storeDetails.userStore.storeProfilePicture &&
                storeDetails.userStore.storeProfilePicture.img ? (
                  <>
                    <img
                      className="store-profile-image-in-settings"
                      src={storeDetails.userStore.storeProfilePicture.img}
                      alt={"store pic"}
                    />
                    <label for="file">{renderStorePicChangeLogo()}</label>
                  </>
                ) : storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.storeName ? (
                  <>
                    <div
                      className="store-profile-fisrt-letter-os-store-name"
                      style={{ background: "black", color: "white" }}
                    >
                      <h2>{storeDetails.userStore.storeName.charAt(0)}</h2>
                    </div>
                    <label for="file">{renderStorePicChangeLogo()}</label>
                  </>
                ) : (
                  <div className="store-profile-fisrt-letter-os-store-name">
                    <h2>S</h2>
                  </div>
                )
              ) : (
                <>
                  <img
                    className="store-profile-image-in-settings"
                    src={imageUri}
                    alt={"store pic"}
                  />
                  <label for="file">{renderStorePicChangeLogo()}</label>
                </>
              )}
              <label for="file">{renderStorePicChangeLogo()}</label>
              <input
                className="new-img-for-store-profile-upload-choose"
                type="file"
                name="Store Profile"
                onChange={handleProfileImage}
                accept="image/*"
                id="file"
                style={{ display: "none" }}
              />

              {validation && storeProfile === "" ? "Select pic first" : null}
              <button
                className="dnscneaewuocn"
                onClick={uploadStoreProfile}
                style={{ marginTop: "10px" }}
              >
                Upload Profile
              </button>
              {}
            </div>
          </div>
        </div>
        <MessageModal
          visible={showErrorModal}
          onClose={() => setShowErrorModal(false)}
          message={showErrorMessage}
          title={"Oooppss!"}
        />
      </div> */}
      <div className="modal-fjurfkn-frsf">
        {" "}
        <div className="creoss-background-ajna">
          {" "}
          <p className="cross-btn-okjbv" onClick={onClose}>
            X
          </p>
        </div>
        <div className="checkout-loginpage-frj-lk-jgh">
          <div className="frf-flrg-uyet-bgcdcd">
            {" "}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                padding: "20px 0px",
              }}
            >
              {" "}
              <div className="edit-profile-change-pop-up-view">
                {storeProfile === "" ? (
                  storeDetails &&
                  storeDetails.userStore &&
                  storeDetails.userStore.storeProfilePicture &&
                  storeDetails.userStore.storeProfilePicture.img ? (
                    <>
                      <img
                        className="store-profile-image-in-settings"
                        src={storeDetails.userStore.storeProfilePicture.img}
                        alt={"store pic"}
                      />
                      <label for="file">{renderStorePicChangeLogo()}</label>
                    </>
                  ) : storeDetails &&
                    storeDetails.userStore &&
                    storeDetails.userStore.storeName ? (
                    <>
                      <div
                        className="store-profile-fisrt-letter-os-store-name"
                        style={{ background: "black", color: "white" }}
                      >
                        <h2>{storeDetails.userStore.storeName.charAt(0)}</h2>
                      </div>
                      <label for="file">{renderStorePicChangeLogo()}</label>
                    </>
                  ) : (
                    <div className="store-profile-fisrt-letter-os-store-name">
                      <h2>S</h2>
                    </div>
                  )
                ) : (
                  <>
                    <img
                      className="store-profile-image-in-settings"
                      src={imageUri}
                      alt={"store pic"}
                    />
                    <label for="file">{renderStorePicChangeLogo()}</label>
                  </>
                )}
                <label for="file">{renderStorePicChangeLogo()}</label>
                <input
                  className="new-img-for-store-profile-upload-choose"
                  type="file"
                  name="Store Profile"
                  onChange={handleProfileImage}
                  accept="image/*"
                  id="file"
                  style={{ display: "none" }}
                />

                {validation && storeProfile === "" ? "Select pic first" : null}
                <button
                  className="dnscneaewuocn"
                  onClick={uploadStoreProfile}
                  style={{ marginTop: "10px" }}
                >
                  Upload Profile
                </button>
                {}
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
      <MessageModal
        visible={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        message={showErrorMessage}
        title={"Oooppss!"}
      />
    </>
  );
};

const ReNewStorePlanModal = (props) => {
  const storePlanDetails = useSelector((state) => state.storePlans.storePlans);
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore.userStore);
  const [token, setToken] = useState(useSelector((state) => state.auth.token));
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [showErrorMessage, setShowErrorMessage] = useState("");
  const RetailBusinessPlan =
    storePlanDetails && storePlanDetails.length > 0
      ? storePlanDetails.filter((store) => store.planName === "Retail Business")
      : null;
  const OnlineStorePlan =
    storePlanDetails && storePlanDetails.length > 0
      ? storePlanDetails.filter((store) => store.planName === "Online Store")
      : null;
  const [selectedPlanDetails, setSelectedPlanDetails] = useState(
    RetailBusinessPlan && RetailBusinessPlan.length > 0
      ? RetailBusinessPlan[0]
      : ""
  );
  const [selectedPlanName, setSelectedPlanName] = useState(
    RetailBusinessPlan && RetailBusinessPlan.length > 0
      ? RetailBusinessPlan[0].planName
      : ""
  );

  useEffect(() => {
    if (!selectedPlanDetails) {
      setSelectedPlanDetails(
        RetailBusinessPlan && RetailBusinessPlan.length > 0
          ? RetailBusinessPlan[0]
          : ""
      );
    }
    if (!selectedPlanName) {
      setSelectedPlanName(
        RetailBusinessPlan && RetailBusinessPlan.length > 0
          ? RetailBusinessPlan[0].planName
          : ""
      );
    }
  }, [selectedPlanDetails, selectedPlanName, RetailBusinessPlan]);

  const dispatch = useDispatch();
  if (auth.authenticate && token === null) {
    setToken(localStorage.getItem("token"));
  }
  if (!props.visible) {
    return null;
  }

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  async function displayRazorpay(plan) {
    try {
      if (!plan) {
        console.log("Plan required");
        return null;
      }
      const res = await loadScript(
        "https://checkout.razorpay.com/v1/checkout.js"
      );

      if (!res) {
        setShowErrorMessage("Razorpay SDK failed to load. Are you online?");
        return setShowErrorModal(true);
      }

      const data = {
        toatalPrice: plan.planPrice * 12,
      };

      var tokenBytes = CryptoJS.AES.decrypt(token, "Shopisthan");
      var decryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));

      const BearerToken = `Bearer ${decryptedToken}`;
      var ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(BearerToken),
        "Shopisthan"
      ).toString();

      const config = {
        headers: { Authorization: ciphertext },
      };

      const result = await axios
        .post(`${REACT_APP_API}/re-new-store-plan-orderid`, data, config)
        .catch((error) => {
          const { message } = error.response.data;
          setShowErrorMessage(message);
          return setShowErrorModal(true);
        });

      const { amount, id: order_id, currency } = result.data;

      const options = {
        key: REACT_APP_DATA_KEY, // Enter the Key ID generated from the Dashboard
        amount: amount.toString(),
        currency: currency,
        name: "Shopisthan",
        description: "Buying Subscription",
        order_id: order_id,
        handler: async function (response) {
          const data = {
            orderCreationId: order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpayOrderId: response.razorpay_order_id,
            razorpaySignature: response.razorpay_signature,
            amount: amount.toString(),
            storeVerified: plan.planName === "Retail Business" ? true : false,
            storePlan: plan._id,
          };

          const result = await axios
            .post(`${REACT_APP_API}/success-re-new-store-payment`, data, config)
            .then((res) => {
              dispatch(userStoreDataAction());
              props.onClose();
            })
            .catch((error) => {
              const { message } = error.response.data;
              setShowErrorMessage(message);
              return setShowErrorModal(true);
            });

          if (!result) {
            console.log("Something went wrong");
          }
        },
        prefill: {
          name: storeDetails.storeName,
          contact: storeDetails.storePhoneNumber,
        },
        notes: {
          address: storeDetails.storeAddress,
        },
        theme: {
          color: "#61dafb",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.clear();
    }
  }

  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="modalContainer">
            <div className="display-flex-cmdkfjrsd">
              <div className="ncgdjfr-oiewdeasds">
                <div className="plan-header-image-at-to-only-movbile">
                  {" "}
                  <img
                    style={{ height: "8em" }}
                    src={Storeplanimages}
                    alt={"Storeplanimages"}
                  />
                </div>

                <div className="flex-sidresction-dlkrg">
                  <h1 className="new-jdsh-free-trail-ffdg"> Shopisthan</h1>
                  <p className="new-jdsh-free-trail-ffdg"> Business</p>
                </div>

                <p className="new-paragraph-lkashvsd">
                  {" "}
                  Your free trial has been expire.
                </p>
                <p className="new-paragraph-frvfgjfg">
                  {" "}
                  To continue upgrade your store plan and choose a plan
                </p>
                <div className="both-new-plan-for-store-plan-upgrade-new">
                  <div className="two-plans-in-dstore-renew-plan">
                    <div className="plan-price-and-radio-btnds">
                      {" "}
                      <input
                        className="radio-btn-of-plan-choosing-bnt"
                        type="radio"
                        value={selectedPlanDetails}
                        checked={selectedPlanName === "Retail Business"}
                        onChange={() => {
                          setSelectedPlanName("Retail Business");
                          setSelectedPlanDetails(RetailBusinessPlan[0]);
                        }}
                      />
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <div className="both-plan-in-plan-choose">
                          <h2 className="yearly-plan-fo-of-shopisthan">
                            ₹
                            {RetailBusinessPlan && RetailBusinessPlan.length > 0
                              ? RetailBusinessPlan[0].planPrice * 12
                              : 3588}{" "}
                            / Year
                          </h2>
                          <p className="monthly-plan-fo-of-shopisthan">
                            ₹
                            {RetailBusinessPlan && RetailBusinessPlan.length > 0
                              ? RetailBusinessPlan[0].planPrice
                              : 299}{" "}
                            / month. (excluding taxes)
                          </p>
                        </div>
                        <div>
                          <img
                            className="plan-card-image-inplan-upgrade"
                            src={PlanCard}
                            alt={"PlanCard"}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="all-in-one-padding-alast-compo">
                      <p className="new-features-of-plan-after-upgrade">
                        Add on features.
                      </p>
                      <li className="features-dfsf">
                        Get customers from Shopisthan
                      </li>
                      <li className="features-dfsf">
                        Get Payments every 10th Day.
                      </li>
                      <li className="features-dfsf">Shipping handled by us.</li>
                    </div>
                  </div>
                  <div className="new-next-plan-at-new-sfrn">
                    <div className="next-plan-sdinfe">
                      <input
                        className="radio-btn-of-plan-choosing-bnt"
                        type="radio"
                        value={selectedPlanDetails}
                        checked={selectedPlanName === "Online Store"}
                        onChange={() => {
                          setSelectedPlanName("Online Store");
                          setSelectedPlanDetails(OnlineStorePlan[0]);
                        }}
                      />
                      <div className="new-dksjhkfjre">
                        <h2 className="yearly-plan-fo-of-shopisthan">
                          ₹
                          {OnlineStorePlan && OnlineStorePlan.length > 0
                            ? OnlineStorePlan[0].planPrice * 12
                            : 2388}{" "}
                          / Year
                        </h2>
                        <p className="monthly-plan-fo-of-shopisthan">
                          ₹
                          {OnlineStorePlan && OnlineStorePlan.length > 0
                            ? OnlineStorePlan[0].planPrice
                            : 199}{" "}
                          / month. (excluding taxes)
                        </p>
                      </div>
                    </div>
                    <div>
                      <h2 className="restore-plan-at-njhwe">
                        Restore Subscription
                      </h2>
                      <p className="ghdf-kjsd-weuijas">
                        Subscription Terms: Your subscription will be charged
                        yearly through payment gateway and your account will be
                        renew after 1 year of you making the payment. By
                        joining, you agree to our Terms & Privacy Policy
                      </p>
                    </div>
                  </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <button
                    className="Upgared-plan-ins-djkkfdf"
                    onClick={() => {
                      displayRazorpay(selectedPlanDetails);
                    }}
                  >
                    Upgrade Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <MessageModal
        visible={showErrorModal}
        onClose={() => {
          setShowErrorMessage("");
          setShowErrorModal(false);
        }}
        title={"Ooopsss"}
        message={showErrorMessage}
      />
    </>
  );
};

const SmallPopUp = (props) => {
  if (!props.visible) {
    return null;
  }

  return (
    <>
      <div className="modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="small-pop-up-for-product-share-nd-delete">
            <h2 style={{ textAlign: "right" }} onClick={props.close}>
              X
            </h2>
            <div className="small-pop-up-inside-products-sk">
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "grey",
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
                    fill="grey"
                    stroke="none"
                  >
                    <path
                      d="M2088 5101 c-145 -47 -269 -174 -312 -320 -11 -37 -16 -95 -16 -177
l0 -123 -497 -3 -498 -3 -60 -29 c-77 -38 -153 -114 -191 -191 l-29 -60 -3
-245 c-2 -231 -1 -247 18 -278 11 -18 34 -41 52 -52 33 -20 55 -20 2008 -20
1953 0 1975 0 2008 20 18 11 41 34 52 52 19 31 20 47 18 278 l-3 245 -29 60
c-38 77 -114 153 -191 191 l-60 29 -497 3 -498 3 0 123 c0 94 -5 139 -19 185
-46 147 -172 272 -320 315 -46 14 -119 16 -465 15 -370 0 -417 -2 -468 -18z
m816 -311 c94 -21 127 -75 134 -211 l5 -99 -483 0 -483 0 5 99 c7 134 41 190
129 211 47 11 645 12 693 0z"
                    />
                    <path
                      d="M740 3265 c-10 -12 0 -288 54 -1423 37 -774 72 -1432 78 -1462 33
-168 155 -304 321 -359 63 -21 65 -21 1388 -19 l1325 3 78 39 c140 68 237 192
265 336 6 30 40 688 77 1462 54 1136 64 1411 54 1423 -11 13 -217 15 -1820 15
-1601 0 -1809 -2 -1820 -15z m1100 -258 c19 -12 43 -38 54 -57 21 -35 21 -44
21 -1110 0 -1066 0 -1075 -21 -1110 -63 -107 -205 -107 -268 0 -21 35 -21 44
-21 1110 0 1066 0 1075 21 1110 30 51 78 80 134 80 32 0 58 -7 80 -23z m800 0
c19 -12 43 -38 54 -57 21 -35 21 -44 21 -1110 0 -1066 0 -1075 -21 -1110 -63
-107 -205 -107 -268 0 -21 35 -21 44 -21 1110 0 1066 0 1075 21 1110 30 51 78
80 134 80 32 0 58 -7 80 -23z m800 0 c19 -12 43 -38 54 -57 21 -35 21 -44 21
-1110 0 -1066 0 -1075 -21 -1110 -63 -107 -205 -107 -268 0 -21 35 -21 44 -21
1110 0 1066 0 1075 21 1110 30 51 78 80 134 80 32 0 58 -7 80 -23z"
                    />
                  </g>
                </svg>
                {props.loading ? (
                  <h2>Deleting Product</h2>
                ) : (
                  <h2 onClick={props.deleteProduct}>Delete Product</h2>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                  color: "grey",
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
                  <metadata>
                    Created by potrace 1.16, written by Peter Selinger 2001-2019
                  </metadata>
                  <g
                    transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                    fill="grey"
                    stroke="none"
                  >
                    <path
                      d="M3433 4701 c-106 -27 -184 -120 -212 -249 -6 -31 -11 -152 -11 -286
l0 -233 -97 -7 c-614 -43 -1233 -269 -1727 -630 -230 -168 -487 -414 -660
-631 -458 -575 -726 -1319 -726 -2014 0 -159 11 -189 83 -221 94 -43 141 -20
256 123 380 477 841 844 1375 1097 423 200 916 328 1378 358 l117 7 3 -260 c4
-295 12 -331 88 -418 58 -65 123 -91 220 -85 144 8 126 -7 837 702 443 443
643 650 671 694 63 97 84 169 89 302 6 135 -9 206 -65 315 -32 64 -93 128
-686 721 -592 593 -657 654 -716 683 -70 33 -160 47 -217 32z"
                    />
                  </g>
                </svg>
                <h2 onClick={props.shareProduct}>Share Product</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const OrderSucess = (props) => {
  const { show, handleclose } = props;

  return (
    <>
      <Modal visible={show} onClose={handleclose} size="lg">
        <div>
          <div className="frist-div-for-success-pop-up">
            <div className="new-done-logo-for-unde">
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width=""
                height="7em"
                viewBox="0 0 225.000000 225.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,225.000000) scale(0.100000,-0.100000)"
                  fill="#006aff"
                  stroke="none"
                >
                  <path
                    d="M1030 2104 c-192 -29 -331 -80 -460 -167 -66 -45 -196 -173 -245
-242 -237 -332 -242 -786 -12 -1125 45 -66 173 -196 242 -245 339 -242 801
-242 1140 0 69 49 197 179 242 245 43 64 97 174 121 250 36 112 46 181 46 305
0 279 -99 512 -300 706 -117 112 -218 174 -369 226 -117 40 -305 62 -405 47z
m653 -626 c42 -49 41 -50 -350 -435 -315 -311 -372 -363 -397 -363 -25 0 -60
30 -224 193 -106 105 -200 205 -208 221 -13 22 -13 34 -4 56 13 32 53 53 84
44 11 -3 96 -81 189 -172 l167 -167 208 205 c450 445 458 453 489 446 15 -4
36 -16 46 -28z"
                  />
                </g>
              </svg>
            </div>
            <div>
              <h4 className="conrats-header">
                Your order is placed successful
              </h4>
            </div>
            <div>
              <p className="conrats-paragraph">
                Your will be confirmed shortly
              </p>
            </div>
            <div
              style={{ display: "flex", gap: "3px", justifyContent: "center" }}
            >
              <p className="conrats-paragraph-secound">
                For more details contact store
              </p>
            </div>
            <div className="both-btn-of-k-and-b">
              {" "}
              {/* <div onClick={handleclose}>
                <button className="back-to-home-btn">View Order</button>{" "}
              </div> */}
              <button className="back-to-home-btn" onClick={props.goBack}>
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

const CatalogOptionsModal = (props) => {
  const { catalog } = props;
  if (!props.show) {
    return null;
  }
  return (
    <>
      <div className="category-xnl-modalFixedBg">
        <div style={{ position: "relative" }}>
          <div className="category-pop-up-kdcpina">
            <h2 style={{ textAlign: "right" }} onClick={props.onClose}>
              X
            </h2>
            <div className="small-pop-up-inside-products-sk">
              {" "}
              <div
                className="category-name-in-store-view-all-category"
                onClick={() => props.selectedCatalog("All")}
                style={{
                  padding: "1px",
                }}
              >
                All
              </div>
              {catalog && catalog.length > 0
                ? catalog.map((catalog, index) => (
                    <div
                      className="category-name-in-store-view-all-category"
                      key={index}
                      onClick={() => props.selectedCatalog(catalog._id)}
                      style={{
                        padding: "1px",
                      }}
                    >
                      {catalog.name}
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const ProductDetailsPopupScreen = (props) => {
  const { show, productDetails, storeDetails, storeUrl } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userDetails);
  const [cartItemsList, setCartItemsList] = useState(
    useSelector((state) => state.userDetails.cartItems)
  );

  const [cartItems, setCartItems] = useState(cart.cartItems);

  useEffect(() => {
    setCartItemsList(cart.cartItems);
  }, [cart.cartItems]);

  if (!show) {
    return null;
  }
  if (!productDetails) {
    return null;
  }

  const cartProductDetails = Object.keys(cartItemsList)
    .filter((key) => productDetails._id === cartItemsList[key]._id)
    .map((key, index) => cartItemsList[key]);

  const onQuantityIncrement = () => {
    if (cartProductDetails[0].qty >= 5) return;
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[productDetails._id];
    props.onQuantityInc(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription
    );
  };

  const onQuantityDecrement = () => {
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[productDetails._id];
    props.onQuantityDec(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription
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
      return null;
    }
  };

  const renderAddToCartButton = (type) => {
    const check = Object.keys(cartItemsList).filter(
      (key) => productDetails._id === cartItemsList[key]._id
    );
    if (check && check.length > 0) {
      return (
        <>
          {" "}
          <div className="add-and-subtract-items-of-cart-in-one-pastore-product">
            {cartProductDetails[0].qty === 1 ? (
              <Link
                onClick={() => {
                  const _id = cartItemsList[productDetails._id];
                  props.onRemoveCartItem(_id._id);
                }}
                style={{
                  color: "white",
                }}
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
            <p style={{ fontSize: "12px" }}>{cartProductDetails[0].qty}</p>

            <p
              className="qauntity-increase-inadd-to-cart-btn"
              onClick={onQuantityIncrement}
            >
              +
            </p>
          </div>
        </>
      );
    } else {
      return (
        <>
          <button
            className={"btn-of-add-to-cart-instroe-productresoponsicve"}
            onClick={() => {
              const storeId = storeDetails._id;
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
            Add +
          </button>
        </>
      );
    }
  };

  const renderButton = () => {
    const check = Object.keys(cartItemsList).filter(
      (key) => productDetails._id === cartItemsList[key]._id
    );
    if (check && check.length > 0) {
      return (
        <>
          <div className="new-add-car-btn-in-aoeo">
            <div className="new-cart-checkout-btn-after-item-added-in-aaart">
              {" "}
              <div>
                <p style={{ fontSize: "14px" }}>
                  {" "}
                  {Object.keys(cartItems).length}{" "}
                  {Object.keys(cartItems).length > 1 ? "Items" : "Item"}
                </p>{" "}
                <p style={{ fontSize: "20px" }}>
                  {" "}
                  {PriceWithComma(
                    Object.keys(cart.cartItems).reduce((totalPrice, key) => {
                      const { productPrice, qty } = cart.cartItems[key];
                      return totalPrice + productPrice * qty;
                    }, 0)
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
          </div>
        </>
      );
    } else {
      return (
        <button
          className="new-add-car-btn-in-aoeo"
          onClick={() => {
            const storeId = storeDetails._id;
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
          Add to Bag
        </button>
      );
    }
  };
  return (
    <div className="modal-fjurfkn-frsf">
      <div className="creoss-background-ajna">
        {" "}
        <p className="cross-btn-okjbv" onClick={() => props.onClose()}>
          X
        </p>
      </div>
      {/* <p className="cross-btn-acjim">X</p> */}
      {/* <div className="navbar-of-producct-details-page-not-popup">Product Details</div> */}
      <ProfileNavBarResponsive>
        <img
          style={{ height: "1rem" }}
          src={
            "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
          }
          alt="ShopisthanLogo"
          onClick={() => props.onClose()}
        />
        {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}

        <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Product Details</h2>
        <div></div>
      </ProfileNavBarResponsive>
      <div className="Stroe-creation-frj-lk-jgh">
        <div className="product-details-pop-up-scroll-in">
          <div>
            <div>
              <img
                className="iage-of-product-in-product-details"
                src={productDetails.productPictures[0].img}
                alt="Product-Picture"
              />
            </div>
            <div className="name-of-product-and-category-and-add-to-cart-btn">
              <div style={{ lineHeight: "1.4" }}>
                <h2 className="product-name-full-of-ancs">
                  {productDetails.productName}
                </h2>{" "}
                <p className="category-nad-other-of-product">
                  {productDetails.productCatalog.name}
                </p>
              </div>
              {renderAddToCartButton()}
            </div>
            <div className="store-product-details-single-prodict-price-in-sll-product">
              <span className="produt-real-price-in-product-details-page">
                {" "}
                {PriceWithComma(productDetails.productPrice)}
              </span>

              {productDetails.productMrpPrice ? (
                productDetails.productMrpPrice ===
                productDetails.productPrice ? null : (
                  <p className="productdisscount-price-in-sibgjjd">
                    {PriceWithComma(productDetails.productMrpPrice)}
                  </p>
                )
              ) : null}
            </div>
            <div>
              <p className="product-anxjisk">
                {productDetails.productDescription}
              </p>
            </div>
            <div className="bat-bottom-stuck-new">{renderButton()}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const LoginAtAddress = ({ props }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.userDetails);
  const [showError, setShowError] = useState(false);
  const [showCheckError, setShowCheckError] = useState(false);
  const [checkMsgError, setCheckMsgError] = useState("");
  const [ready, setReady] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const errorMessage = auth.error;
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [showloadingButton, setShowLoadingButton] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendOTP, setResendOTP] = useState(false);
  const [readyOtp, setReadyOtp] = useState(false);
  const errorMessageOtp = auth.error;
  const [showValidationOTP, setShowValidationOTP] = useState(false);
  const [validationOTP, setValidationOTP] = useState("");
  const [showErrorOtp, setShowErrorOtp] = useState(false);
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (ready && errorMessage !== "") {
      setShowLoadingButton(false);
      setShowError(true);
      setReady(false);
    }
    if (auth.authenticating && auth.loading && errorMessage === "") {
      setShowValidation(false);
      setValidation("");
      setShowLoadingButton(false);
      setReady(false);
      setShowOtp(true);
    }
    if (!auth.authenticating && readyOtp && errorMessageOtp !== "") {
      setShowLoadingButton(false);
      setShowErrorOtp(true);
    }
  }, [
    ready,
    errorMessage,
    auth.authenticating,
    auth.loading,
    readyOtp,
    errorMessageOtp,
  ]);

  useEffect(() => {
    if (!auth.sentOtp && resendOTP && errorMessage !== "") {
      setShowErrorOtp(true);
    }
  }, [auth.sentOtp, resendOTP, errorMessage]);

  useEffect(() => {
    if (auth.sentOtp && resendOTP && errorMessage === "") {
      setMinutes(2);
      setResendOTP(false);
    }
  }, [auth.sentOtp, resendOTP, errorMessage]);

  useEffect(() => {
    if (showOtp) {
      let myInterval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        }
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(myInterval);
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
      return () => {
        clearInterval(myInterval);
      };
    }
  });

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    return setPhoneNo(value);
  };

  const showErrorContent = (msg) => {
    return (
      <span className="error-mafg-in-validdatiom-in-inout-area">{msg}</span>
    );
  };

  const validForPhoneNo = () => {
    if (
      phoneNo.charAt(0) !== "9" &&
      phoneNo.charAt(0) !== "8" &&
      phoneNo.charAt(0) !== "7"
    ) {
      return showErrorContent("Invalid phone number please check");
    } else {
      if (phoneNo.length < 10) {
        return showErrorContent("Phone number should be 10 digit number");
      } else if (phoneNo.length > 10) {
        return showErrorContent("Phone number should be 10 digit number");
      } else {
        return null;
      }
    }
  };

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const validationCheck = () => {
    if (
      isNaN(phoneNo) ||
      (phoneNo.charAt(0) !== "9" &&
        phoneNo.charAt(0) !== "8" &&
        phoneNo.charAt(0) !== "7")
    ) {
      return showErrorMsg("PhoneNumber");
    } else if (phoneNo.length < 10) {
      return showErrorMsg("PhoneNumber");
    } else if (phoneNo.length > 10) {
      showErrorContent("Phone number should be 10 digit number");
      return showErrorMsg("PhoneNumber");
    } else {
      return true;
    }
  };

  const SigninPhone = (e) => {
    e.preventDefault();

    if (phoneNo === "") {
      return setShowValidation(true);
    }
    const validation = validationCheck();

    if (validation) {
      const from = {
        loginId: phoneNo,
      };

      setShowLoadingButton(true);
      setReady(true);
      dispatch(getUserSigninOtpAction(from));
    }
  };

  const show = (msg) => {
    setCheckMsgError(msg);
    setShowCheckError(true);
    return false;
  };

  const showErrorMsgOTP = (type) => {
    setShowValidationOTP(true);
    setValidationOTP(type);
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (!phoneNo) {
      return show("Please try to signin");
    }

    if (isNaN(otp)) {
      return showErrorMsgOTP("Otp");
    }
    if (otp === "") {
      return showErrorMsgOTP("Otp");
    }
    if (otp.length < 6) {
      return showErrorMsgOTP("Otp");
    }
    if (otp.length > 6) {
      return showErrorMsgOTP("Otp");
    }

    const form = {
      loginId: phoneNo,
      otp: otp,
    };
    setShowLoadingButton(true);
    setReadyOtp(true);
    dispatch(userOtpVerfifyAction(form));
  };

  const resendOtp = (e) => {
    e.preventDefault();

    if (!phoneNo) {
      return show("Please try to signin");
    }
    const form = {
      loginId: phoneNo,
    };

    setResendOTP(true);
    dispatch(getUserSigninOtpAction(form));
  };

  return (
    <div className="modal-fjurfkn-frsf">
      {" "}
      <div className="checkout-loginpage-frj-lk-jgh">
        <div className="frf-flrg-uyet-bgcdcd">
          <ProfileNavBarResponsive>
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
                style={{ height: "1rem" }}
                src={
                  "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
                }
                alt="ShopisthanLogo"
              />
              {/* <h2 style={{ fontSize: "18px" }}>←</h2> */}
            </Link>

            <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>Add Address</h2>
            <div></div>
          </ProfileNavBarResponsive>
          <p className="pargraphio-bgdn-iu">
            We will send a OTP to your mobile number, please enter the OTP to
            login
          </p>
          {showOtp ? (
            <>
              <input
                className="svs-hiovsn-viose"
                placeholder={"Enter 6 digit OTP Number"}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                maxLength={6}
                type="number"
              ></input>
              <div className="resend-oypsec-div-display-end">
                {minutes === 0 && seconds === 0 ? (
                  <div
                    className="resendotpbtninotpsection"
                    style={{ cursor: "pointer" }}
                    onClick={resendOtp}
                  >
                    Resend OTP
                  </div>
                ) : (
                  <h1>
                    {" "}
                    {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                  </h1>
                )}
              </div>
              {showValidationOTP && validationOTP === "Otp" && otp.length !== 6
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      Invalid OTP Please check
                    </div>
                  )
                : null}

              {showloadingButton ? (
                <button className="get-startde-bottom-btn">
                  <span className="title svelte-1b3vcum">Please wait.....</span>
                </button>
              ) : minutes === 0 && seconds === 0 ? (
                <div
                  className="get-startde-bottom-btn"
                  style={{ background: "#696969" }}
                >
                  <span className="title svelte-1b3vcum">Verify</span>
                </div>
              ) : (
                <div className="get-startde-bottom-btn" onClick={verifyOtp}>
                  <span className="title svelte-1b3vcum">Verify</span>
                </div>
              )}
            </>
          ) : (
            <>
              <input
                className="svs-hiovsn-viose"
                value={phoneNo}
                onChange={handleChange}
                placeholder={"Enter phone number"}
                maxLength={10}
                type={"number"}
              ></input>
              {showValidation &&
              phoneNo.length < 10 &&
              validation !== "PhoneNumber"
                ? showErrorContent(
                    <div className="error-mafg-in-validdatiom-in-inout-area">
                      {phoneNo.length < 10
                        ? "Invalid phone number please check"
                        : "Phone number should be 10 digit number"}
                    </div>
                  )
                : null}

              {showValidation && validation === "PhoneNumber"
                ? validForPhoneNo()
                : null}
              {showloadingButton ? (
                <button className="get-startde-bottom-btn">
                  Please wait.....
                </button>
              ) : (
                <button
                  className="get-startde-bottom-btn"
                  onClick={SigninPhone}
                >
                  Send OTP
                </button>
              )}
            </>
          )}{" "}
        </div>
      </div>
      <MessageModal
        visible={showError}
        onClose={() => {
          setShowError(false);
          setReady(false);
        }}
        title={"Oooppss!"}
        message={errorMessage}
      />
      <MessageModal
        visible={showCheckError}
        onClose={() => {
          setShowCheckError(false);
          setCheckMsgError("");
        }}
        title={"Oooppss!"}
        message={checkMsgError}
      />
      <MessageModal
        visible={showErrorOtp}
        onClose={() => {
          setShowErrorOtp(false);
          setReadyOtp(false);
        }}
        title={"Oooppss!"}
        message={errorMessageOtp}
      />
    </div>
  );
};

const FilterOrder = (props) => {
  const { show, selectFilter } = props;

  if (!show) {
    return null;
  }
  return (
    <div className="modal-fjurfkn-frsf">
      {" "}
      <div className="cross-btn-for-track-order">
        <p className="cross-btn-okjbv" onClick={props.onClose}>
          X
        </p>
      </div>
      <div className="checkout-loginpage-frj-lk-jgh">
        <div className="frf-flrg-uyet-bgcdcd">
          <p className="filter-headerpcosojn">Filters</p>
          <ul style={{ lineHeight: "2.3" }}>
            <li className="flex-of-order-filter">
              <input
                type="radio"
                name="orderFilter"
                checked={selectFilter === ""}
                onChange={() => {
                  props.setFilter("");
                }}
              />
              <h2>All orders</h2>
            </li>
            <li className="flex-of-order-filter">
              <input
                type="radio"
                name="orderFilter"
                onChange={() => {
                  props.setFilter("Pending");
                }}
                checked={selectFilter === "Pending"}
              />
              <h2>Pending orders</h2>
            </li>
            <li className="flex-of-order-filter">
              <input
                type="radio"
                name="orderFilter"
                onChange={() => {
                  props.setFilter("Confrim");
                }}
                checked={selectFilter === "Confrim"}
              />
              <h2>Confirmed orders</h2>
            </li>
            <li className="flex-of-order-filter">
              <input
                type="radio"
                name="orderFilter"
                onChange={() => {
                  props.setFilter("Rejected");
                }}
                checked={selectFilter === "Rejected"}
              />
              <h2>Rejected orders</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const TrackOrder = ({ show, orderDetails, onClose }) => {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-fjurfkn-frsf">
      {" "}
      <div className="cross-btn-for-track-order">
        <p className="cross-btn-okjbv" onClick={onClose}>
          X
        </p>
      </div>
      <div className="checkout-loginpage-frj-lk-jgh">
        <div className="frf-flrg-uyet-bgcdcd">
          <p className="filter-headerpcosojn">Track Order</p>
          <ul style={{ lineHeight: "2.3" }}>
            <li className="flex-of-order-filter">
              <img
                style={{ height: "15px" }}
                src={ImportImage.Orderdone}
                alt="Order-Done"
              />
              <h2>Order Placed</h2>
            </li>
            <div className="new-line-for-track-order-in-it"></div>
            <li className="flex-of-order-filter">
              <div className="active-circle-of-step-fortrackorder">
                {" "}
                <div className="ccsdccsoiksd"></div>
              </div>
              <h2> Dispatched</h2>
            </li>
            <div className="noe-acndonew-line-for-track-order-in-it"></div>
            <li className="flex-of-order-filter">
              <div className="active-circle-of-step-fortrackorder">
                {" "}
                <div className="ccsdccsoiksd"></div>
              </div>
              <h2> Arriving on</h2>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export {
  Modal,
  MessageModal,
  OtpModal,
  ShareModal,
  CatalogModal,
  EditProfileModal,
  ReNewStorePlanModal,
  SmallPopUp,
  OrderSucess,
  ProductDetailsPopupScreen,
  CatalogOptionsModal,
  LoginAtAddress,
  FilterOrder,
  TrackOrder,
};
