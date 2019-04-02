import { combineReducers } from 'redux';
import sessionReducer from './session';
import userReducer from './user';
import itemReducer from './item';

const rootReducer = combineReducers({
  sessionState: sessionReducer,
  userState: userReducer,
  itemState: itemReducer,
});

export default rootReducer;