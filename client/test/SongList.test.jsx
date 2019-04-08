import React from "react";
import Enzyme,{ shallow, render, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SongList from "../src/components/SongList.jsx";
import { exists } from "fs";

Enzyme.configure( { adapter: new Adapter() })

it('renders correctly', () => {
  const wrapper = shallow(<SongList album = {
    [
      {track: "I know that song", url: "https://t4.bcbits.com/stream/14b5d317d227cbb92a247096babf17c2/mp3-128/4260926291?p=0&ts=1553898963&t=34c7414c35c90ffd4190b04228f466d3a17d8400&token=1553898963_f453e37fcfeb7505c6dddff666a4f7b400393d60"},
      {track: "Emo phase", url: "https://t4.bcbits.com/stream/ccb10f2dbdf1b043cbb141acefe160ab/mp3-128/3707812484?p=0&ts=1553898963&t=283eeeef41e6001dbd6bc689f31676e98060b011&token=1553898963_039f5f61e7bf9e36425740ce44d0702cd6d73774"},
      {track: "Rack Heactor", url: "https://t4.bcbits.com/stream/15a96ce6c433491b3d220c2ca0bb53b1/mp3-128/1748762823?p=0&ts=1553898963&t=64d049ef4b96d3ae4446cb4f952085381e5a81c3&token=1553898963_166fa1289e37cda2dae722c0c010ea4a1755b3ae"},
      {track: "Hulu and rave", url: "http://streaming.tdiradio.com:8000/house.mp3"},
      {track: "Team Amy is lit", url:"https://t4.bcbits.com/stream/32bd148543172f29113a3b9b928f3c8f/mp3-128/2095787844?p=0&ts=1553898963&t=6e3c6488006211578bbd0c6edf58cc1a205fb3a0&token=1553898963_9bf349994798d2afb8046c262bd4e7ea6f2653c3"}
    ]
   } onClick = {()=> console.log("test")}/>)

  expect(wrapper).toBeDefined();
})
