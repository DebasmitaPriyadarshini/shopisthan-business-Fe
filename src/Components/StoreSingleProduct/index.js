import React, { useState, useEffect } from "react";
import "./style.css";
import { PriceWithComma } from "../../Functions/index";
import { addToCart } from "../../actions/user.action";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";

const StoreSingleProduct = (props) => {
  const { product, storeDetails } = props;
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.userDetails);
  const [cartItemsList, setCartItemsList] = useState(
    useSelector((state) => state.userDetails.cartItems)
  );

  const history = useHistory();

  useEffect(() => {
    setCartItemsList(cart.cartItems);
  }, [cart.cartItems]);

  if (!product) {
    return null;
  }
  if (!storeDetails) {
    return null;
  }

  const cartProductDetails = Object.keys(cartItemsList)
    .filter((key) => product._id === cartItemsList[key]._id)
    .map((key, index) => cartItemsList[key]);

  const onQuantityIncrement = () => {
    if (cartProductDetails[0].qty >= 5) return;
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[product._id];
    props.onQuantityInc(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription
    );
  };

  const onQuantityDecrement = () => {
    const { productName, productPrice, img, _id, storeId, productDescription } =
      cartItemsList[product._id];
    props.onQuantityDec(
      _id,
      productName,
      productPrice,
      img,
      storeId,
      productDescription
    );
  };

  const addFirstItemToCart = (
    storeId,
    _id,
    productName,
    productPrice,
    img,
    productDescription
  ) => {
    dispatch(
      addToCart({
        _id,
        productName,
        productPrice,
        storeId,
        img,
        productDescription,
      })
    );
  };

  const addAnotherItemToCart = (
    storeId,
    _id,
    productName,
    productPrice,
    img,
    productDescription
  ) => {
    const itemsStoreId = Object.keys(cartItemsList).filter(
      (key) => storeId === cartItemsList[key].storeId
    );

    if (itemsStoreId && itemsStoreId.length > 0) {
      dispatch(
        addToCart({
          _id,
          productName,
          productPrice,
          storeId,
          img,
          productDescription,
        })
      );
    } else {
      return null;
    }
  };

  const renderAddToCartButton = (type) => {
    const check = Object.keys(cartItemsList).filter(
      (key) => product._id === cartItemsList[key]._id
    );
    if (check && check.length > 0) {
      return (
        <>
          {type === "Mobile" ? (
            <>
              <div className="add-and-subtract-items-of-cart-in-one-pastore-product">
                {cartProductDetails[0].qty === 1 ? (
                  <Link
                    onClick={() => {
                      const _id = cartItemsList[product._id];
                      props.onRemoveCartItem(_id._id);
                    }}
                    style={{
                      color: "white",
                    }}
                  >
                    <p className="decrement-btn-in-minus-inadd-to-cart">-</p>
                  </Link>
                ) : (
                  <p
                    className="decrement-btn-in-minus-inadd-to-cart"
                    onClick={onQuantityDecrement}
                  >
                    -
                  </p>
                )}
                <p style={{ fontSize: "12px" }}>{cartProductDetails[0].qty}</p>

                <p
                  className="qauntity-increase-inadd-to-cart-btn"
                  onClick={onQuantityIncrement}
                >
                  +
                </p>
              </div>
            </>
          ) : (
            <div className="cartModOptionWrap">
              <div className="cartModOptionInner">
                <div className="cartModOptions">
                  <div className="quantityControl">
                    {cartProductDetails[0].qty === 1 ? (
                      <Link
                        onClick={() => {
                          const _id = cartItemsList[product._id];
                          props.onRemoveCartItem(_id._id);
                        }}
                      >
                        <button>-</button>
                      </Link>
                    ) : (
                      <button onClick={onQuantityDecrement}>-</button>
                    )}
                    <input readOnly value={cartProductDetails[0].qty} />
                    <button onClick={onQuantityIncrement}>+</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      );
    } else {
      return (
        <>
          <button
            className={
              type === "Mobile"
                ? "btn-of-add-to-cart-instroe-productresoponsicve"
                : "new-jus-add-po-to-cart-kj-btn"
            }
            onClick={() => {
              const storeId = storeDetails._id;
              const { _id, productName, productPrice, productDescription } =
                product;
              const img = product.productPictures[0].img;

              cartItemsList && Object.keys(cartItemsList).length === 0
                ? addFirstItemToCart(
                    storeId,
                    _id,
                    productName,
                    productPrice,
                    img,
                    productDescription
                  )
                : addAnotherItemToCart(
                    storeId,
                    _id,
                    productName,
                    productPrice,
                    img,
                    productDescription
                  );
            }}
          >
            {type === "Mobile" ? "Add +" : "Add To Cart"}{" "}
          </button>
        </>
      );
    }
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
                onClick={() => props.showProductDetails(product)}
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
            <div>{renderAddToCartButton("Mobile")}</div>
          </div>
          <div className="display-flex-for-product-details-inrespo">
            <div className="desplayflex-inresponsive-view">
              <div>
                <div className="sjnprodutc-po-psys-dutd-ded">
                  <h4
                    className="product-name-in-new-produtc-card"
                    onClick={() => props.showProductDetails(product)}
                  >
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
                  onClick={() => {
                    const ProductName = product.productName
                      .split(" ")
                      .join("-");

                    history.push({
                      pathname: `/${ProductName}/p/${product.productId}`,
                      state: {
                        ProductDetails: true,
                        productDetails: product,
                        storeDetails: storeDetails,
                      },
                    });
                  }}
                >
                  View Product
                </button>
                {/* {product && product.productOutOfStock === "Yes"
                                    ? null
                                    : auth.authenticate && storeId === storeDetails._id
                                        ? null
                                        : renderBuyNowButton()} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StoreSingleProduct;
