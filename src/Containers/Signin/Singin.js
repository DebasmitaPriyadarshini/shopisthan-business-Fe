import React, { useEffect, useState } from "react";
import "./signin.css";
import playstore from "../../img/playstore.png";
import back from "../../img//back.jpeg";
import Instagram from "../../img/instagram.png";
import facebook from "../../img/facebookyui.png";
import Twitter from "../../img/linkedin.png";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getSigninOtpAction,
  resendOtpAction,
  VerfifyOtpAction,
} from "../../actions/auth.action";

import { MessageModal } from "../../Components/Modal";

const Signin = (props) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.userStore);
  const [showError, setShowError] = useState(false);
  const [showCheckError, setShowCheckError] = useState(false);
  const [checkMsgError, setCheckMsgError] = useState("");
  const [ready, setReady] = useState(false);
  const [phoneNo, setPhoneNo] = useState("");
  const errorMessage = useSelector((state) => state.auth.error);
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [showloadingButton, setShowLoadingButton] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [otp, setOtp] = useState("");
  const [resendOTP, setResendOTP] = useState(false);
  const [readyOtp, setReadyOtp] = useState(false);
  const errorMessageOtp = useSelector((state) => state.auth.error);
  const [showValidationOTP, setShowValidationOTP] = useState(false);
  const [validationOTP, setValidationOTP] = useState("");
  const [showErrorOtp, setShowErrorOtp] = useState(false);
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (auth.errorTF && ready && errorMessage !== "") {
      setShowLoadingButton(false);
      setShowError(true);
    }
    if (auth.verifying && !auth.authenticating && errorMessage === "") {
      setShowValidation(false);
      setValidation("");
      setShowLoadingButton(false);
      setReady(false);
      setShowOtp(true);
    }
    if (
      auth.authenticating &&
      auth.errorTF &&
      readyOtp &&
      errorMessageOtp !== ""
    ) {
      setShowLoadingButton(false);
      setShowErrorOtp(true);
    }
  }, [auth, ready, errorMessage, readyOtp, errorMessageOtp]);

  useEffect(() => {
    if (!auth.sentOtp && resendOTP && errorMessage !== "") {
      setShowErrorOtp(true);
    }
  }, [auth, resendOTP, errorMessage]);

  useEffect(() => {
    if (auth.sentOtp && resendOTP && errorMessage === "") {
      setMinutes(2);
      setResendOTP(false);
    }
  }, [auth, resendOTP, errorMessage]);

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

  if (auth.authenticate && store && store.userStore) {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.Store &&
      props.location.state.path
    ) {
      return <Redirect to={props.location.state.path} />;
    } else {
      return <Redirect to="/storeDashboard" />;
    }
  }

  // if (auth.authenticate && store && store.userStore) {
  //   return <Redirect to="/storeDashboard" />;
  // }

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    return setPhoneNo(value);
  };

  const showErrorMsg = (type) => {
    setShowValidation(true);
    setValidation(type);
  };

  const showErrorMsgOTP = (type) => {
    setShowValidationOTP(true);
    setValidationOTP(type);
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
      dispatch(getSigninOtpAction(from));
    }
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

  const show = (msg) => {
    setCheckMsgError(msg);
    setShowCheckError(true);
    return false;
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
    dispatch(VerfifyOtpAction(form));
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
    dispatch(resendOtpAction(form));
  };

  return (
    <div>
      <img className="back" src={back} alt="background" />
      <div className="navabarcytxuyioj">
        <div className="container1">
          <div className="aiokjlpo">Shopisthan Bussiness</div>
          <a
            href="https://play.google.com/store/apps/details?id=com.shopisthanbussiness"
            target="_blank"
          >
            <div className="vucybinkm">
              <h4 className="downloadtext">Download</h4>
              <img className="play" src={playstore} alt="icon" />
            </div>
          </a>
        </div>
      </div>
      <div className="main2">
        <div className="container2">
          <div className="container21">
            <h3 className="signintext">Sign In</h3>
            <div className="container22">
              <a
                href="https://instagram.com/shopisthan.business?utm_medium=copy_link"
                target="_blank"
              >
                <img
                  className="image23"
                  src={Instagram}
                  alt="social media icons"
                />
              </a>
              <a
                href="https://www.facebook.com/shopisthan.business"
                target="_blank"
              >
                {" "}
                <img
                  className="image23"
                  src={facebook}
                  alt="social media icons"
                />
              </a>
              <a
                href="https://www.linkedin.com/products/shopisthan-india-private-limited-shopisthanio/"
                target="_blank"
              >
                <img
                  className="image2de"
                  src={Twitter}
                  alt="social media icons"
                />
              </a>
            </div>
          </div>
          <div className="container3">
            {showOtp ? (
              <>
                <div>
                  <input
                    className="dkdedmoeklkcscdsef"
                    onChange={handleChange}
                    type={"number"}
                    name={"OTP"}
                    label={"OTP Number"}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/[^0-9]/g, ""))
                    }
                    placeholder={"Enter 6 digit OTP Number"}
                    maxLength={6}
                  />
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
                  {/* //// Validation error msg  */}
                  {showValidationOTP &&
                  validationOTP === "Otp" &&
                  otp.length !== 6
                    ? showErrorContent(
                        <div className="error-mafg-in-validdatiom-in-inout-area">
                          Invalid OTP Please check
                        </div>
                      )
                    : null}
                  {showValidation && validation === "PhoneNumber"
                    ? validForPhoneNo()
                    : null}
                  {/* //// Validation error msg  */}
                  <div className="btncontainer">
                    {showloadingButton ? (
                      <button className="btnForSingin" type="submit">
                        Please wait.....
                      </button>
                    ) : minutes === 0 && seconds === 0 ? (
                      <button className="btnForSingin" type="submit">
                        Verify
                      </button>
                    ) : (
                      <button
                        className="btnForSingin"
                        type="submit"
                        onClick={verifyOtp}
                      >
                        Send OTP
                      </button>
                    )}
                  </div>
                </div>
              </>
            ) : (
              <div>
                <input
                  className="dkdedmoeklkcscdsef"
                  type="text"
                  name="Phone number"
                  placeholder="Enter Phone Number"
                  value={phoneNo}
                  onChange={handleChange}
                  maxLength={10}
                />
                {/* //// Validation error msg  */}
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
                {/* //// Validation error msg  */}
                <div className="btncontainer">
                  {showloadingButton ? (
                    <button className="btnForSingin" type="submit">
                      Please wait.....
                    </button>
                  ) : (
                    <button className="btnForSingin" onClick={SigninPhone}>
                      Send OTP
                    </button>
                  )}
                </div>
              </div>
            )}

            <div className="containersignin">
              <p className="dont">Don't have an account ? </p>
              <Link to="/free-online-store">
                <p className="su"> Create Online Store</p>
              </Link>
            </div>
            <a href="https://play.google.com/store/apps/details?id=com.shopisthanbussiness">
              <div className="dmob">
                <h4 className="downloadtextmob">Download</h4>
                <img className="playmob" src={playstore} alt="icon" />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="foot">
        <div className="footer">
          <div className="footer1">
            <p className="shop">
              © 2022, made with love by Shopisthan India PVT LTD
            </p>
          </div>
          <div className="footer2">
            <p className="about">About Us</p>
            <p className="blog">Blog</p>
          </div>
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
        visible={showErrorOtp}
        onClose={() => {
          setShowErrorOtp(false);
          setReadyOtp(false);
        }}
        title={"Oooppss!"}
        message={errorMessageOtp}
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
    </div>
  );
};
export default Signin;
