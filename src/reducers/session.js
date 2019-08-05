const INITIAL_STATE = {
  authUser: null,
  openPopUp: false
};

const applySetAuthUser = (state, action) => ({
  ...state,
  authUser: action.authUser
});

const applyAuthUserHasErrored = (state, action) => ({
  ...state,
  authUserGetErrored: action.hasErrored
});

const applyOpenPopUp = (state = INITIAL_STATE, action) => ({
  ...state,
  openPopUp: action.openPopUp
});

const applySignUpHasErrored = (state, action) => ({
  ...state,
  signUpHasErrored: action.hasErrored
});

function sessionReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "AUTH_USER_SET": {
      return applySetAuthUser(state, action);
    }
    case "AUTH_USER_HAS_ERRORED": {
      return applyAuthUserHasErrored(state, action);
    }
    case "SIGN_UP_AUTH_USER_HAS_ERRORED": {
      return applySignUpHasErrored(state, action);
    }
    case "OPEN_POP_UP": {
      return applyOpenPopUp(state, action);
    }

    default:
      return state;
  }
}

export default sessionReducer;
