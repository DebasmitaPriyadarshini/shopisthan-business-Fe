import React, { useEffect, useState } from "react";
import { InputComponents } from "../Inputs";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserSigninOtpAction,
  userOtpVerfifyAction,
} from "../../actions/user.action";
import { MessageModal } from "../Modal";
import "./style.css";

const CheckoutLogin = (props) => {
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
    <>
      {showOtp ? (
        <>
          <section className="CardLayout__content">
            <div className="icdsbnlcses-feef">
              <InputComponents
                name={"OTP"}
                label={"OTP Number"}
                value={otp}
                onChange={(e) => setOtp(e.target.value.replace(/[^0-9]/g, ""))}
                placeholder={"Enter 6 digit OTP Number"}
                maxLength={6}
                type="number"
              />
            </div>
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
              <button
                className="get-startde-bottom-btn"
                style={{ background: "#696969" }}
              >
                Please wait.....
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
          </section>
        </>
      ) : (
        <section className="CardLayout__content">
          <div>
            <div className="aling-temde-endsd">
              {/* <div className="width-of-country-cde-ateje">
                <p className="country-code-in-dekajde-aed">Country</p>.
                <div className="heigth-at-ocjcdpaerupiej"></div>
              </div> */}
              <input
                className="svs-hiovsn-viose"
                value={phoneNo}
                onChange={handleChange}
                placeholder={"Enter phone number"}
                maxLength={10}
                type={"number"}
              ></input>
            </div>
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
          </div>
          <div className="cionacdv">
            {showloadingButton ? (
              <button className="get-startde-bottom-btn">
                Please wait.....
              </button>
            ) : (
              <button className="get-startde-bottom-btn" onClick={SigninPhone}>
                Send OTP
              </button>
            )}
          </div>
        </section>
      )}

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
    </>
  );
};

export default CheckoutLogin;
