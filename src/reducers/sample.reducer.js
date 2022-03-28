import { sampleDataContants } from "../Constants/constants";

const initState = {
    sampleStores: [],
    sampleProducts: [],
    sampleCatalogs: [],

};

const sampleData = (state = initState, action) => {
    switch (action.type) {

        case sampleDataContants.GET_ALL_SAMPLE_STORE:
            state = {
                ...state,
                sampleStores: action.payload.store,
            };

            break;

        case sampleDataContants.GET_ALL_SAMPLE_PRODUCT:
            state = {
                ...state,
                sampleProducts: action.payload.product,
            };

            break;

        case sampleDataContants.GET_ALL_SAMPLE_CATALOG:
            state = {
                ...state,
                sampleCatalogs: action.payload.catalog,
            };

            break;

        default:
            return state;
    }

    return state;
};

export default sampleData;

