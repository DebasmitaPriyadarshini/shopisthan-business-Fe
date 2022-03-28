import React, { useEffect, useState } from "react";
import { ImportImage } from "../../Components/ImportedImages";
import "./style.css";
import { Link, useHistory, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { MessageModal } from "../../Components/Modal";
import { storeOtpAction } from "../../actions/store.action";

const LandingPage = () => {
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
    const host = window.location.host; // gets the full domain of the app

    console.log("host", host);

    const arr = host.split(".").slice(0, host.includes("localhost") ? -1 : -2);
    console.log(arr);
    // if (arr.length > 0) setSubDomain(arr[0]);

    // let host = window.location.host;
    // let protocol = window.location.protocol;
    // let parts = host.split(".");
    // let subdomain = "";

    // console.log(host, "host");
    // console.log(protocol, "protocol");
    // console.log(parts, "parts");
    // // If we get more than 3 parts, then we have a subdomain
    // // INFO: This could be 4, if you have a co.uk TLD or something like that.
    // if (parts.length >= 3) {
    //   subdomain = parts[0];
    //   // Remove the subdomain from the parts list
    //   parts.splice(0, 1);
    //   // Set the location to the new url
    //   // window.location = protocol + "//" + parts.join(".") + "/" + subdomain;
    //   console.log(
    //     "asdasd",
    //     protocol + "//" + parts.join(".") + "/" + subdomain
    //   );
    // }
  }, []);

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

  if (auth.authenticate && store && store.userStore) {
    return <Redirect to="/storeDashboard" />;
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
      {" "}
      <div className="background-color-green-nckaj">
        {" "}
        <div>
          {/* <img className="ne-ncsjncsnkls" src={ImportImage.Backgroundgreen} /> */}
        </div>
        <div className="new-landig-logo-andlogin">
          <div className="width-ofnavbar-cab">
            <div>
              <img
                style={{ height: "2em" }}
                src={ImportImage.ShopisthaMainLandinLogo}
                alt="Landing"
              />
            </div>
            <div>
              <Link to="/signin">
                <p style={{ color: "#fff" }}>Login</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="headder-of-landing-page-in-onr-pbox">
          <h1 className="first-header-in-landing-paeg">
            {" "}
            Banao Khudki Online Pehchan with
            <br /> Shopisthan
          </h1>
          <h1 className="first-header-in-landing-paeg-respo">
            {" "}
            Banao Khudki Online <br />
            Pehchan with
            <br /> Shopisthan
          </h1>
          <p className="secound-paragraph-in-cebk">
            Trusted by over hundreds of businesses everyday.
          </p>
          <div className="input-and-btn-in-landing-page-otp-one">
            <input
              className="imput-fieald-in-main-home-ds"
              placeholder="Enter Mobile Number"
              value={phoneNo}
              onChange={handleChange}
              maxLength={10}
              type="number"
            ></input>
            {!otpSubmit ? (
              <button className="plaese-wadsde-btn-in-dsd" onClick={submit}>
                Send OTP
              </button>
            ) : (
              <button className="plaese-wadsde-btn-in-dsd">
                {" "}
                Please wait.....
              </button>
            )}
          </div>
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

          <div style={{ display: "flex", justifyContent: "center" }}>
            {" "}
            <p className="free-store-exlain-paragraph">
              Aab koi bhi, kahi se bhi bana sqata hai kudki eCommerce. Create
              your own free online store before getting your Maggi ready. By
              continuing, you agree to Shopisthan India terms & policy.
            </p>
          </div>
        </div>
      </div>
      <div className="new-mock-center-in-land-page">
        <img
          className="main-center-lap-mob-and-cart-mockup"
          src={ImportImage.ShopisthanMainCenterMockup}
          alt="Shopisthan"
        />
      </div>
      <div className="light-green-in-middle-are">
        <h2 className="start-seeling-heder-in-light-green">
          Start Selling Online in 3 simple steps
        </h2>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="step-of-all-three-in-land">
              <div className="numbaer-of-steps-and-header-para">
                <div>
                  <p className="header-of-step-cb">
                    Start Selling Online in 3 simple steps{" "}
                  </p>
                  <div className="paragraph-of-steps-in-land">
                    <li>
                      Register on Shopisthan Business by entering your mobile
                      number.{" "}
                    </li>
                    <li>
                      Build your online store with Shopisthan without any
                      technical knowledge and coding background, and serve your
                      customers without any interruption.
                    </li>
                  </div>
                  <h2 className="cd-cxnlnjus-cs-lk">
                    {" "}
                    1st - Register your store
                  </h2>
                </div>
              </div>
              <img
                className="cdsboocma"
                src={ImportImage.ShopisthanStepsOne}
                alt="setpOne"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="step-of-all-three-in-land-rever-sd">
              <div className="numbaer-of-steps-and-header-para">
                <div>
                  <p className="header-of-step-cb">
                    Create your Inventory by adding your catelog.
                  </p>
                  <div className="paragraph-of-steps-in-land">
                    <li>
                      Create catalogue and add products according to the
                      category available in your offline store by clicking add
                      product from dashboard.
                    </li>
                    <h2 className="cd-cxnlnjus-cs-lk">
                      {" "}
                      2nd - Add catagories & products
                    </h2>
                  </div>
                </div>
              </div>
              <img
                className="cdsboocma"
                src={ImportImage.ShopisthanStepstwo}
                alt="step2"
              />
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div className="step-of-all-three-in-land">
              <div className="numbaer-of-steps-and-header-para">
                <div>
                  <p className="header-of-step-cb">
                    Bring your community at one place by sharing your online
                    store.
                  </p>
                  <div className="paragraph-of-steps-in-land">
                    <li>
                      Share your online store to your social platforms and get
                      your customers directly at your online store instead of
                      direct messages on different social media's. Increase
                      sales and revenue by gaining insights directly to your
                      dashboard.{" "}
                    </li>
                  </div>{" "}
                  <h2 className="cd-cxnlnjus-cs-lk">
                    3rd - Share store and start selling.
                  </h2>
                </div>
              </div>
              <img
                className="cdsboocma"
                src={ImportImage.ShopisthanStepsthree}
                alt="step3"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="display-flec-nee-new-images-at-cn">
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLogoone}
          alt="LandingLogo"
        />
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLogotwo}
          alt="LandingLogo"
        />
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLoggothree}
          alt="LandingLogo"
        />
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLogofour}
          alt="LandingLogo"
        />
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLogofive}
          alt="LandingLogo"
        />
        <img
          className="logon-demcbowien"
          src={ImportImage.LandingLogosix}
          alt="LandingLogo"
        />
      </div>
      <div className="cubosicn">
        <div className="vyciaocin">
          <img
            className="new-testimonial-icbieuba"
            src={ImportImage.Shopisthantestimonial}
            alt="LandingLogo"
          />
        </div>
      </div>
      <div className="cream-color-background-inca">
        <h3 className="paragrapnkd-slskdc">
          Create Online Store and start accepting
          <br /> Orders Today
        </h3>
        <p className="new-para-jcnjakcap">
          Launch your store with Shopisthan at startup costs.
        </p>
        <div className="cmpeomc-btn-for-free-trial">
          <Link to="/free-online-store">
            <button className="btn-for-free-trails-at-bottom-in-land">
              Start FREE trial
            </button>
          </Link>
        </div>
        <div className="cmpeomc-btn-for-free-trial">
          {" "}
          <p className="terms-and-conditions-ciwbn">Terms & Conditions*</p>
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

export default LandingPage;
