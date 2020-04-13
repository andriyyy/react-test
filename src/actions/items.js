export function itemsHasErrored(bool) {
  return {
    type: "ITEMS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function itemsIsLoading(bool) {
  return {
    type: "ITEMS_IS_LOADING",
    isLoading: bool,
  };
}
export function itemsEnrolmentsAllIsLoading(bool) {
  return {
    type: "ITEMS_ENROLMENTS_ALL_IS_LOADING",
    isLoading: bool,
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

export function itemsIdsHasErrored(bool) {
  return {
    type: "ITEMS_IDS_HAS_ERRORED",
    hasErrored: bool,
  };
}

export function itemsIdsIsLoading(bool) {
  return {
    type: "ITEMS_IDS_IS_LOADING",
    isLoading: bool,
  };
}

export function itemsIdsFetchDataSuccess(itemsIds) {
  return {
    type: "ITEMS_IDS_SET",
    itemsIds,
  };
}

export function itemsFetchData() {
  return (dispatch, getState, { firebase }) => {
    console.log("baza");
    dispatch(itemsIsLoading(true));
    firebase
      .items()
      .orderByChild("createdAt")
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      })
      .then((items) => {
        return items;
      })
      .then((items) => {
        dispatch(itemsEnrolmentsAllIsLoading(true));
        firebase
          .items_enrolments_all()
          .once("value")
          .then((snapshot) => {
            return snapshot.val();
          })
          .then((items_enrolments) => {
            dispatch(itemsFetchDataSuccess(items));
            dispatch(itemsEnrolmentsFetchDataSuccess(items_enrolments));
          })
          .then(() => {
            dispatch(itemsIsLoading(false));
            dispatch(itemsEnrolmentsAllIsLoading(false));
          });
      })
      .catch(() => dispatch(itemsHasErrored(true)));
  };
}

export function itemsIdsFetchData(id) {
  return (dispatch, getState, { firebase }) => {
    dispatch(itemsIdsIsLoading(true));
    firebase
      .users_enrolments_list(id)
      .once("value")
      .then((snapshot) => {
        return snapshot.val();
      })
      .then((itemsIds) => {
        dispatch(itemsIdsIsLoading(false));
        return itemsIds;
      })
      .then((itemsIds) => dispatch(itemsIdsFetchDataSuccess(itemsIds)))
      .catch(() => dispatch(itemsIdsHasErrored(true)));
  };
}

export function deleteItem(removeId) {
  return {
    type: "REMOVE_ID",
    removeId,
  };
}
