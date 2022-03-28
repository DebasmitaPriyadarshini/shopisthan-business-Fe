import axios from "axios";
import { REACT_APP_API, REACT_APP_CRYPTOJS_KEY } from '../config/keys'
var CryptoJS = require("crypto-js");


require('dotenv').config()
const userAxiosIntance = axios.create({
    baseURL: REACT_APP_API,
});
userAxiosIntance.interceptors.request.use(
    (config) => {

        const storedToken = window.localStorage.getItem("userToken");
        if (storedToken) {
            var tokenBytes = CryptoJS.AES.decrypt(storedToken, REACT_APP_CRYPTOJS_KEY);
            var decryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
        }
        if (decryptedToken) {
            const BearerToken = `Bearer ${decryptedToken}`
            var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(BearerToken), REACT_APP_CRYPTOJS_KEY).toString();
            config.headers.Authorization = ciphertext;
        } else {
            delete userAxiosIntance.defaults.headers.common.Authorization;
        }
        return config;
    },

    (error) => Promise.reject(error)
);

export default userAxiosIntance;