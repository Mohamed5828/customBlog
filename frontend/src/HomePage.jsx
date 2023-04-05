import React, { useState, useEffect } from "react";
import ImageSlider from "./components/ImageSlider";
import Newsletter from "./components/Newsletter";
import "../src/Styling/components/home.css";
import "../src/Styling/components/card.css";
import "../src/Styling/components/btn.css";
import { Link } from "react-router-dom";

const HomePage = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([]);
  const [featuredTopics, setFeaturedTopics] = useState([]);
  async function fetchItems() {
    const data = await fetch(`/posts/post`);
    const items = await data.json();

    const slides = [];
    items.map((item) => {
      if (item.featured === true) {
        slides.push(item);
      }
    });
    setFeaturedTopics(slides);

    setItemData(items.slice(0, 6));
  }

  return (
    <div>
      <div className="home-container">
        <h1 className="header">Featured Topics</h1>
        <div className="img-slider">
          <ImageSlider slides={featuredTopics} />
        </div>
        <div className="ltst-top">
          <h1 className="header">Latest Topics</h1>
          <div className="row gap-2">
            {itemData.map((item) => {
              return (
                <div className="col-11-xs col-5-sm col-4-xl" key={item._id}>
                  <Link to={`http://localhost:3000/post/${item._id}`}>
                    <div className="cards">
                      <div className="card-info">
                        <p className="card-desc">
                          {item.description.slice(0, 200)}
                        </p>
                      </div>
                      <div className="img-container">
                        <img
                          className="card-img"
                          src={
                            item.imgs != ""
                              ? item.imgs
                              : "https://firebasestorage.googleapis.com/v0/b/blogimgupload-3998a.appspot.com/o/nothumb.jpg?alt=media&token=39ca3696-b50c-444f-b3e1-786b4cb0533b"
                          }
                        />
                      </div>
                      <h1 className="card-title">{item.title.slice(0, 25)}</h1>
                    </div>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <Newsletter />
      <div className="footer">
        <h3>Mohamed | </h3>
        <div className="socials">f - i - y</div>
      </div>
    </div>
  );
};

export default HomePage;
