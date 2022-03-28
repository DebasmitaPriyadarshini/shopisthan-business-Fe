import { combineReducers } from "redux";
import authReducer from "./auth.reducer";
import storePlan from "./storePlan.reducer";
import userDetails from "./user.reducer";
import userstoreReducer from "./userstore.reducer";
// import sampleData from "./sample.reducer";
import credentialData from "./credentials.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  userStore: userstoreReducer,
  storePlans: storePlan,
  userDetails: userDetails,
  // sampleData:sampleData,
  credentialData: credentialData,
});

export default rootReducer;
