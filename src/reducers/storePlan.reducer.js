import { storePlansContants } from "../Constants/constants";

const initState = {
  storePlans: [],

};

const storePlan = (state = initState, action) => {
  switch (action.type) {
    case storePlansContants.GET_ALL_STORE_PLANS_SUCCESS :
      state = {
        ...state,
        storePlans: action.payload.decryptedStorePlanData,
      };

      break;

    default:
      return state;
  }

  return state;
};

export default storePlan;

