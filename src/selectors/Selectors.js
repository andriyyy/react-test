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

export { getUsers, getAuthUser, getUsersKey, getId, getItems };
