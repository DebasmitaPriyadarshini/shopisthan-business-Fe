import axiosIntance from "../helpers/axios";
import { REACT_APP_CRYPTOJS_KEY } from '../config/keys';
import { credentialsContants } from "../Constants/constants";
var CryptoJS = require("crypto-js");



export const getCredentailsDataAction = () => {
    return async (dispatch) => {
        const res = await axiosIntance.get(`/credentialData`);
        if (res.status === 200) {
            const { data } = res.data;
            var bytes = await CryptoJS.AES.decrypt(data, REACT_APP_CRYPTOJS_KEY);
            var decryptedCredentailsData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            dispatch({
                type: credentialsContants.GET_ALL_CREDENTIALS_SUCCESS,
                payload: { data: decryptedCredentailsData },
            });
        } else {
            console.clear()
        }
    };
};
