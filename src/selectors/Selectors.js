// Selectors
function getUsers(state) {
  return state.userState.users;
}

function getAuthUser(state) {
  if (typeof state.sessionState !== "undefined") {
    return state.sessionState.authUser;
  } else {
    return false;
  }
}

function getUsersKey(state) {
  if (typeof state.userState !== "undefined") {
    return Object.keys(state.userState.users || {}).map(key => ({
      ...state.userState.users[key],
      uid: key
    }));
  } else {
    return {};
  }
}

function getId(ownProps) {
  return ownProps.match.params.id;
}

function getItems(state) {
  if (typeof state.itemState !== "undefined") {
    return Object.keys(state.itemState.items || {}).map(key => ({
      ...state.itemState.items[key],
      uid: key
    }));
  } else {
    return false;
  }
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
  if (typeof state.userState !== "undefined") {
    if (state.userState.attendees) {
      Object.keys(state.userState.attendees).map(userId => {
        return attendeesIds.push(userId);
      });
    }
    return attendeesIds;
  } else {
    return false;
  }
}

function getAttendeesHasErrored(state) {
  if (typeof state.userState !== "undefined") {
    return state.userState.attendeesGetErrored;
  } else {
    return false;
  }
}

function getAttendeesIsLoading(state) {
  if (typeof state.userState !== "undefined") {
    return state.userState.attendeesIsLoading;
  } else {
    return false;
  }
}

function getItem(state, ownProps, items) {
  let elem = null;
  if (items) {
    items.forEach(function(element) {
      if (ownProps.match.params.id === element.uid) {
        elem = element;
      }
    });
    return elem;
  } else {
    return false;
  }
}

function getAttendeeFormatted(state, users) {
  const attendeeFormatted = [];
  if (users) {
    users.forEach(function(entry) {
      attendeeFormatted[entry.uid] = entry.username;
    });
    return attendeeFormatted;
  } else {
    return false;
  }
}

function getItemsIds(state) {
  let itemsIds = [];
  if (state.itemState.itemsIds) {
    Object.keys(state.itemState.itemsIds).map(itemId => {
      return itemsIds.push(itemId);
    });
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
  users.forEach(function(element) {
    if (ownProps.match.params.id === element.uid) {
      elem = element;
    }
  });
  return elem;
}

function getSortedItems(state, items, user) {
  const itemsTemporary = [];
  const itemsResult = [];
  items.forEach(function(entry) {
    itemsTemporary[entry.uid] = entry.title;
    if (user.uid === entry.userId) {
      var key = entry.uid;
      var value = entry.title;
      itemsResult.push({ key, value });
    }
  });
  return { itemsTemporary, itemsResult };
}

function getAuthUserHasErrored(state) {
  if (typeof state.sessionState !== "undefined") {
    return state.sessionState.authUserGetErrored;
  } else {
    return false;
  }
}

function getSignUpHasErrored(state) {
  if (typeof state.sessionState !== "undefined") {
    return state.sessionState.signUpHasErrored;
  } else {
    return false;
  }
}

function getOpenPopUp(state) {
  if (typeof state.sessionState !== "undefined") {
    return state.sessionState.openPopUp;
  } else {
    return false;
  }
}

function getSignUpSubmitted(state) {
  return state.itemState.signUpSubmitted;
}

function getUsersMarged(state) {
  var usersMarged = {};
  const users = state.userState.users;
  Object.keys(users || {}).map(function(key) {
    return (usersMarged[key] = users[key]);
  });
  return usersMarged;
}

function getRetriaved(state) {
  return state.sessionState.sessionRetrieved;
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
  getOpenPopUp,
  getSignUpSubmitted,
  getUsersMarged,
  getSignUpHasErrored,
  getRetriaved
};
