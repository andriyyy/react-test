import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import DetailedItem from "../../../src/components/Items/DetailedItem/DetailedItem";

configure({ adapter: new Adapter() });

describe("<DetailedItem />", () => {
  const wrapper = shallow(<DetailedItem />);
  it("renders properly", () => {
    expect(wrapper).toMatchSnapshot();
  });
});
