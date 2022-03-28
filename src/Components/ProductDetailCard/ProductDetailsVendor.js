import React from "react";
import { Link } from "react-router-dom";
import { PriceWithComma } from "../../Functions";
import ProfileNavBarResponsive from "../Navbar/Responsive";

const ProductDetailsStore = (props) => {
  const productDetails =
    props &&
    props.location &&
    props.location.state &&
    props.location.state.viewProduct &&
    props.location.state.productDetails
      ? props.location.state.productDetails
      : null;

  console.log(productDetails);
  return (
    <>
      <div>
        <ProfileNavBarResponsive>
          {/* <Link to="/storeProduct"> */}
          <img
            style={{ height: "1rem" }}
            src={
              "https://www.pinclipart.com/picdir/middle/544-5440422_back-arrow-icon-transparent-png-clipart-free-download.png"
            }
            alt="ShopisthanLogo"
            onClick={() => {
              props.history.goBack();
            }}
          />
          {/* </Link> */}

          <h2 style={{ color: "#1a1a1a", fontSize: "18px" }}>
            Product Details
          </h2>
          <div></div>
        </ProfileNavBarResponsive>
        <div style={{ padding: "5em 20px 10px 20px" }}>
          <div>
            {productDetails &&
            productDetails.productPictures &&
            productDetails.productPictures.length > 0 ? (
              <img
                className="iage-of-product-in-product-details"
                src={productDetails.productPictures[0].img}
                alt="Product_Image"
              />
            ) : null}
          </div>
          <div className="user-shop-name-in-store-card">
            <h2>
              {productDetails && productDetails.productName
                ? productDetails.productName
                : null}
            </h2>
          </div>
          <div>
            {productDetails.productMrpPrice ? (
              productDetails.productMrpPrice ===
              productDetails.productPrice ? null : (
                <div className="dis-akd-flex-in-this-product-details-page">
                  <p className="nocwipma" style={{ marginRight: "60px" }}>
                    M.R.P:
                  </p>
                  <p className="discount-price-overline">
                    {PriceWithComma(productDetails.productMrpPrice)}
                  </p>
                </div>
              )
            ) : null}

            <div className="dis-akd-flex-in-this-product-details-page">
              <p className="nocwipma" style={{ marginRight: "70px" }}>
                Price:
              </p>
              <p className=".produt-real-prics-by-seller">
                {productDetails && productDetails.productPrice
                  ? PriceWithComma(productDetails.productPrice)
                  : null}
              </p>
            </div>
            {/* <div className="dis-akd-flex-in-this-product-details-page">
              <p className="nocwipma" style={{ marginRight: "43px" }}>
                Discount:
              </p>
              <p>17% off</p>
            </div> */}
            <div className="dis-akd-flex-in-this-product-details-page">
              <p className="nocwipma" style={{ marginRight: "44px" }}>
                Category:
              </p>
              <p>
                {productDetails &&
                productDetails.productCatalog &&
                productDetails.productCatalog.name
                  ? productDetails.productCatalog.name
                  : null}
              </p>
            </div>
            <div className="dis-akd-flex-in-this-product-details-page">
              <p className="nocwipma" style={{ marginRight: "34px" }}>
                Description:
              </p>
              <p>
                {productDetails && productDetails.productDescription
                  ? productDetails.productDescription
                  : null}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsStore;
