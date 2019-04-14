const INITIAL_STATE = {
  items: null,
  limit: 5,
};

const applySetItems = (state, action) => ({
  ...state,
  items: action.items,
});

const applySetItemsLimit = (state, action) => ({
  ...state,
  limit: action.limit,
});

function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'ITEMS_SET': {
      console.log(action);
      return applySetItems(state, action);
    }
    case 'ITEMS_LIMIT_SET': {
      return applySetItemsLimit(state, action);
    }
    default:
      return state;
  }
}

export default itemReducer;