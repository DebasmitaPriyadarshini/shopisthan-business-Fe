import axiosIntance from "../helpers/axios";
import { authConstants } from "../Constants/constants";

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = localStorage.getItem("token");
    if (token) {
      dispatch({
        type: authConstants.LOGIN_SUCCESS,
        payload: {
          token,
        },
      });
    } else {
      console.clear();
      dispatch({
        type: authConstants.LOGIN_FAILURE,
        payload: { error: "Failed to login" },
      });
    }
  };
};

export const signoutAction = () => {
  return async (dispatch) => {
    dispatch({ type: authConstants.LOGOUT_REQUEST });
    const res = await axiosIntance.post(`/signout`);
    if (res.status === 200) {
      localStorage.clear();
      dispatch({ type: authConstants.LOGOUT_SUCCESS });
    } else {
      console.clear();
      dispatch({
        type: authConstants.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const getSigninOtpAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.OTP_FOR_SIGNIN_RQUEST });
    await axiosIntance
      .post(`/signin`, {
        ...user,
      })
      .then((res) => {
        dispatch({
          type: authConstants.OTP_FOR_SIGNIN_SUCCESS,
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: authConstants.OTP_FOR_SIGNIN_FAILURE,
          payload: message ? { message } : "Something went wrong",
        });
      });
  };
};

export const resendOtpAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.RESEND_OTP_RQUEST });
    await axiosIntance
      .post(`/signin`, {
        ...user,
      })
      .then((res) => {
        dispatch({
          type: authConstants.RESEND_OTP_SUCCESS,
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: authConstants.RESEND_OTP_FAILURE,
          payload: message ? { message } : "Something went wrong",
        });
      });
  };
};

export const VerfifyOtpAction = (user) => {
  return async (dispatch) => {
    dispatch({ type: authConstants.VERIFIY_RQUEST });
    await axiosIntance
      .post(`/verifiy`, {
        ...user,
      })
      .then((res) => {
        const { token } = res.data;
        localStorage.setItem("token", token);
        dispatch({
          type: authConstants.VERIFIY_SUCCESS,
          payload: {
            token,
          },
        });
      })
      .catch((error) => {
        console.clear();
        const { message } = error.response.data;
        dispatch({
          type: authConstants.VERIFIY_FAILURE,
          payload: message ? { message } : "Something went wrong",
        });
      });
  };
};
