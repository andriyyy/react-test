export function onSetAuthUser(authUser) {
  return {
    type: "AUTH_USER_SET",
    authUser,
  };
}

export function sessionRetrieved(bool) {
  return {
    type: "SESSION_RETRIVED",
    sessionRetrieved: bool,
  };
}

export function onAuthUserListener() {
  return (dispatch, getState, { firebase }) => {
    const signUpSubmitted = getState().itemState.signUpSubmitted;
    firebase.onAuthUserListener(
      (authUser) => {
        console.log("autentification", authUser);
        if (signUpSubmitted === false) {
          dispatch(onSetAuthUser(authUser));
        }
        dispatch(sessionRetrieved(true));
      },
      () => {
        dispatch(sessionRetrieved(false));
        console.log("bad_autentification");
        dispatch(onSetAuthUser(null));
      }
    );
  };
}
export function onDoSignOut() {
  return (dispatch, getState, { firebase }) => {
    firebase.doSignOut();
  };
}
export function itemsOff() {
  return (dispatch, getState, { firebase }) => {
    firebase.items().off();
  };
}
export function usersOff() {
  return (dispatch, getState, { firebase }) => {
    firebase.users().off();
  };
}
export function usersEnrolmentsListOff() {
  return (dispatch, getState, { firebase }) => {
    firebase.users_enrolments_list().off();
  };
}
export function removeItems(removeId, saveItemsToStateCallback) {
  return (dispatch, getState, { firebase }) => {
    firebase.onRemoveItems(removeId, saveItemsToStateCallback);
  };
}

export function reject(uid, iid, saveActiveToStateCallback) {
  return (dispatch, getState, { firebase }) => {
    firebase.onRejected(uid, iid, saveActiveToStateCallback);
  };
}

export function notReject(uid, iid, saveNotActiveToStateCallback) {
  return (dispatch, getState, { firebase }) => {
    firebase.onNotRejected(uid, iid, saveNotActiveToStateCallback);
  };
}

export function deleteAttendee(removeId, userId) {
  return {
    type: "REMOVE_ATTENDEE",
    removeId,
    userId,
  };
}
export function addAttendee(addId, userId) {
  return {
    type: "ADD_ATTENDEE",
    addId,
    userId,
  };
}
