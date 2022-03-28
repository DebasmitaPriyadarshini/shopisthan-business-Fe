import {
  catalogContants,
  productContants,
  storeContants,
  cartConstants,
  userContants,
} from "../Constants/constants";

const initState = {
  token: null,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  user: {},
  cartItems: {},
  orders: [],
  store: {},
  product: [],
  catalog: [],
  productDetails: {},
  storeError: "",
  productError: "",
  catalogError: "",
  storeLoading: true,
  productLoading: true,
  catalogLoading: true,
  sentOtp: false,
};
const newOne = async (id, obj) => {
  delete obj[id];
};
const userDetails = (state = initState, action) => {
  switch (action.type) {
    case userContants.USER_LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        errorTF: false,
        error: "",
      };
      break;
    case userContants.USER_LOGIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        error: "",
      };
      break;
    case userContants.USER_LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        error: action.payload.message,
        loading: false,
      };
      break;

    case userContants.OTP_FOR_USER_SIGNIN_RQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticate: false,
        loading: false,
        error: "",
        sentOtp: false,
      };
      break;

    case userContants.OTP_FOR_USER_SIGNIN_SUCCESS:
      state = {
        ...state,
        authenticating: true,
        authenticate: false,
        loading: true,
        error: "",
        sentOtp: true,
      };
      break;

    case userContants.OTP_FOR_USER_SIGNIN_FAILURE:
      state = {
        ...state,
        authenticating: false,
        authenticate: false,
        loading: false,
        error: action.payload.message,
        sentOtp: false,
      };
      break;

    case userContants.VERIFIY_USER_OTP_RQUEST:
      state = {
        ...state,
        authenticating: true,
        authenticate: false,
        loading: false,
        error: "",
      };
      break;

    case userContants.VERIFIY_USER_OTP_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        authenticating: false,
        authenticate: true,
        loading: false,
        error: "",
      };
      break;

    case userContants.VERIFIY_USER_OTP_FAILURE:
      state = {
        ...state,
        authenticating: false,
        authenticate: false,
        loading: false,
        error: action.payload.message,
      };
      break;

    case userContants.GET_USER_DETAILS_SUCCESS:
      state = {
        ...state,
        user: action.payload.userData,
      };
      break;

    case userContants.GET_USER_ORDER_SUCCESS:
      state = {
        ...state,
        orders: action.payload.orderData,
      };
      break;

    case userContants.GET_USER_DETAILS_FAILURE:
      state = {
        ...state,
        user: {},
        orders: [],
      };
      break;

    case userContants.ADD_USER_ADDRESS_REQUEST:
      state = {
        ...state,
        loading: false,
        error: "",
      };
      break;

    case userContants.ADD_USER_ADDRESS_SUCCESS:
      state = {
        ...state,
        loading: true,
        error: "",
        user: action.payload.user,
      };
      break;

    case userContants.ADD_USER_ADDRESS_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.message,
      };
      break;

    case storeContants.GET_STORE_DETAILS_BY_URL_REQUEST:
      state = {
        ...state,
        storeError: "",
        storeLoading: true,
        store: {},
        loading: true,
      };

      break;

    case storeContants.GET_STORE_DETAILS_BY_URL_SUCCESS:
      state = {
        ...state,
        store: action.payload.decryptedStoreData,
        storeError: "",
        storeLoading: false,
        loading: false,
      };

      break;

    case storeContants.GET_STORE_DETAILS_BY_URL_FAILURE:
      state = {
        ...state,
        store: {},
        storeError: action.payload.message,
        storeLoading: false,
        loading: false,
      };

      break;

    case productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_REQUEST:
      state = {
        ...state,
        product: [],
        productError: "",
        productLoading: true,
      };

      break;

    case productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_SUCCESS:
      state = {
        ...state,
        product: action.payload.decryptedProductData,
        productError: "",
        productLoading: false,
      };

      break;

    case productContants.GET_STORE_PRODUCT_DETAILS_BY_URL_FAILURE:
      state = {
        ...state,
        product: [],
        productError: action.payload.message,
        productLoading: false,
      };

      break;

    case catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_REQUEST:
      state = {
        ...state,
        catalog: [],
        catalogError: "",
        catalogLoading: true,
      };

      break;

    case catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_SUCCESS:
      state = {
        ...state,
        catalog: action.payload.decryptedCatalogData,
        catalogError: "",
        catalogLoading: false,
      };

      break;

    case catalogContants.GET_STORE_CATLALOG_DETAILS_BY_URL_FAILURE:
      state = {
        ...state,
        catalog: [],
        catalogError: action.payload.message,
        catalogLoading: false,
      };

      break;

    case productContants.GET_PRODUCT_DETAILS_BY_ID_REQUEST:
      state = {
        ...state,
        productDetails: {},
        productError: "",
        productLoading: true,
      };

      break;

    case productContants.GET_PRODUCT_DETAILS_BY_ID_SUCCESS:
      state = {
        ...state,
        productDetails: action.payload.decryptedProductData,
        store: action.payload.decryptedStoreData,
        productError: "",
        productLoading: false,
      };

      break;

    case productContants.GET_PRODUCT_DETAILS_BY_ID_FAILURE:
      state = {
        ...state,
        productDetails: {},
        productError: action.payload.message,
        productLoading: false,
      };

      break;

    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        updatingCart: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        cartItems: action.payload.cartItems,
        updatingCart: false,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        updatingCart: false,
        error: action.payload.error,
      };
      break;
    case cartConstants.RESET_CART:
      state = {
        ...state,
        cartItems: {},
        updatingCart: false,
      };
      break;
    case cartConstants.REMOVE_CART_ITEM_SUCCESS1:
      const productId = action.payload.productId;
      newOne(productId, state.cartItems);
      break;

    case cartConstants.REMOVE_ALL_CART_ITEM_SUCCESS:
      state = {
        ...state,
        cartItems: {},
        updatingCart: false,
      };
      break;

    case userContants.ADD_USER_ORDER_REQUEST:
      state = {
        ...state,
        loading: false,
        error: "",
      };

      break;

    case userContants.ADD_USER_ORDER_SUCCESS:
      state = {
        ...state,
        loading: true,
        error: "",
      };

      break;

    case userContants.ADD_USER_ORDER_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.message,
      };

      break;

    default:
      return state;
  }
  return state;
};

export default userDetails;
