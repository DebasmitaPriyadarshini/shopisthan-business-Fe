import userAxiosIntance from "../helpers/user.axios";
import { REACT_APP_CRYPTOJS_KEY } from "../config/keys";
import {
  catalogContants,
  productContants,
  storeContants,
  cartConstants,
  userContants,
} from "../Constants/constants";
import store from "../store/key";
var CryptoJS = require("crypto-js");

export const isCoustomerLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("userToken");
    if (token) {
      dispatch({
        type: userContants.USER_LOGIN_SUCCESS,
        payload: {
          token,
        },
      });
    } else {
      console.clear();
      dispatch({
        type: userContants.USER_LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const getUserSigninOtpAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: userContants.OTP_FOR_USER_SIGNIN_RQUEST });
    await userAxiosIntance
      .post(`/user-signin`, {
        ...user,
      })
      .then((res) => {
        dispatch({
          type: userContants.OTP_FOR_USER_SIGNIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: userContants.OTP_FOR_USER_SIGNIN_FAILURE,
          payload: message ? { message } : "Something went wrong",
        });
      });
  };
};

export const userOtpVerfifyAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: userContants.VERIFIY_USER_OTP_RQUEST });
    await userAxiosIntance
      .post(`/user-otp-verifiy`, {
        ...user,
      })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("userToken", token);
        dispatch({
          type: userContants.VERIFIY_USER_OTP_SUCCESS,
          payload: {
            token,
          },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: userContants.VERIFIY_USER_OTP_FAILURE,
          payload: message ? { message } : "Something went wrong",
        });
      });
  };
};

export const getUserDetailsOrderDataAction = () => {
  return async (dispatch) => {
    await userAxiosIntance
      .get(`/userInitialData`)
      .then(async (res) => {
        const { user, order } = res.data;
        var bytes = await CryptoJS.AES.decrypt(user, REACT_APP_CRYPTOJS_KEY);
        var decryptedUserData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );

        var orderBytes = await CryptoJS.AES.decrypt(
          order,
          REACT_APP_CRYPTOJS_KEY
        );
        var decryptedUserOrderData = await JSON.parse(
          orderBytes.toString(CryptoJS.enc.Utf8)
        );
        dispatch({
          type: userContants.GET_USER_DETAILS_SUCCESS,
          payload: { userData: decryptedUserData },
        });
        dispatch({
          type: userContants.GET_USER_ORDER_SUCCESS,
          payload: { orderData: decryptedUserOrderData },
        });
      })
      .catch((error) => {
        dispatch({
          type: userContants.GET_USER_DETAILS_FAILURE,
        });
      });
  };
};

export const getStoreDetailsByUrlAction = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: storeContants.GET_STORE_DETAILS_BY_URL_REQUEST,
    });
    const { storeUrl } = payload.params;
    await userAxiosIntance
      .get(`/storeDetails/${storeUrl}`)
      .then(async (res) => {
        const { store } = res.data;
        var bytes = await CryptoJS.AES.decrypt(store, REACT_APP_CRYPTOJS_KEY);
        var decryptedStoreData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );
        dispatch({
          type: storeContants.GET_STORE_DETAILS_BY_URL_SUCCESS,
          payload: { decryptedStoreData },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: storeContants.GET_STORE_DETAILS_BY_URL_FAILURE,
          payload: { message },
        });
      });
  };
};

export const getStoreProductDetailsByUrlAction = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_REQUEST,
    });
    const { storeUrl } = payload.params;
    await userAxiosIntance
      .get(`/storeProductDetails/${storeUrl}`)
      .then(async (res) => {
        const { product } = res.data;
        var bytes = await CryptoJS.AES.decrypt(product, REACT_APP_CRYPTOJS_KEY);
        var decryptedProductData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );
        dispatch({
          type: productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_SUCCESS,
          payload: { decryptedProductData },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_FAILURE,
          payload: { message },
        });
      });
  };
};

export const getStoreCatalogDetailsByUrlAction = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_REQUEST,
    });
    const { storeUrl } = payload.params;
    await userAxiosIntance
      .get(`/storeCatalogDetails/${storeUrl}`)
      .then(async (res) => {
        const { catalog } = res.data;
        var bytes = await CryptoJS.AES.decrypt(catalog, REACT_APP_CRYPTOJS_KEY);
        var decryptedCatalogData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );
        dispatch({
          type: catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_SUCCESS,
          payload: { decryptedCatalogData },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_FAILURE,
          payload: { message },
        });
      });
  };
};

export const getProductDetailsByIdAction = (payload) => {
  return async (dispatch) => {
    dispatch({
      type: productContants.GET_PRODUCT_DETAILS_BY_ID_REQUEST,
    });
    const { productId } = payload.params;
    await userAxiosIntance
      .get(`/productDetailsById/${productId}`)
      .then(async (res) => {
        const { productDetails, storeDetails } = res.data;
        var bytes = await CryptoJS.AES.decrypt(
          productDetails,
          REACT_APP_CRYPTOJS_KEY
        );
        var decryptedProductData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );

        var storeBytes = await CryptoJS.AES.decrypt(
          storeDetails,
          REACT_APP_CRYPTOJS_KEY
        );
        var decryptedStoreData = await JSON.parse(
          storeBytes.toString(CryptoJS.enc.Utf8)
        );

        dispatch({
          type: productContants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS,
          payload: { decryptedProductData, decryptedStoreData },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: productContants.GET_PRODUCT_DETAILS_BY_ID_FAILURE,
          payload: { message },
        });
      });
  };
};

const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const res = await userAxiosIntance.post(`/user/getCartItems`);
      if (res.status === 200) {
        const { payload } = res.data;
        if (payload) {
          var bytes = CryptoJS.AES.decrypt(payload, REACT_APP_CRYPTOJS_KEY);
          var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
          dispatch({
            type: cartConstants.ADD_TO_CART_SUCCESS,
            payload: { cartItems: decryptedData },
          });
        }
      }
    } catch (error) {
      console.clear();
    }
  };
};

export const addToCart = (product, newQty = 1) => {
  return async (dispatch) => {
    const {
      userDetails: { cartItems },
      userDetails,
    } = store.getState();
    const qty = cartItems[product._id]
      ? parseInt(cartItems[product._id].qty + newQty)
      : 1;
    cartItems[product._id] = {
      ...product,
      qty,
    };

    if (userDetails.authenticate) {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const payload1 = {
        cartItems: [
          {
            product: product._id,
            quantity: qty,
            storeId: product.storeId,
          },
        ],
        storeId: product.storeId,
      };
      const payload = await CryptoJS.AES.encrypt(
        JSON.stringify(payload1),
        REACT_APP_CRYPTOJS_KEY
      ).toString();
      const data = { payload };
      const res = await userAxiosIntance.post(`/user/cart/addtocart`, data);
      if (res.status === 201) {
        dispatch(getCartItems());
      } else {
        console.clear();
      }
    } else {
      const payload = await CryptoJS.AES.encrypt(
        JSON.stringify(cartItems),
        REACT_APP_CRYPTOJS_KEY
      ).toString();
      localStorage.setItem("cart", payload);
      dispatch({
        type: cartConstants.ADD_TO_CART_SUCCESS,
        payload: { cartItems },
      });
    }
  };
};

const getAVds = async () => {
  const {
    userDetails: { cartItems },
  } = store.getState();

  const payload = await CryptoJS.AES.encrypt(
    JSON.stringify(cartItems),
    REACT_APP_CRYPTOJS_KEY
  ).toString();
  localStorage.setItem("cart", payload);
};

export const removeCartItem = (payload) => {
  return async (dispatch) => {
    try {
      const {
        userDetails,
        userDetails: { cartItems },
      } = store.getState();
      if (userDetails.authenticate) {
        dispatch({ type: cartConstants.REMOVE_CART_ITEM_REQUEST });

        const res = await userAxiosIntance.post(`/user/cart/removeItem`, {
          payload,
        });
        if (res.status === 202) {
          if (Object.keys(cartItems).length === 1) {
            dispatch({ type: cartConstants.REMOVE_ALL_CART_ITEM_SUCCESS });
          } else {
            dispatch({ type: cartConstants.REMOVE_CART_ITEM_SUCCESS });
            dispatch(getCartItems());
          }
        } else {
          const { error } = res.data;
          dispatch({
            type: cartConstants.REMOVE_CART_ITEM_FAILURE,
            payload: { error },
          });
        }
      } else {
        dispatch({
          type: cartConstants.REMOVE_CART_ITEM_SUCCESS1,
          payload: { productId: payload.productId },
        });
        getAVds();
      }
    } catch (error) {
      console.clear();
    }
  };
};

export const updateCart = () => {
  return async (dispatch) => {
    const { userDetails } = store.getState();
    if (localStorage.getItem("cart")) {
      let cartItems1 = localStorage.getItem("cart");
      var tokenBytes = CryptoJS.AES.decrypt(cartItems1, REACT_APP_CRYPTOJS_KEY);
      var decryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
    }

    let cartItems = localStorage.getItem("cart") ? decryptedToken : null;

    if (userDetails.authenticate) {
      localStorage.removeItem("cart");
      if (cartItems) {
        const asd = Object.keys(cartItems).map(
          (key, index) => cartItems[key].storeId
        );
        const storeId = asd[0];
        const payloadData = {
          cartItems: Object.keys(cartItems).map((key, index) => {
            return {
              quantity: cartItems[key].qty,
              product: cartItems[key]._id,
              storeId: cartItems[key].storeId,
            };
          }),
          storeId: storeId,
        };

        const payload = await CryptoJS.AES.encrypt(
          JSON.stringify(payloadData),
          REACT_APP_CRYPTOJS_KEY
        ).toString();
        const data = { payload };

        if (Object.keys(cartItems).length > 0) {
          const res = await userAxiosIntance.post(`/user/cart/addtocart`, data);
          if (res.status === 201) {
            dispatch(getCartItems());
          } else {
            console.clear();
          }
        }
      } else {
        dispatch(getCartItems());
      }
    } else {
      if (cartItems) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: { cartItems },
        });
      }
    }
  };
};

export const editUserAddressAction = (form) => {
  return async (dispatch) => {
    dispatch({
      type: userContants.ADD_USER_ADDRESS_REQUEST,
    });
    userAxiosIntance
      .post("/editAddress", { ...form })
      .then(async (res) => {
        const { userUpdatedDetails } = res.data;
        var bytes = await CryptoJS.AES.decrypt(
          userUpdatedDetails,
          REACT_APP_CRYPTOJS_KEY
        );
        var decryptedUserData = await JSON.parse(
          bytes.toString(CryptoJS.enc.Utf8)
        );
        dispatch({
          type: userContants.ADD_USER_ADDRESS_SUCCESS,
          payload: {
            user: decryptedUserData,
          },
        });
      })
      .catch((error) => {
        console.clear();
        dispatch({
          type: userContants.ADD_USER_ADDRESS_FAILURE,
          payload: { error: "Something went worng" },
        });
      });
  };
};

export const addOrder = (orderData) => {
  return async (dispatch) => {
    try {
      const data1 = { orderData };
      const payload = await CryptoJS.AES.encrypt(
        JSON.stringify(data1),
        REACT_APP_CRYPTOJS_KEY
      ).toString();
      const data = { payload };
      const res = await userAxiosIntance.post(`/addOrderCOD`, data);
      dispatch({ type: userContants.ADD_USER_ORDER_REQUEST });
      if (res.status === 201) {
        const { orderData } = res.data;
        var bytes = await CryptoJS.AES.decrypt(
          orderData,
          REACT_APP_CRYPTOJS_KEY
        );
        var decryptedData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        dispatch({
          type: cartConstants.RESET_CART,
        });
        dispatch({
          type: userContants.ADD_USER_ORDER_SUCCESS,
          payload: { order: decryptedData },
        });
        dispatch(getUserDetailsOrderDataAction());
      } else {
        console.clear();
        dispatch({
          type: userContants.ADD_USER_ORDER_FAILURE,
          payload: { message: "Something went wrong try again later" },
        });
      }
    } catch (error) {
      console.clear();
    }
  };
};

export const getOrders = () => {
  return async (dispatch) => {
    try {
      const res = await userAxiosIntance.get(`/getOrders`);
      dispatch({ type: userContants.GET_USER_ORDER_REQUEST });
      if (res.status === 200) {
        const { orders } = res.data;
        dispatch({
          type: userContants.GET_USER_ORDER_SUCCESS,
          payload: { orders },
        });
      } else {
        console.clear();
        const { error } = res.data;
        dispatch({
          type: userContants.GET_USER_ORDER_FAILURE,
          payload: { error },
        });
      }
    } catch (error) {
      console.clear();
    }
  };
};

export { getCartItems };
