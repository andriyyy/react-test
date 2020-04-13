const INITIAL_STATE = {
  items: null,
  items_enrolments: null,
  itemsGetErrored: false,
  itemsIsLoading: false,
  signUpSubmitted: false,
  itemsEnrolmentsAllIsLoading: false,
};

const applySetItems = (state, action) => ({
  ...state,
  items: action.items,
});
const applySetEnrolmentsItems = (state, action) => ({
  ...state,
  items_enrolments: action.items_enrolments,
});

const applySetItemsHasErrored = (state, action) => ({
  ...state,
  itemsGetErrored: action.hasErrored,
});

const applyItemsIsLoading = (state, action) => ({
  ...state,
  itemsIsLoading: action.isLoading,
});
const applyItemsEnrolmentsAllIsLoading = (state, action) => ({
  ...state,
  itemsEnrolmentsAllIsLoading: action.isLoading,
});

const applyIdsSetItems = (state, action) => ({
  ...state,
  itemsIds: action.itemsIds,
});

const applyIdsSetItemsHasErrored = (state, action) => ({
  ...state,
  itemsIdsGetErrored: action.hasErrored,
});

const applyIdsItemsIsLoading = (state, action) => ({
  ...state,
  itemsIdsIsLoading: action.isLoading,
});

const applySignUpSubmitted = (state, action) => ({
  ...state,
  signUpSubmitted: action.signUpSubmitted,
});

const applyRemoveId = (state, items) => ({
  ...state,
  items,
});

function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "ITEMS_SET": {
      return applySetItems(state, action);
    }
    case "ITEMS_ENROLMENTS_SET": {
      return applySetEnrolmentsItems(state, action);
    }
    case "ITEMS_HAS_ERRORED": {
      return applySetItemsHasErrored(state, action);
    }
    case "ITEMS_IS_LOADING": {
      return applyItemsIsLoading(state, action);
    }
    case "ITEMS_ENROLMENTS_ALL_IS_LOADING": {
      return applyItemsEnrolmentsAllIsLoading(state, action);
    }
    case "ITEMS_IDS_SET": {
      return applyIdsSetItems(state, action);
    }
    case "ITEMS_IDS_HAS_ERRORED": {
      return applyIdsSetItemsHasErrored(state, action);
    }
    case "ITEMS_IDS_IS_LOADING": {
      return applyIdsItemsIsLoading(state, action);
    }
    case "ON_SIGN_UP_SUBMITTED": {
      return applySignUpSubmitted(state, action);
    }
    case "REMOVE_ID": {
      const newState = Object.assign({}, state);
      delete newState.items[action.removeId];
      return applyRemoveId(state, newState.items);
    }
    default:
      return state;
  }
}

export default itemReducer;
