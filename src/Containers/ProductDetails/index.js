import React, { useEffect, useState } from "react";
import {
  getProductDetailsByIdAction,
  updateCart,
} from "../../actions/user.action";
import Helmet from "react-helmet";
import { useDispatch, useSelector } from "react-redux";
import { StoreViewProfileCard } from "../../Components/StoreViewProfileCard";
import { ProductDetailCard } from "../../Components/ProductDetailCard";
import "./style.css";
import { StoreViewCart } from "../../Components/StoreViewCart";
import StoreNavBar from "../../Components/StoreNavBar";
import { useHistory } from "react-router";
import { UserProfile } from "../UserProfile";

export const ProductDetails = (props) => {
  const dispatch = useDispatch();
  const storeDetails = useSelector((state) => state.userDetails.store);
  const [store, setStore] = useState(storeDetails);
  const productDetails = useSelector(
    (state) => state.userDetails.productDetails
  );
  const [product, setProduct] = useState(productDetails);
  const history = useHistory();
  const [showCart, setShowCart] = useState(false);
  const [viewUserAccount, setViewUserAccount] = useState(false);

  useEffect(() => {
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.ProductDetails &&
      props.location.state.productDetails
    ) {
      setStore(props.location.state.storeDetails);
      return setProduct(props.location.state.productDetails);
    } else {
      setStore(storeDetails);
      return setProduct(productDetails);
    }
  }, [productDetails]);

  useEffect(() => {
    const { productId } = props.match.params;
    if (
      props &&
      props.location &&
      props.location.state &&
      props.location.state.ProductDetails &&
      props.location.state.productDetails
    ) {
      return setProduct(props.location.state.productDetails);
    } else {
      if (
        product &&
        product.productId &&
        productId &&
        product.productId === productId
      ) {
        return setProduct(productDetails);
      } else {
        const payload = {
          params: {
            productId,
          },
        };
        dispatch(getProductDetailsByIdAction(payload));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(updateCart());
  }, []);

  return (
    <>
      <Helmet>
        <title>
          {" "}
          {/* {store && store.storeName ? store.storeName : "Shopisthan"} Now Online */}
        </title>
        <meta
          name="description"
          content="Place your Orders from your favorite Store {{Store Name}} Now. Check our Products and start your shopping"
        />
      </Helmet>

      <div className="dashboard-destop-view-only">
        <div>
          <StoreNavBar
            store={store}
            showStoreProfile={() => {
              const alreadyStoreDetails =
                props &&
                props.location &&
                props.location.state &&
                props.location.state.ProductDetails
                  ? true
                  : false;
              history.push({
                pathname: `/${
                  store && store.storeUrl
                    ? store.storeUrl.split(" ").join("-")
                    : ""
                }`,
                state: { alreadyStoreDetails: alreadyStoreDetails },
              });
            }}
            showCart={() => {
              setShowCart(true);
              setViewUserAccount(false);
            }}
            showUserAccount={() => {
              setViewUserAccount(true);
              setShowCart(false);
            }}
          />
        </div>
      </div>
      <div
        tabIndex="0"
        id="site-content"
        className="js-site-content site-content e2e-site-conten"
      >
        {showCart ? (
          <div className="Profile-root-3Ir Profile-bannerEmpty-3ep e2e-Profile-page-container">
            <div className="Profile-wrap-3mj">
              <StoreViewCart />
            </div>
          </div>
        ) : viewUserAccount ? (
          <UserProfile />
        ) : (
          <div className="Profile-root-3Ir Profile-bannerEmpty-3ep e2e-Profile-page-container">
            <div className="Profile-wrap-3mj">
              <StoreViewProfileCard
                store={store}
                checkedAlreadyStoreDetails={props}
              />
              <ProductDetailCard productDetails={product} />
            </div>
          </div>
        )}
      </div>
      {/* 
            <div id="top-panel" className="slide-panel js-top-panel">
                <div
                    tabIndex="0"
                    id="site-content"
                    className="js-site-content site-content e2e-site-conten"
                >
                    <div data-ssr-fetched="true" className="esdfrgh">
                        <div className="Profile-root-3Ir Profile-bannerEmpty-3ep e2e-Profile-page-container">
                            <div className="Profile-wrap-3mj">
                                {showCart ? (
                                    <StoreViewCart />
                                ) :
                                    viewUserAccount ? (
                                        <UserProfile />
                                    ) :
                                        (
                                            <>
                                                <StoreViewProfileCard store={store} checkedAlreadyStoreDetails={props} />
                                                <ProductDetailCard productDetails={product} />
                                   
                                            </>
                                        )}

                            </div>
                        </div>
                    </div>
                </div>
            </div> */}
    </>
  );
};
