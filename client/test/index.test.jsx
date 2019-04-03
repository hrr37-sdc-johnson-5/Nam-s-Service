import React from "react";
import ReactDOM from "react-dom";
import Enzyme,{ shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Music from "../src/index.jsx";
import { exists } from "fs";

Enzyme.configure( { adapter: new Adapter() })

it('renders correctly', () => {
  const wrapper = shallow(<Music/>)

  expect(wrapper).to(exists);
})
