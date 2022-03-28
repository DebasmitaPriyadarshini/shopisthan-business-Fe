import axiosIntance from "../helpers/axios";
import { REACT_APP_CRYPTOJS_KEY } from '../config/keys';
import { sampleDataContants } from "../Constants/constants";
var CryptoJS = require("crypto-js");



export const getSampleStoreAction = () => {
    return async (dispatch) => {
        const res = await axiosIntance.get(`/sample-stores`);
        if (res.status === 200) {
            const { store } = res.data;
            var bytes = await CryptoJS.AES.decrypt(store, REACT_APP_CRYPTOJS_KEY);
            var decryptedSampleStoreData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            dispatch({
                type: sampleDataContants.GET_ALL_SAMPLE_STORE,
                payload: { store: decryptedSampleStoreData },
            });
        } else {
            console.clear()
        }
    };
};

export const getSampleProductAction = () => {
    return async (dispatch) => {
        const res = await axiosIntance.get(`/sample-products`);
        if (res.status === 200) {
            const { product } = res.data;
            var bytes = await CryptoJS.AES.decrypt(product, REACT_APP_CRYPTOJS_KEY);
            var decryptedSampleProdutData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            dispatch({
                type: sampleDataContants.GET_ALL_SAMPLE_PRODUCT,
                payload: { product: decryptedSampleProdutData },
            });
        } else {
            console.clear()
        }
    }; 
};


export const getSampleCatalogAction = () => {
    return async (dispatch) => {
        const res = await axiosIntance.get(`/sample-catalogs`);
        if (res.status === 200) {
            const { catalog } = res.data;
            var bytes = await CryptoJS.AES.decrypt(catalog, REACT_APP_CRYPTOJS_KEY);
            var decryptedSampleCatalogData = await JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
            dispatch({
                type: sampleDataContants.GET_ALL_SAMPLE_CATALOG,
                payload: { catalog: decryptedSampleCatalogData },
            });
        } else {
            console.clear()
        }
    };
};

