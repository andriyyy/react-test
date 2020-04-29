const INITIAL_STATE = {
  didTryAutoLogin: false,
};

const applyDidTry = (state) => ({
  ...state,
  didTryAutoLogin: true,
});
const applyLogOut = (state) => ({
  ...state,
  didTryAutoLogin: true,
});

function authReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTHENTICATE": {
      return applyDidTry(state);
    }
    case "SET_DID_TRY_AL": {
      return applyDidTry(state);
    }
    case "LOGOUT": {
      return applyDidTry(INITIAL_STATE);
    }
    default:
      return state;
  }
}

export default authReducer;
