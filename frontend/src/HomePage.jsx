import React, { useState, useEffect } from "react";
import ImageSlider from "./components/ImageSlider";
import Newsletter from "./components/Newsletter";
import "../src/Styling/components/home.css";
import "../src/Styling/components/card.css";
import "../src/Styling/components/btn.css";
import { Link } from "react-router-dom";
const slides = [
  {
    image:
      "https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/01/05/22/35/flower-7700011_960_720.jpg",
  },
  {
    image:
      "https://cdn.pixabay.com/photo/2023/02/06/01/14/superb-fairywren-7770904_960_720.jpg",
  },
];

const HomePage = () => {
  useEffect(() => {
    fetchItems();
  }, []);
  const [itemData, setItemData] = useState([""]);
  async function fetchItems() {
    const data = await fetch(`/posts`);
    const items = await data.json();
    setItemData(items);
  }
  // console.log(itemData);
  return (
    <div>
      <div className="home-container">
        <h1 className="header">Top Picks</h1>
        <div className="img-slider">
          <ImageSlider slides={slides} />
        </div>
        <div className="ltst-top">
          <h1 className="header">Latest Topics</h1>
          <div className="row gap-2">
            {itemData.map((item) => {
              return (
                <div className="col-12-xs col-5-sm col-4-xl" key={item._id}>
                  <Link to={`http://localhost:3000/post/${item._id}`}>
                    <div className="cards">
                      <img
                        className="card-img"
                        src="https://images.pexels.com/photos/1632790/pexels-photo-1632790.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                      />
                      <h1 className="card-title">{item.title}</h1>
                      <div className="card-info">
                        <p className="card-desc">{item.description}</p>
                      </div>
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
