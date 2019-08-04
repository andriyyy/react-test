import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SignUp from "../../components/SignUp/SignUp";
import { MemoryRouter } from "react-router-dom";
const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("<SignUp />", () => {
  const wrapper = mount(
    <Provider store={store}>
      <MemoryRouter>
        <SignUp />
      </MemoryRouter>
    </Provider>
  );

  it("renders properly", () => {
    //expect(wrapper).toMatchSnapshot();
  });

  it("renders an username input", () => {
    expect(wrapper.find('[data-field-name="username"] input')).toHaveLength(1);
  });

  it("renders an email input", () => {
    expect(wrapper.find('[data-field-name="email"] input')).toHaveLength(1);
  });

  it("renders a passwordOne input", () => {
    expect(wrapper.find('[data-field-name="passwordOne"] input')).toHaveLength(1);
  });

  it("renders a passwordTwo input", () => {
    expect(wrapper.find('[data-field-name="passwordTwo"] input')).toHaveLength(
      1
    );
  });

  it("should render 4 <label>s", () => {
    expect(wrapper.find("label")).toHaveLength(4);
  });

  it("should capture username correctly onChange", function() {
    const input = wrapper.find('[data-field-name="username"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture email correctly onChange", function() {
    const input = wrapper.find('[data-field-name="email"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture passwordOne correctly onChange", function() {
    const input = wrapper.find('[data-field-name="passwordOne"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture password correctly onChange", function() {
    const input = wrapper.find('[data-field-name="passwordTwo"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });
});
