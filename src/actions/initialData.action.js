import axiosIntance from "../helpers/axios";
import {
  categoryContants,
  userStoreData,
  storePlansContants
} from "../Constants/constants";
import { REACT_APP_CRYPTOJS_KEY } from '../config/keys'
var CryptoJS = require("crypto-js");




export const getUserDataAction = () => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/userData`);
    if (res.status === 200) {
      const { storePlans } = res.data;
      var bytes = await CryptoJS.AES.decrypt(storePlans, REACT_APP_CRYPTOJS_KEY);
      var decryptedStorePlanData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: storePlansContants.GET_ALL_STORE_PLANS_SUCCESS,
        payload: { decryptedStorePlanData },
      });
    } else {
       console.clear()
      dispatch({
        type: categoryContants.GET_ALL_CATEGORIES_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const userStoreDataAction = () => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/userStoreData`);
    if (res.status === 200) {
      const { store } = res.data;
      var StoreBytes = await CryptoJS.AES.decrypt(store, REACT_APP_CRYPTOJS_KEY);
      var decryptedStoreData = await JSON.parse(StoreBytes.toString(CryptoJS.enc.Utf8));

      dispatch({
        type: userStoreData.GET_USER_STORE_DETAILS_SUCCESS,
        payload: { store: decryptedStoreData }
      });
    } else {
       console.clear()
      dispatch({
        type: userStoreData.GET_USER__STORE_DETAILS_FAILURE,
        payload: { error: res.data.error },
      });

    }
  };
};
