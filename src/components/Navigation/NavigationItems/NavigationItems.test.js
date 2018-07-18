import React from "react";
import { shallow, configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./Navigationitems";
import NavigationItem from "../NavigationItem/NavigationItem";

configure({ adapter: new Adapter() });

describe("NavigationItems", () => {
  it("should render two NavItem if the user is not authenticated", () => {
    const wrapper = shallow(<NavigationItems />);
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });
});
