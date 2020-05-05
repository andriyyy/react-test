export function usersHasErrored(bool) {
  return {
    type: "USERS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function usersIsLoading(bool) {
  return {
    type: "USERS_IS_LOADING",
    isLoading: bool,
  };
}

export function usersFetchDataSuccess(users) {
  return {
    type: "USERS_SET",
    users,
  };
}

export function usersFetchData() {
  return (dispatch, getState, { firebase }) => {
    dispatch(usersIsLoading(true));
    firebase
      .users()
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      })
      .then((users) => {
        dispatch(usersIsLoading(false));
        return users;
      })
      .then((users) => dispatch(usersFetchDataSuccess(users)))
      .catch(() => dispatch(usersHasErrored(true)));
  };
}

export function attendeesHasErrored(bool) {
  return {
    type: "ATTENDEES_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function attendeesIsLoading(bool) {
  return {
    type: "ATTENDEES_IS_LOADING",
    isLoading: bool,
  };
}

export function attendeesFetchDataSuccess(attendees) {
  return {
    type: "ATTENDEES_SET",
    attendees: attendees,
  };
}

export function attendeesIdsFetchData(id) {
  return (dispatch, getState, { firebase }) => {
    dispatch(attendeesIsLoading(true));
    firebase
      .items_enrolments(id)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      })
      .then((attendees) => {
        dispatch(attendeesIsLoading(false));
        return attendees;
      })
      .then((attendees) => dispatch(attendeesFetchDataSuccess(attendees)))
      .catch(() => dispatch(attendeesHasErrored(true)));
  };
}
