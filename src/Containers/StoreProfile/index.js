import React, { useEffect, useState } from "react";
import "./style.css";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import {
  CountryDropdown,
  RegionDropdown,
} from "react-indian-state-region-selector";
import { Link } from "react-router-dom";
import { FreeStorePlanNoOfDaysCompleted } from "../../Functions";
import { editStoreAction } from "../../actions/store.action";
import { HomeNabar } from "../../Components/Navbar/index";
import ProfileNavBarResponsive from "../../Components/Navbar/Responsive";
import DashBoard from "../../Components/SideMenu-Dashboard";
import StoreSubNavBar from "../../Components/Sub-navbar";
import { InputComponents } from "../../Components/Inputs";
import HambergurForProfile from "../../Components/HambergurProfile";
import { BottomNavigationDashboard } from "../../Components/BottomNavigation";
import { EditProfileModal, ReNewStorePlanModal } from "../../Components/Modal";
import StoreResponsiveProfile from "./Responsive";

const StoreProfile = (props) => {
  const [editModal, setEditModal] = useState(false);
  const auth = useSelector((state) => state.auth);
  const storeDetails = useSelector((state) => state.userStore.userStore);
  const [storeEdited, setStoreEdited] = useState(false);
  const store = useSelector((state) => state.userStore);

  const storeName =
    storeDetails && storeDetails.storeName ? storeDetails.storeName : "";

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

  const dispatch = useDispatch();
  const [reNewPlanModal, setReNewPlanModal] = useState(false);
  const [humburgerModal, setShowHumburgerModal] = useState(false);

  useEffect(() => {
    if (
      storeDetails &&
      storeDetails.userStore &&
      storeDetails.userStore.storePlanType &&
      storeDetails.userStore.storePlanType === "Free"
    ) {
      if (
        FreeStorePlanNoOfDaysCompleted(storeDetails.userStore.storeStartedDate)
      ) {
        return setReNewPlanModal(true);
      }
    } else {
      return setReNewPlanModal(false);
    }
  }, [storeDetails]);

  useEffect(() => {
    if (storeEdited && store.loading && store.message) {
      setTimeout(function () {
        setStoreEdited(false);
      }, 2000);
    }
  });

  const close = (value) => {
    setEditModal(false);
    setShowHumburgerModal(false);
  };

  if (!auth.authenticate) {
    return (
      <Redirect
        to={{
          pathname: `/signin`,
          state: { storeId: "Store", Store: true },
        }}
      />
    );
  }

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

  const saveDetails = (e) => {
    e.preventDefault();

    const form = {
      storeName: state.storeName === "" ? storeName : state.storeName,
      storeAddress: state.storeAddress,
      storeDescription: state.storeDescription,
      storeState: storeState,
      storeCity: storeCity,
      storeSince: state.storeSince,
      storeEmail: state.storeEmail,
    };

    setStoreEdited(true);
    dispatch(editStoreAction(form));
  };

  return (
    <>
      <div style={{ background: "#EFF1FF", height: "100vh" }}>
        <div className="dashboard-destop-view-only">
          <HomeNabar />

          <div className="responsive-dashbord-view-block">
            <ProfileNavBarResponsive>
              <div className="div-for-last-four-content">
                <svg
                  onClick={() => setShowHumburgerModal(true)}
                  version="1.0"
                  xmlns="http://www.w3.org/2000/svg"
                  width="25px"
                  height="25px"
                  viewBox="0 0 1024.000000 1024.000000"
                  preserveAspectRatio="xMidYMid meet"
                >
                  <g
                    transform="translate(0.000000,1024.000000) scale(0.100000,-0.100000)"
                    fill="grey"
                    stroke="none"
                  >
                    <path
                      d="M1105 8301 c-222 -64 -392 -238 -449 -458 -21 -80 -21 -246 0 -327
43 -167 168 -325 320 -404 153 -79 -244 -72 4144 -72 4388 0 3991 -7 4144 72
109 57 207 155 263 263 55 107 73 181 73 305 0 124 -18 198 -73 305 -56 108
-154 206 -262 262 -156 80 262 73 -4151 72 -3726 0 -3952 -1 -4009 -18z"
                    />
                    <path
                      d="M1105 5741 c-222 -64 -392 -238 -449 -458 -21 -80 -21 -246 0 -327
43 -167 168 -325 320 -404 153 -79 -244 -72 4144 -72 4388 0 3991 -7 4144 72
109 57 207 155 263 263 55 107 73 181 73 305 0 124 -18 198 -73 305 -56 108
-154 206 -262 262 -156 80 262 73 -4151 72 -3726 0 -3952 -1 -4009 -18z"
                    />
                    <path
                      d="M1105 3181 c-222 -64 -392 -238 -449 -458 -21 -80 -21 -246 0 -327
43 -167 168 -325 320 -404 153 -79 -244 -72 4144 -72 4388 0 3991 -7 4144 72
109 57 207 155 263 263 55 107 73 181 73 305 0 124 -18 198 -73 305 -56 108
-154 206 -262 262 -156 80 262 73 -4151 72 -3726 0 -3952 -1 -4009 -18z"
                    />
                  </g>
                </svg>
              </div>
              <div>
                {" "}
                <h3 className="logo-for-respo">
                  <Link className="PrimaryNav-coreNavigationItem-236 PrimaryNav-home-2zH">
                    <Link to="/" className="PrimaryNav-coreNavigationLink-2uv">
                      <div className="PrimaryNav-logoWrap-564">
                        <span style={{ color: "#1a1a1a", fontSize: "18px" }}>
                          Store Account
                        </span>
                      </div>
                    </Link>
                  </Link>
                </h3>
              </div>
              <div>
                <span></span>
              </div>
            </ProfileNavBarResponsive>
          </div>
          <DashBoard
            storeDetail={storeDetails}
            sidebar
            userName={auth.user.name}
            userPic={auth.user.picture}
            storeName={storeDetails.storeName}
            storeCity={storeDetails.storeCity}
            storeProfilePicture={
              storeDetails.storeProfilePicture &&
              storeDetails.storeProfilePicture.img
                ? storeDetails.storeProfilePicture.img
                : null
            }
          >
            <div className="lkjhasdrfr">
              <StoreSubNavBar>
                <h2 style={{ fontSize: "1.5rem" }}>Store Profile </h2>
                {storeEdited && store.loading && store.message ? (
                  <button className="kajsdkcjecdd">Saved</button>
                ) : (
                  <button className="kajsdkcjecdd" onClick={saveDetails}>
                    Save
                  </button>
                )}
              </StoreSubNavBar>
              <div>
                <div className="ew-store-settings-lk">
                  <h2 className="store-primary-details-active">
                    Primary Deatils
                  </h2>
                  {/* <h2 className="store-primary-details-active">
                    Primary Deatils
                  </h2>
                  <h2 className="store-primary-details-inactive">
                    Store Business
                  </h2>
                  <h2 className="store-primary-details-inactive">
                    Store Address
                  </h2>
                  <h2 className="store-primary-details-inactive">About Shop</h2>
                  <h2 className="store-primary-details-inactive">Store Logo</h2> */}
                </div>
              </div>
              <div
                className="scroll-view-for-more-store-info"
                style={{ marginTop: "1em" }}
              >
                <div className="new-claasname-for-inputsosfof-stre">
                  <div className="new-profile-for-user-full-div-of-info-in-oly">
                    <div className="primary-details-deiv">
                      {" "}
                      <h1>Primary Deatils </h1>
                    </div>
                    <div>
                      <section className="form-group-for-user-profile">
                        <div className="new-addproduct-input-div-mar">
                          <div className="icdsbnlcses">
                            <InputComponents
                              name="storeName"
                              label={"Store Name"}
                              value={state.storeName}
                              onChange={handleChange}
                              placeholder={"Store Name"}
                            />
                          </div>
                          <div className="icdsbnlcses">
                            <InputComponents
                              name="storeEmail"
                              label={"Email Address"}
                              value={state.storeEmail}
                              onChange={handleChange}
                              placeholder={"Store Email"}
                            />
                          </div>
                        </div>
                        <div className="new-addproduct-input-div-mar">
                          <div className="icdsbnlcses">
                            <InputComponents
                              name="storePhoneNumber"
                              label={"Phone Number"}
                              value={state.storePhoneNumber}
                              readOnly={true}
                            />
                          </div>
                          <div className="icdsbnlcses">
                            <InputComponents
                              label={"Store Since"}
                              name="storeSince"
                              value={state.storeSince}
                              onChange={handleChange}
                              placeholder={"Please Enter Store Since"}
                            />
                          </div>
                        </div>

                        <div className="new-addproduct-input-div-mar">
                          <div className="icdsbnlcses">
                            <InputComponents
                              name="storeDescription"
                              label={"Store Description"}
                              value={state.storeDescription}
                              onChange={handleChange}
                              placeholder={"Please Enter storeDescription"}
                            />
                          </div>
                          <div className="icdsbnlcses">
                            <InputComponents
                              name="storeAddress"
                              label={"Store Address"}
                              value={state.storeAddress}
                              onChange={handleChange}
                              placeholder={"Please Enter store address"}
                            />
                          </div>
                        </div>

                        <div className="new-addproduct-input-div-mar">
                          <div className="icdsbnlcses">
                            <span className="label-for-user-profile-label-only ">
                              State
                            </span>
                            <CountryDropdown
                              value={storeState}
                              onChange={(e) => setStoreState(e)}
                              id="CountryDropdown-for-user-profile-only"
                            />
                          </div>
                          <div className="icdsbnlcses">
                            <span className="label-for-user-profile-label-only ">
                              City
                            </span>
                            <RegionDropdown
                              country={storeState}
                              defaultOptionLabel="Select City"
                              value={storeCity}
                              onChange={(e) => setStoreCity(e)}
                              id="CountryDropdown-for-user-profile-only"
                            />
                          </div>
                        </div>
                      </section>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </DashBoard>

          <div className="cjkvopreftghjkl">
            <button className="kajsdkcjecdd" onClick={saveDetails}>
              Save
            </button>
          </div>
        </div>
        <div className="responsive-dashbord-view-block">
          <StoreResponsiveProfile props={props} />
        </div>
      </div>

      <HambergurForProfile
        show={humburgerModal}
        handleclose={() => setShowHumburgerModal(false)}
        close={close}
      />
      {/* <ReNewStorePlanModal visible={reNewPlanModal} /> */}
      <BottomNavigationDashboard></BottomNavigationDashboard>
      <EditProfileModal
        visible={editModal}
        onClose={() => setEditModal(false)}
        Close={close}
      />
      <ReNewStorePlanModal
        visible={reNewPlanModal}
        onClose={() => setReNewPlanModal(false)}
      />
    </>
  );
};

export default StoreProfile;
