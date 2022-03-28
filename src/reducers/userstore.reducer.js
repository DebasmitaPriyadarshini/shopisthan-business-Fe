import {
  authConstants,
  storeContants,
  userStoreData,
  catalogContants,
  productContants,
  orderContants,
} from "../Constants/constants";

const initState = {
  userStore: {},
  storeProduct: [],
  storeOrder: [],
  storeCatalog: [],
  error: "",
  message: "",
  loading: false,
  added: false,
  productloading: false,
  storeProfileloading: false,
  storeCatalogloading: false,
};

const userStore = (state = initState, action) => {
  switch (action.type) {
    case storeContants.CREATE_FREE_STORE_OTP_REQUEST:
      state = {
        ...state,
        loading: true,
        added: false,
        error: "",
      };
      break;
    case storeContants.CREATE_FREE_STORE_OTP_SUCCESS:
      state = {
        ...state,
        loading: false,
        added: true,
        error: "",
      };
      break;
    case storeContants.CREATE_FREE_STORE_OTP_FAILURE:
      state = {
        ...state,
        error: action.payload.message,
        loading: false,
        added: false,
      };
      break;

    case storeContants.CREATE_FREE_STORE_OTP_VERIFY_REQUEST:
      state = {
        ...state,
        loading: true,
        added: false,
        error: "",
      };
      break;

    case storeContants.CREATE_FREE_STORE_OTP_VERIFY_FAILURE:
      state = {
        ...state,
        error: action.payload.message,
        loading: false,
        added: false,
      };
      break;

    case storeContants.ADD_NEW_STORE_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case storeContants.ADD_NEW_STORE_SUCCESS:
      state = {
        ...state,
        userStore: action.payload.stores,
        loading: false,
        error: "",
      };
      break;
    case storeContants.ADD_NEW_STORE_FAILURE:
      state = {
        ...state,
        error: action.payload.message,
        loading: false,
      };
      break;

    case productContants.ADD_NEW_PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;
    case productContants.ADD_NEW_PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: "Something Went Wrong",
      };

      break;

    case productContants.DELETE_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;
    case productContants.DELETE_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: "Something Went Wrong",
      };

      break;

    case productContants.EDIT_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
      };
      break;
    case productContants.EDIT_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        loading: false,
        error: "Something Went Wrong",
      };

      break;

    case productContants.EDIT_PRODUCT_STOCK_BY_ID_SUCCESS:
      state = {
        ...state,
        storeProduct: state.storeProduct.map((obj) =>
          obj.productId === action.payload.productId
            ? { ...obj, productOutOfStock: action.payload.asd }
            : obj
        ),
      };

      break;

    case storeContants.GET_ALL_STORE_PRODUCTS_SUCCESS:
      state = {
        ...state,
        storeProduct: action.payload.product,
        loading: false,
        productloading: true,
        error: "",
      };
      break;

    case storeContants.GET_ALL_STORE_PRODUCTS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: "Something Went Wrong",
      };
      break;

    case productContants.ADD_NEW_PRODUCT_SUCCESS:
      state = {
        ...state,
        added: true,
      };
      break;
    case userStoreData.GET_USER_STORE_DETAILS_SUCCESS:
      state = {
        ...state,
        userStore: action.payload.store,
        storeProfileloading: true,
      };
      break;
    case userStoreData.GET_USER_STORE_DETAILS_EDIT_SUCCESS:
      state = {
        ...state,
        userStore: action.payload.storeInfo,
      };
      break;

    case storeContants.EDIT_STORE_REQUEST:
      state = {
        ...state,
        error: "",
        message: "",
        loading: false,
      };
      break;

    case storeContants.EDIT_STORE_SUCCESS:
      state = {
        ...state,
        userStore: action.payload.storeInfo,
        error: "",
        message: "Saved",
        loading: true,
      };
      break;

    case storeContants.EDIT_STORE_FAILURE:
      state = {
        ...state,
        error: "Not Saved",
        message: "",
        loading: false,
      };
      break;

    case authConstants.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstants.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;

    case catalogContants.ADD_NEW_CATALOG_REQUEST:
      state = {
        ...state,
        error: "",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.GET_ALL_CATALOGS_SUCCESS:
      state = {
        ...state,
        storeCatalog: action.payload.catalog,
        error: "",
        message: "Saved",
        loading: true,
      };
      break;

    case catalogContants.ADD_NEW_CATALOG_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.GET_ALL_CATALOGS_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.EDIT_CATALOG_BY_ID_REQUEST:
      state = {
        ...state,
        error: "",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.EDIT_CATALOG_BY_ID_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.DELETE_CATALOG_BY_ID_REQUEST:
      state = {
        ...state,
        error: "",
        message: "",
        loading: false,
      };
      break;

    case catalogContants.DELETE_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    case orderContants.GET_ALL_STORE_ORDER_SUCCESS:
      state = {
        ...state,
        storeOrder: action.payload.orders,
        error: "",
        message: "Saved",
        loading: true,
      };
      break;

    case orderContants.EDIT_ORDER_PRODUCT_BY_ID_REQUEST:
      state = {
        ...state,
        error: "",
        message: "",
        loading: false,
      };
      break;

    case orderContants.EDIT_ORDER_PRODUCT_BY_ID_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    case orderContants.GET_ALL_STORE_ORDER_FAILURE:
      state = {
        ...state,
        error: "Something went wrong",
        message: "",
        loading: false,
      };
      break;

    default:
      return state;
  }
  return state;
};

export default userStore;
