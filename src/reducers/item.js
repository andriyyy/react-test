const INITIAL_STATE = {
  items: null,
  itemsGetErrored: false,
  itemsIsLoading: false
};

const applySetItems = (state, action) => ({
  ...state,
  items: action.items,
});

const applySetItemsHasErrored = (state, action) => ({
  ...state,
  itemsGetErrored: action.hasErrored,
});

const applyItemsIsLoading = (state, action) => ({
  ...state,
  itemsIsLoading: action.isLoading,
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


function itemReducer(state = INITIAL_STATE, action) {
  switch (action.type) {

    case 'ITEMS_SET': {
      return applySetItems(state, action);
    }
    case 'ITEMS_HAS_ERRORED':{
      return applySetItemsHasErrored(state, action);      
    }
    case 'ITEMS_IS_LOADING':{
      return applyItemsIsLoading(state, action);      
    }
    case 'ITEMS_IDS_SET': {
      console.log("stateooo", state);
      return applyIdsSetItems(state, action);
    }
    case 'ITEMS_IDS_HAS_ERRORED':{
      return applyIdsSetItemsHasErrored(state, action);      
    }
    case 'ITEMS_IDS_IS_LOADING':{
      return applyIdsItemsIsLoading(state, action);      
    }
    default:
      return state;
  }
}

export default itemReducer;