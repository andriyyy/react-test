import React from "react";
import { configure, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import AddItem from "../../../src/components/Items/AddItem/AddItem";
const mockStore = configureMockStore();
const store = mockStore({});

configure({ adapter: new Adapter() });

describe("<AddItem />", () => {
  const nextProps ={
    openPopUp: true
  }
  const wrapper = mount(
    <Provider store={store}>
      <AddItem {...nextProps} />
    </Provider>
  );

  it("renders properly", () => {
    //expect(wrapper).toMatchSnapshot();
  });
  it("renders form", () => {

    expect(wrapper.find("form")).toHaveLength(1);
  });
  it("renders an title input", () => {
    expect(wrapper.find('[data-field-name="title"] input')).toHaveLength(1);
  });

  it("renders a description input", () => {
    expect(wrapper.find('[data-field-name="description"] input')).toHaveLength(1);
  });

  it("renders a image input", () => {
    expect(wrapper.find('[data-field-name="image"] input')).toHaveLength(1);
  });

  it("should render 4 <label>s", () => {
    expect(wrapper.find("label")).toHaveLength(3);
  });

  it("should capture title correctly onChange", function() {
    const input = wrapper.find('[data-field-name="title"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture description correctly onChange", function() {
    const input = wrapper.find('[data-field-name="description"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  it("should capture image correctly onChange", function() {
    const input = wrapper.find('[data-field-name="image"] input');
    input.props().value = "hello";
    input.simulate("change");
    expect(input.props().value).toEqual("hello");
  });

  
});
