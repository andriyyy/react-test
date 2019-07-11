// Selectors
function getUsers(state) {
  return state.userState.users;
}

function getAuthUser(state) {
  return state.sessionState.authUser;
}

function getUsersKey(state) {
  return Object.keys(state.userState.users || {}).map(key => ({
    ...state.userState.users[key],
    uid: key
  }));
}

function getId(ownProps) {
  return ownProps.match.params.id;
}

function getItems(state) {
  return Object.keys(state.itemState.items || {}).map(key => ({
    ...state.itemState.items[key],
    uid: key
  }));
}

function getUsersHasErrored(state) {
  return state.userState.usersGetErrored;
}

function getUsersIsLoading(state) {
  return state.userState.usersIsLoading;
}

function getItemsHasErrored(state) {
  return state.itemState.itemsGetErrored;
}

function getItemsIsLoading(state) {
  return state.itemState.itemsIsLoading;
}

function getAttendeesIds(state) {
  let attendeesIds = [];
  if(state.userState.attendees){
      Object.keys(state.userState.attendees).map(userId => {
       return attendeesIds.push(userId);
      })
  }
  return attendeesIds;
}

function getAttendeesHasErrored(state) {
  return state.userState.attendeesGetErrored;
}

function getAttendeesIsLoading(state) {
  return state.userState.attendeesIsLoading;
}

function getItem(state, ownProps, items) {
let elem = null; 
 items.forEach(
      function(element) {
        if (ownProps.match.params.id === element.uid) {
          elem = element;
        }
      }
    );
return elem;
}

function getAttendeeFormatted(state, users) {
    const attendeeFormatted = [];
    users.forEach(function(entry) {
      attendeeFormatted[entry.uid] = entry.username;
    });
    return attendeeFormatted;
}

function getItemsIds(state) {
      let itemsIds = [];
          if (state.itemState.itemsIds ) { 
       Object.keys(state.itemState.itemsIds).map(itemId => {
           return itemsIds.push(itemId);
          })
          }
       return itemsIds;

}

function getItemsIdsHasErrored(state) {
  return state.itemState.itemsIdsGetErrored;
}

function getItemsIdsIsLoading(state) {
  return state.itemState.itemsIdsIsLoading;
}

function getUser(state, ownProps, users) {
let elem = null; 
 users.forEach(
      function(element) {
        if (ownProps.match.params.id === element.uid) {
          elem = element;
        }
      }
    );
return elem;
}

function getSortedItems(state, items, user) {
    const itemsTemporary = [];
    const itemsResult = [];   
    items.forEach(function (entry) {
      itemsTemporary[entry.uid] = entry.title;
      if (user.uid === entry.userId) {
        var key = entry.uid;
        var value = entry.title;
         itemsResult.push({key , value});
      }
    });
return {itemsTemporary, itemsResult};
}

function getAuthUserHasErrored(state) {
  return state.sessionState.authUserGetErrored;
}

function getOpenPopUp(state) {
  return state.sessionState.openPopUp;
}
export { 
  getUsers, 
  getAuthUser, 
  getUsersKey, 
  getId, 
  getItems, 
  getUsersHasErrored, 
  getUsersIsLoading, 
  getItemsHasErrored, 
  getItemsIsLoading, 
  getAttendeesIds,
  getAttendeesHasErrored,
  getAttendeesIsLoading,
  getItem,
  getAttendeeFormatted,
  getItemsIds,
  getItemsIdsHasErrored,
  getItemsIdsIsLoading,
  getUser,
  getSortedItems,
  getAuthUserHasErrored,
  getOpenPopUp
};
