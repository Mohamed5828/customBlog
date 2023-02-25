import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function ImageSlider(slides) {
  const [currentImg, setCurrentImg] = useState(0);
  const length = slides.length;
  function nextSlide() {
    setCurrentImg((prevImg) =>
      prevImg === length - 1 ? (prevImg = 0) : (prevImg += 1)
    );
  }
  function prevSlide() {
    setCurrentImg((prevImg) =>
      prevImg === 0 ? (prevImg = length - 1) : (prevImg -= 1)
    );
  }
  if (!Array.isArray(slides) || slides.length <= 0) return null;
  return (
    <section className="">
      <FaArrowAltCircleLeft className="" onClick={prevSlide} />
      <FaArrowAltCircleRight className="" onClick={nextSlide} />
      {slides.map((slide, index) => {
        return (
          <div
            className={index === currentImg ? "slide active" : "slide"}
            key={index}
            onClick={console.log(index)}
          >
            {index === currentImg && <img src={slide.image} />}
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;
