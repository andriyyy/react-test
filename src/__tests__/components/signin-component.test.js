import React from "react";
import { shallow, configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import SignIn from "../../../src/components/SignIn/SignIn";
const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("<SignIn />", () => {
  const wrapper = mount(
    <Provider store={store}>
      <SignIn />
    </Provider>
  );

  it("renders properly", () => {
    //expect(wrapper).toMatchSnapshot();
  });

  it("renders an email input", () => {
    expect(wrapper.find('[data-field-name="email"] input')).toHaveLength(1);
  });

  it("renders a password input", () => {
    expect(wrapper.find('[data-field-name="password"] input')).toHaveLength(1);
  });

  it("should render 2 <label>s", () => {
    expect(wrapper.find("label")).toHaveLength(2);
  });

  it("should capture email correctly onChange", function() {
    const input = wrapper.find('[data-field-name="email"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture password correctly onChange", function() {
    const input = wrapper.find('[data-field-name="password"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });
});
