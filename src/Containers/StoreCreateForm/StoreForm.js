import React, { useState, useEffect } from "react";
import "./storeform.css";
import BackGround1 from "../../img/Backgorundone.jpeg";
import BackGround2 from "../../img/backoecoa.jpeg";
import BackGround3 from "../../img/poijuyhijm.jpeg";
import BackGround4 from "../../img/tyuiljk.jpeg";
import playstore from "../../img/playstore.png";
import { Link, useHistory } from "react-router-dom";
import { RetailBusiness } from "../../Data";
import { useDispatch, useSelector } from "react-redux";
import {
  createFreeStoreOtpAction,
  verifyFreeStoreOtpAction,
} from "../../actions/store.action";
import { MessageModal } from "../../Components/Modal";

const Signup = (props) => {
  const auth = useSelector((state) => state.auth);
  const check = useSelector((state) => state.userStore);
  const [phoneNo, setPhoneNo] = useState("");
  const [storeName, setStoreName] = useState("");
  const [storeCategory, setStoreCategory] = useState(
    RetailBusiness && RetailBusiness.length > 0 ? RetailBusiness[0] : ""
  );
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const planList = useSelector((state) => state.storePlans.storePlans);
  const planDetails =
    planList && planList.length > 0
      ? planList.filter((plan) => plan.planName === "Retail Business")
      : null;
  const dispatch = useDispatch();

  const [sumbitForm, setSumbitForm] = useState(false);
  const [showOtp, setShowOtp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [showErrorMessageModal, setShowErrorMessageModal] = useState(false);

  const [otp, setOtp] = useState("");
  const { initialMinute = 2, initialSeconds = 0 } = props;
  const [minutes, setMinutes] = useState(initialMinute);
  const [seconds, setSeconds] = useState(initialSeconds);
  const [showTimer, setShowTimer] = useState(false);
  const [resendOtpSumbit, setResendOTPSumbit] = useState(false);

  const [otpSumbited, setOtpSumbited] = useState(false);
  const [storeCreated, setStoreCreated] = useState(false);

  const history = useHistory();

  useEffect(() => {
    if (sumbitForm && !check.loading && check.added && check.error === "") {
      setSumbitForm(false);
      setErrorMessage("");
      setShowErrorMessageModal(false);
      setShowValidation(false);
      setValidation("");
      return setShowOtp(true);
    }

    if (sumbitForm && !check.loading && !check.added && check.error !== "") {
      setSumbitForm(false);
      setShowOtp(false);
      setErrorMessage(check.error);
      setShowValidation(false);
      setValidation("");
      return setShowErrorMessageModal(true);
    }

    if (
      otpSumbited &&
      !check.loading &&
      check.error === "" &&
      auth.authenticate &&
      check &&
      check.userStore
    ) {
      setOtpSumbited(false);
      setErrorMessage("");
      setShowErrorMessageModal(false);
      setShowValidation(false);
      setValidation("");
      return history.push({
        pathname: "/storeDashboard",
      });
    }
    if (otpSumbited && !check.loading && check.error !== "") {
      setOtpSumbited(false);
      setStoreCreated(false);
      setErrorMessage(check.error);
      setShowValidation(false);
      setValidation("");
      return setShowErrorMessageModal(true);
    }
  }, [check, sumbitForm, otpSumbited]);

  useEffect(() => {
    if (
      resendOtpSumbit &&
      !check.loading &&
      check.added &&
      check.error === "" &&
      !sumbitForm
    ) {
      setMinutes(2);
      return setResendOTPSumbit(false);
    }

    if (
      resendOtpSumbit &&
      !check.loading &&
      !check.added &&
      check.error !== "" &&
      !sumbitForm
    ) {
      return setResendOTPSumbit(false);
    }
  }, [resendOtpSumbit, check]);

  useEffect(() => {
    if (showOtp) {
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
  }, [showOtp, showTimer, seconds, minutes]);

  useEffect(() => {
    if (storeCategory === "") {
      setStoreCategory(
        RetailBusiness && RetailBusiness.length > 0 ? RetailBusiness[0] : ""
      );
    }
  }, [storeCategory]);

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

    if (!planDetails) {
      console.log("Plan details missing");
      return null;
    }

    if (phoneNo === "" || storeName === "" || storeCategory === "") {
      return setShowValidation(true);
    }
    const validation = validationCheck();
    if (validation) {
      const data = {
        loginId: phoneNo,
        storeName,
        storeType: planDetails[0].planName,
        storeCategory,
        storePlan: planDetails[0]._id,
      };
      setSumbitForm(true);
      dispatch(createFreeStoreOtpAction(data));
    }
  };

  const renderDetailsForm = () => {
    return (
      <>
        <div>
          <div className="ompnlit-dhg-ijre">
            <input
              className="dkdedmoeklkcscdsef"
              placeholder="Enter Phone Number"
              value={phoneNo}
              onChange={handleChange}
              maxLength={10}
              type="number"
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
          </div>

          <div className="ompnlit-dhg-ijre">
            {" "}
            <input
              className="dkdedmoeklkcscdsef"
              placeholder="Enter online shop name"
              value={storeName}
              onChange={(e) =>
                setStoreName(e.target.value.replace(/\s\s+/g, " "))
              }
              maxLength={50}
            ></input>
            {showValidation && storeName.length < 5
              ? showErrorContent(
                <div className="error-mafg-in-validdatiom-in-inout-area">
                  Invaild Store Name
                </div>
              )
              : null}
          </div>

          <div className="ompnlit-dhg-ijre">
            {" "}
            <select
              className="buvweijmcpa"
              type={"select"}
              style={{
                height: "3.2em",
              }}
              onChange={(e) => setStoreCategory(e.target.value)}
              value={storeCategory}
            >
              {RetailBusiness && RetailBusiness.length > 0
                ? RetailBusiness.map((categoty, index) => (
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

          <div className="btncontainer">
            <button
              onClick={sumbitForm ? null : submit}
              className="btnForSingin"
            >
              {sumbitForm ? "Please wait...." : "Create Online Store"}
            </button>
          </div>
        </div>
      </>
    );
  };

  const verifyOtp = (e) => {
    e.preventDefault();

    if (!phoneNo) {
      return null;
    }
    if (otp === "") {
      return setShowValidation(true);
    }
    if (otp.length < 6) {
      return setShowValidation(true);
    }

    const data = {
      loginId: phoneNo,
      otp,
    };
    setOtpSumbited(true);
    dispatch(verifyFreeStoreOtpAction(data));
  };

  const resendOtp = (e) => {
    e.preventDefault();

    if (!phoneNo) {
      console.log("Phone Number Missing");
      return null;
    }

    const data = {
      loginId: phoneNo,
      storeName,
      storeType: planDetails[0].planName,
      storeCategory,
      storePlan: planDetails[0]._id,
    };
    setResendOTPSumbit(true);
    dispatch(createFreeStoreOtpAction(data));
  };

  const renderOtpForm = () => {
    return (
      <div>
        <input
          className="dkdedmoeklkcscdsef"
          type="text"
          name="Phone number"
          maxLength={6}
          placeholder={"Enter 6 digit OTP Number"}
          value={otp}
          onChange={(e) => setOtp(e.target.value.replace(/\D/g, ""))}
        />
        {showValidation && otp.length < 6
          ? showErrorContent(
            <div className="error-mafg-in-validdatiom-in-inout-area">
              Invalid OTP Please check
            </div>
          )
          : null}
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
        <div className="btncontainer">
          {minutes === 0 && seconds === 0 ? (
            <button className="btnForSingin" type="submit">
              Verify OTP
            </button>
          ) : (
            <button
              className="btnForSingin"
              type="submit"
              onClick={otpSumbited ? null : verifyOtp}
            >
              {otpSumbited ? "Please wait...." : "Verify OTP"}
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div className="asdfdghyfg">
        <div>
          <div className="peocppcds">
            <img className="immagcontainerjk" src={BackGround1} alt="images" />
            <img className="immagcontainerjk" src={BackGround2} alt="images" />
            <img className="immagcontainerjk" src={BackGround3} alt="images" />
            <img className="immagcontainerjk" src={BackGround4} alt="images" />
          </div>

          {/* <div className="Navbarcontainercdfvd">
            <div className="container1">
              <div className="aiokjlpo">Shopisthan Bussiness</div>
              <a
                className="vucybindkm"
                href="https://play.google.com/store/apps/details?id=com.shopisthanbussiness"
                style={{ cursor: "pointer" }}
              >
                <h4 className="downloadtext">Download</h4>
                <img className="play" src={playstore} alt="icon" />
              </a>
            </div>
          </div> */}
        </div>
        <div className="uyiolmdc">
          <div className="Singupcomponentnew">
            <div className="signupconthj">
              <h3 className="createheader-free-store">
                Create Free Online Store
              </h3>
              <p className="okjnb">
                Launch your store with Shopisthan Business and start accepting
                orders today
              </p>
            </div>
            <div className="inputcontainercreatstore">
              <div> {showOtp ? renderOtpForm() : renderDetailsForm()}</div>
              <div className="contoihekds">
                <p className="dont">Already have an account ? </p>
                <Link to="/signin">
                  <p className="su">Sign In</p>
                </Link>
              </div>{" "}
              <a href="https://play.google.com/store/apps/details?id=com.shopisthanbussiness">
                <div className="dmob">
                  <h4 className="downloadtextmob">Download</h4>
                  <img className="playmob" src={playstore} alt="icon" />
                </div>{" "}
              </a>
            </div>
          </div>
        </div>
        <div className="footatscreatestore">
          <div>
            <p className="icbdnoskml">
              © 2022, made with love by Shopisthan India PVT LTD
            </p>
          </div>
          <div className="iekdlsdc">
            <div>
              <a
                className="vucybindkm"
                href="https://play.google.com/store/apps/details?id=com.shopisthanbussiness"
                rel="noreferrer"
                target="_blank"
                style={{ cursor: "pointer" }}
              >
                <h4 className="efsrgdthyuj">Download</h4>
                <img className="playsrdgthy" src={playstore} alt="icon" />
              </a>
            </div>
            <p className="icbdnoskml">About Us</p>
            <p className="icbdnoskml">Blog</p>
          </div>
        </div>
      </div>
      <MessageModal
        visible={showErrorMessageModal}
        onClose={() => {
          setShowErrorMessageModal(false);
          setErrorMessage("");
        }}
        title={"Message"}
        message={errorMessage}
      />
    </div>
  );
};
export default Signup;
