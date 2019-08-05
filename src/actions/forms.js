import * as ROUTES from "../constants/routes";

export function signInFormBaseHasErrored(bool) {
  return {
    type: "AUTH_USER_HAS_ERRORED",
    hasErrored: bool
  };
}

export function signInFormBaseFetchDataSuccess(authUser) {
  return {
    type: "AUTH_USER_SET",
    authUser
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: "ITEMS_SET",
    items
  };
}

export function addOpenPopUp(bool) {
  return {
    type: "OPEN_POP_UP",
    openPopUp: bool
  };
}

export function signInFormBaseFetchData(values, props) {
  return dispatch => {
    props.firebase
      .doSignInWithEmailAndPassword(values.email, values.password, authUser => {
        dispatch(signInFormBaseFetchDataSuccess(authUser));
      })
      .then(() => {
        props.history.push(ROUTES.HOME);
      })
      .catch(error => {
        dispatch(signInFormBaseHasErrored(true));
      });
  };
}

export function signUpFormBaseHasErrored(error) {
  return {
    type: "SIGN_UP_AUTH_USER_HAS_ERRORED",
    hasErrored: error
  };
}

export function itemsIdsHasErrored(bool) {
  return {
    type: "ITEMS_IDS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool
  };
}

export function onSignUpSubmitted(bool) {
  return {
    type: "ON_SIGN_UP_SUBMITTED",
    signUpSubmitted: bool
  };
}

export function signUpFormBaseFetchData(values, props) {
  return dispatch => {
    props.firebase
      .doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
      .then(authUser => {
        dispatch(onSignUpSubmitted(true));
        props.firebase.user(authUser.user.uid).set({
          username: values.username,
          email: values.email
        });
      })
      .then(() => {
        props.history.push(ROUTES.SIGN_IN);
      })
      .catch(error => {
        console.log("error", error);
        dispatch(signUpFormBaseHasErrored(error.message));
      });
  };
}

export function addItemFetchData(values, props) {
  return dispatch => {
    props.firebase.onSaveItems(
      values.image,
      downloadURL => {
        const lastKey = props.firebase.items().push({
          userId: props.authUser.uid,
          title: values.title,
          description: values.description,
          pictureUrl: downloadURL,
          attendee: JSON.stringify(values.user),
          createdAt: props.firebase.serverValue.TIMESTAMP
        }).key;
        values.user.map(item => {
          let updates = {
            [`items_enrolments/${lastKey}/${item}`]: true,
            [`users_enrolments/${item}/${lastKey}`]: true
          };
          return props.firebase.update(updates);
        });
      },
      () => {
        props.firebase
          .items()
          .once("value")
          .then(snapshot => {
            dispatch(itemsFetchDataSuccess(snapshot.val()));
          })
          .catch(() => dispatch(itemsHasErrored(true)));
      }
    );
  };
}
