import React, { useEffect, useState } from "react";
import "./StoreCreationform.css";
import { InputComponents } from "../../../Components/Inputs/index";
import { useDispatch, useSelector } from "react-redux";
import { RetailBusiness } from "../../../Data";
import {
  storeOtpAction,
  verfiyStoreOtpAction,
} from "../../../actions/store.action";
import { useHistory } from "react-router";
import { MessageModal } from "../../../Components/Modal";
import { Link } from "react-router-dom";

const StoreCreationForm = (props) => {
  const store = useSelector((state) => state.userStore);
  const [otp, setOtp] = useState("");
  const [storeName, setStoreName] = useState("");
  const auth = useSelector((state) => state.auth);
  const planList = useSelector((state) => state.storePlans.storePlans);
  // const [storeCategoryList, setStoreCategoryList] = useState(RetailBusiness);
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
  const [loginId, setLoginId] = useState("");
  const history = useHistory();
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [showTimer, setShowTimer] = useState(false);
  const [resendOtpSumbit, setResendOTPSumbit] = useState(false);

  useEffect(() => {
    if (loginId) {
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
  }, [showTimer, loginId, minutes, seconds]);

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
      return setStoreCategory(
        storeCategoryList && storeCategoryList.length > 0
          ? storeCategoryList[0]
          : ""
      );
    }
    if (
      props.location &&
      props.location.state &&
      props.location.state.storeForm
    ) {
      const loginId = props.location.state.loginId;
      return setLoginId(loginId);
    } else {
      history.push({
        pathname: "/",
      });
    }
  }, [storeCategory, props.location, storeCategoryList, history]);

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
      history.push({
        pathname: "/storeDashboard",
      });
    }
  }, [submitData, store, auth.authenticate, history]);

  const showErrorContent = (msg) => {
    return <div className="error-mafg-in-validdatiom-in-inout-area">{msg}</div>;
  };

  const handleChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    return setOtp(value);
  };

  const submit = (e) => {
    e.preventDefault();

    if (!planDetails) {
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

    if (!loginId) {
      return null;
    }

    const data = {
      loginId,
      storeName,
      storeType: planDetails[0].planName,
      storeCategory,
      storePhoneNumber: loginId,
      storePlan: planDetails[0]._id,
      otp,
    };
    setSumbitData(true);
    dispatch(verfiyStoreOtpAction(data));
  };

  const resendOtp = (e) => {
    e.preventDefault();

    if (!loginId) {
      return null;
    }

    const data = {
      loginId: loginId,
    };
    setResendOTPSumbit(true);
    dispatch(storeOtpAction(data));
  };

  return (
    <>
      <div className="shopisthna-sjkasi">
        <h1 className="header-of-create-an-free-account">Create for Free</h1>
        <div className="olurt-bfgng-vytb" style={{ marginTop: "20px" }}>
          <p className="vscsdc-bdfvs">
            We have sent an OTP to your mobile number, please enter <br />
            the OTP to create free online store
          </p>
        </div>
        <div>
          <div
            className="inputs-in-store-creation-free-form"
            style={{ marginBottom: "4 px" }}
          >
            <InputComponents
              value={otp}
              onChange={handleChange}
              maxLength={6}
              placeholder={"Enter OTP"}
            />
            {showValidation && otp.length < 6
              ? showErrorContent(
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invalid OTP Please check
                  </div>
                )
              : null}

            {minutes === 0 && seconds === 0 ? (
              <div
                className="resnd-otp-dnsnjcndf"
                style={{ cursor: "pointer" }}
                onClick={resendOtp}
              >
                <p>Resend OTP</p>
              </div>
            ) : (
              <h1>
                {" "}
                {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </h1>
            )}
          </div>
          <div className="inputs-in-store-creation-free-form">
            <InputComponents
              placeholder={"Enter Online shop name"}
              value={storeName}
              onChange={(e) =>
                setStoreName(e.target.value.replace(/\s\s+/g, " "))
              }
              maxLength={50}
            />
            {showValidation && storeName.length < 5
              ? showErrorContent(
                  <div className="error-mafg-in-validdatiom-in-inout-area">
                    Invaild Store Name
                  </div>
                )
              : null}
          </div>
          <div
            style={{ marginTop: "0.8em" }}
            className="inputs-in-store-creation-free-form"
          >
            <InputComponents
              type={"select"}
              storeType={true}
              placeholder={"Select Store Category"}
              options={storeCategoryList}
            />
          </div>
          <div style={{ marginTop: "4em" }}>
            {submitData ? (
              <button className="sendotp-btn-khsdf">Please wait.....</button>
            ) : minutes === 0 && seconds === 0 ? (
              <button
                style={{ background: "#696969" }}
                className="sendotp-btn-khsdf"
              >
                Create Online Store
              </button>
            ) : (
              <button className="sendotp-btn-khsdf" onClick={submit}>
                Create Online Store
              </button>
            )}
          </div>
          <div className="alreadt-have-and-aaccount-ds">
            <div className="line-through-login-instaed"></div>
            <p>Already have account</p>
            <div className="line-through-login-instaed"></div>
          </div>
          <Link to="/signin">
            <h2
              style={{ marginTop: "1.5em", paddingRight: "6px" }}
              className="login-instaed-sdasd"
            >
              Login Instead
            </h2>
          </Link>
          <p className="accept-all-ahter-terms-ind-dfd">
            By creating an account I accept the terms & conditions
          </p>
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

export default StoreCreationForm;
