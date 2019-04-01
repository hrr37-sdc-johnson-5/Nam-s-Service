import React from "react";
import Enzyme,{ shallow, render, mount } from "enzyme";
import Adapater from "enzyme-adapter-react-16";
import Music from "../src/index.jsx";

Enzyme.configure( { adapter: new Adapater() })

it('renders correctly', () => {
  const wrapper = shallow(<Music/>)

  expect(wrapper).toMatchSnapshot();
})

