import React from "react";
import ImageSlider from "./components/ImageSlider";

const SliderData = "";

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
