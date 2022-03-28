import React from "react";
import "./singleproduct.css";
import { PriceWithComma } from "../../Functions/index";


const SampleStoreSingleProduct = (props) => {
    const { product, storeDetails } = props;


    if (!product) {
        return null;
    }
    if (!storeDetails) {
        return null;
    }


    const renderAddToCartButton = (type) => {
        return (
            <>
                <button
                    className={
                        type === "Mobile"
                            ? "btn-of-add-to-cart-instroe-productresoponsicve"
                            : "new-jus-add-po-to-cart-kj-btn"
                    }
                >
                    {type === "Mobile" ? "Add +" : "Add To Cart"}{" "}
                </button>
            </>
        );
    };

    return (
        <>
            <div>
                <div className="first-div-for-product-view">
                    <div className="new-img-div-for-product-img-fixed">
                        {product.productPictures ? (
                            <img
                                className="for-img-widht-and-height"
                                src={product.productPictures[0].img}
                                alt="new"
                                loading="lazy"
                            ></img>
                        ) : (
                            <img
                                className="for-img-widht-and-height"
                                src={
                                    "https://images-eu.ssl-images-amazon.com/images/G/31/img21/CEPC/Clearance/May21/V238940049_IN_PC_BAU_Edit_Creation_Laptops1x._SY304_CB667377205_.jpg"
                                }
                                alt="new"
                            />
                        )}
                        <div className="for-bnt-of-addtocart-instre-dividion">
                            {renderAddToCartButton("Mobile")}
                        </div>
                    </div>
                    <div className="display-flex-for-product-details-inrespo">
                        <div className="desplayflex-inresponsive-view">
                            <div>
                                <div className="sjnprodutc-po-psys-dutd-ded">
                                    <h4 className="product-name-in-new-produtc-card">
                                        {product.productName}
                                    </h4>
                                    <span className="produt-category-in-responisve-view">
                                        {" "}
                                        {product.productCatalog.name}
                                    </span>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <p className="paragraph-for-product-description">
                                            {product.productDescription}
                                        </p>
                                    </div>
                                </div>
                                <div className="store-product-details-single-prodict-price-in-sll-product">
                                    <span className="produt-real-prics-by-seller">
                                        {" "}
                                        {PriceWithComma(product.productPrice)}
                                        {/* ₹{product.productPrice} */}
                                    </span>
                                    {product.productMrpPrice ? (
                                        product.productMrpPrice === product.productPrice ? null : (
                                            <p className="discount-price-overline">
                                                {PriceWithComma(product.productMrpPrice)}
                                                {/* ₹ {} */}
                                            </p>
                                        )
                                    ) : null}
                                    {/* {

                  } */}
                                    {product.productMrpPrice ? (
                                        product.productMrpPrice &&
                                            product.productMrpPrice === product.productPrice ? null : (
                                            <p className="distcount-percentage-inproduct">
                                                {/* {renderDiscount(product)} */}
                                            </p>
                                        )
                                    ) : null}
                                    {/* {

                  } */}
                                </div>
                                {/* ------For Responsive-------- */}
                                <p className="product-responsive-desiption-instoreproduct">
                                    {product.productDescription}
                                </p>
                                {/* ------For Responsive-------- */}
                            </div>
                            <div className="product-both-add-tocart-and-out-of-stock">
                                {renderAddToCartButton()}

                                <button
                                    className="new-jus-add-po-to-cart-kj-btn"
                                //   onClick={() => {
                                //     const ProductName = product.productName
                                //       .split(" ")
                                //       .join("-");

                                //     history.push({
                                //       pathname: `/${ProductName}/p/${product.productId}`,
                                //       state: {
                                //         ProductDetails: true,
                                //         productDetails: product,
                                //         storeDetails: storeDetails,
                                //       },
                                //     });
                                //   }}
                                >
                                    View Product
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SampleStoreSingleProduct;
