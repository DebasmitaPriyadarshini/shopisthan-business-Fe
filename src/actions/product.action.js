import axiosIntance from "../helpers/axios";
import { productContants, storeContants } from "../Constants/constants";
import  {REACT_APP_CRYPTOJS_KEY} from '../config/keys';
var CryptoJS = require("crypto-js");


export const getStoreProducstAction = () => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/allproducts`);
    if (res.status === 200) {
      const { product } = res.data;
      var productBytes = await CryptoJS.AES.decrypt(product, REACT_APP_CRYPTOJS_KEY);
      var decryptedProductData = await JSON.parse(productBytes.toString(CryptoJS.enc.Utf8));
      dispatch({
        type: storeContants.GET_ALL_STORE_PRODUCTS_SUCCESS,
        payload: { product: decryptedProductData },
      });
    } else {
       console.clear()
      dispatch({
        type: storeContants.GET_ALL_STORE_PRODUCTS_FAILURE,
        payload: { error: res.data.error },
      });

    }
  };
};


export const createProductAction = (form) => (dispatch) => {

  dispatch({
    type: productContants.ADD_NEW_PRODUCT_REQUEST
  });
  axiosIntance
    .post("/create/product", form)
    .then((res) => {
      dispatch({
        type: productContants.ADD_NEW_PRODUCT_SUCCESS,
        payload: { product: "Added product" }
      });
      dispatch(getStoreProducstAction()
      );
    })
    .catch((error) => {
       console.clear()
      dispatch({
        type: productContants.ADD_NEW_PRODUCT_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};


export const editProductAction = (form) => (dispatch) => {
  dispatch({
    type: productContants.EDIT_PRODUCT_BY_ID_REQUEST,
    payload: { error: "Something went worng" },
  });
  axiosIntance
    .post("/edit/product", { ...form })
    .then((res) => {
      dispatch(getStoreProducstAction());
    })
    .catch((error) => {
       console.clear()
      dispatch({
        type: productContants.EDIT_PRODUCT_BY_ID_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};

export const editProductWithPicturesAction = (form) => (dispatch) => {
  dispatch({
    type: productContants.EDIT_PRODUCT_BY_ID_REQUEST,
    payload: { error: "Something went worng" },
  });
  axiosIntance
    .post("/edit/productWithPicture", form)
    .then((res) => {
      dispatch(getStoreProducstAction());
    })
    .catch((error) => {
       console.clear()
      dispatch({
        type: productContants.EDIT_PRODUCT_BY_ID_FAILURE,
        payload: { error: "Something went worng" },
      });
    });
};

export const outOfStockProductAction = (productOutOfStock) => {
  return async dispatch => {
    try {
      const res = await axiosIntance.post('/outOfStockProduct', { ...productOutOfStock });
      if (res.status === 201) {
        dispatch({
          type: productContants.EDIT_PRODUCT_STOCK_BY_ID_SUCCESS,
          payload: {
            productId: productOutOfStock.productId,
            asd: productOutOfStock.productOutOfStock
          }
        });
      } else {
        console.clear()
      }
    } catch (error) {
       console.clear()
    }


  }
}

export const deleteProductByIdAction = (payload) => {

  return async (dispatch) => {
    dispatch({
      type: productContants.DELETE_PRODUCT_BY_ID_REQUEST
    });

    try {
      const res = await axiosIntance.delete(`product/deleteProductById`, {
        data: { payload },
      });
      if (res.status === 202) {
        dispatch(getStoreProducstAction());
      } else {
        dispatch({
          type: productContants.DELETE_PRODUCT_BY_ID_FAILURE,
          payload: { error: "Something went worng" },
        });
      }
    } catch (error) {
       console.clear()
    }
  };
};


