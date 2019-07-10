const INITIAL_STATE = {
  users: null,
  usersGetErrored: false,
  usersIsLoading: false
};

const applySetUsers = (state, action) => ({
  ...state,
  users: action.users,
});

const applySetUser = (state, action) => ({
  ...state,
  users: {
    ...state.users,
    [action.uid]: action.user,
  },
});
const applySetUserHasErrored = (state, action) => ({
  ...state,
  usersGetErrored: action.hasErrored,
});

const applyUsersIsLoading = (state, action) => ({
  ...state,
  usersIsLoading: action.isLoading,
});
const applySetAttendee = (state, action) => ({
  ...state,
  attendees: action.attendees,
});
const applySetAttendeesHasErrored = (state, action) => ({
  ...state,
  attendeesGetErrored: action.hasErrored,
});

const applyAttendeesIsLoading = (state, action) => ({
  ...state,
  attendeesIsLoading: action.isLoading,
});


function userReducer(state = INITIAL_STATE, action) {
    
  switch (action.type) {

    case 'USERS_SET': {
      return applySetUsers(state, action);
    }
    case 'USER_SET': {
      return applySetUser(state, action);
    }
    case 'USERS_HAS_ERRORED':{
      return applySetUserHasErrored(state, action);      
    }
    case 'USERS_IS_LOADING':{
      return applyUsersIsLoading(state, action);      
    }
    case 'ATTENDEES_SET': {
      return applySetAttendee(state, action);
    }
    case 'ATTENDEES_HAS_ERRORED':{
      return applySetAttendeesHasErrored(state, action);      
    }
    case 'ATTENDEES_IS_LOADING':{
      return applyAttendeesIsLoading(state, action);      
    }
    default:
      return state;
  }
}

export default userReducer;