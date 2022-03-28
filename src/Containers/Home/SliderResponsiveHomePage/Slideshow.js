import React, { useEffect, useState } from "react";
import "./Slider.css";
import SliderOneImg from "../../../img/Shopisthan_free_account.png";

import SlidertwoImg from "../../../img/Shopisthan_add_product.png";
import SliderthreeImg from "../../../img/shopisthan_share _your_store.png";
import { InputComponents } from "../../../Components/Inputs";
import { Link, useHistory } from "react-router-dom";
import { MessageModal } from "../../../Components/Modal";
import { useDispatch, useSelector } from "react-redux";
import { storeOtpAction } from "../../../actions/store.action";

const colors = [
  {
    id: 1,
    src: SliderOneImg,
  },
  {
    id: 2,
    src: SlidertwoImg,
  },
  {
    id: 3,
    src: SliderthreeImg,
  },
];
const delay = 6000;

const Slideshow = () => {
  const [index, setIndex] = useState(0);
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.userStore);
  const [phoneNo, setPhoneNo] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState(
    auth.error
  );
  const [otpSubmit, setOtpSubmit] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (otpSubmit && !auth.loading && auth.sentOtp && !auth.errorTF) {
      history.push({
        pathname: "/storeCreationForm",
        state: { storeForm: true, loginId: phoneNo },
      });
    }
    if (otpSubmit && !auth.loading && !auth.sentOtp && auth.errorTF) {
      setShowErrorModalMessage(auth.error);
      setOtpSubmit(false);
      setShowErrorModal(true);
    }
  }, [
    otpSubmit,
    auth.loading,
    auth.sentOtp,
    auth.errorTF,
    auth.error,
    history,
    phoneNo,
  ]);

  useEffect(() => {
    setTimeout(
      () =>
        setIndex((prevIndex) =>
          prevIndex === colors.length - 1 ? 0 : prevIndex + 1
        ),
      delay
    );
  }, [index]);

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
      return showErrorContent("Invalid Phone Number Please check");
    } else {
      if (phoneNo.length < 10) {
        return showErrorContent("Invalid Phone Number Please check");
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
    }

    if (phoneNo.length < 10) {
      return showErrorMsg("PhoneNumber");
    }

    if (phoneNo.length > 10) {
      return showErrorMsg("PhoneNumber");
    }
    if (phoneNo.length === 10) {
      return true;
    }
  };

  const submit = (e) => {
    e.preventDefault();
    if (phoneNo === "") {
      return setShowValidation(true);
    }
    const validation = validationCheck();
    if (validation) {
      const data = {
        loginId: phoneNo,
      };
      setOtpSubmit(true);
      dispatch(storeOtpAction(data));
    }
  };

  return (
    <>
      <div className="slideshow">
        <div className="vdtynybdsvf">
          {/* {colors.map((item, index) => (
            <div className="slide-kdfkj" key={index}>
              {" "}
              <div className="textSection">
                <img
                  style={{ width: "100%" }}
                  src={item.src}
                  alt="Shopisthan"
                />
              </div>
            </div>
          ))} */}
          <div>
            <h2 className="header-in-home-page-respo-slider">
              Start Your Free Online
              <br />
              Store.
            </h2>
            <div className="new-paragrhaoc-nca">
              {" "}
              <h2>Start your 30 days</h2>{" "}
              <h2 className="hilighted-bword-jca"> FREE trial </h2>
              <h2> with shopisthan.</h2>
            </div>

            <div className="coslc-sniwemfe">
              <div>
                {" "}
                <div className="cau-uiebxlahda-biw">
                  <h2>Create Store</h2>
                </div>
                <div className="cau-uiebxlahda-biw">
                  <h2>Add Products</h2>
                </div>
                <div className="cau-uiebxlahda-biw">
                  <h2>Share Store get Orders</h2>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cardContainer">
        <input
          value={phoneNo}
          onChange={handleChange}
          maxLength={10}
          placeholder={"Enter Mobile Number"}
          className="homepage-in-aixaj"
        ></input>

        {showValidation && phoneNo.length < 10 && validation !== "PhoneNumber"
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
        {!otpSubmit ? (
          <button className="sendotp-btn-khsdf" onClick={submit}>
            Send OTP
          </button>
        ) : (
          <button className="sendotp-btn-khsdf"> Please wait.....</button>
        )}

        <div className="new-division-for-login-insteaf-fd">
          <div className="line-through-login-instaed"></div>
          {auth && auth.authenticate && store && store.userStore ? (
            <Link to="/storeDashboard">
              <h2 className="login-instaed-sdasd">View Store</h2>
            </Link>
          ) : (
            <Link to="/signin">
              <h2 className="login-instaed-sdasd">Login Instead</h2>
            </Link>
          )}

          <div className="line-through-login-instaed"></div>
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
    </>
  );
};

export default Slideshow;
