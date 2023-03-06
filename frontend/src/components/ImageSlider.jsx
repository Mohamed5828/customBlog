import React, { useState } from "react";
import { FaArrowAltCircleRight, FaArrowAltCircleLeft } from "react-icons/fa";

function ImageSlider(props) {
  const [currentImg, setCurrentImg] = useState(0);
  const length = props.slides.length;
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
  if (!Array.isArray(props.slides) || props.slides.length <= 0) return null;
  return (
    <section className="slider-sec">
      {props.slides.map((slide, index) => {
        return (
          <div
            className={index === currentImg ? "slide active" : "slide"}
            key={index}
            onClick={() => {
              console.log(index);
            }}
          >
            {index === currentImg && <img src={slide.image} className="img" />}
            <FaArrowAltCircleLeft className="left-arrow" onClick={prevSlide} />
            <FaArrowAltCircleRight
              className="right-arrow"
              onClick={nextSlide}
            />
            <div className="img-description">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Voluptatem labore molestias necessitatibus tempora magnam non
              eligendi, atque amet nihil maiores adipisci eveniet impedit
              inventore laboriosam quidem, voluptas vel quo sed?
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;
