import axiosIntance from "../helpers/axios";
import { storeContants, userStoreData, catalogContants, orderContants, authConstants } from "../Constants/constants";
import { REACT_APP_CRYPTOJS_KEY } from '../config/keys';
var CryptoJS = require("crypto-js");


export const storeProfileAction = (store) => (dispatch) => {
  axiosIntance
    .post("/store/profilepic", store)
    .then(async (res) => {
      const { storeInfo } = res.data;
      var storeInfoBytes = await CryptoJS.AES.decrypt(storeInfo, REACT_APP_CRYPTOJS_KEY);
      var storeInfoData = await JSON.parse(storeInfoBytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: userStoreData.GET_USER_STORE_DETAILS_EDIT_SUCCESS,
        payload: { storeInfo: storeInfoData },
      });
    })
    .catch((error) => {
      console.clear()
    });
};

export const getStoreCatalogAction = () => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/allcatalog`);
    if (res.status === 200) {
      const { catalog } = res.data;
      var catalogBytes = await CryptoJS.AES.decrypt(catalog, REACT_APP_CRYPTOJS_KEY);
      var decryptedCatalogData = await JSON.parse(catalogBytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: catalogContants.GET_ALL_CATALOGS_SUCCESS,
        payload: { catalog: decryptedCatalogData },
      });
    } else {
      console.clear()
      dispatch({
        type: catalogContants.GET_ALL_CATALOGS_FAILURE,
        payload: { error: "Something went worng" },
      });

    }
  };
};

export const getStoreOrdersAction = () => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/getStoreOrders`);
    if (res.status === 200) {
      const { orders } = res.data;
      var orderBytes = await CryptoJS.AES.decrypt(orders, REACT_APP_CRYPTOJS_KEY);
      var decryptedOrderData = await JSON.parse(orderBytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: orderContants.GET_ALL_STORE_ORDER_SUCCESS,
        payload: { orders: decryptedOrderData },
      });
    } else {
      console.clear()
      dispatch({
        type: orderContants.GET_ALL_STORE_ORDER_FAILURE,
        payload: { error: res.data.error },
      });

    }
  };
};

export const addCatalogAction = (catalog) => (dispatch) => {
  dispatch({
    type: catalogContants.ADD_NEW_CATALOG_REQUEST
  })
  axiosIntance
    .post("/create/catalog", catalog)
    .then((res) => {
      dispatch(getStoreCatalogAction());
    })
    .catch((error) => {
      console.clear()
      dispatch({
        type: catalogContants.ADD_NEW_CATALOG_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};

export const editCatalogAction = (form) => (dispatch) => {
  dispatch({
    type: catalogContants.EDIT_CATALOG_BY_ID_REQUEST
  });
  axiosIntance
    .post("/editCatalog", { ...form })
    .then((res) => {
      dispatch(getStoreCatalogAction());
    })
    .catch((error) => {
      console.clear()
      dispatch({
        type: catalogContants.EDIT_CATALOG_BY_ID_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};

export const deleteCatalogByIdAction = (payload) => {

  return async (dispatch) => {
    dispatch({
      type: catalogContants.DELETE_CATALOG_BY_ID_REQUEST
    });

    try {
      const res = await axiosIntance.delete(`/deleteCatalog`, {
        data: { payload },
      });
      if (res.status === 202) {
        dispatch(getStoreCatalogAction());
      } else {
        dispatch({
          type: catalogContants.DELETE_CATALOG_BY_ID_FAILURE,
          payload: { error: "Something went worng" },
        });
      }
    } catch (error) {
      console.clear()

    }
  };
};

export const editOrderProductAction = (details) => (dispatch) => {
  dispatch({
    type: orderContants.EDIT_ORDER_PRODUCT_BY_ID_REQUEST
  })
  axiosIntance
    .post("/editOrder", { ...details })
    .then((res) => {
      dispatch(getStoreOrdersAction())
    })
    .catch((error) => {
      console.clear()
      dispatch({
        type: orderContants.EDIT_ORDER_PRODUCT_BY_ID_FAILURE,
        payload: { error: "Something went worng" },
      })
    });
};

export const editStoreAction = (form) => (dispatch) => {
  dispatch({
    type: storeContants.EDIT_STORE_REQUEST,
  });
  axiosIntance
    .post("/edit/store", { ...form })
    .then(async (res) => {
      const { storeInfo } = res.data;
      var storeInfoBytes = await CryptoJS.AES.decrypt(storeInfo, REACT_APP_CRYPTOJS_KEY);
      var storeInfoData = await JSON.parse(storeInfoBytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: storeContants.EDIT_STORE_SUCCESS,
        payload: { storeInfo: storeInfoData }
      });
    })
    .catch((error) => {
      console.clear()
      dispatch({
        type: storeContants.EDIT_STORE_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};

export const storeOtpAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: storeContants.OTP_FOR_STORE_REQUEST });
    await axiosIntance.post(`/signin-store-otp`, {
      ...data
    }).then((res) => {
      dispatch({
        type: storeContants.OTP_FOR_STORE_SUCCESS,
      });
    }).catch((error) => {
      console.clear()
      const { message } = error.response.data;
      dispatch({
        type: storeContants.OTP_FOR_STORE_FAILURE,
        payload: { message }
      });
    })
  };
};

export const verfiyStoreOtpAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: storeContants.ADD_NEW_STORE_REQUEST });
    await axiosIntance.post(`/verfiy-store-otp`, {
      ...data
    }).then((res) => {

      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      const {
        token,
      } = res.data;
      localStorage.setItem("token", token);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
        },
      });

    }).catch((error) => {
      console.clear()
      const { message } = error.response.data;
      dispatch({
        type: storeContants.ADD_NEW_STORE_FAILURE,
        payload: { message }
      });
    })
  };
};

export const createFreeStoreOtpAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: storeContants.CREATE_FREE_STORE_OTP_REQUEST });
    await axiosIntance.post(`/create-free-online-store-otp`, {
      ...data
    }).then((res) => {
      dispatch({
        type: storeContants.CREATE_FREE_STORE_OTP_SUCCESS,
      });
    }).catch((error) => {
      console.clear()
      const { message } = error.response.data;
      dispatch({
        type: storeContants.CREATE_FREE_STORE_OTP_FAILURE,
        payload: { message }
      });
    })
  };
};


export const verifyFreeStoreOtpAction = (data) => {
  return async (dispatch) => {
    dispatch({ type: storeContants.CREATE_FREE_STORE_OTP_VERIFY_REQUEST });
    await axiosIntance.post(`/create-free-online-store-otp-verify`, {
      ...data
    }).then((res) => {

      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
      const {
        token,
      } = res.data;
      localStorage.setItem("token", token);
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
        },
      });

    }).catch((error) => {
      console.clear()
      const { message } = error.response.data;
      dispatch({
        type: storeContants.CREATE_FREE_STORE_OTP_VERIFY_FAILURE,
        payload: { message }
      });
    })
  };
};