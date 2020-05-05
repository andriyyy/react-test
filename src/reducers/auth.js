const INITIAL_STATE = {
  didTryAutoLogin: false,
  token: false,
};

const applyDidTry = (state) => ({
  ...state,
  didTryAutoLogin: true,
});
const applyLogOut = (state) => ({
  ...state,
  token: true,
});

const applyTest = (state) => ({
  ...state,
  test: true,
});

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTHENTICATE": {
      console.log("AUTHENTICATE!!");
      return Object.assign({}, state, {
        didTryAutoLogin: false,
        token: true,
      });
    }
    case "SET_DID_TRY_AL": {
      return applyDidTry(state);
    }
    case "LOGOUT": {
      return Object.assign({}, state, {
        didTryAutoLogin: false,
        token: false,
      });
    }
    default:
      return state;
  }
}

export default authReducer;
