import React, { useState } from "react";

import { Link } from "react-router-dom";

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
            className={
              index === currentImg ? "slide fade active" : "slide fade"
            }
            key={index}
            onClick={() => {}}
          >
            <div className="s-image-container">
              <Link to={`http://localhost:3000/post/${slide._id}`}>
                {index === currentImg && (
                  <img
                    src={
                      slide.imgs != ""
                        ? slide.imgs
                        : "https://firebasestorage.googleapis.com/v0/b/blogimgupload-3998a.appspot.com/o/nothumb.jpg?alt=media&token=39ca3696-b50c-444f-b3e1-786b4cb0533b"
                    }
                    className="img"
                  />
                )}
              </Link>
              <a className="left-arrow" onClick={prevSlide}>
                &#10094;
              </a>
              <a className="right-arrow" onClick={nextSlide}>
                &#10095;
              </a>

              <div className="img-description">{slide.description}</div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default ImageSlider;
