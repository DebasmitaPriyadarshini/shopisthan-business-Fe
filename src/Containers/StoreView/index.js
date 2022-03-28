import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getStoreDetailsByUrlAction,
  getStoreProductDetailsByUrlAction,
  getStoreCatalogDetailsByUrlAction,
  updateCart,
} from "../../actions/user.action";
import Helmet from "react-helmet";
import { StoreViewProfileCard } from "../../Components/StoreViewProfileCard";
import "./style.css";
import { StoreViewProductSide } from "../../Components/StoreViewProductSide";
import { StoreViewCart } from "../../Components/StoreViewCart";
import { BottomNavigationProfile } from "../../Components/BottomNavigation";
import { UserProfile } from "../UserProfile";
import StoreNavBar from "../../Components/StoreNavBar";
import WebHome from "../Home";

export const StoreView = (props) => {
  const check = useSelector((state) => state.userDetails);
  const store = useSelector((state) => state.userDetails.store);
  const product = useSelector((state) => state.userDetails.product);
  const catalog = useSelector((state) => state.userDetails.catalog);
  const [catalogTerm, setCatalogTerm] = useState("");
  const [showCart, setShowCart] = useState(false);
  const [viewUserAccount, setViewUserAccount] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const { storeUrl } = props.match.params;

    if (storeUrl && store && store.storeUrl && store.storeUrl === storeUrl) {
      if (
        props &&
        props.location &&
        props.location.state &&
        props.location.state.alreadyStoreDetails
      ) {
        return null;
      } else {
        const payload = {
          params: {
            storeUrl,
          },
        };
        dispatch(getStoreDetailsByUrlAction(payload));
        dispatch(getStoreProductDetailsByUrlAction(payload));
        dispatch(getStoreCatalogDetailsByUrlAction(payload));
      }
    } else {
      const payload = {
        params: {
          storeUrl,
        },
      };
      dispatch(getStoreDetailsByUrlAction(payload));
      dispatch(getStoreProductDetailsByUrlAction(payload));
      dispatch(getStoreCatalogDetailsByUrlAction(payload));
    }
  }, [dispatch]);
  useEffect(() => {
    dispatch(updateCart());
  }, []);

  const onCatalogChange = (val) => {
    if (val === "All") {
      return setCatalogTerm("");
    } else {
      return setCatalogTerm(val);
    }
  };

  const catalogArray = [];

  function insertObject(arr, obj) {
    arr.push(obj);
  }

  var arrayLength = catalog.length;
  for (var i = 0; i < arrayLength; i++) {
    const noOfProductsInCatalog = product.filter(
      (product) => product.productCatalog._id === catalog[i]._id
    ).length;
    const object = {
      _id: catalog[i]._id,
      name: catalog[i].name,
      totalProducts: noOfProductsInCatalog,
    };
    insertObject(catalogArray, object);
  }

  const renderNoOfProductsInCatalog = (catalogId) => {
    if (product && product.length === 0) {
      return 0;
    } else {
      const noOfProductsInCatalog = product.filter(
        (product) => product.productCatalog._id === catalogId
      ).length;
      return noOfProductsInCatalog;
    }
  };
  const renderCatalogList = () => {
    return (
      <>
        <div
          className="category-name-in-store-view-all-category"
          onClick={() => setCatalogTerm("")}
        >
          All
        </div>
        {catalogArray && catalogArray.length > 0
          ? catalogArray
              .sort((a, b) => b.totalProducts - a.totalProducts)
              .map((catalog, index) => (
                <h3
                  className="category-name-in-store-view-all-category"
                  onClick={() => setCatalogTerm(catalog._id)}
                  key={index}
                >
                  {catalog.name} ({renderNoOfProductsInCatalog(catalog._id)})
                </h3>
              ))
          : null}
      </>
    );
  };

  return (
    <>
      {check.storeError === "" ? (
        <>
          <Helmet>
            <title>
              {" "}
              {store && store.storeName ? store.storeName : "Shopisthan"} Now
              Online
            </title>
            <meta
              name="description"
              // content="Place your Orders from your favorite Store {StoreName} Now. Check our Products and start your shopping"
              content={`Place your Orders from your favorite Store ${
                store && store.storeName ? store.storeName : "Shopisthan"
              } Now. Check our Products and start your shopping`}
            />
          </Helmet>

          <div className="dashboard-destop-view-only">
            <div>
              <StoreNavBar
                store={store}
                showStoreProfile={() => {
                  setShowCart(false);
                  setViewUserAccount(false);
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
          <div id="top-panel" className="slide-panel js-top-panel">
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
                      storeLoading={check.storeLoading}
                    />
                    <StoreViewProductSide
                      product={product}
                      store={store}
                      catalog={catalogArray}
                      catalogTerm1={catalogTerm}
                      onCatalogChange={onCatalogChange}
                      storeUrl={props.match.params}
                      store1={true}
                      productLoading={check.productLoading}
                      catalogLoading={check.catalogLoading}
                    />
                    <div className="category-bax-in-store-view">
                      <div className="new-category-tag-up-niceakj">
                        {store && store.storeName ? store.storeName : "Store"}{" "}
                        Catalog
                      </div>
                      <div className="all-categoryl-lis-xneo">
                        {renderCatalogList()}
                      </div>
                    </div>{" "}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="responsive-dashbord-view-block">
            <BottomNavigationProfile
              storeUrl={props.match.params}
              store={true}
            />
          </div>
        </>
      ) : (
        <WebHome />
      )}
    </>
  );
};
