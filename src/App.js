import { Route, Switch } from "react-router-dom";
import React from "react";
import "./App.css";
import StoreDasboard from "./Containers/StoreDashboard";
import StoreOrder from "./Containers/StoreOrders";
import StoreProduct from "./Containers/StoreProduct";
import StoreCoustomers from "./Containers/StoreCoustomers";
import StoreCatelog from "./Containers/Catalog";
import StoreProfile from "./Containers/StoreProfile";
import StoreEditProduct from "./Containers/EditProduct";
import StoreAddProduct from "./Containers/AddProduct";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { isUserLoggedIn } from "./actions/auth.action";
import {
  getUserDataAction,
  userStoreDataAction,
} from "./actions/initialData.action";
import StoreCreationForm from "./Containers/Home/SliderResponsiveHomePage/StoreCreationform";
import { getStoreProducstAction } from "./actions/product.action";
import {
  getStoreCatalogAction,
  getStoreOrdersAction,
} from "./actions/store.action";
import { StoreView } from "./Containers/StoreView";
import { ProductDetails } from "./Containers/ProductDetails";
import { Checkout } from "./Containers/Checkout";
import {
  getUserDetailsOrderDataAction,
  isCoustomerLoggedIn,
  updateCart,
} from "./actions/user.action";
import { getCredentailsDataAction } from "./actions/credentails.action";
import ResponsiveStoreViewCart from "./Components/StoreViewCart/responsiveStoreViewCart";
import { TermsandCondition } from "./Containers/Terms&Condition";
import { UserProfile } from "./Containers/UserProfile";
import GoToTop from "./Components/GoToTop";
import Signup from "./Containers/StoreCreateForm/StoreForm";
import StoreAddProductrespo from "./Containers/AddProduct/Responsive";
import StoreEditProductResponsive from "./Containers/EditProduct/Responsive";
import LandingPage from "./Containers/Landing_page";
import { SampleStore } from "./Containers/SampleStore";
import packageJson from "../package.json";
import Skeleton from "./Containers/Skeleton";
import TagManager from "react-gtm-module";
import AddNewAddress from "./Containers/Checkout/AddAddress";
import Payment from "./Containers/Checkout/Payment";
import OrderSuccess from "./Containers/Checkout/Ordersuccess";
import Scrollingtest from "./Containers/Scrrol";
import ProductDetailsStore from "./Components/ProductDetailCard/ProductDetailsVendor";
import Signin from "./Containers/Signin/Singin";

require("dotenv").config();

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const userAuth = useSelector((state) => state.userDetails);
  const appVersion = useSelector((state) => state.credentialData);

  useEffect(() => {
    TagManager.initialize({ gtmId: "GTM-N3FD448" });
  }, []);

  useEffect(() => {
    if (!auth.authenticate) {
      dispatch(isUserLoggedIn());
    }
    if (!userAuth.authenticate) {
      dispatch(isCoustomerLoggedIn());
    }
  }, []);
  useEffect(() => {
    dispatch(getCredentailsDataAction());
    dispatch(getUserDataAction());
  }, []);

  useEffect(() => {
    if (auth.authenticate) {
      dispatch(userStoreDataAction());
      dispatch(getStoreProducstAction());
      dispatch(getStoreCatalogAction());
      dispatch(getStoreOrdersAction());
    }
  }, [auth.authenticate]);

  useEffect(() => {
    if (userAuth.authenticate) {
      dispatch(getUserDetailsOrderDataAction());
      dispatch(updateCart());
    }
  }, [userAuth.authenticate]);

  useEffect(() => {
    if (appVersion.loading && appVersion.data && appVersion.data.length > 0) {
      if (packageJson.version !== appVersion.data[0].bussinessAppVersion) {
        if ("chaches" in window) {
          caches.keys().then((names) => {
            names.forEach((name) => {
              caches.delete(name);
            });
          });
          window.location.reload(true);
        }
      } else {
        return null;
      }
    }
  }, [appVersion]);


  useEffect(() => {
    // if (navigator.geolocation) {
    //   navigator.permissions
    //     .query({ name: "geolocation" })
    //     .then(function (result) {
    //       if (result.state === "granted") {
    //         console.log(result.state);
    //         //If granted then you can directly call your function here
    //       } else if (result.state === "prompt") {
    //         console.log(result.state);
    //       } else if (result.state === "denied") {
    //         //If denied then you have to show instructions to enable location
    //       }
    //       result.onchange = function () {
    //         console.log(result.state);
    //       };
    //     });
    // } else {
    //   alert("Sorry Not available!");
    // }

    navigator.geolocation.getCurrentPosition(function(position) {
      console.log("Latitude is :", position.coords.latitude);
      console.log("Longitude is :", position.coords.longitude);
    });
  }, []);





  return (
    <div className="App">
      <Switch>
        {/* <Route exact path="/" component={LandingPage} /> */}
        <Route exact path="/" component={Signup} />
        <Route exact path="/storeCreationForm" component={StoreCreationForm} />
        <Route exact path="/Scrool" component={Scrollingtest} />
        <Route
          exact
          path="/store-Add-Product"
          component={StoreAddProductrespo}
        />
        <Route
          exact
          path="/store-Edit-Product"
          component={StoreEditProductResponsive}
        />
        <Route
          exact
          path="/ShopisthanTermsandCondtition"
          component={TermsandCondition}
        />
        <Route exact path="/add-address" component={AddNewAddress} />
        <Route exact path="/checkout-payment" component={Payment} />
        <Route exact path="/order-success" component={OrderSuccess} />
        <Route exact path="/storeDashboard" component={StoreDasboard} />
        <Route exact path="/storeOrder" component={StoreOrder} />
        <Route exact path="/storeProduct" component={StoreProduct} />
        <Route exact path="/storeProduct/p" component={ProductDetailsStore} />
        <Route exact path="/storeCoustomer" component={StoreCoustomers} />
        <Route exact path="/storeCatalog" component={StoreCatelog} />
        <Route exact path="/storeProfile" component={StoreProfile} />
        <Route exact path="/storeAddProduct" component={StoreAddProduct} />
        <Route exact path="/storeEditProduct" component={StoreEditProduct} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/user-profile" component={UserProfile} />
        <Route exact path="/checkout" component={Checkout} />
        <Route
          exact
          path="/store-responsive-cart"
          component={ResponsiveStoreViewCart}
        />
        <Route exact path="/example/:storeCategory" component={SampleStore} />
        <Route
          exact
          path="/:productName/p/:productId"
          component={ProductDetails}
        />
        <Route exact path="/skeleton" component={Skeleton} />
        <Route exact path="/:storeUrl" component={StoreView} />
        <Route component={LandingPage} />
      </Switch>
      <GoToTop />
    </div>
  );
}
export default App;
