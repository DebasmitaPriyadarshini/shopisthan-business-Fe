import {
  authConstants,
  storeContants
} from "../Constants/constants";

const initState = {
  token: null,
  user: {
    name: "",
    loginId: "",
    userEmail: "",
    role: "",
  },
  verify: {
  },
  verifying: false,
  authenticate: false,
  authenticating: false,
  loading: false,
  error: "",
  errorTF: false,
  sentOtp: false,
  loginId: "",
  _id: ""
};

const auth = (state = initState, action) => {
  switch (action.type) {
    case authConstants.OTP_FOR_SIGNIN_RQUEST:
      state = {
        ...state,
        authenticating: true,
        errorTF: false,
        error: "",
        verifying: false
      };
      break;

    case authConstants.OTP_FOR_SIGNIN_SUCCESS:
      state = {
        ...state,
        verifying: true,
        authenticate: false,
        authenticating: false,
        errorTF: false,
        error: "",
      };
      break;

    case authConstants.OTP_FOR_SIGNIN_FAILURE:
      state = {
        ...state,
        verifying: false,
        authenticate: false,
        authenticating: false,
        errorTF: true,
        error: action.payload.message,
      };
      break;

    case authConstants.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        errorTF: false,
        error: ""
      };
      break;
    case authConstants.LOGIN_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        verify: {},
        authenticate: true,
        authenticating: false,
        errorTF: false,
        error: "",
      };
      break;
    case authConstants.LOGIN_FAILURE:
      state = {
        ...state,
        authenticating: true,
        errorTF: true,
        error: action.payload.message,
        loading: false,
      };
      break;
    case authConstants.VERIFIY_RQUEST:
      state = {
        ...state,
        authenticating: true,
        errorTF: false,
        error: "",
        verifying: false
      };

      break;



    case authConstants.VERIFIY_SUCCESS:
      state = {
        ...state,
        token: action.payload.token,
        authenticate: true,
        verify: {},
        authenticating: false,
        errorTF: false,
        error: "",
      };
      break;

    case authConstants.SIGNUP_SUCCESS:
      state = {
        ...state,
        verify: action.payload.user,
        verifying: true,
        errorTF: false,
        error: "",
      }
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

    case authConstants.VERIFIY_FAILURE:
      state = {
        ...state,
        authenticating: true,
        errorTF: true,
        error: action.payload.message,
        loading: false,
      };
      break;

    case storeContants.MARKETING_ADD_NEW_STORE_REQUEST:
      state = {
        ...state,
        loading: true,
        error: "",
        errorTF: false
      };
      break;

    case storeContants.MARKETING_ADD_NEW_STORE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: "",
        errorTF: false
      };
      break;
    case storeContants.MARKETING_ADD_NEW_STORE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload.message,
        errorTF: true
      };
      break;

    case authConstants.RESEND_OTP_RQUEST:
      state = {
        ...state,
        sentOtp: false,
        error: ""
      }
      break;

    case authConstants.RESEND_OTP_SUCCESS:
      state = {
        ...state,
        sentOtp: true,
        error: ""
      }
      break;

    case authConstants.RESEND_OTP_FAILURE:
      state = {
        ...state,
        sentOtp: false,
        error: action.payload.message
      };
      break;


    case storeContants.OTP_FOR_STORE_REQUEST:
      state = {
        ...state,
        sentOtp: false,
        loading: true,
        error: "",
        loginId: "",
        _id: "",
        errorTF: false,
      };
      break;

    case storeContants.OTP_FOR_STORE_SUCCESS:
      state = {
        ...state,
        sentOtp: true,
        loading: false,
        error: "",
        errorTF: false,
      };
      break;

    case storeContants.OTP_FOR_STORE_FAILURE:
      state = {
        ...state,
        sentOtp: false,
        loading: false,
        error: action.payload.message,
        loginId: "",
        errorTF: true,
        _id: ""
      };
      break;

    default:
      return state;
  }

  return state;
};

export default auth;
