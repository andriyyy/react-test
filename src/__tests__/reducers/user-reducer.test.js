import userReducer from "../../reducers/user";

describe("user reducer", () => {
  test("should return the initial state", () => {
    expect(userReducer(undefined, {})).toEqual({
      users: null,
      usersGetErrored: false,
      usersIsLoading: false
    });
  });

  test('USERS_SET will return "data" as the value for output', () => {
    let users = {
      "4TlsKsyypFTFpt8N8KuVzf7gkvm2": {
        email: "test@gmail.com",
        username: "user"
      }
    };

    let action = {
      type: "USERS_SET",
      users: users
    };
    expect(userReducer({}, action)).toEqual({ users: users });
  });

  test('USERS_HAS_ERRORED will return "data" as the value for output', () => {
    let hasErrored = true;
    let action = {
      type: "USERS_HAS_ERRORED",
      hasErrored: hasErrored
    };
    expect(userReducer({}, action)).toEqual({ usersGetErrored: hasErrored });
  });

  test('USERS_IS_LOADING will return "data" as the value for output', () => {
    let usersLoading = true;
    let action = {
      type: "USERS_IS_LOADING",
      isLoading: usersLoading
    };
    expect(userReducer({}, action)).toEqual({ usersIsLoading: usersLoading });
  });

  test('ATTENDEES_SET will return "data" as the value for output', () => {
    let attendees = {
      LebuYnPsbwizRZ8Wdm: true,
      LebxbApKlc7dTndB53: true,
      Lec4gPeRDhjHB4fOUUf: true
    };

    let action = {
      type: "ATTENDEES_SET",
      attendees: attendees
    };
    expect(userReducer({}, action)).toEqual({ attendees: attendees });
  });

  test('ATTENDEES_HAS_ERRORED will return "data" as the value for output', () => {
    let hasErrored = true;
    let action = {
      type: "ATTENDEES_HAS_ERRORED",
      hasErrored: hasErrored
    };
    expect(userReducer({}, action)).toEqual({
      attendeesGetErrored: hasErrored
    });
  });

  test('ATTENDEES_IS_LOADING will return "data" as the value for output', () => {
    let isLoading = true;
    let action = {
      type: "ATTENDEES_IS_LOADING",
      isLoading: isLoading
    };
    expect(userReducer({}, action)).toEqual({ attendeesIsLoading: isLoading });
  });
});
