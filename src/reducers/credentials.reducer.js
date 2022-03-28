import { credentialsContants } from "../Constants/constants";

const initState = {
    data: {},
    loading: false
};

const credentialData = (state = initState, action) => {
    switch (action.type) {

        case credentialsContants.GET_ALL_CREDENTIALS_REQUEST:
            state = {
                ...state,
                data: {},
                loading: false
            };

            break;

        case credentialsContants.GET_ALL_CREDENTIALS_SUCCESS:
            state = {
                ...state,
                data: action.payload.data,
                loading: true
            };

            break;

        case credentialsContants.GET_ALL_CREDENTIALS_FAILURE:
            state = {
                ...state,
                data: {},
                loading: false
            };

            break;

        default:
            return state;
    }

    return state;
};

export default credentialData;

