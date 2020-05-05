import itemReducer from "../../../src/reducers/item";

describe("item reducer", () => {
  test("should return the initial state", () => {
    expect(itemReducer(undefined, {})).toEqual({
      items: null,
      itemsGetErrored: false,
      itemsIsLoading: false,
      signUpSubmitted: false
    });
  });

  test('ITEMS_SET will return "data" as the value for output', () => {
    let items = {
      "-LebuYnPsbwizRZ8W-dm": {
        attendee: [
          { i: "H8FC44hLJxVwVfbq2wbH4YsfhrS2" },
          { i: "uP6ndrP30DeOdbv2pip7uS6DaOl1" }
        ],
        createdAt: 1557595307373,
        description: "tttttt",
        pictureUrl:
          "https://firebasestorage.googleapis.com/v0/b/react-111.appspot.com/o/pictures%2F1557595300946?alt=media&token=0cc66257-0c0b-46b4-b6c7-b2788e16b8e5",
        title: "tttttt",
        userId: "H8FC44hLJxVwVfbq2wbH4YsfhrS2"
      }
    };

    let action = {
      type: "ITEMS_SET",
      items: items
    };
    expect(itemReducer({}, action)).toEqual({ items: items });
  });

  test('ITEMS_HAS_ERRORED will return "data" as the value for output', () => {
    let hasErrored = true;
    let action = {
      type: "ITEMS_HAS_ERRORED",
      hasErrored: hasErrored
    };
    expect(itemReducer({}, action)).toEqual({ itemsGetErrored: hasErrored });
  });

  test('ITEMS_IS_LOADING will return "data" as the value for output', () => {
    let itemsLoading = true;
    let action = {
      type: "ITEMS_IS_LOADING",
      isLoading: itemsLoading
    };
    expect(itemReducer({}, action)).toEqual({ itemsIsLoading: itemsLoading });
  });

  test('ITEMS_IDS_SET will return "data" as the value for output', () => {
    let itemsIds = {
      LebuYnPsbwizRZ8Wdm: true,
      LebxbApKlc7dTndB53: true,
      Lec4gPeRDhjHB4fOUUf: true
    };

    let action = {
      type: "ITEMS_IDS_SET",
      itemsIds: itemsIds
    };
    expect(itemReducer({}, action)).toEqual({ itemsIds: itemsIds });
  });

  test('ITEMS_IDS_HAS_ERRORED will return "data" as the value for output', () => {
    let hasErrored = true;
    let action = {
      type: "ITEMS_IDS_HAS_ERRORED",
      hasErrored: hasErrored
    };
    expect(itemReducer({}, action)).toEqual({ itemsIdsGetErrored: hasErrored });
  });

  test('ITEMS_IDS_IS_LOADING will return "data" as the value for output', () => {
    let isLoading = true;
    let action = {
      type: "ITEMS_IDS_IS_LOADING",
      isLoading: isLoading
    };
    expect(itemReducer({}, action)).toEqual({ itemsIdsIsLoading: isLoading });
  });

  test('ON_SIGN_UP_SUBMITTED will return "data" as the value for output', () => {
    let signUpSubmitted = true;
    let action = {
      type: "ON_SIGN_UP_SUBMITTED",
      signUpSubmitted: signUpSubmitted
    };
    expect(itemReducer({}, action)).toEqual({
      signUpSubmitted: signUpSubmitted
    });
  });
});
