import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import { signoutAction } from "../../actions/auth.action";
import ShopisthanMainLogo from "../../img/shopisthan-business-logo (1).png";
import Shopisthanindia from "../../img/shopisthan-india-private-limited-logo.png";
import DropdownMenu from "../Dropdown/index";
import "./style.css";
// import usePWA from "react-pwa-install-prompt";
import Hambergur from "../../Components/Hambergur/index";

const HomeNabar = (props) => {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.userStore);

  const dispatch = useDispatch();

  const logout = () => {
    dispatch(signoutAction());
  };

  // const { isInstallPromptSupported, promptInstall } = usePWA();

  // const onClickInstall = async () => {
  //   const didInstall = await promptInstall();
  //   if (didInstall) {
  //     // User accepted PWA install
  //   }
  // };

  // const renderInstallButton = () => {
  //   if (isInstallPromptSupported) {
  //     return <h2 onClick={onClickInstall}>Download App</h2>;
  //   } else {
  //     return <h2>Download App</h2>;
  //   }
  // };

  return (
    <>
      <div className="ne-wdasboard-jdfkjf-rf">
        <div className="Dashb-oard-navigation-dsd">
          <div className="logo-plus-every-pages-fdfr">
            <Link to="/" className="PrimaryNav-coreNavigationLink-2uv">
              <div className="PrimaryNav-logoWrap-564">
                <img
                  style={{ height: "2.8em" }}
                  src={ShopisthanMainLogo}
                  alt={"ShopisthanLogo"}
                />{" "}
              </div>
            </Link>
          </div>
          <div className="new-akf-vfvdbvc">
            {/* {renderInstallButton()} */}
            <h2>Download App</h2>
            {auth.authenticate && store && store.userStore ? (
              <button className="Login-inds-hfurfsd" onClick={logout}>
                Logout
              </button>
            ) : (
              <button className="Login-inds-hfurfsd">
                <Link to="/signin">Login</Link>
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

const Homepagenavbar = (props) => {
  const auth = useSelector((state) => state.auth);
  const store = useSelector((state) => state.userStore);
  const [humburgerModal, setShowHumburgerModal] = useState(false);
  // const { isInstallPromptSupported, promptInstall } = usePWA();

  // const onClickInstall = async () => {
  //   const didInstall = await promptInstall();
  //   if (didInstall) {
  //     // User accepted PWA install
  //   }
  // };

  // const renderInstallButton = () => {
  //   if (isInstallPromptSupported) {
  //     return <h2 onClick={onClickInstall}>Download App</h2>;
  //   } else {
  //     return <h2>Download App</h2>;
  //   }
  // };

  const close = (value) => {
    setShowHumburgerModal(false);
  };

  return (
    <>
      <div className="new-navbar-at-homepage-in-homds">
        <div className="main-navbar-component-at-newdf-dsf">
          <div className="logo-plus-every-pages-fdfr">
            <img
              src={Shopisthanindia}
              alt={"ShopisthanLogo"}
              className="cjbeownd"
            />{" "}
            <img
              style={{ height: "2em" }}
              src={ShopisthanMainLogo}
              alt={"ShopisthanLogo"}
              className="plkmnbvfsghjk"
            />{" "}
          </div>
          <div className="new-akf-vfvdbvc">
            <DropdownMenu
              menu={
                <NavLink exact activeClassName="active" to="/">
                  Start{" "}
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </NavLink>
              }
              menus={[
                {
                  label: "Start your bussiness",
                  to: "https://shopisthan.in/start-your-business/",
                  icon: null,
                },

                {
                  label: "Branding",
                  to: "https://shopisthan.in/branding/",
                  icon: null,
                },
              ]}
            ></DropdownMenu>

            {/* <NavLink exact activeClassName="active" to="/"> */}
            <DropdownMenu
              menu={
                <NavLink exact activeClassName="active" to="/">
                  Sell
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </NavLink>
              }
              menus={[
                {
                  label: "Create Online Store",
                  to: "https://www.shopisthan.io/",
                  icon: null,
                },

                {
                  label: "Create eCommerce",
                  to: "https://www.shopisthan.com/",
                  icon: null,
                },
                {
                  label: "How to Sell Product",
                  to: "https://shopisthan.in/press-and-media/how-to-sell-your-products-online/",
                  icon: null,
                },
              ]}
            ></DropdownMenu>
            {/* </NavLink> */}
            {/* <NavLink exact activeClassName="active" to="/"> */}
            <DropdownMenu
              menu={
                <NavLink exact activeClassName="active" to="/">
                  Market
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </NavLink>
              }
              menus={[
                {
                  label: "Optimize your site",
                  to: "https://shopisthan.in/search-engine-optimization/",
                  icon: null,
                },

                {
                  label: "Market Your Brand",
                  to: "https://shopisthan.in/social-media-marketing/",
                  icon: null,
                },
                {
                  label: "Google Ads",
                  to: "https://shopisthan.in/google-ads/",
                  icon: null,
                },
                {
                  label: "Facebook Ads",
                  to: "https://shopisthan.in/facebook-ads/",
                  icon: null,
                },
              ]}
            ></DropdownMenu>
            {/* </NavLink> */}
            {/* <NavLink exact activeClassName="active" to="/"> */}
            <DropdownMenu
              menu={
                <NavLink exact activeClassName="active" to="/">
                  Develop
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </NavLink>
              }
              menus={[
                {
                  label: "Website Development",
                  to: "https://shopisthan.in/website-development/",
                  icon: null,
                },

                {
                  label: "Application Development",
                  to: "https://shopisthan.in/application-development/",
                  icon: null,
                },
              ]}
            ></DropdownMenu>
            {/* </NavLink> */}
            {/* <NavLink exact activeClassName="active" to="/"> */}
            <DropdownMenu
              menu={
                <NavLink exact activeClassName="active" to="/">
                  Resources
                  <img
                    style={{
                      height: "10px",
                      marginLeft: "2px",
                      paddingTop: "2px",
                    }}
                    src={
                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                    }
                    alt="Start"
                  />
                </NavLink>
              }
              menus={[
                {
                  label: "Why Shopisthan",
                  to: "https://shopisthan.in/about/",
                  icon: null,
                },

                {
                  label: "Blogs",
                  to: "https://shopisthan.in/blog/",
                  icon: null,
                },
                {
                  label: "Supports",
                  to: "https://shopisthan.in/category/support-and-help/",
                  icon: null,
                },

                {
                  label: "What's New",
                  to: "https://shopisthan.in/category/shopisthan-updates/",
                  icon: null,
                },
                {
                  label: "FAQ",
                  to: "https://shopisthan.in/category/support-and-help/frequently-asked-questions/",
                  icon: null,
                },
                {
                  label: "Careers",
                  to: "https://shopisthan.in/careers/",
                  icon: null,
                },
              ]}
            ></DropdownMenu>
            {/* </NavLink> */}
          </div>
          <div className="new-vfvdbvc">
            {/* {renderInstallButton()} */}{" "}
            {auth.authenticate && store && store.userStore ? (
              <Link to="/storeDashboard">
                <button className="Login-inds-hfurfsd">Visit Store</button>
              </Link>
            ) : (
              <Link to="/signin">
                <button className="Login-inds-hfurfsd">Login</button>
              </Link>
            )}
            {/* <div className="duief-snjovd-sjfr">
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
            </div> */}
          </div>
        </div>
      </div>
      <Hambergur
        show={humburgerModal}
        handleclose={() => setShowHumburgerModal(false)}
        close={close}
      />
    </>
  );
};

const SubNavbar = (props) => {
  return (
    <>
      <div className="new-secound-navbar-in-home-page-deal">
        {" "}
        <div className="noeine-cpemkle">
          <div className="ckpewmcawod">
            <div className="logo-plus-every-pages-fdfr">
              <img
                style={{ height: "2em" }}
                src={ShopisthanMainLogo}
                alt={"ShopisthanLogo"}
              />{" "}
            </div>
          </div>
          <div className="cygvubhjnkwadsfv">
            <NavLink exact activeClassName="active" to="/">
              Overview
            </NavLink>
            <NavLink exact activeClassName="active" to="/feature">
              Feature
            </NavLink>
            <NavLink exact activeClassName="active" to="/pricing">
              Pricing
            </NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export { HomeNabar, Homepagenavbar, SubNavbar };

{
  /* <a
              target="_blank"
              href="https://www.instagram.com/shopisthan_official/"
              rel="noopener noreferrer"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 512.000000 512.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M1497 5109 c-428 -23 -754 -139 -991 -350 -317 -283 -456 -611 -486
-1149 -27 -487 -20 -1997 11 -2270 42 -382 172 -680 392 -902 178 -179 350
-280 602 -353 270 -78 470 -88 1690 -82 980 4 1059 7 1260 48 590 119 990 522
1104 1111 40 206 42 315 39 1493 l-4 1130 -23 125 c-60 327 -178 568 -374 768
-277 283 -586 402 -1117 432 -215 12 -1881 11 -2103 -1z m2193 -479 c298 -29
504 -108 657 -253 114 -107 187 -226 237 -386 38 -120 55 -231 66 -436 13
-233 13 -1767 0 -1996 -23 -415 -99 -620 -298 -811 -158 -150 -340 -227 -617
-258 -248 -28 -2097 -28 -2330 0 -194 23 -354 71 -471 141 -67 39 -199 161
-248 228 -79 107 -141 269 -170 441 -27 162 -36 486 -36 1265 0 766 9 1081 35
1240 44 274 147 467 322 608 92 74 159 110 283 151 131 43 278 65 512 76 266
12 1917 4 2058 -10z"
                  />
                  <path
                    d="M3848 4227 c-150 -43 -241 -192 -216 -353 11 -70 35 -118 85 -167 61
-62 105 -80 206 -85 83 -4 91 -3 152 27 69 34 112 78 148 151 30 63 31 186 1
251 -66 142 -227 217 -376 176z"
                  />
                  <path
                    d="M2396 3869 c-201 -27 -400 -104 -576 -222 -94 -63 -280 -249 -343
-344 -99 -150 -174 -332 -208 -508 -21 -105 -18 -388 5 -493 115 -534 503
-923 1038 -1039 116 -25 400 -25 516 0 270 59 474 169 668 362 197 195 312
408 371 685 25 118 25 382 0 500 -114 537 -510 935 -1042 1045 -95 20 -332 28
-429 14z m380 -489 c301 -77 533 -309 615 -615 17 -62 22 -109 22 -205 0 -144
-21 -237 -78 -357 -182 -384 -622 -580 -1015 -452 -288 93 -497 318 -577 619
-24 90 -23 289 1 385 102 397 464 669 862 649 51 -2 127 -13 170 -24z"
                  />
                </g>
              </svg>
            </a>
            <a
              target="_blank"
              href="https://www.facebook.com/shopisthanofficial"
              rel="noreferrer"
            >
              <svg
                version="1.0"
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 512.000000 513.000000"
                preserveAspectRatio="xMidYMid meet"
              >
                <g
                  transform="translate(0.000000,513.000000) scale(0.100000,-0.100000)"
                  fill="#000000"
                  stroke="none"
                >
                  <path
                    d="M2830 5114 c-466 -100 -809 -411 -933 -849 -55 -196 -67 -303 -67
-620 l0 -235 -248 0 c-297 0 -331 -7 -403 -79 -77 -77 -79 -88 -79 -567 0
-252 4 -432 11 -461 14 -65 55 -121 114 -158 l48 -30 278 -3 279 -3 2 -962 3
-962 22 -41 c25 -48 83 -101 129 -120 49 -20 969 -20 1018 0 46 19 104 72 129
120 l22 41 3 963 2 962 313 0 c191 0 327 4 351 11 48 13 123 82 147 134 17 37
19 76 19 505 l0 465 -30 53 c-37 64 -94 107 -161 121 -29 7 -173 11 -345 11
l-296 0 4 213 c2 116 7 219 12 228 17 38 52 43 366 49 288 5 307 6 345 27 42
22 78 58 111 108 18 28 19 55 22 460 2 237 0 444 -3 461 -8 46 -56 112 -105
145 l-43 29 -486 -1 c-376 0 -501 -4 -551 -15z m880 -594 l0 -310 -219 0
c-250 0 -341 -12 -438 -60 -106 -52 -172 -151 -193 -288 -7 -40 -10 -190 -8
-363 l3 -296 27 -35 c51 -67 56 -68 447 -68 l351 0 0 -340 0 -339 -358 -3
-359 -3 -36 -25 c-21 -14 -46 -43 -57 -66 -20 -39 -20 -63 -20 -1022 l0 -982
-355 0 -355 0 0 979 c0 667 -3 989 -11 1008 -15 42 -68 92 -109 103 -19 5
-164 10 -322 10 l-288 0 0 340 0 340 301 0 c336 0 346 2 397 68 l27 35 6 386
c6 412 11 456 65 619 60 180 164 328 302 431 131 96 287 158 472 185 14 2 184
4 378 5 l352 1 0 -310z"
                  />
                </g>
              </svg>
            </a> */
}
