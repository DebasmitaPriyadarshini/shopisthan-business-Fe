import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./style.css";
import HomeFotter from "../../../Components/HomeFotter";
import { MessageModal, OtpModal } from "../../../Components/Modal";
import { Helmet } from "react-helmet";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link, Redirect } from "react-router-dom";
import { storeOtpAction } from "../../../actions/store.action";
import { Homepagenavbar, SubNavbar } from "../../../Components/Navbar";
import LayoutCenter from "../../../Components/Layout/index";
import { ImportImage } from "../../../Components/ImportedImages";
import Slider from "./Slider";

const Home = () => {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.userStore);
  const [phoneNo, setPhoneNo] = useState("");
  const [showValidation, setShowValidation] = useState(false);
  const [validation, setValidation] = useState("");
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpSubmit, setOtpSubmit] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [storeCreated, setStoreCreated] = useState(false);
  const [showErrorModalMessage, setShowErrorModalMessage] = useState(
    auth.error
  );
  const dispatch = useDispatch();

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

  useEffect(() => {
    if (otpSubmit && !auth.loading && auth.sentOtp && !auth.errorTF) {
      setOtpSubmit(false);
      setShowOtpModal(true);
    }
    if (otpSubmit && !auth.loading && !auth.sentOtp && auth.errorTF) {
      setShowErrorModalMessage(auth.error);
      setOtpSubmit(false);
      setShowErrorModal(true);
    }
  }, [otpSubmit, auth.loading, auth.sentOtp, auth.errorTF, auth.error]);

  if (storeCreated && auth.authenticate && store && store.userStore) {
    return <Redirect to={"/storeDashboard"} />;
  }

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

  const StoreCreated = (val) => {
    setStoreCreated(true);
    setShowOtpModal(false);
  };

  return (
    <>
      <Helmet>
        <title>Platform to Create your Online store in just 3 steps</title>
        <meta
          name="description"
          content="Shopisthan is a platform where you can buy and sell products online. Shift your offline store to online, add products and start selling today"
        />
      </Helmet>
      <Homepagenavbar />
      <SubNavbar />
      <div style={{ marginTop: "4em" }}>
        <div className="backgound-gey-ins-dlsd">
          <div className="widht-ety-em-in-cnter-fd">
            <div>
              <h1 className="first-header-of-main-home-page-ire">
                India's first platform to run offline <br /> bussiness & shops
                Online
              </h1>
              <h2 className="secound-header-of-kjsdsew-main-ds-home">
                Create Your Free Online Store
              </h2>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <input
                className="imput-fieald-in-main-home-ds"
                placeholder="Enter Mobile Number"
                value={phoneNo}
                onChange={handleChange}
                maxLength={10}
                type="number"
              ></input>
              {!otpSubmit ? (
                <button className="send-otp-sdn-btn-in-dsd" onClick={submit}>
                  Send OTP
                </button>
              ) : (
                <button className="plaese-wadsde-btn-in-dsd">
                  {" "}
                  Please wait.....
                </button>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "left",
              }}
            >
              {showValidation &&
              phoneNo.length < 10 &&
              validation !== "PhoneNumber"
                ? showErrorContent(
                    <div className="new-error-left-sscjk">
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
          </div>
        </div>
        <div style={{ background: "#fff" }}>
          <LayoutCenter>
            <div style={{ padding: "5em 0em", background: "#fff" }}>
              <div>
                <h2 className="start-selling-in-sdjs-dsdvf">
                  Start Selling Online in 3 simple steps
                </h2>
              </div>
              <div className="display-flex-fro-thre-steps-in-iages">
                <div>
                  <img
                    className="three-steps-images-of-store-creation-ds"
                    src={ImportImage.SliderOneImg}
                    alt="ShopisthanLogo"
                  />
                  {/* <div className="thre-pointers-in-scololice ">
                    {" "}
                    <h2>
                      Sign in with Shopisthan Business using your Mobile Number
                    </h2>
                  </div> */}
                </div>

                <div>
                  <img
                    className="three-steps-images-of-store-creation-ds"
                    src={ImportImage.SlidertwoImg}
                    alt="ShopisthanLogo"
                  />
                  {/* <div className="thre-pointers-in-scololice ">
                    <h2>Add Products & Catalog to your store</h2>
                  </div> */}
                </div>

                <div>
                  <img
                    className="three-steps-images-of-store-creation-ds"
                    src={ImportImage.SliderthreeImg}
                    alt="ShopisthanLogo"
                  />
                  {/* <div className="thre-pointers-in-scololice ">
                    <h2>Share your store and start getting orders</h2>
                  </div> */}
                </div>
              </div>
              <div className="center-register-bnt-sd">
                <button className="ne-register-nore-btn-lkds">
                  <Link
                    to="/free-online-store"
                    style={{
                      color: "white",
                    }}
                  >
                    Register Now
                  </Link>
                </button>
              </div>
            </div>
          </LayoutCenter>
        </div>
        <div className="backgound-in-new-jhfdrew">
          <div className="widht-ety-em-in-cnter-fd">
            <h2 className="categorierbsb-incd-online-store">
              Categories who can Create the Online Store
            </h2>
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                style={{ marginTop: "-5em", height: "100%", width: "100%" }}
                src={ImportImage.AllCategory}
                alt={"Category"}
              />
            </div>
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
      <OtpModal
        visible={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        StoreCreated={StoreCreated}
        loginId={phoneNo}
      />
      <HomeFotter />
      <div className="sliderast-to-position-sdkjer">
        {" "}
        <Slider />
      </div>
    </>
  );
};

export default Home;
