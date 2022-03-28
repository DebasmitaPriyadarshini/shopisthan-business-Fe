import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactCardFlip from "react-card-flip";
import { YOUR_BACK_COMPONENT, YOUR_FRONT_CCOMPONENT } from "./CardFilp";
import Aos from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { ImportImage } from "../../Components/ImportedImages";
import { Homepagenavbar, SubNavbar } from "../../Components/Navbar";
import HomeFotter from "../../Components/HomeFotter/index";

const Feature = () => {
  const [isFlipped, setIsFilpped] = useState(false);
  const [isFlipped1, setIsFilpped1] = useState(false);

  useEffect(() => {
    Aos.init({ duration: 800 });
  }, []);

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
      <div className="very-first-one">
        <div className="class-for-width-andaling-center">
          {/* <div className="maindiv-for-mobile-respo"> */}
          <div className="first-div-only-for-padding">
            <div className="for-respo-flex">
              <div className="jbcsc-iecna-cdkach">
                <h4 className="ship-local-ship-global">
                  {" "}
                  Shop Local Sell Global{" "}
                </h4>
                <div>
                  <h1 className="Shift-your-Offline-Store-to-Online">
                    Shift your Offline Store to Online
                  </h1>
                </div>
                <div className="header-hgj-h1-gfvh-frfsf-respo">
                  <h2>
                    Selling Online <br />
                    is no more Difficult with
                    <br />
                    Shopisthan Business
                  </h2>
                </div>
                <div>
                  <h2 className="header-hgj-h1-gfvh-frfsf">
                    Selling Online is no more Difficult with Shopisthan Business
                  </h2>
                </div>
                <div className="flex-with-img-ckejjDx">
                  <div>
                    <p className="bfr-free-dsd-pl-dyr-fmd-kde">
                      Start your FREE trial with Shopisthan for 30 days
                    </p>
                    <Link to="/Free-Online-Store">
                      <button className="class-forr-new-creatww-free-bn-store">
                        Free Online Store
                      </button>
                    </Link>

                    <Link to="/">
                      <button className="dot-iio-redirection-cjejcjn">
                        Free Online Store
                      </button>
                    </Link>
                  </div>
                  <div className="content-img-for-land-page-only">
                    <img
                      src={ImportImage.StoreView}
                      alt="homebanner"
                      className="respo-for-mobrightp"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* //// Grey Background /// */}

      {/* //// Grey Background /// */}
      <div className="very-secound-one">
        <div className="class-for-width-andaling-center">
          {/* ////////////////////////////////////////////////////// */}
          <div className="for-desktop-laptop-etc">
            <section>
              <div className="content-uyis-prara-pnejs">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                    margin: "0px 7em",
                  }}
                >
                  <div style={{ paddingLeft: "4em" }}>
                    {" "}
                    <div>
                      <div className="header-hgj-h1-jfk-ui-ux-new-des">
                        <h2>
                          Go Online and Grow Your Business Beyond Location
                        </h2>
                      </div>
                      <div className="header-hgj-h1-jfk-ui-ux-new-des-without-respo">
                        <h2>
                          Go Online and Grow Your Business Beyond Location
                        </h2>
                      </div>
                    </div>
                    <h3
                      className="headerthree-for-d-rgf-pop-ijhu"
                      data-title-for="2izPITjmYv6gSXn7zKdYaT"
                    >
                      Bring Your store online
                    </h3>
                    <p className="para-advantages">
                      Build your online store with Shopisthan without any
                      technical knowledge and coding background. And serve your
                      customers without any interruption
                    </p>
                    {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div> */}
                  </div>
                  <div>
                    <img
                      className="img-left-rifgth-up-down"
                      src={ImportImage.BringStoreOnline}
                      alt="Shopisthan"
                    />
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "row-reverse",
                    margin: "0px 7em",
                  }}
                >
                  <div>
                    <img
                      className="img-left-rifgth-up--hgyfjd"
                      src={ImportImage.AddProductView}
                      alt="AddProduct"
                    />
                  </div>
                  <div style={{ paddingRight: "74px" }}>
                    {" "}
                    <h3
                      className="headerthree-for-d-rgf-pop-ijhu"
                      data-title-for="2izPITjmYv6gSXn7zKdYaT"
                    >
                      Add products to your store
                    </h3>
                    <p className="para-advantages">
                      Add your products you want to sell online that may be home
                      made products or anything you want to sell. Manage your
                      stocks and catalogue through Shopisthan by adding and
                      Editing your product information.
                    </p>
                    {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">payments</span>{" "}
                          </a>
                        </a>
                      </div> */}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    alignItems: "center",
                    margin: "0px 7em",
                  }}
                >
                  <div style={{ paddingLeft: "4em" }}>
                    {" "}
                    <h3
                      className="headerthree-for-d-rgf-pop-ijhu"
                      data-title-for="2izPITjmYv6gSXn7zKdYaT"
                    >
                      Share Store with your Customers
                    </h3>
                    <p className="para-advantages">
                      You can share your online Store to your existing offline
                      customers so that you can increase your sell in any
                      situation and also able to get new cutomers by sharing
                      stores
                    </p>
                    {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div> */}
                  </div>
                  <div>
                    <img
                      className="img-left-rifgth-up-down"
                      src={ImportImage.ShareStore}
                      alt="Shopisthan"
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* //// For  Mobile /// */}

          <div className="for-mobile-table-etc" style={{ padding: "1.5em" }}>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div>
                  <div className="imgathome-at-odjfe">
                    <img
                      className="img-left-rifgth-up-down"
                      src={ImportImage.BringStoreOnline}
                      alt="OnlineStore"
                    />
                  </div>
                  <div>
                    {" "}
                    <h3
                      className="headerthree-for-d-rgf-pop-ijhu"
                      data-title-for="2izPITjmYv6gSXn7zKdYaT"
                    >
                      Bring Your store online
                    </h3>
                    <p className="para-advantages">
                      Build your online store with Shopisthan without any
                      technical knowledge and coding background. And serve your
                      customers without any interruption
                    </p>
                    {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div> */}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div>
                  <div className="imgathome-at-odjfe">
                    <img
                      className="img-left-rifgth-up--hgyfjd"
                      src={ImportImage.AddProductView}
                      alt="AddProduct"
                    />
                  </div>
                  <div>
                    {" "}
                    <h3
                      className="headerthree-for-d-rgf-pop-ijhu"
                      data-title-for="2izPITjmYv6gSXn7zKdYaT"
                    >
                      Add products to your store
                    </h3>
                    <p className="para-advantages">
                      Add your products you want to sell online that may be home
                      made products or anything you want to sell. Manage your
                      stocks and catalogue through Shopisthan by adding and
                      Editing your product information.
                    </p>
                    {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">payments</span>{" "}
                          </a>
                        </a>
                      </div> */}
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div>
                  <div>
                    <div className="imgathome-at-odjfe">
                      <img
                        className="img-left-rifgth-up-down"
                        src={ImportImage.ShareStore}
                        alt="Share-Store"
                      />
                    </div>
                    <div>
                      {" "}
                      <h3
                        className="headerthree-for-d-rgf-pop-ijhu"
                        data-title-for="2izPITjmYv6gSXn7zKdYaT"
                      >
                        Share Store with your Customers
                      </h3>
                      <p className="para-advantages">
                        You can share your online Store to your existing offline
                        customers so that you can increase your sell in any
                        situation and also able to get new cutomers by sharing
                        stores
                      </p>
                      {/* <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div> */}
                    </div>
                  </div>
                  <div className="header-hgj-p-paragraph">
                    <p>
                      Discover your Store Type{" "}
                      <Link to="/explore-plans">
                        {" "}
                        <a className="for-see-plan">Explore plans</a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* ////////////////////////////////////////////////////// */}

          <div>
            <section className="sections-for-new-content-in-landing-page-dash">
              <div className="home-landing-dash-img-with-content">
                <h3 className="headerthree-for-dashborad-header">
                  “A User-friendly Dashboard is meant for you where you can
                  easily manage your store by yourself”
                </h3>
                <h3 className="headerthree-for-dashborad-header-without-respo">
                  “A User-friendly Dashboard is meant for you
                  <br /> where you can easily manage
                  <br /> your store by yourself”
                </h3>
                <p style={{ textAlign: "center", lineHeight: "28px" }}>
                  <a
                    href="https://goo.gl/maps/RWNUY5BTnmhjAhaD8"
                    className="rating-anchor-on-home"
                  >
                    5 out of 5 stars
                  </a>
                  <br />
                  Poona Sports Reviews
                </p>
              </div>
            </section>
            <section className="sections-for-new-content-in-landing-page-dash">
              <div className="home-landing-dash-img-only-dashbo">
                <img
                  className="home-landing-dash-img-only-dashbo"
                  src={ImportImage.DashboardScreen}
                  alt="Dashboard"
                />
              </div>
            </section>
            <section className="sections-for-new-content-in-landing-page-dash">
              <div className="reatiler-manufacturer-div">
                <h2
                  className="balance-text-h2"
                  data-title-for="412xof13M3xJn1075Ruxdi"
                >
                  Sell in your own Way With your online store{" "}
                </h2>
                <p className="left-para-left">
                  No matter What’s your Business Shopisthan will Make it Easy to
                  Bring your Store Online
                </p>
                <p className="left-para-left-without-respo">
                  Bring your Retail Store online and start selling without
                  hassle
                  {/* <br /> */}
                  take your online orders and grow your customers
                </p>
              </div>
            </section>
            <section className="sections-for-new-content-in-landing-page-dash">
              <div className="aisfbiaf-filex">
                <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal">
                  <YOUR_FRONT_CCOMPONENT>
                    <div className="flip-card-in-home">
                      <div class="column-qearf-uy-yu-poi">
                        <div style={{ marginBottom: "10px" }}>
                          {" "}
                          <h3 class="balance-text-icblsae">
                            Startup-from-home
                          </h3>
                        </div>

                        <p class="balance-text">
                          Choose Home start-up Plan and Create your Home
                          start-up store and start accepting Orders
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          cursor: "pointer",
                        }}
                        onClick={() => setIsFilpped(!isFlipped)}
                      >
                        {" "}
                        <img
                          style={{ height: "1.5em" }}
                          src={
                            "https://static.thenounproject.com/png/267318-200.png"
                          }
                          alt="logo"
                        />{" "}
                        <h4>Find out More</h4>
                      </div>
                      <div>
                        <img
                          className="img-of-flip-card"
                          src={ImportImage.HomeSellerProduct}
                          alt="logo"
                        />
                      </div>
                    </div>
                  </YOUR_FRONT_CCOMPONENT>

                  <YOUR_BACK_COMPONENT>
                    <div className="flip-card-in-home">
                      <div class="column-qearf-uy-yu-poi">
                        <div style={{ marginBottom: "10px" }}>
                          {" "}
                          <h3 class="balance-text-icblsae">
                            Startup-from-home
                          </h3>
                        </div>

                        <ul>
                          <div className="display-flex-for-tixk-abnd-pointer">
                            <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                            <li className="pointer-fore-reatil-and-home">
                              Get your Online Orders through your Online Store
                            </li>
                          </div>
                          <div className="display-flex-for-tixk-abnd-pointer">
                            <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                            <li className="pointer-fore-reatil-and-home">
                              Manage your Stock
                            </li>
                          </div>
                          <div className="display-flex-for-tixk-abnd-pointer">
                            <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                            <li className="pointer-fore-reatil-and-home">
                              Share your online store to your existing customers
                            </li>
                          </div>
                          <div className="display-flex-for-tixk-abnd-pointer">
                            <a href="https://shopisthan.in/startup-from-home/">
                              {" "}
                              <button className="flip-button">Know More</button>
                            </a>
                          </div>
                        </ul>
                      </div>
                      <div className="claodjai-back-btn-svg">
                        <svg
                          onClick={() => setIsFilpped(!isFlipped)}
                          width="32"
                          height="32"
                          viewBox="0 0 32 32"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M13 18L9 14M9 14L13 10M9 14H13.25H16.5C18.4737 14 19.8676 14.2451 21 15C22.5 16 23 17.139 23 18.5C23 19.861 22 21.5 20.6023 22.3917C19.5 23 18.361 23 17 23M31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16Z"
                            stroke="#000"
                            stroke-width="2"
                            stroke-miterlimit="10"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </div>
                  </YOUR_BACK_COMPONENT>
                </ReactCardFlip>
                <div className="padding-top-for-fliping-the-fliper">
                  <ReactCardFlip
                    isFlipped={isFlipped1}
                    flipDirection="horizontal"
                  >
                    <YOUR_FRONT_CCOMPONENT>
                      <div className="flip-card-in-home">
                        <div class="column-qearf-uy-yu-poi">
                          <div style={{ marginBottom: "10px" }}>
                            {" "}
                            <h3 class="balance-text-icblsae">Retail Store</h3>
                          </div>

                          <p class="balance-text">
                            Choose Retailers Plan and Create your Online Retail
                            store and start accepting Orders
                          </p>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "8px",
                            cursor: "pointer",
                          }}
                          onClick={() => setIsFilpped1(!isFlipped1)}
                        >
                          {" "}
                          <img
                            style={{ height: "1.5em" }}
                            src={
                              "https://static.thenounproject.com/png/267318-200.png"
                            }
                            alt="logo"
                          />{" "}
                          <h4>Find out More</h4>
                        </div>
                        <div>
                          <img
                            className="img-of-flip-card"
                            src={ImportImage.RetailerStore}
                            alt="logo"
                          />
                        </div>
                      </div>
                    </YOUR_FRONT_CCOMPONENT>

                    <YOUR_BACK_COMPONENT>
                      <div className="flip-card-in-home">
                        <div class="column-qearf-uy-yu-poi">
                          <div style={{ marginBottom: "10px" }}>
                            {" "}
                            <h3 class="balance-text-icblsae">Retail Store</h3>
                          </div>

                          <ul>
                            <div className="display-flex-for-tixk-abnd-pointer">
                              <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                              <li className="pointer-fore-reatil-and-home">
                                Get online orders for your retail store
                              </li>
                            </div>
                            <div className="display-flex-for-tixk-abnd-pointer">
                              <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                              <li className="pointer-fore-reatil-and-home">
                                Enhance your store visibility
                              </li>
                            </div>
                            <div className="display-flex-for-tixk-abnd-pointer">
                              <h4 style={{ paddingTop: "15px" }}>✓ </h4>{" "}
                              <li className="pointer-fore-reatil-and-home">
                                Grow your sell through online store
                              </li>
                            </div>
                            <div className="display-flex-for-tixk-abnd-pointer">
                              <a href="https://shopisthan.in/startup-from-home/">
                                {" "}
                                <button className="flip-button">
                                  Know More
                                </button>
                              </a>
                            </div>
                          </ul>
                        </div>
                        <div className="claodjai-back-btn-svg">
                          <svg
                            onClick={() => setIsFilpped1(!isFlipped1)}
                            width="32"
                            height="32"
                            viewBox="0 0 32 32"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M13 18L9 14M9 14L13 10M9 14H13.25H16.5C18.4737 14 19.8676 14.2451 21 15C22.5 16 23 17.139 23 18.5C23 19.861 22 21.5 20.6023 22.3917C19.5 23 18.361 23 17 23M31 16C31 24.2843 24.2843 31 16 31C7.71573 31 1 24.2843 1 16C1 7.71573 7.71573 1 16 1C24.2843 1 31 7.71573 31 16Z"
                              stroke="#000"
                              stroke-width="2"
                              stroke-miterlimit="10"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </YOUR_BACK_COMPONENT>
                  </ReactCardFlip>
                </div>
              </div>
            </section>
          </div>
          <div className="new-home-padding-inleft-respo-adnefrs">
            <div className="for-mobile-table-etc">
              <section>
                <div className="content-uyis-prara-pnejs">
                  <div className="header-head-h-d-e">
                    <h2 className="balance-text-h2">
                      The benefits you can take from Shopisthan.
                    </h2>
                  </div>
                  <div>
                    <div>
                      <img
                        className="img-left-rifgth-up-down"
                        src={ImportImage.Empower}
                        alt="logo"
                      />
                    </div>
                    <div>
                      {" "}
                      <h3
                        className="headerthree-for-d-rgf-pop-ijhu"
                        data-title-for="2izPITjmYv6gSXn7zKdYaT"
                      >
                        Empower your traditional way of Selling
                      </h3>
                      <p className="para-advantages">
                        Set up your store in just 3 steps. Shopisthan the
                        platform to create, start, run and grow your business
                        online. You can create your own community beyound your
                        location. Anyone can create store here. You will get
                        your professional dashboard where you can manage your
                        products and sells.
                      </p>
                      <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="content-uyis-prara-pnejs">
                  <div>
                    <div>
                      <img
                        className="img-left-rifgth-up--hgyfjd"
                        src={ImportImage.Payment}
                        alt="logo"
                      />
                    </div>
                    <div>
                      {" "}
                      <h3
                        className="headerthree-for-d-rgf-pop-ijhu"
                        data-title-for="2izPITjmYv6gSXn7zKdYaT"
                      >
                        Payment made Easy
                        <br />
                        with Shopisthan
                      </h3>
                      <p className="para-advantages">
                        You can accept your payments by Cash on Delivery (COD)
                        and online Payments. Accept all major cards like Debit
                        Cards, Credit Cards, UPI Payments etc.
                      </p>
                      <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">payments</span>{" "}
                          </a>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* //////// */}

            <div className="for-desktop-laptop-etc">
              <section>
                <div className="content-uyis-prara-pnejs">
                  <div className="header-head-h-d-e-wihout-respo">
                    <h2 className="balance-text-h2">
                      The benefits you can take from Shopisthan
                    </h2>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      paddingTop: "2em",
                      margin: "0em 7em",
                    }}
                  >
                    <div style={{ paddingRight: "4em" }}>
                      {" "}
                      <h3
                        className="headerthree-for-d-rgf-pop-ijhu"
                        data-title-for="2izPITjmYv6gSXn7zKdYaT"
                      >
                        Empower your traditional way of Selling
                      </h3>
                      <p className="para-advantages">
                        Set up your store in just 3 steps. Shopisthan the
                        platform to create, start, run and grow your business
                        online. You can create your own community beyound your
                        location. Anyone can create store here. You will get
                        your professional dashboard where you can manage your
                        products and sells.
                      </p>
                      <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">solutions</span>{" "}
                          </a>
                        </a>
                      </div>
                    </div>
                    <div>
                      <img
                        style={{ marginTop: "60px" }}
                        className="img-left-rifgth-up-down"
                        src={ImportImage.Empower}
                        alt="logo"
                      />
                    </div>
                  </div>
                </div>
              </section>
              <section>
                <div className="content-uyis-prara-pnejs">
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      margin: "0em 7em",
                    }}
                  >
                    <div>
                      <img
                        className="img-left-rifgth-up--hgyfjd"
                        src={ImportImage.Payment}
                        alt="logo"
                      />
                    </div>
                    <div style={{ paddingLeft: "80px" }}>
                      {" "}
                      <h3
                        className="headerthree-for-d-rgf-pop-ijhu"
                        data-title-for="2izPITjmYv6gSXn7zKdYaT"
                      >
                        Payment made Easy with Shopisthan
                      </h3>
                      <p className="para-advantages">
                        You can accept your payments by Cash on Delivery (COD)
                        and online Payments. Accept all major cards like Debit
                        Cards, Credit Cards, UPI Payments etc.
                      </p>
                      <div>
                        <a
                          href="https://shopisthan.in/"
                          className="ios-io-oi-uio"
                        >
                          <a href="https://shopisthan.in/" className="cniowocn">
                            Learn more about Shopisthan{" "}
                            <span class="arrow no-wrap">payments</span>{" "}
                          </a>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <section style={{ paddingTop: "2em" }}>
              <div className="content-uyis-prara-pnejs">
                <div className="header-head-h-d-e-icscsc">
                  <h2 className="balance-text-h2">Shopisthan Online pricing</h2>
                  <h2 className="balance-text-h2"> and processing.</h2>
                </div>
                <div className="header-head-h-d-e-icscsc-wihout-respo">
                  <h2 className="balance-text-h2">
                    Shopisthan Online pricing and processing.
                  </h2>
                </div>
                <div className="display-flex-for-mobile">
                  <div className="pricing-box-on-home-respo-for-small-experts-not">
                    <div>
                      <div class="headings-compact">
                        <p
                          style={{ marginBottom: "1.25em", fontWeight: "600" }}
                        >
                          Online Store
                        </p>
                        <div style={{ display: "flex", gap: "5px" }}>
                          <h2 className="oisnkvvr" id="0">
                            ₹199/mo
                          </h2>
                          <h2
                            style={{ marginBottom: "1.25em", fontSize: "38px" }}
                            id="0"
                          >
                            ₹99/mo
                          </h2>
                        </div>
                        <p className="font-weight-and-sixe-for-prod-and-online">
                          Online Store
                        </p>
                        <p className="font-weight-and-sixe-for-prod-and-online">
                          200 Products
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="pricing-box-on-home-respo-for-small-experts-not">
                      <div>
                        <div class="headings-compact">
                          <p
                            style={{
                              marginBottom: "1.25em",
                              fontWeight: "600",
                            }}
                          >
                            Home Start-Up Store
                          </p>
                          <div style={{ display: "flex", gap: "5px" }}>
                            {" "}
                            <h2 className="oisnkvvr" id="0">
                              ₹599/mo
                            </h2>
                            <h2
                              style={{
                                marginBottom: "1.25em",
                                fontSize: "38px",
                              }}
                              id="0"
                            >
                              ₹199/Mo
                            </h2>
                          </div>

                          <p className="font-weight-and-sixe-for-prod-and-online">
                            Online Store
                          </p>
                          <p className="font-weight-and-sixe-for-prod-and-online">
                            1000 Products
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pricing-box-on-home-respo-for-small-experts-not">
                    <div>
                      <div class="headings-compact">
                        <p
                          style={{ marginBottom: "1.25em", fontWeight: "600" }}
                        >
                          Retail Store
                        </p>
                        <div style={{ display: "flex", gap: "5px" }}>
                          {" "}
                          <h2 className="oisnkvvr" id="0">
                            ₹999/mo
                          </h2>
                          <h2
                            style={{ marginBottom: "1.25em", fontSize: "38px" }}
                            id="0"
                          >
                            ₹599/mo
                          </h2>
                        </div>
                        <p className="font-weight-and-sixe-for-prod-and-online">
                          Online Store
                        </p>
                        <p className="font-weight-and-sixe-for-prod-and-online">
                          5000 Products
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <Link to="/explore-plans">
                  <div>
                    <div className="pricing-href-tag-blue">
                      <div className="ios-io-oi-uio">
                        <div className="cniowocn-bciec">
                          Detailed Pricing Plan{" "}
                          <span class="arrow no-wrap"></span>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            </section>

            <section>
              <div className="content-uyis-prara-pnejs">
                <div className="help-uiodgs-and-uipfgh-plus">
                  <div className="help-uiodgs-and-uipf">
                    <h2 className="balance-text-h2">Major Features</h2>
                  </div>
                  <div className="help-uiodgs-and-uipf-wihout-respo-o">
                    <h2 className="balance-text-h2">Major Features</h2>
                  </div>
                  <div className="flex-coloumg-flex">
                    <div className="pricing-box-on-home-respo-first">
                      <div>
                        <div class="talk-to-shopistha">
                          <div>
                            <h5 id="talk-to-shopisthan-expert">
                              Store Dashboard
                            </h5>
                            <div style={{ marginBottom: "1.25em" }}>
                              <p className="talk-experts-paragraphy">
                                In every Business all you need is to manage your
                                store and hence Shopisthan providing you with
                                your professional Dashboard
                              </p>
                            </div>
                            {/* <a className="ios-io-oi-uio">
                                <a className="cniowocn">
                                  Contact <span class="arrow no-wrap">us</span>{" "}
                                </a>
                              </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pricing-box-on-home-respo-first">
                      <div>
                        <div class="talk-to-shopistha">
                          <div>
                            <h5 id="talk-to-shopisthan-expert">Catalog</h5>
                            <div style={{ marginBottom: "1.25em" }}>
                              <p className="talk-experts-paragraphy">
                                We are providing feature to add the featured
                                catalog
                              </p>
                            </div>
                            {/* <a className="ios-io-oi-uio">
                                <a className="cniowocn">
                                  Contact <span class="arrow no-wrap">us</span>{" "}
                                </a>
                              </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex-coloumg-flex">
                    <div className="pricing-box-on-home-respo-first">
                      <div>
                        <div class="talk-to-shopistha">
                          <div>
                            <h5 id="talk-to-shopisthan-expert">Products</h5>
                            <div style={{ marginBottom: "1.25em" }}>
                              <p className="talk-experts-paragraphy">
                                You can add products to your store category wise
                              </p>
                            </div>
                            {/* <a className="ios-io-oi-uio">
                                <a className="cniowocn">
                                  Contact <span class="arrow no-wrap">us</span>{" "}
                                </a>
                              </a> */}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pricing-box-on-home-respo-first">
                      <div>
                        <div class="talk-to-shopistha">
                          <div>
                            <h5 id="talk-to-shopisthan-expert">Share</h5>
                            <div style={{ marginBottom: "1.25em" }}>
                              <p className="talk-experts-paragraphy">
                                Sharing store is an added feature for store
                                owners through which they can share the store to
                                their current offline customers
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section>
              <div className="content-uyis-prara-pnejs">
                <div className="nchf-respo-without-respo">
                  {" "}
                  <h3
                    className="balance-text-icblsae"
                    style={{ textAlign: "center" }}
                  >
                    Create Online Store and start accepting Orders Today
                  </h3>
                </div>
                <p className="balance-text-phg">
                  Launch your store with
                  <br data-owner="balance-text" />
                  Shopisthan at
                  <br data-owner="balance-text" />
                  startup costs.
                </p>
                <p
                  className="balance-text-without-respo"
                  style={{ textAlign: "center" }}
                >
                  Launch your store with Shopisthan at startup costs.
                </p>
                <div
                  style={{ display: "flex", justifyContent: "center" }}
                  className="btn-for-sell-online-div-only-go-togo-il"
                >
                  <Link to="/">
                    <button
                      style={{ marginTop: "20px" }}
                      className="new-sell-onilne--bluew-btn"
                    >
                      Register
                    </button>
                  </Link>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
      <HomeFotter />
    </>
  );
};

export default Feature;
