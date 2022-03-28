import axios from "axios";
import { REACT_APP_API,REACT_APP_CRYPTOJS_KEY } from '../config/keys'
var CryptoJS = require("crypto-js");


require('dotenv').config()
const axiosIntance = axios.create({
  baseURL: REACT_APP_API,
});
axiosIntance.interceptors.request.use(
  (config) => {

    const storedToken = window.localStorage.getItem("token");
    if (storedToken) {
      var tokenBytes = CryptoJS.AES.decrypt(storedToken, REACT_APP_CRYPTOJS_KEY);
      var decryptedToken = JSON.parse(tokenBytes.toString(CryptoJS.enc.Utf8));
    }
    if (decryptedToken) {
      const BearerToken = `Bearer ${decryptedToken}`
      var ciphertext = CryptoJS.AES.encrypt(JSON.stringify(BearerToken), REACT_APP_CRYPTOJS_KEY).toString();
      config.headers.Authorization = ciphertext;
    } else {
      delete axiosIntance.defaults.headers.common.Authorization;
    }
    return config;
  },

  (error) => Promise.reject(error)
);

export default axiosIntance;