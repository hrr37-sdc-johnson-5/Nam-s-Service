import React from "react";
import Enzyme,{ shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import Music from "../src/components/Music.jsx";
import { exists } from "fs";

Enzyme.configure( { adapter: new Adapter() })

it('renders correctly', () => {
  const wrapper = shallow(<Music/>)

  expect(wrapper).toBeDefined();
})

it('Play button will play or pause depending on the state', () => {
  const wrapper = shallow(<Music/>)
  const instance = wrapper.instance();
  expect(wrapper.state('play')).toBe(false);
  expect(wrapper.state('pause')).toBe(true);
  instance.playTrack();
  expect(wrapper.state('play')).toBe(true);
  expect(wrapper.state('pause')).toBe(false);
})
