import React from "react";
import ImageSlider from "./components/ImageSlider";

const SliderData = "";
// const mongoose = require("mongoose");
// const Document = require("./s/Document");
// mongoose.connect("mongodb://127.0.0.1/Docs");
// async function getData() {
//   try {
//     console.log(`---${Document}`);
//   } catch (e) {
//     console.log(e.message);
//   }
// }
// getData();
const HomePage = () => {
  return (
    <div>
      //navbar
      <h1>Top Picks</h1>
      <ImageSlider slides={SliderData} />
      <h1>Latest Topics</h1>
      //gridCards
      <h1>Newsletter</h1>
      //footer
    </div>
  );
};

export default HomePage;
