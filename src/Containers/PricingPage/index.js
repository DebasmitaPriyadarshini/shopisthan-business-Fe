import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Homepagenavbar, SubNavbar } from "../../Components/Navbar";
import HomeFotter from "../../Components/HomeFotter/index";
import "./style.css";

const PricingPage = () => {
  const [faq1, setFaq1] = useState(false);
  const [faq2, setFaq2] = useState(false);
  const [faq3, setFaq3] = useState(false);
  const [faq4, setFaq4] = useState(false);
  const [faq5, setFaq5] = useState(false);

  return (
    <>
      <Homepagenavbar />
      <SubNavbar />
      <div
        style={{
          marginTop: "8rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div>
          <section>
            <div>
              <div className="content-for-pricing-heeader">
                <h1 class="balance-text-for-pricing-head-respo">
                  Plans <br /> and pricing.
                </h1>
                <h1 class="balance-text-for-pricing-head">
                  Plans and pricing.
                </h1>
                <p className="font-size-large-for-pricing-head">
                  Compare our plans meant for Differnt Types of Sellers
                  <br data-owner="balance-text" />
                  Register now and Pick your Suitable plan and Start Selling
                </p>
                <div>
                  <div
                    className="btn-for-sell-online-div-only-go-togo-il"
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <Link to="/pre-registration-for-online-store">
                      <button className="sell-onilne-jdgf-sle-ih">
                        Register
                      </button>
                    </Link>
                    <a href="https://shopisthan.in/about/">
                      <button className="sell-onilne-about-sle-ih">
                        About Us
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section>
            <div className="pricing-slider-for-pricingcards">
              <div className="new-flandkejd-deads-leds">
                <div>
                  <div className="new-div-of-chooese-plan-first-diiv-of-free-pALN">
                    <div className="new-div-for-header-and-paragraphp-offee">
                      <div>
                        <h2 className="new-header-of-choose-paln-and-free-paln-header">
                          Online Store
                        </h2>
                        <p className="new-paragraph-pof-chooese-plan">
                          Best for Part-time sellers to bring their products
                          Online
                        </p>
                        <p className="new-paragraph-pof-chooese-plan">
                          Start your FREE trial with Shopisthan for 30 days
                        </p>
                      </div>
                    </div>
                    <div className="hfbdn-dedde-deldle-dejdj">
                      <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "20px",
                            textDecoration: "line-through",
                            color: "grey",
                          }}
                        >
                          ₹199
                        </span>{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "32px",
                          }}
                        >
                          ₹99/mo
                        </span>
                      </div>

                      {/* <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{ fontWeight: "600", paddingRight: "5px" }}
                        ></span>
                        <span></span>
                      </div> */}
                    </div>
                    <div className="list-of-points-in-plan-ettc">
                      <ul className="ul-list-of-pricing-content">
                        <h4>
                          <span>🗸 Online Store</span>
                        </h4>
                        <h4>
                          <span>🗸 200 Products</span>
                        </h4>
                        <h4>
                          <span>🗸 20 Catalogs</span>
                        </h4>
                        <h4>
                          <span>🗸 Share Store</span>
                        </h4>
                        <h4>
                          <span>🗸 Professional Dashboard</span>
                        </h4>
                        <li>
                          <span style={{ color: "gray" }}>
                            X Edit/Delete Products
                          </span>
                        </li>
                        <li>
                          <span style={{ color: "gray" }}>
                            X Payment Gateway
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bordertop-btn-for-stre-plan">
                      <Link to="/CreateYourStore">
                        <button className="new-sell-onilne--bluew-btn">
                          {" "}
                          Free Store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-flandkejd-deads-leds">
                <div>
                  <div className="new-div-of-chooese-plan-first-diiv-of-free-pALN">
                    <div className="new-div-for-header-and-paragraphp-offee">
                      <div>
                        <h2 className="new-header-of-choose-paln-and-free-paln-header">
                          Home Start-Up Store
                        </h2>
                        <p className="new-paragraph-pof-chooese-plan">
                          Best for Home Sellers to bring their creativity online
                        </p>
                        <p className="new-paragraph-pof-chooese-plan">
                          Start your FREE trial with Shopisthan for 30 days
                        </p>
                      </div>
                    </div>
                    <div className="hfbdn-dedde-deldle-dejdj">
                      <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "20px",
                            textDecoration: "line-through",
                            color: "grey",
                          }}
                        >
                          ₹599
                        </span>{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "32px",
                          }}
                        >
                          ₹199/mo
                        </span>
                      </div>

                      {/* <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{ fontWeight: "600", paddingRight: "5px" }}
                        ></span>
                        <span></span>
                      </div> */}
                    </div>
                    <div className="list-of-points-in-plan-ettc">
                      <ul className="ul-list-of-pricing-content">
                        <h4>
                          <span>🗸 Online Store</span>
                        </h4>
                        <h4>
                          <span>🗸 1000 products</span>
                        </h4>
                        <h4>
                          <span>🗸 150 Catalogs</span>
                        </h4>
                        <h4>
                          <span>🗸 Share Store Card</span>
                        </h4>
                        <h4>
                          <span>🗸 Professional Dashboard</span>
                        </h4>
                        <h4>
                          <span>🗸 Edit/Delete Products</span>
                        </h4>
                        {/* <li>
                          <span style={{ color: "gray" }}>
                            X Edit/Delete Products
                          </span>
                        </li> */}
                        <li>
                          <span style={{ color: "gray" }}>
                            X Payment Gateway
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="bordertop-btn-for-stre-plan">
                      <Link to="/CreateYourStore">
                        <button className="new-sell-onilne--bluew-btn">
                          {" "}
                          Free Store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              <div className="new-flandkejd-deads-leds">
                <div>
                  <div className="new-div-of-chooese-plan-first-diiv-of-free-pALN">
                    <div className="new-div-for-header-and-paragraphp-offee">
                      <div>
                        <h2 className="new-header-of-choose-paln-and-free-paln-header">
                          Retail Store
                        </h2>
                        <p className="new-paragraph-pof-chooese-plan">
                          Best for retailers to grow business to next level
                        </p>
                        <p className="new-paragraph-pof-chooese-plan">
                          Start your FREE trial with Shopisthan for 30 days
                        </p>
                      </div>
                    </div>
                    <div className="hfbdn-dedde-deldle-dejdj">
                      <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "20px",
                            textDecoration: "line-through",
                            color: "grey",
                          }}
                        >
                          ₹999
                        </span>{" "}
                        <span
                          style={{
                            fontWeight: "600",
                            paddingRight: "5px",
                            fontSize: "32px",
                          }}
                        >
                          599/mo
                        </span>
                      </div>

                      {/* <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{ fontWeight: "600", paddingRight: "5px" }}
                        ></span>
                        <span></span>
                      </div> */}
                    </div>
                    <div className="list-of-points-in-plan-ettc">
                      <ul className="ul-list-of-pricing-content">
                        <h4>
                          <span>🗸 Online Store</span>
                        </h4>
                        <h4>
                          <span>🗸 5000 Products</span>
                        </h4>
                        <h4>
                          <span>🗸 Unlimited Catalogs</span>
                        </h4>
                        <h4>
                          <span>🗸 Edit/Delete Products</span>
                        </h4>
                        <h4>
                          <span>🗸 Payment Options</span>
                        </h4>
                        <h4>
                          <span>🗸 Shipping Options</span>
                        </h4>
                        <h4>
                          <span>🗸 Verified Store</span>
                        </h4>
                      </ul>
                    </div>

                    <div className="bordertop-btn-for-stre-plan">
                      <Link to="/CreateYourStore">
                        <button className="new-sell-onilne--bluew-btn">
                          {" "}
                          Free Store
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
              {/* <div className="new-flandkejd-deads-leds">
                <div>
                  <div className="new-div-of-chooese-plan-first-diiv-of-free-pALN">
                    <div className="new-div-for-header-and-paragraphp-offee">
                      <h2 className="new-header-of-choose-paln-and-free-paln-header">
                        Free
                      </h2>
                      <p className="new-paragraph-pof-chooese-plan">
                        Everything you need to start selling online.
                      </p>
                    </div>
                    <div className="hfbdn-dedde-deldle-dejdj">
                      <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{ fontWeight: "600", paddingRight: "5px" }}
                        >
                          Free*
                        </span>
                        <span> for first Year</span>
                      </div>
                      <div className="free-Free-for-first-Year-div-span">
                        <span
                          style={{ fontWeight: "600", paddingRight: "5px" }}
                        ></span>
                        <span></span>
                      </div>
                    </div>
                    <div className="list-of-points-in-plan-ettc">
                      <ul className="ul-list-of-pricing-content">
                        <h4>
                          <span>🗸 Add up-to 500 Products</span>
                        </h4>
                        <li>
                          <span>🗸 Create 10 Catalogs</span>
                        </li>
                        <li>
                          <span>🗸 Get Online Payments</span>
                        </li>
                        <li>
                          <span>🗸 Social Share (WhatssApp, Facebook)</span>
                        </li>
                      </ul>
                    </div>
                    <div className="bordertop-btn-for-stre-plan">
                      <button className="new-sell-onilne--bluew-btn">
                        Sell Online
                      </button>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </section>
          <section>
            <div className="display-flex-and-justify-it-to-center">
              <div className="paddingtworem">
                <div>
                  <h2 class="balance-text-frequentlyasked">
                    Frequently
                    <br /> Asked Questions
                  </h2>
                  <h2 class="balance-text-frequentlyasked-without-respo">
                    Frequently Asked Questions
                  </h2>
                </div>
                <ul className="lsitofquestionasked-list">
                  <li className="question-in-the-list-li">
                    <h3 class="h6-gap-none">
                      <div
                        class="hotspot"
                        data-transition-state="on"
                        data-transition-target="accordion-20KohBp1Ak1ttF22GLQpi0"
                        // href="#"
                      >
                        <div
                          class="grid-flex-grid-valign-middle"
                          onClick={() => setFaq1(!faq1)}
                        >
                          <div class="column-expand">What is Shopisthan?</div>
                          {faq1 ? (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://cdn-icons-png.flaticon.com/128/271/271239.png"
                              }
                              alt="LandingLogo"
                            />
                          ) : (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                              }
                              alt="LandingLogo"
                            />
                          )}
                        </div>
                        {faq1 ? (
                          <div
                            class="gap-none"
                            data-transition-state="off"
                            data-transition-types="collapse fade"
                            id="accordion-6Os5iM8UKxjXwp4BvE3Se"
                          >
                            <p
                              className="balance-text"
                              style={{ fontWeight: "200", marginTop: "10px" }}
                            >
                              Shopisthan is a platform for buying and selling
                              Products Online
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </h3>
                  </li>
                  <li className="question-in-the-list-li">
                    <h3 class="h6-gap-none">
                      <div
                        class="hotspot"
                        data-transition-state="on"
                        data-transition-target="accordion-20KohBp1Ak1ttF22GLQpi0"
                      >
                        <div
                          class="grid-flex-grid-valign-middle"
                          onClick={() => setFaq2(!faq2)}
                        >
                          <div class="column-expand">
                            Who Shopisthan is for?
                          </div>
                          {faq2 ? (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://cdn-icons-png.flaticon.com/128/271/271239.png"
                              }
                              alt="Logo"
                            />
                          ) : (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                              }
                              alt="Logo"
                            />
                          )}
                        </div>
                        {faq2 ? (
                          <div
                            class="gap-none"
                            data-transition-state="off"
                            data-transition-types="collapse fade"
                            id="accordion-6Os5iM8UKxjXwp4BvE3Se"
                          >
                            <p
                              className="balance-text"
                              style={{ fontWeight: "200", marginTop: "10px" }}
                            >
                              Shopisthan is for them who want to sell products
                              or services, they may be Home-sellers, retailers,
                              wholesalers, influencers
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </h3>
                  </li>
                  <li className="question-in-the-list-li">
                    <h3 class="h6-gap-none">
                      <div
                        class="hotspot"
                        data-transition-state="on"
                        data-transition-target="accordion-20KohBp1Ak1ttF22GLQpi0"
                        href="#"
                      >
                        <div
                          class="grid-flex-grid-valign-middle"
                          onClick={() => setFaq3(!faq3)}
                        >
                          <div class="column-expand">Is Shopisthan Free?</div>
                          {faq3 ? (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://cdn-icons-png.flaticon.com/128/271/271239.png"
                              }
                              alt="Logo"
                            />
                          ) : (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                              }
                              alt="Logo"
                            />
                          )}
                        </div>
                        {faq3 ? (
                          <div
                            class="gap-none"
                            data-transition-state="off"
                            data-transition-types="collapse fade"
                            id="accordion-6Os5iM8UKxjXwp4BvE3Se"
                          >
                            <p
                              className="balance-text"
                              style={{ fontWeight: "200", marginTop: "10px" }}
                            >
                              No, Shopisthan is not free. There are 3 types of
                              plans for diffrent categories of sellers. You can
                              choose your best plan and start selling.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </h3>
                  </li>
                  <li className="question-in-the-list-li">
                    <h3 class="h6-gap-none">
                      <div
                        class="hotspot"
                        data-transition-state="on"
                        data-transition-target="accordion-20KohBp1Ak1ttF22GLQpi0"
                      >
                        <div
                          class="grid-flex-grid-valign-middle"
                          onClick={() => setFaq4(!faq4)}
                        >
                          <div class="column-expand">
                            What are the features of Shopisthan?
                          </div>
                          {faq4 ? (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://cdn-icons-png.flaticon.com/128/271/271239.png"
                              }
                              alt="Logo"
                            />
                          ) : (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                              }
                              alt="Logo"
                            />
                          )}
                        </div>
                        {faq4 ? (
                          <div
                            class="gap-none"
                            data-transition-state="off"
                            data-transition-types="collapse fade"
                            id="accordion-6Os5iM8UKxjXwp4BvE3Se"
                          >
                            <p
                              className="balance-text"
                              style={{ fontWeight: "200", marginTop: "10px" }}
                            >
                              There are varous features like create store, Add
                              Products, catalogs, share store, share products,
                              Store Dashboard etc.
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </h3>
                  </li>
                  <li className="question-in-the-list-li">
                    <h3 class="h6-gap-none">
                      <div
                        class="hotspot"
                        data-transition-state="on"
                        data-transition-target="accordion-20KohBp1Ak1ttF22GLQpi0"
                        href="#"
                      >
                        <div
                          class="grid-flex-grid-valign-middle"
                          onClick={() => setFaq5(!faq5)}
                        >
                          <div class="column-expand">
                            Can I sell my product on Shopisthan?
                          </div>
                          {faq5 ? (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://cdn-icons-png.flaticon.com/128/271/271239.png"
                              }
                              alt="Logo"
                            />
                          ) : (
                            <img
                              style={{
                                // marginTop: "5px",
                                height: "0.8em",
                                marginLeft: "2px",
                              }}
                              src={
                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_IMj2E9acZBj7knqWSACkuiwyHo9CgQSJg&usqp=CAU"
                              }
                              alt="Logo"
                            />
                          )}
                        </div>
                        {faq5 ? (
                          <div
                            class="gap-none"
                            data-transition-state="off"
                            data-transition-types="collapse fade"
                            id="accordion-6Os5iM8UKxjXwp4BvE3Se"
                          >
                            <p
                              className="balance-text"
                              style={{ fontWeight: "200", marginTop: "10px" }}
                            >
                              Yes, you can sell your Products on Shopisthan and
                              that depends on which kind of products you are
                              selling
                            </p>
                          </div>
                        ) : null}
                      </div>
                    </h3>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section>
            <div className="for-justifying-the-content-in-center">
              <div className="for-width-auto-and-valje">
                <h2
                  className="balance-text-frequentlyasked"
                  data-title-for="14NUpN5WsSvO1d4LFD1Oxa"
                >
                  Change your Mode
                  <br data-owner="balance-text" />
                  of Selling today
                  <br data-owner="balance-text" />
                  with Shopisthan
                </h2>
                <h2
                  className="balance-text-for-pricing-head"
                  data-title-for="14NUpN5WsSvO1d4LFD1Oxa"
                >
                  Change Your Mode
                  <br data-owner="balance-text" />
                  of Selling today with Shopisthan
                </h2>
                <p className="font-size-large-for-pricing-head">
                  Make Your store visible Worldwide with Affordable Plans, Reach
                  your Customers and enhance your Engagement
                </p>
                <div className="tysh-sksjd-skdhdh">
                  <Link to="/pre-registration-for-online-store">
                    <button
                      //   style={{ marginTop: "20px" }}
                      className="button-gap-none"
                    >
                      Register Now
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
      <HomeFotter />
    </>
  );
};

export default PricingPage;
