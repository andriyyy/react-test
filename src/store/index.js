import { createStore, applyMiddleware } from "redux";
//import logger from "redux-logger";
import rootReducer from "../reducers";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import Firebase from "../services/Firebase";
const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(
      thunk.withExtraArgument({
        firebase: new Firebase(),
      })
      //logger
    )
  )
);

export default store;
