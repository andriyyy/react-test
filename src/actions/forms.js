export function signInFormBaseHasErrored(bool) {
  return {
    type: "AUTH_USER_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function signInFormBaseFetchDataSuccess(authUser) {
  return {
    type: "AUTH_USER_SET",
    authUser,
  };
}

export function itemsFetchDataSuccess(items) {
  return {
    type: "ITEMS_SET",
    items,
  };
}

export function itemsEnrolmentsFetchDataSuccess(items_enrolments) {
  return {
    type: "ITEMS_ENROLMENTS_SET",
    items_enrolments,
  };
}

export function addOpenPopUp(bool) {
  return {
    type: "OPEN_POP_UP",
    openPopUp: bool,
  };
}

export function authenticate() {
  return {
    type: "AUTHENTICATE",
  };
}

export function signInFormBaseFetchData(
  values,
  redirectCallBack,
  setSubmittingCallBack = () => {},
  setUserToAsyncStorage = (authUser) => {}
) {
  return (dispatch, getState, { firebase }) => {
    firebase
      .doSignInWithEmailAndPassword(
        values.email,
        values.password,
        (authUser) => {
          console.log("0");
          dispatch(signInFormBaseFetchDataSuccess(authUser));
          //dispatch(authenticate());
        }
      )
      .then((authUser) => {
        console.log("1");
        setUserToAsyncStorage(authUser);
      })
      .then(() => {
        console.log("2");
        redirectCallBack();
        dispatch(authenticate());
      })
      .catch((error) => {
        setSubmittingCallBack();
        dispatch(signInFormBaseHasErrored(true));
      });
  };
}

export function signUpFormBaseHasErrored(error) {
  return {
    type: "SIGN_UP_AUTH_USER_HAS_ERRORED",
    hasErrored: error,
  };
}

export function itemsIdsHasErrored(bool) {
  return {
    type: "ITEMS_IDS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function onSignUpSubmitted(bool) {
  return {
    type: "ON_SIGN_UP_SUBMITTED",
    signUpSubmitted: bool,
  };
}

export function signUpFormBaseFetchData(
  values,
  redirectCallBack,
  setSubmittingCallBack = () => {}
) {
  return (dispatch, getState, { firebase }) => {
    firebase
      .doCreateUserWithEmailAndPassword(values.email, values.passwordOne)
      .then((authUser) => {
        dispatch(onSignUpSubmitted(true));
        firebase.user(authUser.user.uid).set({
          username: values.username,
          email: values.email,
        });
      })
      .then(() => {
        firebase.doSignOut();
        redirectCallBack();
      })
      .catch((error) => {
        setSubmittingCallBack();
        dispatch(signUpFormBaseHasErrored(error.message));
      });
  };
}

export function addItemFetchData(
  values,
  props,
  updateItemsCallBack,
  mobile = true
) {
  console.log("values", values);
  console.log("props", props);
  console.log("updateItemsCallBack", updateItemsCallBack);
  console.log("props.authUser.uid", props.authUser.uid);

  if (mobile) {
    return (dispatch, getState, { firebase }) => {
      firebase.uploadImage(
        values.image,
        (downloadURL) => {
          console.log("hhhhhhh", downloadURL);
          const lastKey = firebase.items().push({
            userId: props.authUser.uid,
            title: values.title,
            description: values.description,
            pictureUrl: downloadURL,
            attendee: JSON.stringify(values.user),
            createdAt: firebase.serverValue.TIMESTAMP,
          }).key;
          values.user.map((item) => {
            let updates = {
              [`items_enrolments/${lastKey}/${item}`]: true,
              [`users_enrolments/${item}/${lastKey}`]: true,
            };
            return firebase.update(updates);
          });
        },
        updateItemsCallBack
      );
    };
  } else {
    return (dispatch, getState, { firebase }) => {
      firebase.onSaveItems(
        values.image,
        (downloadURL) => {
          console.log("hhhhhhh", downloadURL);
          const lastKey = firebase.items().push({
            userId: props.authUser.uid,
            title: values.title,
            description: values.description,
            pictureUrl: downloadURL,
            attendee: JSON.stringify(values.user),
            createdAt: firebase.serverValue.TIMESTAMP,
          }).key;
          values.user.map((item) => {
            let updates = {
              [`items_enrolments/${lastKey}/${item}`]: true,
              [`users_enrolments/${item}/${lastKey}`]: true,
            };
            return firebase.update(updates);
          });
        },
        updateItemsCallBack
      );
    };
  }
}
