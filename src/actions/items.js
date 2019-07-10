
export function itemsHasErrored(bool) {
    return {
        type: 'ITEMS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIsLoading(bool) {
    return {
        type: 'ITEMS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsFetchDataSuccess(items) {
    return {
        type: 'ITEMS_SET',
        items
    };
}

export function itemsIdsHasErrored(bool) {
    return {
        type: 'ITEMS_IDS_HAS_ERRORED',
        hasErrored: bool
    };
}

export function itemsIdsIsLoading(bool) {
    return {
        type: 'ITEMS_IDS_IS_LOADING',
        isLoading: bool
    };
}

export function itemsIdsFetchDataSuccess(itemsIds) {
    return {
        type: 'ITEMS_IDS_SET',
        itemsIds
    };
}

export function itemsFetchData(firebase) {
    return (dispatch) => {
     dispatch(itemsIsLoading(true));
		firebase.items().orderByChild("createdAt").once("value")
      	.then(snapshot => {
       return snapshot.val();
      })
      .then(items => {
        console.log("items",items);
       dispatch(itemsIsLoading(false));
       return items;
      })
      .then((items) => dispatch(itemsFetchDataSuccess(items)))
      .catch(() => dispatch(itemsHasErrored(true)));
              
    };
}
export function itemsIdsFetchData(firebase,id) {
    return (dispatch) => {
     dispatch( itemsIdsIsLoading(true));
     firebase.users_enrolments_list(id).once("value")
      .then(snapshot => {
            return snapshot.val();
          })
      .then(itemsIds => {
       dispatch(itemsIdsIsLoading(false));
       return itemsIds;
      })
      .then((itemsIds) => dispatch(itemsIdsFetchDataSuccess(itemsIds)))
      .catch(() => dispatch(itemsIdsHasErrored(true)));
    };
}
