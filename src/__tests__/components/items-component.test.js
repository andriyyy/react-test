import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import ItemList from "../../components/Items/ItemList";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("<ItemList />", () => {
  const nextProps = {
    items: [
      {
        attendee: [
          { i: "H8FC44hLJxVwVfbq2wbH4YsfhrS2" },
          { i: "uP6ndrP30DeOdbv2pip7uS6DaOl1" }
        ],
        createdAt: 1557595307373,
        description: "test",
        pictureUrl: "https://firebasestorage.googleapis.com/",
        title: "test",
        uid: "-LebuYnPsbwizRZ8W-dmt",
        user: { email: "andriyyy@gmail.com", username: "andriy" },
        userId: "H8FC44hLJxVwVfbq2wbH4YsfhrS2"
      },
      {
        attendee: [
          { i: "H8FC44hLJxVwVfbq2wbH4YsfhrS2" },
          { i: "uP6ndrP30DeOdbv2pip7uS6DaOl1" }
        ],
        createdAt: 1557595307373,
        description: "hello",
        pictureUrl: "https://firebasestorage.googleapis.com/",
        title: "hello",
        uid: "-LebuYnPsbwizRZ8W-dm",
        user: { email: "andriyyy@gmail.com", username: "andriy" },
        userId: "H8FC44hLJxVwVfbq2wbH4YsfhrS2"
      }
    ]
  };

  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <ItemList {...nextProps} />
      </MemoryRouter>
    </Provider>
  );

  it("renders properly", () => {
    //expect(wrapper).toMatchSnapshot();
  });

  it("renders 2 img", () => {
    expect(wrapper.find("img")).toHaveLength(2);
  });
  it("renders 2 tr", () => {
    expect(wrapper.find("img")).toHaveLength(2);
  });
  it("renders 6 td", () => {
    expect(wrapper.find("td")).toHaveLength(12);
  });
});
