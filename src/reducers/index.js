import { combineReducers } from "redux";
import sessionReducer from "./session";
import userReducer from "./user";
import itemReducer from "./item";
import authState from "./auth";
import { reducer as formReducer } from "redux-form";

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  itemState: itemReducer,
  form: formReducer,
  authState: authState,
});

export default rootReducer;
